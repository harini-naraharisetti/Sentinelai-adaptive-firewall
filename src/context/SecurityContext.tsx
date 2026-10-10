'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  NetworkEvent, 
  Threat, 
  Incident, 
  FirewallRule, 
  SIEMEvent, 
  URLScanResult, 
  SystemStats,
  UserProfile
} from '../types/security';
import { 
  INITIAL_NETWORK_EVENTS, 
  INITIAL_THREATS, 
  INITIAL_INCIDENTS, 
  INITIAL_FIREWALL_RULES, 
  INITIAL_SIEM_EVENTS 
} from '../data/demoData';
import { 
  GeneratedSimulationResult, 
  generatePortScan, 
  generateBruteForce, 
  generateDoS, 
  generateAnomaly, 
  generateSuspiciousConnection, 
  generateNormalTraffic, 
  generateRandomLiveEvent 
} from '../services/simulationEngine';
import { analyzeUrlHeuristics } from '../services/urlAnalyzer';
import { playCyberSound } from '../services/soundEffects';
import { announceThreat } from '../services/voiceAnnouncer';
import confetti from 'canvas-confetti';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'critical' | 'high' | 'warning' | 'info' | 'success';
}

export const DEMO_USERS: UserProfile[] = [
  {
    name: 'USER',
    email: 'user@sentinelai.sec',
    role: 'SOC Security Analyst',
    avatar: 'US',
    badge: 'SOC Lead',
    clearanceLevel: 'TS-SCI // ALPHA-9'
  },
  {
    name: 'USER',
    email: 'admin@sentinelai.sec',
    role: 'SecOps Firewall Architect',
    avatar: 'US',
    badge: 'SecOps Eng',
    clearanceLevel: 'SECRET // DEF-4'
  }
];

interface SecurityContextType {
  // Auth & Session
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  demoUsers: UserProfile[];
  isLoginModalOpen: boolean;
  openLoginModal: (prefillEmail?: string) => void;
  closeLoginModal: () => void;
  isLoggingIn: boolean;
  loginProgress: number;
  loginStepLog: string;
  login: (email: string, password?: string, role?: string) => Promise<void>;
  logout: () => void;
  quickDemoLogin: (userIndex?: number) => Promise<void>;
  viewMode: 'landing' | 'dashboard';
  setViewMode: (mode: 'landing' | 'dashboard') => void;

  // Core Data Stores
  networkEvents: NetworkEvent[];
  threats: Threat[];
  incidents: Incident[];
  firewallRules: FirewallRule[];
  siemEvents: SIEMEvent[];
  urlScans: URLScanResult[];
  stats: SystemStats;

  // Live Stream Telemetry & Real-Time 10s Counter
  secondsUntilNextTick: number;
  liveBandwidth: string;
  livePacketRate: number;
  isTickPulse: boolean;
  lastTickTime: string;
  triggerLiveTickNow: () => void;
  liveMetricsDeltas: {
    totalEventsDelta: string;
    threatsDelta: string;
    incidentsDelta: string;
    highRiskDelta: string;
    blockedDelta: string;
    socketsDelta: string;
    riskScoreDelta: string;
  };

  // Live Stream Simulation Controls
  isLiveSimulationRunning: boolean;
  pauseLiveSimulation: () => void;
  resumeLiveSimulation: () => void;
  toggleLiveSimulation: () => void;
  generateManualThreat: (type?: string) => void;
  clearTraffic: () => void;
  resetDemo: () => void;

  // Modals & Selected items
  selectedNetworkEvent: NetworkEvent | null;
  isNetworkModalOpen: boolean;
  openNetworkModal: (event: NetworkEvent) => void;
  closeNetworkModal: () => void;

  selectedThreat: Threat | null;
  isThreatModalOpen: boolean;
  openThreatModal: (threat: Threat) => void;
  closeThreatModal: () => void;

  selectedIncident: Incident | null;
  isIncidentModalOpen: boolean;
  openIncidentModal: (incident: Incident) => void;
  closeIncidentModal: () => void;

  selectedSiemEvent: SIEMEvent | null;
  isSiemModalOpen: boolean;
  openSiemModal: (event: SIEMEvent) => void;
  closeSiemModal: () => void;

  // Simulator Execution
  isSimulating: boolean;
  currentSimulation: GeneratedSimulationResult | null;
  activeStepIndex: number;
  runAttackSimulation: (scenarioType: string) => Promise<void>;

  // URL Security
  analyzeUrl: (inputUrl: string) => URLScanResult;
  pushUrlToSiem: (scanResult: URLScanResult) => void;

  // Incident & Firewall Actions
  resolveIncident: (incidentId: string) => void;
  quarantineIncident: (incidentId: string) => void;
  toggleFirewallRule: (ruleId: string) => void;
  deleteFirewallRule: (ruleId: string) => void;
  addFirewallRule: (rule: Partial<FirewallRule>) => void;

  // Drawers & Overlays
  isCopilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
  toggleCopilot: () => void;

  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;

  isWelcomeOpen: boolean;
  setWelcomeOpen: (open: boolean) => void;
  openWelcomeModal: () => void;
  closeWelcomeModal: () => void;

  // Defcon Lockdown
  isDefconLockdown: boolean;
  toggleDefconLockdown: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_USERS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [loginProgress, setLoginProgress] = useState<number>(0);
  const [loginStepLog, setLoginStepLog] = useState<string>('');
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('landing');

  // Core stores
  const [networkEvents, setNetworkEvents] = useState<NetworkEvent[]>(INITIAL_NETWORK_EVENTS);
  const [threats, setThreats] = useState<Threat[]>(INITIAL_THREATS);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>(INITIAL_FIREWALL_RULES);
  const [siemEvents, setSiemEvents] = useState<SIEMEvent[]>(INITIAL_SIEM_EVENTS);
  const [urlScans, setUrlScans] = useState<URLScanResult[]>([]);

  const [isLiveSimulationRunning, setIsLiveSimulationRunning] = useState<boolean>(true);
  const [isDefconLockdown, setIsDefconLockdown] = useState<boolean>(false);

  // Check sessionStorage on mount (if user logged in previously in this session)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('sentinel_auth');
      const savedUser = sessionStorage.getItem('sentinel_user');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
        setViewMode('dashboard');
      }
      if (savedUser) {
        try {
          setCurrentUser(JSON.parse(savedUser));
        } catch {}
      }
    }
  }, []);

  // Modals state
  const [selectedNetworkEvent, setSelectedNetworkEvent] = useState<NetworkEvent | null>(null);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState<boolean>(false);

  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [isThreatModalOpen, setIsThreatModalOpen] = useState<boolean>(false);

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState<boolean>(false);

  const [selectedSiemEvent, setSelectedSiemEvent] = useState<SIEMEvent | null>(null);
  const [isSiemModalOpen, setIsSiemModalOpen] = useState<boolean>(false);

  // Global Drawers
  const [isCopilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const [isWelcomeOpen, setWelcomeOpen] = useState<boolean>(false);

  // Simulator pipeline state
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentSimulation, setCurrentSimulation] = useState<GeneratedSimulationResult | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [{ ...toast, id }, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Live 10s Telemetry Engine State
  const [liveEventOffset, setLiveEventOffset] = useState<number>(0);
  const [secondsUntilNextTick, setSecondsUntilNextTick] = useState<number>(10);
  const [liveBandwidth, setLiveBandwidth] = useState<string>('64.2 MB/s');
  const [livePacketRate, setLivePacketRate] = useState<number>(36);
  const [isTickPulse, setIsTickPulse] = useState<boolean>(false);
  const [lastTickTime, setLastTickTime] = useState<string>('');
  const [liveSocketOffset, setLiveSocketOffset] = useState<number>(0);

  // Dynamic offsets for all 7 metrics
  const [liveThreatsOffset, setLiveThreatsOffset] = useState<number>(0);
  const [liveIncidentsOffset, setLiveIncidentsOffset] = useState<number>(0);
  const [liveHighRiskOffset, setLiveHighRiskOffset] = useState<number>(0);
  const [liveBlockedOffset, setLiveBlockedOffset] = useState<number>(0);
  const [liveRiskScoreJitter, setLiveRiskScoreJitter] = useState<number>(0);

  const [liveMetricsDeltas, setLiveMetricsDeltas] = useState<{
    totalEventsDelta: string;
    threatsDelta: string;
    incidentsDelta: string;
    highRiskDelta: string;
    blockedDelta: string;
    socketsDelta: string;
    riskScoreDelta: string;
  }>({
    totalEventsDelta: '+36 in 10s',
    threatsDelta: '+12.5%',
    incidentsDelta: 'Contained',
    highRiskDelta: 'Critical',
    blockedDelta: '+1 Auto',
    socketsDelta: 'Active',
    riskScoreDelta: 'Evaluated'
  });

  // Calculate dynamic system stats based on active state + live telemetry offset for all 7 metrics
  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED').length;
  const highRiskEvents = threats.filter(t => t.severity === 'HIGH' || t.severity === 'CRITICAL').length;
  const blockedSources = firewallRules.filter(r => r.status === 'ACTIVE' && r.action === 'BLOCK').length;
  const monitoredConnections = Math.max(9, networkEvents.filter(e => e.status === 'SUSPICIOUS').length + liveSocketOffset + 12);
  const totalRiskSum = threats.reduce((acc, t) => acc + t.riskScore, 0);
  const averageRiskScore = threats.length > 0 ? Math.round(totalRiskSum / threats.length) : 76;
  const securityPosture = Math.max(65, Math.min(99, 100 - activeIncidents * 3 - (highRiskEvents > 5 ? 10 : 0)));

  const stats: SystemStats = {
    totalEvents: networkEvents.length + 18450 + liveEventOffset,
    threatsDetected: Math.max(10, threats.length + liveThreatsOffset),
    activeIncidents: Math.max(3, activeIncidents + liveIncidentsOffset),
    highRiskEvents: Math.max(5, highRiskEvents + liveHighRiskOffset),
    blockedSources: Math.max(5, blockedSources + liveBlockedOffset),
    monitoredConnections,
    averageRiskScore: Math.max(62, Math.min(95, averageRiskScore + liveRiskScoreJitter)),
    securityPosture
  };

  // Keyboard shortcut (Cmd/Ctrl + K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Helper to asynchronously stream live network telemetry into MongoDB backend
  const syncLiveEventToMongo = (payload: {
    networkEvent?: NetworkEvent;
    threat?: Threat;
    firewallRule?: FirewallRule | null;
    siemEvent?: SIEMEvent;
  }) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600);
      fetch('http://localhost:5000/api/live-stream/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      }).catch(() => {
        // Backend optional / safe fallback
      }).finally(() => clearTimeout(timeoutId));
    } catch {}
  };

  // Core 10-Second Telemetry Cycle Execution Callback
  const executeTelemetryCycle = useCallback(() => {
    const generated = generateRandomLiveEvent();
    
    // 1. Total Events: Increment count dynamically every 10 seconds (+18 to +52 packets per cycle)
    const burst = Math.floor(18 + Math.random() * 35);
    setLivePacketRate(burst);
    setLiveEventOffset(prev => prev + burst);

    // 2. Dynamic bandwidth fluctuation (52.0 to 86.0 MB/s)
    const bw = (52.0 + Math.random() * 34.0).toFixed(1);
    setLiveBandwidth(`${bw} MB/s`);

    // 3. Dynamic active sockets jitter
    const sockOffset = Math.floor(Math.random() * 7) - 2; // -2 to +4
    setLiveSocketOffset(sockOffset);

    // 4. Dynamic Threats count fluctuation
    const threatOffset = Math.floor(Math.random() * 5) - 2; // -2 to +2
    setLiveThreatsOffset(threatOffset);

    // 5. Dynamic Active Incidents fluctuation
    const incOffset = Math.floor(Math.random() * 4) - 1; // -1 to +2
    setLiveIncidentsOffset(incOffset);

    // 6. Dynamic High Risk Events fluctuation
    const highRiskOff = Math.floor(Math.random() * 4) - 1; // -1 to +2
    setLiveHighRiskOffset(highRiskOff);

    // 7. Dynamic Blocked Sources fluctuation / increment
    const blockOff = Math.floor(Math.random() * 3); // 0 to 2
    setLiveBlockedOffset(prev => (prev >= 6 ? 2 : prev + blockOff));

    // 8. Dynamic Avg Risk Score jitter
    const riskJitter = Math.floor(Math.random() * 11) - 5; // -5 to +5
    setLiveRiskScoreJitter(riskJitter);

    // Dynamic deltas for all 7 metrics
    const incidentStatuses = ['Contained', 'Analyzing', 'Mitigated', '02 Triage', 'Stabilized'];
    const highRiskStatuses = ['Critical', 'Elevated', 'Under Review', 'Prioritized', 'Isolated'];
    const blockedLabels = ['+1 Auto', '+2 Blocked', 'Active ACL', 'Enforcing', 'Drop Rule'];
    const socketLabels = ['Active', 'DPI Live', 'Inspecting', '16 Conns', 'Encrypted'];
    const riskLabels = ['Evaluated', 'Composite', 'AI Scored', 'Weighted', 'Dynamic'];

    setLiveMetricsDeltas({
      totalEventsDelta: `+${burst} in 10s`,
      threatsDelta: `+${(9.5 + Math.random() * 6.5).toFixed(1)}%`,
      incidentsDelta: incidentStatuses[Math.floor(Math.random() * incidentStatuses.length)],
      highRiskDelta: highRiskStatuses[Math.floor(Math.random() * highRiskStatuses.length)],
      blockedDelta: blockedLabels[Math.floor(Math.random() * blockedLabels.length)],
      socketsDelta: socketLabels[Math.floor(Math.random() * socketLabels.length)],
      riskScoreDelta: riskLabels[Math.floor(Math.random() * riskLabels.length)]
    });

    // Timestamp
    const now = new Date();
    setLastTickTime(now.toLocaleTimeString());

    // Update live network stream buffer
    setNetworkEvents(prev => [generated.networkEvent, ...prev.slice(0, 49)]);

    // Stream live packet to MongoDB
    syncLiveEventToMongo(generated);

    // Trigger visual pulse glow in dashboard components
    setIsTickPulse(true);
    setTimeout(() => {
      setIsTickPulse(false);
    }, 1400);

    // If threat / anomaly, dispatch across all security subsystems
    if (generated.networkEvent.status !== 'NORMAL') {
      setThreats(prev => [generated.threat, ...prev.slice(0, 29)]);
      setIncidents(prev => [generated.incident, ...prev.slice(0, 19)]);
      if (generated.firewallRule) {
        setFirewallRules(prev => [generated.firewallRule!, ...prev.slice(0, 19)]);
      }
      setSiemEvents(prev => [generated.siemEvent, ...prev.slice(0, 49)]);

      // Sound & Toast & Voice Announcement for high severity
      if (generated.threat.severity === 'CRITICAL') {
        playCyberSound('criticalAlarm');
        announceThreat(generated.threat.type, generated.threat.sourceIp, generated.threat.riskScore);
        addToast({
          title: `🚨 CRITICAL THREAT DETECTED`,
          message: `${generated.threat.type} from ${generated.threat.sourceIp} | Risk: ${generated.threat.riskScore}/100 → BLOCK SIMULATED`,
          type: 'critical'
        });
      } else if (generated.threat.severity === 'HIGH') {
        playCyberSound('highAlarm');
        announceThreat(generated.threat.type, generated.threat.sourceIp, generated.threat.riskScore);
        addToast({
          title: `⚠️ HIGH RISK THREAT DETECTED`,
          message: `${generated.threat.type} from ${generated.threat.sourceIp} | Risk: ${generated.threat.riskScore}/100`,
          type: 'high'
        });
      }
    }
  }, [addToast]);

  // Periodic 1-Second Timer for Exact 10-Second Live Telemetry Ingest
  useEffect(() => {
    if (!isLiveSimulationRunning || isSimulating) return;

    const timer = setInterval(() => {
      setSecondsUntilNextTick(prev => {
        if (prev <= 1) {
          executeTelemetryCycle();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLiveSimulationRunning, isSimulating, executeTelemetryCycle]);

  // Manual trigger for instant 10s sync
  const triggerLiveTickNow = () => {
    executeTelemetryCycle();
    setSecondsUntilNextTick(10);
    playCyberSound('click');
    addToast({
      title: 'Manual Telemetry Polled',
      message: 'Pulled fresh packet telemetry buffer and updated SOC counts.',
      type: 'info'
    });
  };

  // Modal Open / Close Handlers
  const openNetworkModal = (event: NetworkEvent) => {
    setSelectedNetworkEvent(event);
    setIsNetworkModalOpen(true);
  };
  const closeNetworkModal = () => {
    setIsNetworkModalOpen(false);
    setSelectedNetworkEvent(null);
  };

  const openThreatModal = (threat: Threat) => {
    setSelectedThreat(threat);
    setIsThreatModalOpen(true);
  };
  const closeThreatModal = () => {
    setIsThreatModalOpen(false);
    setSelectedThreat(null);
  };

  const openIncidentModal = (incident: Incident) => {
    setSelectedIncident(incident);
    setIsIncidentModalOpen(true);
  };
  const closeIncidentModal = () => {
    setIsIncidentModalOpen(false);
    setSelectedIncident(null);
  };

  const openSiemModal = (event: SIEMEvent) => {
    setSelectedSiemEvent(event);
    setIsSiemModalOpen(true);
  };
  const closeSiemModal = () => {
    setIsSiemModalOpen(false);
    setSelectedSiemEvent(null);
  };

  const toggleCopilot = () => setCopilotOpen(prev => !prev);
  const toggleSearch = () => setSearchOpen(prev => !prev);
  const openWelcomeModal = () => setWelcomeOpen(true);
  const closeWelcomeModal = () => setWelcomeOpen(false);

  const pauseLiveSimulation = () => {
    setIsLiveSimulationRunning(false);
    addToast({
      title: 'Live Telemetry Stream Paused',
      message: 'Background event generation is suspended.',
      type: 'info'
    });
  };

  const resumeLiveSimulation = () => {
    setIsLiveSimulationRunning(true);
    addToast({
      title: 'Live Telemetry Stream Resumed',
      message: 'Background simulated packets flowing.',
      type: 'success'
    });
  };

  const toggleLiveSimulation = () => {
    if (isLiveSimulationRunning) {
      pauseLiveSimulation();
    } else {
      resumeLiveSimulation();
    }
  };

  const clearTraffic = () => {
    setNetworkEvents([]);
    addToast({
      title: 'Traffic Stream Cleared',
      message: 'Live network buffer cleared.',
      type: 'info'
    });
  };

  const resetDemo = () => {
    setNetworkEvents(INITIAL_NETWORK_EVENTS);
    setThreats(INITIAL_THREATS);
    setIncidents(INITIAL_INCIDENTS);
    setFirewallRules(INITIAL_FIREWALL_RULES);
    setSiemEvents(INITIAL_SIEM_EVENTS);
    setUrlScans([]);
    setIsDefconLockdown(false);
    playCyberSound('success');
    addToast({
      title: 'Demo Environment Reset',
      message: 'All telemetry, threats, firewall rules, and SIEM logs restored to initial baseline.',
      type: 'success'
    });
  };

  // Run Manual Attack Simulation Workflow (10 Steps)
  const runAttackSimulation = async (scenarioType: string) => {
    if (isSimulating) return;

    let payload: GeneratedSimulationResult;
    switch (scenarioType) {
      case 'PORT_SCAN':
        payload = generatePortScan();
        break;
      case 'BRUTE_FORCE':
        payload = generateBruteForce();
        break;
      case 'DOS_FLOOD':
        payload = generateDoS();
        break;
      case 'NETWORK_ANOMALY':
        payload = generateAnomaly();
        break;
      case 'SUSPICIOUS_CONN':
        payload = generateSuspiciousConnection();
        break;
      default:
        payload = generatePortScan();
    }

    setCurrentSimulation(payload);
    setIsSimulating(true);
    setActiveStepIndex(0);
    playCyberSound('blip');

    // 10-step progress animation
    for (let i = 0; i < payload.steps.length; i++) {
      setActiveStepIndex(i);
      playCyberSound('tick');
      await new Promise(res => setTimeout(res, 450));
    }

    // Update synchronized state across all modules
    setNetworkEvents(prev => [payload.networkEvent, ...prev]);
    setThreats(prev => [payload.threat, ...prev]);
    setIncidents(prev => [payload.incident, ...prev]);
    if (payload.firewallRule) {
      setFirewallRules(prev => [payload.firewallRule!, ...prev]);
    }
    setSiemEvents(prev => [payload.siemEvent, ...prev]);

    // Stream simulated attack record to MongoDB (27017/27010)
    syncLiveEventToMongo(payload);

    // Sound effect and alert
    if (payload.threat.severity === 'CRITICAL' || payload.threat.severity === 'HIGH') {
      playCyberSound('blockSuccess');
      addToast({
        title: `🚨 ${payload.threat.type.toUpperCase()} DETECTED`,
        message: `Risk: ${payload.threat.riskScore}/100 | Action: ${payload.threat.severity === 'CRITICAL' ? 'BLOCK SIMULATED' : 'MONITORED'} | Rule ${payload.incident.ruleId || 'N/A'} created`,
        type: payload.threat.severity === 'CRITICAL' ? 'critical' : 'high'
      });
    }

    setIsSimulating(false);
  };

  const generateManualThreat = (type?: string) => {
    const generator = type === 'PORT_SCAN' ? generatePortScan
      : type === 'BRUTE_FORCE' ? generateBruteForce
      : type === 'DOS_FLOOD' ? generateDoS
      : type === 'NETWORK_ANOMALY' ? generateAnomaly
      : generatePortScan;

    const result = generator();
    setNetworkEvents(prev => [result.networkEvent, ...prev]);
    setThreats(prev => [result.threat, ...prev]);
    setIncidents(prev => [result.incident, ...prev]);
    if (result.firewallRule) {
      setFirewallRules(prev => [result.firewallRule!, ...prev]);
    }
    setSiemEvents(prev => [result.siemEvent, ...prev]);

    // Stream manual injected threat to MongoDB (27017/27010)
    syncLiveEventToMongo(result);

    playCyberSound('highAlarm');
    addToast({
      title: `⚡ Manual Threat Injected`,
      message: `${result.threat.type} simulated on ${result.threat.sourceIp}. All SOC modules updated.`,
      type: 'high'
    });
  };

  // URL Analyzer
  const analyzeUrl = (inputUrl: string): URLScanResult => {
    const scan = analyzeUrlHeuristics(inputUrl);
    setUrlScans(prev => [scan, ...prev]);
    return scan;
  };

  const pushUrlToSiem = (scanResult: URLScanResult) => {
    const time = new Date().toLocaleTimeString();
    const eventId = `EVT-URL-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSiemEvent: SIEMEvent = {
      id: eventId,
      timestamp: time,
      eventType: 'MALICIOUS_URL',
      sourceIp: '10.0.0.50',
      destination: scanResult.url,
      threat: scanResult.verdict === 'HIGH RISK' ? 'PHISHING_DOMAIN' : 'SUSPICIOUS_URL',
      riskScore: scanResult.riskScore,
      severity: scanResult.verdict === 'HIGH RISK' ? 'HIGH' : scanResult.verdict === 'SUSPICIOUS' ? 'MEDIUM' : 'LOW',
      action: scanResult.riskScore >= 70 ? 'BLOCK' : scanResult.riskScore >= 40 ? 'MONITOR' : 'ALLOW',
      status: 'CONTAINED',
      category: 'URL Intelligence',
      rawJson: JSON.stringify({
        url: scanResult.url,
        verdict: scanResult.verdict,
        risk: scanResult.riskScore,
        indicators: scanResult.indicators,
        details: scanResult.analysisDetails
      }, null, 2)
    };

    setSiemEvents(prev => [newSiemEvent, ...prev]);
    playCyberSound('success');
    addToast({
      title: 'Dispatched to SIEM',
      message: `URL security scan ${eventId} logged into SIEM index with Risk ${scanResult.riskScore}/100.`,
      type: 'info'
    });
  };

  // Incident & Firewall controls
  const resolveIncident = (incidentId: string) => {
    setIncidents(prev => prev.map(i => {
      if (i.id === incidentId) {
        return {
          ...i,
          status: 'RESOLVED',
          timeline: i.timeline.map(t => t.stage === 'RESOLVED' ? { ...t, completed: true } : t)
        };
      }
      return i;
    }));
    playCyberSound('success');
    addToast({
      title: 'Incident Resolved',
      message: `${incidentId} status moved to RESOLVED.`,
      type: 'success'
    });
    if (selectedIncident?.id === incidentId) {
      setSelectedIncident(prev => prev ? { ...prev, status: 'RESOLVED' } : null);
    }
  };

  const quarantineIncident = (incidentId: string) => {
    setIncidents(prev => prev.map(i => i.id === incidentId ? { ...i, status: 'CONTAINED', action: 'BLOCK' } : i));
    playCyberSound('blockSuccess');
    addToast({
      title: 'Host Quarantined',
      message: `Emergency containment rule applied for ${incidentId}.`,
      type: 'critical'
    });
  };

  const toggleFirewallRule = (ruleId: string) => {
    setFirewallRules(prev => prev.map(r => {
      if (r.id === ruleId) {
        const nextStatus = r.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
        playCyberSound('blip');
        addToast({
          title: `Firewall Rule ${r.id}`,
          message: `Rule status changed to ${nextStatus}. (Simulated)`,
          type: nextStatus === 'ACTIVE' ? 'success' : 'warning'
        });
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  const deleteFirewallRule = (ruleId: string) => {
    setFirewallRules(prev => prev.filter(r => r.id !== ruleId));
    playCyberSound('blip');
    addToast({
      title: 'Rule Deleted',
      message: `Simulated rule ${ruleId} removed from rulebase.`,
      type: 'info'
    });
  };

  const addFirewallRule = (ruleData: Partial<FirewallRule>) => {
    const time = new Date().toLocaleTimeString();
    const id = `AUTO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRule: FirewallRule = {
      id,
      sourceIp: ruleData.sourceIp || '10.0.0.0/24',
      destinationIp: ruleData.destinationIp || '10.0.0.10',
      port: ruleData.port || 'Any',
      protocol: ruleData.protocol || 'TCP',
      reason: ruleData.reason || 'Manual SOC Operator Rule',
      action: ruleData.action || 'BLOCK',
      riskScore: ruleData.riskScore || 85,
      status: 'ACTIVE',
      generated: false,
      createdAt: time,
      hitsCount: 0
    };
    setFirewallRules(prev => [newRule, ...prev]);
    playCyberSound('success');
    addToast({
      title: 'Firewall Rule Added',
      message: `Simulated rule ${id} active for source ${newRule.sourceIp}.`,
      type: 'success'
    });
  };

  const toggleDefconLockdown = () => {
    setIsDefconLockdown(prev => {
      const nextState = !prev;
      if (nextState) {
        playCyberSound('criticalAlarm');
        addToast({
          title: 'DEFCON 1 LOCKDOWN ACTIVE',
          message: 'All external ingress connections dropped. Maximum containment active.',
          type: 'critical'
        });
      } else {
        playCyberSound('success');
        addToast({
          title: 'DEFCON 1 Cleared',
          message: 'Normal security perimeter operations restored.',
          type: 'success'
        });
      }
      return nextState;
    });
  };

  // Auth Handlers & High-Tech Login Animation Sequence
  const openLoginModal = (prefillEmail?: string) => {
    if (prefillEmail) {
      const match = DEMO_USERS.find(u => u.email === prefillEmail);
      if (match) setCurrentUser(match);
    }
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const login = async (email: string, _password?: string, role?: string) => {
    setIsLoggingIn(true);
    setIsLoginModalOpen(false);
    setLoginProgress(10);
    setLoginStepLog(`🔐 Authenticating SHA-512 token for ${email}...`);
    playCyberSound('blip');

    // Find or fallback user profile
    const matchedUser = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
      name: 'USER',
      email: email || 'user@sentinelai.sec',
      role: role || 'SOC Security Analyst',
      avatar: 'US',
      badge: 'SOC Lead',
      clearanceLevel: 'TS-SCI // ALPHA-9'
    };
    setCurrentUser(matchedUser);

    await new Promise(r => setTimeout(r, 120));
    setLoginProgress(30);
    setLoginStepLog('🧠 Initializing Dual-Model ML Engine (Random Forest + XGBoost)...');
    playCyberSound('tick');

    await new Promise(r => setTimeout(r, 130));
    setLoginProgress(55);
    setLoginStepLog('🛡️ Synchronizing Adaptive Firewall ACL & Ingress telemetry stream...');
    playCyberSound('tick');

    await new Promise(r => setTimeout(r, 120));
    setLoginProgress(80);
    setLoginStepLog('⚡ Connecting SIEM Lakehouse & AI SOC Copilot Neural Index...');
    playCyberSound('tick');

    await new Promise(r => setTimeout(r, 120));
    setLoginProgress(100);
    setLoginStepLog('🚀 Access Clearance Verified! Session Token Active.');
    playCyberSound('success');

    // Confetti celebration burst
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00875a', '#10b981', '#06b6d4', '#6366f1']
      });
    } catch {}

    await new Promise(r => setTimeout(r, 100));
    setIsAuthenticated(true);
    setViewMode('dashboard');
    setIsLoggingIn(false);

    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sentinel_auth', 'true');
      sessionStorage.setItem('sentinel_user', JSON.stringify(matchedUser));
    }

    addToast({
      title: `Welcome back, ${matchedUser.name}`,
      message: `Role: ${matchedUser.role} • Clearance: ${matchedUser.clearanceLevel}`,
      type: 'success'
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setViewMode('landing');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('sentinel_auth');
      sessionStorage.removeItem('sentinel_user');
    }
    playCyberSound('blip');
    addToast({
      title: 'Session Terminated',
      message: 'Logged out of SentinelAI Command Center.',
      type: 'info'
    });
  };

  const quickDemoLogin = async (userIndex: number = 0) => {
    const user = DEMO_USERS[userIndex % DEMO_USERS.length];
    await login(user.email, 'demo1234', user.role);
  };

  return (
    <SecurityContext.Provider value={{
      isAuthenticated,
      currentUser,
      demoUsers: DEMO_USERS,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
      isLoggingIn,
      loginProgress,
      loginStepLog,
      login,
      logout,
      quickDemoLogin,
      viewMode,
      setViewMode,
      networkEvents,
      threats,
      incidents,
      firewallRules,
      siemEvents,
      urlScans,
      stats,
      secondsUntilNextTick,
      liveBandwidth,
      livePacketRate,
      isTickPulse,
      lastTickTime,
      triggerLiveTickNow,
      liveMetricsDeltas,
      isLiveSimulationRunning,
      pauseLiveSimulation,
      resumeLiveSimulation,
      toggleLiveSimulation,
      generateManualThreat,
      clearTraffic,
      resetDemo,
      selectedNetworkEvent,
      isNetworkModalOpen,
      openNetworkModal,
      closeNetworkModal,
      selectedThreat,
      isThreatModalOpen,
      openThreatModal,
      closeThreatModal,
      selectedIncident,
      isIncidentModalOpen,
      openIncidentModal,
      closeIncidentModal,
      selectedSiemEvent,
      isSiemModalOpen,
      openSiemModal,
      closeSiemModal,
      isSimulating,
      currentSimulation,
      activeStepIndex,
      runAttackSimulation,
      analyzeUrl,
      pushUrlToSiem,
      resolveIncident,
      quarantineIncident,
      toggleFirewallRule,
      deleteFirewallRule,
      addFirewallRule,
      isCopilotOpen,
      setCopilotOpen,
      toggleCopilot,
      isSearchOpen,
      setSearchOpen,
      toggleSearch,
      isWelcomeOpen,
      setWelcomeOpen,
      openWelcomeModal,
      closeWelcomeModal,
      isDefconLockdown,
      toggleDefconLockdown,
      toasts,
      addToast,
      dismissToast
    }}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}
