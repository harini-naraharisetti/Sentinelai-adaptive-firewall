export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type TrafficStatus = 'NORMAL' | 'SUSPICIOUS' | 'BLOCKED' | 'MONITORED';

export type IncidentStatus = 'DETECTED' | 'ANALYZING' | 'CONTAINED' | 'RESOLVED' | 'INVESTIGATING' | 'ACTIVE';

export type ResponseAction = 'ALLOW' | 'MONITOR' | 'BLOCK' | 'DROP' | 'FLAGGED' | 'ALLOWED';

export interface NetworkEvent {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  sourcePort: number;
  destinationPort: number;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'HTTPS' | 'DNS' | 'SSH' | string;
  packetCount: number;
  bytes: number;
  connectionRate: number;
  uniquePorts: number;
  synCount: number;
  entropy: number;
  status: TrafficStatus;
  payloadInfo?: string;
}

export interface Threat {
  id: string;
  eventId?: string;
  type: string;
  threatType?: string; // alias for type
  confidence?: number;
  mlConfidence?: number; // alias for confidence
  anomalyScore?: number;
  riskScore: number;
  severity: SeverityLevel;
  sourceIp: string;
  destinationIp: string;
  destinationPort?: string | number;
  protocol?: string;
  action?: ResponseAction | string;
  status?: string;
  firewallRuleId?: string;
  timestamp: string;
  indicators?: string[];
  detectionIndicators?: string[]; // alias
  explanation?: string;
  aiExplanation?: string; // alias
  features?: {
    packetCount?: number;
    byteCount?: number;
    connectionCount?: number;
    connectionRate?: number | string;
    uniquePorts?: number;
    synCount?: number;
    flowDurationMs?: number;
    entropy?: number;
  };
}

export interface IncidentTimelineStep {
  stage: 'DETECTED' | 'ANALYZING' | 'HIGH RISK' | 'CONTAINMENT' | 'BLOCK SIMULATED' | 'SIEM LOGGED' | 'RESOLVED' | string;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Incident {
  id: string;
  threatType: string;
  sourceIp: string;
  destinationIp: string;
  riskScore: number;
  severity: SeverityLevel;
  action: ResponseAction;
  status: IncidentStatus;
  timestamp: string;
  summary: string;
  ruleId?: string;
  siemEventId?: string;
  confidence?: number;
  anomalyScore?: number;
  factors: {
    name: string;
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    points: number;
  }[];
  timeline: IncidentTimelineStep[];
}

export interface FirewallRule {
  id: string;
  sourceIp: string;
  destinationIp?: string;
  port?: string | number;
  protocol?: string;
  action: 'BLOCK' | 'ALLOW' | 'MONITOR' | 'DROP';
  reason: string;
  riskScore?: number;
  status: 'ACTIVE' | 'DISABLED';
  generated?: boolean;
  createdAt: string;
  createdBy?: string;
  hitsCount: number;
  expiresIn?: string;
}

export interface SIEMEvent {
  id: string;
  timestamp: string;
  eventType: string;
  source?: string;
  sourceIp?: string;
  destination?: string;
  threat?: string;
  riskScore: number;
  severity: SeverityLevel;
  action: string;
  status: 'CONTAINED' | 'INVESTIGATING' | 'RESOLVED' | 'LOGGED' | 'ACTIVE';
  category: string;
  summary?: string;
  confidence?: number;
  rawJson?: string;
  rawLog?: string;
}

export interface URLScanResult {
  id: string;
  url: string;
  timestamp: string;
  riskScore: number;
  verdict: 'SAFE' | 'SUSPICIOUS' | 'HIGH RISK';
  confidence: number;
  indicators: {
    label: string;
    type: 'safe' | 'warning' | 'critical';
    description: string;
  }[];
  analysisDetails: {
    hasHttps: boolean;
    domainEntropy: number;
    subdomainCount: number;
    dotCount: number;
    hasIpHostname: boolean;
    suspiciousKeywordsDetected: string[];
    urlLength: number;
    tldRisk: 'LOW' | 'MEDIUM' | 'HIGH';
    brandImpersonation?: string;
  };
  recommendation: string;
}

export interface SystemStats {
  totalEvents: number;
  threatsDetected: number;
  activeIncidents: number;
  highRiskEvents: number;
  blockedSources: number;
  monitoredConnections: number;
  averageRiskScore: number;
  securityPosture: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  severity: SeverityLevel | string;
  timestamp: string;
  read: boolean;
  threatId?: string;
  ruleId?: string;
  action?: string;
}

export interface SystemStatus {
  inspectedFlows: number;
  activeThreats: number;
  firewallRulesCount: number;
  systemHealth: string;
}

export interface TrafficTelemetryPoint {
  time: string;
  incoming: number;
  outgoing: number;
  suspicious: number;
  allowed: number;
  monitored: number;
  blocked: number;
  bandwidthMbps: number;
}

export interface SimulationStep {
  step: number;
  name: string;
  description: string;
  metric: string;
  icon: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  badge: string;
  clearanceLevel: string;
}
