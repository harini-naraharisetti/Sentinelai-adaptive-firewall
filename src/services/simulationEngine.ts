import { 
  NetworkEvent, 
  Threat, 
  Incident, 
  FirewallRule, 
  SIEMEvent, 
  SeverityLevel, 
  ResponseAction, 
  TrafficStatus 
} from '../types/security';

export interface GeneratedSimulationResult {
  scenario: string;
  networkEvent: NetworkEvent;
  threat: Threat;
  incident: Incident;
  firewallRule?: FirewallRule;
  siemEvent: SIEMEvent;
  steps: {
    step: number;
    name: string;
    description: string;
    metric: string;
    icon: string;
  }[];
}

// Generate realistic simulated timestamps
export function getFormattedTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function generateRandomId(prefix: string): string {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Helper to extract feature vector
export function extractFeatureVector(event: Partial<NetworkEvent>): [number, number, number, number, number, number] {
  return [
    event.packetCount || 10,
    event.bytes || 1200,
    event.connectionRate || 2,
    event.uniquePorts || 1,
    event.synCount || 0,
    parseFloat((event.entropy || 0.45).toFixed(2))
  ];
}

// 1. Generate Normal Traffic
export function generateNormalTraffic(): GeneratedSimulationResult {
  const time = getFormattedTime();
  const idNum = Math.floor(1000 + Math.random() * 9000);
  const eventId = `EVT-${idNum}`;
  const ipSuffix = Math.floor(10 + Math.random() * 80);
  const sourceIp = `10.0.0.${ipSuffix}`;
  const destinationIp = '10.0.0.10';

  const networkEvent: NetworkEvent = {
    id: eventId,
    timestamp: time,
    sourceIp,
    destinationIp,
    sourcePort: Math.floor(40000 + Math.random() * 20000),
    destinationPort: 443,
    protocol: 'HTTPS',
    packetCount: Math.floor(12 + Math.random() * 20),
    bytes: Math.floor(1500 + Math.random() * 3000),
    connectionRate: Math.floor(2 + Math.random() * 6),
    uniquePorts: 1,
    synCount: 2,
    entropy: parseFloat((0.35 + Math.random() * 0.15).toFixed(2)),
    status: 'NORMAL',
    payloadInfo: 'Standard authenticated mTLS REST query'
  };

  const threat: Threat = {
    id: `THR-2026-${idNum}`,
    eventId,
    type: 'Normal',
    confidence: 99,
    anomalyScore: 0.04,
    riskScore: 12,
    severity: 'LOW',
    sourceIp,
    destinationIp,
    timestamp: time,
    indicators: [
      'Valid corporate mTLS certificate authority',
      'Standard HTTP/2 JSON REST payload structure',
      'Connection frequency aligns with operational baseline'
    ],
    explanation: 'Traffic fits into expected benign operational baseline cluster. No anomalous patterns detected.',
    features: {
      packetCount: networkEvent.packetCount,
      byteCount: networkEvent.bytes,
      connectionRate: networkEvent.connectionRate,
      uniquePorts: networkEvent.uniquePorts,
      synCount: networkEvent.synCount,
      entropy: networkEvent.entropy
    }
  };

  const incident: Incident = {
    id: `INC-${idNum.toString().slice(-4)}`,
    threatType: 'Normal Traffic',
    sourceIp,
    destinationIp,
    riskScore: 12,
    severity: 'LOW',
    action: 'ALLOW',
    status: 'RESOLVED',
    timestamp: time,
    summary: 'Standard benign microservice query verified by ML engine.',
    confidence: 99,
    anomalyScore: 0.04,
    factors: [
      { name: 'Baseline Alignment', level: 'LOW', points: 5 },
      { name: 'Certificate Trust', level: 'LOW', points: 4 },
      { name: 'Payload Regularity', level: 'LOW', points: 3 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: time, description: 'Inbound TLS session initiated', completed: true },
      { stage: 'ANALYZING', timestamp: time, description: 'Random Forest validated 99% benign signature', completed: true },
      { stage: 'HIGH RISK', timestamp: time, description: 'Evaluated: 12/100 (LOW RISK)', completed: true },
      { stage: 'CONTAINMENT', timestamp: time, description: 'No restriction required', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: time, description: 'Allowed without packet dropping', completed: true },
      { stage: 'SIEM LOGGED', timestamp: time, description: 'Audit telemetry recorded', completed: true },
      { stage: 'RESOLVED', timestamp: time, description: 'Session verified', completed: true }
    ]
  };

  const siemEvent: SIEMEvent = {
    id: eventId,
    timestamp: time,
    eventType: 'NORMAL_TRAFFIC',
    sourceIp,
    destination: `${destinationIp}:443`,
    threat: 'BENIGN',
    riskScore: 12,
    severity: 'LOW',
    action: 'ALLOW',
    status: 'LOGGED',
    category: 'Network',
    rawJson: JSON.stringify({
      timestamp: time,
      event: 'NORMAL_TRAFFIC',
      src: sourceIp,
      dst: destinationIp,
      risk: 12,
      action: 'ALLOW',
      status: 'VERIFIED'
    }, null, 2)
  };

  return {
    scenario: 'Normal Traffic Flow',
    networkEvent,
    threat,
    incident,
    siemEvent,
    steps: [
      { step: 1, name: 'Traffic Generated', description: 'Internal host initiated standard HTTPS API session', metric: `${networkEvent.packetCount} packets`, icon: 'Radio' },
      { step: 2, name: 'Features Extracted', description: 'Extracted connection rates, TCP flags, byte volume', metric: `Entropy: ${networkEvent.entropy}`, icon: 'Cpu' },
      { step: 3, name: 'Random Forest Analysis', description: 'Evaluated against multi-class decision trees', metric: '99% Benign', icon: 'Brain' },
      { step: 4, name: 'Isolation Forest Analysis', description: 'Calculated tree depth anomaly distance', metric: 'Anomaly: 0.04', icon: 'Binary' },
      { step: 5, name: 'Risk Calculated', description: 'Composite Risk Engine determined score: 12/100', metric: '12 / 100 Risk', icon: 'Shield' },
      { step: 6, name: 'Incident Created', description: 'Logged low-priority audit event', metric: incident.id, icon: 'FileText' },
      { step: 7, name: 'Response Selected', description: 'Policy engine chose standard ALLOW action', metric: 'ALLOW', icon: 'CheckCircle2' },
      { step: 8, name: 'Firewall Rule Simulated', description: 'Default permit policy matched', metric: 'No Block Rule', icon: 'ShieldCheck' },
      { step: 9, name: 'SIEM Event Created', description: 'Audit event logged in SIEM event stream', metric: eventId, icon: 'Database' },
      { step: 10, name: 'SOC Dashboard Updated', description: 'Telemetry counters incremented live', metric: 'Active', icon: 'Layers' }
    ]
  };
}

// 2. Generate Port Scan
export function generatePortScan(): GeneratedSimulationResult {
  const time = getFormattedTime();
  const idNum = Math.floor(1000 + Math.random() * 9000);
  const eventId = `EVT-${idNum}`;
  const sourceIp = '10.0.0.25';
  const destinationIp = '10.0.0.10';
  const ruleId = `AUTO-00${idNum.toString().slice(-2)}`;
  const incidentId = `INC-00${idNum.toString().slice(-2)}`;

  const networkEvent: NetworkEvent = {
    id: eventId,
    timestamp: time,
    sourceIp,
    destinationIp,
    sourcePort: 52144,
    destinationPort: 22,
    protocol: 'TCP',
    packetCount: 842,
    bytes: 120420,
    connectionRate: 92,
    uniquePorts: 38,
    synCount: 720,
    entropy: 0.82,
    status: 'BLOCKED',
    payloadInfo: '[SYN] Probe sequence across 38 ports'
  };

  const threat: Threat = {
    id: `THR-2026-${idNum}`,
    eventId,
    type: 'Port Scan',
    confidence: 94,
    anomalyScore: 0.87,
    riskScore: 91,
    severity: 'CRITICAL',
    sourceIp,
    destinationIp,
    timestamp: time,
    indicators: [
      'High connection frequency (>400 req/sec)',
      'Sequential probe on 38 distinct destination ports',
      'Abnormal TCP SYN-without-ACK pattern',
      'Unusual packet rate violating baseline threshold',
      'Behavior differs significantly from historical baseline'
    ],
    explanation: 'Traffic behavior significantly differs from normal baseline cluster and strongly resembles a multi-port reconnaissance probe pattern (Random Forest 94% confidence and Isolation Forest Anomaly Index 0.87).',
    features: {
      packetCount: 842,
      byteCount: 120420,
      connectionRate: 92,
      uniquePorts: 38,
      synCount: 720,
      entropy: 0.82
    }
  };

  const incident: Incident = {
    id: incidentId,
    threatType: 'Port Scan',
    sourceIp,
    destinationIp,
    riskScore: 91,
    severity: 'CRITICAL',
    action: 'BLOCK',
    status: 'CONTAINED',
    timestamp: time,
    summary: 'Source 10.0.0.25 executed rapid multi-port TCP reconnaissance sweep across 38 sockets. Adaptive firewall synthesized rule AUTO-0042 to drop all incoming packets.',
    ruleId,
    siemEventId: eventId,
    confidence: 94,
    anomalyScore: 0.87,
    factors: [
      { name: 'Threat Classification', level: 'HIGH', points: 45 },
      { name: 'Anomaly Detection', level: 'HIGH', points: 25 },
      { name: 'Connection Rate', level: 'MEDIUM', points: 10 },
      { name: 'Unique Ports', level: 'HIGH', points: 6 },
      { name: 'Suspicious TCP Flags', level: 'HIGH', points: 5 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: time, description: 'Inbound packet burst detected on edge interface', completed: true },
      { stage: 'ANALYZING', timestamp: time, description: 'Random Forest (94%) & Isolation Forest (0.87) classified threat', completed: true },
      { stage: 'HIGH RISK', timestamp: time, description: 'Risk Engine calculated composite score 91/100 (CRITICAL)', completed: true },
      { stage: 'CONTAINMENT', timestamp: time, description: 'Applied adaptive isolation policy', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: time, description: `Firewall Rule ${ruleId} synthesized to DROP traffic`, completed: true },
      { stage: 'SIEM LOGGED', timestamp: time, description: `Incident ${eventId} dispatched to SIEM stream`, completed: true },
      { stage: 'RESOLVED', timestamp: time, description: 'Contained at simulated edge firewall', completed: true }
    ]
  };

  const firewallRule: FirewallRule = {
    id: ruleId,
    sourceIp,
    destinationIp,
    port: 'Multiple (21,22,80,443)',
    protocol: 'TCP',
    reason: 'PORT SCAN',
    action: 'BLOCK',
    riskScore: 91,
    status: 'ACTIVE',
    generated: true,
    createdAt: time,
    hitsCount: 1420
  };

  const siemEvent: SIEMEvent = {
    id: eventId,
    timestamp: time,
    eventType: 'NETWORK_INTRUSION',
    sourceIp,
    destination: `${destinationIp}:22`,
    threat: 'PORT_SCAN',
    riskScore: 91,
    severity: 'CRITICAL',
    action: 'BLOCK',
    status: 'CONTAINED',
    category: 'Network',
    rawJson: JSON.stringify({
      timestamp: time,
      event_id: eventId,
      eventType: 'NETWORK_INTRUSION',
      source: sourceIp,
      threat: 'PORT_SCAN',
      risk: 91,
      severity: 'CRITICAL',
      action: 'BLOCK',
      detector: 'RandomForestClassifier',
      confidence: 0.94,
      anomalyScore: 0.87,
      rule_generated: ruleId
    }, null, 2)
  };

  return {
    scenario: 'Port Scan Reconnaissance',
    networkEvent,
    threat,
    incident,
    firewallRule,
    siemEvent,
    steps: [
      { step: 1, name: 'Traffic Generated', description: 'Inbound burst of 842 SYN packets across 38 ports from 10.0.0.25', metric: '92 req/sec', icon: 'Radio' },
      { step: 2, name: 'Features Extracted', description: 'Extracted vector: [842, 120420, 92, 38, 720, 0.82]', metric: '38 Ports Targeted', icon: 'Cpu' },
      { step: 3, name: 'Random Forest Analysis', description: 'Random Forest classified signature as PORT SCAN with 94% confidence', metric: '94% RF Match', icon: 'Brain' },
      { step: 4, name: 'Isolation Forest Analysis', description: 'Isolation Forest marked anomaly index 0.87 (Severe Outlier)', metric: 'Score: 0.87', icon: 'Binary' },
      { step: 5, name: 'Risk Calculated', description: 'Composite score: 91/100 (Contributing factors: Port dispersion + TCP Flags)', metric: '91 / 100 (CRITICAL)', icon: 'Flame' },
      { step: 6, name: 'Incident Created', description: `Created incident record ${incidentId} with Critical severity`, metric: incidentId, icon: 'FileText' },
      { step: 7, name: 'Response Selected', description: 'Automated Response Engine selected: BLOCK SIMULATED', metric: 'BLOCK', icon: 'ShieldBan' },
      { step: 8, name: 'Firewall Rule Simulated', description: `Adaptive rule ${ruleId} synthesized to DROP source 10.0.0.25`, metric: ruleId, icon: 'ShieldAlert' },
      { step: 9, name: 'SIEM Event Created', description: `Dispatched structured event ${eventId} to SIEM stream`, metric: eventId, icon: 'Database' },
      { step: 10, name: 'SOC Dashboard Updated', description: 'Threat count, Active Incidents, and Blocked Sources updated live', metric: 'Synced', icon: 'Layers' }
    ]
  };
}

// 3. Generate Brute Force
export function generateBruteForce(): GeneratedSimulationResult {
  const time = getFormattedTime();
  const idNum = Math.floor(1000 + Math.random() * 9000);
  const eventId = `EVT-${idNum}`;
  const sourceIp = '10.0.0.42';
  const destinationIp = '10.0.0.15';
  const ruleId = `AUTO-00${idNum.toString().slice(-2)}`;
  const incidentId = `INC-00${idNum.toString().slice(-2)}`;

  const networkEvent: NetworkEvent = {
    id: eventId,
    timestamp: time,
    sourceIp,
    destinationIp,
    sourcePort: 48920,
    destinationPort: 22,
    protocol: 'TCP',
    packetCount: 1240,
    bytes: 184500,
    connectionRate: 140,
    uniquePorts: 1,
    synCount: 140,
    entropy: 0.74,
    status: 'BLOCKED',
    payloadInfo: 'SSH-2.0-OpenSSH_8.2 credential dictionary auth flood'
  };

  const threat: Threat = {
    id: `THR-2026-${idNum}`,
    eventId,
    type: 'Brute Force',
    confidence: 91,
    anomalyScore: 0.84,
    riskScore: 87,
    severity: 'HIGH',
    sourceIp,
    destinationIp,
    timestamp: time,
    indicators: [
      'High failed authentication rate (140 attempts/min)',
      'Known dictionary-based SSH username permutations',
      'Repetitive key-exchange teardowns',
      'Exceeds threshold for single-source auth frequency'
    ],
    explanation: 'Rapid succession of authentication handshakes matching credential-stuffing signature profile. Adaptive policy applied immediate source quarantine.',
    features: {
      packetCount: 1240,
      byteCount: 184500,
      connectionRate: 140,
      uniquePorts: 1,
      synCount: 140,
      entropy: 0.74
    }
  };

  const incident: Incident = {
    id: incidentId,
    threatType: 'Brute Force',
    sourceIp,
    destinationIp,
    riskScore: 87,
    severity: 'HIGH',
    action: 'BLOCK',
    status: 'CONTAINED',
    timestamp: time,
    summary: '140 failed SSH authentication attempts/minute on port 22. Source quarantined by adaptive firewall rule.',
    ruleId,
    siemEventId: eventId,
    confidence: 91,
    anomalyScore: 0.84,
    factors: [
      { name: 'Threat Classification', level: 'HIGH', points: 42 },
      { name: 'Failed Auth Rate', level: 'HIGH', points: 25 },
      { name: 'Connection Velocity', level: 'MEDIUM', points: 12 },
      { name: 'Target Service Sensitivity', level: 'HIGH', points: 8 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: time, description: 'SSH failed auth threshold breached (140 req/min)', completed: true },
      { stage: 'ANALYZING', timestamp: time, description: 'Classified as Dictionary Brute Force attack', completed: true },
      { stage: 'HIGH RISK', timestamp: time, description: 'Composite Risk scored at 87/100', completed: true },
      { stage: 'CONTAINMENT', timestamp: time, description: 'Adaptive rule applied to drop port 22', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: time, description: `Quarantined source IP ${sourceIp}`, completed: true },
      { stage: 'SIEM LOGGED', timestamp: time, description: `SIEM event ${eventId} logged`, completed: true },
      { stage: 'RESOLVED', timestamp: time, description: 'Mitigated at simulated perimeter', completed: true }
    ]
  };

  const firewallRule: FirewallRule = {
    id: ruleId,
    sourceIp,
    destinationIp,
    port: 22,
    protocol: 'TCP',
    reason: 'BRUTE FORCE',
    action: 'BLOCK',
    riskScore: 87,
    status: 'ACTIVE',
    generated: true,
    createdAt: time,
    hitsCount: 890
  };

  const siemEvent: SIEMEvent = {
    id: eventId,
    timestamp: time,
    eventType: 'AUTH_ATTACK',
    sourceIp,
    destination: `${destinationIp}:22`,
    threat: 'BRUTE_FORCE',
    riskScore: 87,
    severity: 'HIGH',
    action: 'BLOCK',
    status: 'CONTAINED',
    category: 'Authentication',
    rawJson: JSON.stringify({
      timestamp: time,
      event: 'AUTH_ATTACK',
      src: sourceIp,
      dst: `${destinationIp}:22`,
      risk: 87,
      severity: 'HIGH',
      action: 'BLOCK',
      service: 'sshd',
      failed_attempts: 140
    }, null, 2)
  };

  return {
    scenario: 'SSH Brute Force Attack',
    networkEvent,
    threat,
    incident,
    firewallRule,
    siemEvent,
    steps: [
      { step: 1, name: 'Traffic Generated', description: '1,240 authentication handshake requests targeting Port 22', metric: '140 req/min', icon: 'Radio' },
      { step: 2, name: 'Features Extracted', description: 'Vector: [1240, 184500, 140, 1, 140, 0.74]', metric: 'Auth Velocity', icon: 'Cpu' },
      { step: 3, name: 'Random Forest Analysis', description: 'Pattern classified as BRUTE FORCE attack', metric: '91% Confidence', icon: 'Brain' },
      { step: 4, name: 'Isolation Forest Analysis', description: 'High anomaly density on single socket port 22', metric: 'Score: 0.84', icon: 'Binary' },
      { step: 5, name: 'Risk Calculated', description: 'Score evaluated at 87/100 (HIGH RISK)', metric: '87 / 100', icon: 'Flame' },
      { step: 6, name: 'Incident Created', description: `Incident ${incidentId} logged into queue`, metric: incidentId, icon: 'FileText' },
      { step: 7, name: 'Response Selected', description: 'Applied quarantine response policy', metric: 'BLOCK', icon: 'ShieldBan' },
      { step: 8, name: 'Firewall Rule Simulated', description: `Rule ${ruleId} dropped connection on Port 22`, metric: ruleId, icon: 'ShieldAlert' },
      { step: 9, name: 'SIEM Event Created', description: `Forwarded event ${eventId} to SIEM index`, metric: eventId, icon: 'Database' },
      { step: 10, name: 'SOC Dashboard Updated', description: 'Updated threat and firewall state', metric: 'Synced', icon: 'Layers' }
    ]
  };
}

// 4. Generate DoS Attack
export function generateDoS(): GeneratedSimulationResult {
  const time = getFormattedTime();
  const idNum = Math.floor(1000 + Math.random() * 9000);
  const eventId = `EVT-${idNum}`;
  const sourceIp = '10.0.0.88';
  const destinationIp = '10.0.0.10';
  const ruleId = `AUTO-00${idNum.toString().slice(-2)}`;
  const incidentId = `INC-00${idNum.toString().slice(-2)}`;

  const networkEvent: NetworkEvent = {
    id: eventId,
    timestamp: time,
    sourceIp,
    destinationIp,
    sourcePort: 61002,
    destinationPort: 80,
    protocol: 'TCP',
    packetCount: 14800,
    bytes: 2450000,
    connectionRate: 920,
    uniquePorts: 1,
    synCount: 8900,
    entropy: 0.28,
    status: 'BLOCKED',
    payloadInfo: 'Volumetric HTTP GET flood exhausting worker pool'
  };

  const threat: Threat = {
    id: `THR-2026-${idNum}`,
    eventId,
    type: 'DoS-like Traffic',
    confidence: 98,
    anomalyScore: 0.94,
    riskScore: 96,
    severity: 'CRITICAL',
    sourceIp,
    destinationIp,
    timestamp: time,
    indicators: [
      'Volumetric HTTP GET flood exceeding 8,500 req/sec',
      'Asymmetric bandwidth consumption',
      'Incomplete HTTP request headers (Slowloris trait)',
      'TCP connection exhaustion vector'
    ],
    explanation: 'Classifier detected volumetric connection flood overwhelming web application worker pool. Adaptive firewall dropped connection at ingress edge.',
    features: {
      packetCount: 14800,
      byteCount: 2450000,
      connectionRate: 920,
      uniquePorts: 1,
      synCount: 8900,
      entropy: 0.28
    }
  };

  const incident: Incident = {
    id: incidentId,
    threatType: 'DoS-like Traffic',
    sourceIp,
    destinationIp,
    riskScore: 96,
    severity: 'CRITICAL',
    action: 'BLOCK',
    status: 'CONTAINED',
    timestamp: time,
    summary: 'Volumetric rate-limiter triggered by 920 req/sec HTTP GET flood. Ingress dropped at simulated edge router.',
    ruleId,
    siemEventId: eventId,
    confidence: 98,
    anomalyScore: 0.94,
    factors: [
      { name: 'Bandwidth Asymmetry', level: 'HIGH', points: 50 },
      { name: 'Connection Velocity', level: 'HIGH', points: 30 },
      { name: 'Header Incompleteness', level: 'HIGH', points: 16 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: time, description: 'Volumetric ingress flood detected', completed: true },
      { stage: 'ANALYZING', timestamp: time, description: 'Slowloris / HTTP exhaustion vector classified', completed: true },
      { stage: 'HIGH RISK', timestamp: time, description: 'Risk: 96/100 (CRITICAL)', completed: true },
      { stage: 'CONTAINMENT', timestamp: time, description: 'Dynamic rate limit dropped source', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: time, description: `Rule ${ruleId} synthesized`, completed: true },
      { stage: 'SIEM LOGGED', timestamp: time, description: 'Logged to SIEM queue', completed: true },
      { stage: 'RESOLVED', timestamp: time, description: 'Mitigated at ingress edge', completed: true }
    ]
  };

  const firewallRule: FirewallRule = {
    id: ruleId,
    sourceIp,
    destinationIp,
    port: 80,
    protocol: 'TCP',
    reason: 'DOS FLOOD',
    action: 'BLOCK',
    riskScore: 96,
    status: 'ACTIVE',
    generated: true,
    createdAt: time,
    hitsCount: 15400
  };

  const siemEvent: SIEMEvent = {
    id: eventId,
    timestamp: time,
    eventType: 'DOS_FLOOD',
    sourceIp,
    destination: `${destinationIp}:80`,
    threat: 'DOS_ATTACK',
    riskScore: 96,
    severity: 'CRITICAL',
    action: 'BLOCK',
    status: 'CONTAINED',
    category: 'Network',
    rawJson: JSON.stringify({
      timestamp: time,
      event: 'DOS_FLOOD',
      src: sourceIp,
      dst: `${destinationIp}:80`,
      risk: 96,
      severity: 'CRITICAL',
      action: 'BLOCK',
      rate_req_sec: 920
    }, null, 2)
  };

  return {
    scenario: 'Volumetric DoS Flood',
    networkEvent,
    threat,
    incident,
    firewallRule,
    siemEvent,
    steps: [
      { step: 1, name: 'Traffic Generated', description: 'Volumetric burst of 14,800 packets exhausting web pool', metric: '920 req/sec', icon: 'Radio' },
      { step: 2, name: 'Features Extracted', description: 'Extracted vector: [14800, 2450000, 920, 1, 8900, 0.28]', metric: 'High SYN Burst', icon: 'Cpu' },
      { step: 3, name: 'Random Forest Analysis', description: 'Classified signature as DOS FLOOD (98% confidence)', metric: '98% Match', icon: 'Brain' },
      { step: 4, name: 'Isolation Forest Analysis', description: 'Severe anomaly distance 0.94 due to packet rate spike', metric: 'Anomaly: 0.94', icon: 'Binary' },
      { step: 5, name: 'Risk Calculated', description: 'Composite Risk Engine determined 96/100 (CRITICAL)', metric: '96 / 100', icon: 'Flame' },
      { step: 6, name: 'Incident Created', description: `Critical incident ${incidentId} logged`, metric: incidentId, icon: 'FileText' },
      { step: 7, name: 'Response Selected', description: 'Emergency edge dropping response triggered', metric: 'BLOCK', icon: 'ShieldBan' },
      { step: 8, name: 'Firewall Rule Simulated', description: `Synthesized rule ${ruleId} to discard traffic from 10.0.0.88`, metric: ruleId, icon: 'ShieldAlert' },
      { step: 9, name: 'SIEM Event Created', description: `Dispatched event ${eventId} to SIEM engine`, metric: eventId, icon: 'Database' },
      { step: 10, name: 'SOC Dashboard Updated', description: 'Dashboard metrics synchronized', metric: 'Synced', icon: 'Layers' }
    ]
  };
}

// 5. Generate Network Anomaly
export function generateAnomaly(): GeneratedSimulationResult {
  const time = getFormattedTime();
  const idNum = Math.floor(1000 + Math.random() * 9000);
  const eventId = `EVT-${idNum}`;
  const sourceIp = '10.0.0.30';
  const destinationIp = '10.0.0.10';
  const incidentId = `INC-00${idNum.toString().slice(-2)}`;

  const networkEvent: NetworkEvent = {
    id: eventId,
    timestamp: time,
    sourceIp,
    destinationIp,
    sourcePort: 58102,
    destinationPort: 443,
    protocol: 'HTTPS',
    packetCount: 412,
    bytes: 452000,
    connectionRate: 32,
    uniquePorts: 1,
    synCount: 12,
    entropy: 0.89,
    status: 'SUSPICIOUS',
    payloadInfo: 'Periodic TLS handshakes (15.2s cadence beacon)'
  };

  const threat: Threat = {
    id: `THR-2026-${idNum}`,
    eventId,
    type: 'Network Anomaly',
    confidence: 82,
    anomalyScore: 0.76,
    riskScore: 64,
    severity: 'MEDIUM',
    sourceIp,
    destinationIp,
    timestamp: time,
    indicators: [
      'Unusual outbound payload byte distribution',
      'Periodic heartbeat beaconing rhythm (~15.2s interval)',
      'Slight deviation from corporate TLS cipher fingerprint',
      'Payload entropy elevated above normal API payloads'
    ],
    explanation: 'Periodic beacon-like TLS handshakes detected by Isolation Forest. Below immediate blocking threshold (64/100); auto-routed to enhanced DPI telemetry monitoring.',
    features: {
      packetCount: 412,
      byteCount: 452000,
      connectionRate: 32,
      uniquePorts: 1,
      synCount: 12,
      entropy: 0.89
    }
  };

  const incident: Incident = {
    id: incidentId,
    threatType: 'Network Anomaly',
    sourceIp,
    destinationIp,
    riskScore: 64,
    severity: 'MEDIUM',
    action: 'MONITOR',
    status: 'ANALYZING',
    timestamp: time,
    summary: 'Periodic TLS heartbeat beaconing detected by Isolation Forest. Auto-routed to deep telemetry monitoring.',
    siemEventId: eventId,
    confidence: 82,
    anomalyScore: 0.76,
    factors: [
      { name: 'Anomaly Score', level: 'MEDIUM', points: 30 },
      { name: 'Entropy Variance', level: 'MEDIUM', points: 20 },
      { name: 'Rhythm Uniformity', level: 'LOW', points: 14 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: time, description: 'Isolation Forest flagged outbound TLS timing pattern', completed: true },
      { stage: 'ANALYZING', timestamp: time, description: 'Correlating with internal asset baseline', completed: true },
      { stage: 'HIGH RISK', timestamp: time, description: 'Score evaluated: 64/100 (MEDIUM RISK)', completed: true },
      { stage: 'CONTAINMENT', timestamp: time, description: 'Policy action: Enhanced DPI Mirroring', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: time, description: 'Non-blocking passive surveillance active', completed: true },
      { stage: 'SIEM LOGGED', timestamp: time, description: 'SIEM audit point registered', completed: true },
      { stage: 'RESOLVED', timestamp: time, description: 'Active monitoring in progress', completed: false }
    ]
  };

  const siemEvent: SIEMEvent = {
    id: eventId,
    timestamp: time,
    eventType: 'TRAFFIC_ANOMALY',
    sourceIp,
    destination: `${destinationIp}:443`,
    threat: 'NETWORK_ANOMALY',
    riskScore: 64,
    severity: 'MEDIUM',
    action: 'MONITOR',
    status: 'INVESTIGATING',
    category: 'Network',
    rawJson: JSON.stringify({
      timestamp: time,
      event: 'TRAFFIC_ANOMALY',
      src: sourceIp,
      dst: `${destinationIp}:443`,
      risk: 64,
      severity: 'MEDIUM',
      action: 'MONITOR',
      model: 'IsolationForest',
      anomaly_index: 0.76
    }, null, 2)
  };

  return {
    scenario: 'Network Traffic Anomaly',
    networkEvent,
    threat,
    incident,
    siemEvent,
    steps: [
      { step: 1, name: 'Traffic Generated', description: 'Periodic outbound TLS session at 15.2s interval', metric: '32 req/sec', icon: 'Radio' },
      { step: 2, name: 'Features Extracted', description: 'Extracted vector: [412, 452000, 32, 1, 12, 0.89]', metric: 'Entropy: 0.89', icon: 'Cpu' },
      { step: 3, name: 'Random Forest Analysis', description: 'Random forest detected slight beaconing similarity', metric: '82% Confidence', icon: 'Brain' },
      { step: 4, name: 'Isolation Forest Analysis', description: 'Isolation Forest flagged anomaly score 0.76', metric: 'Score: 0.76', icon: 'Binary' },
      { step: 5, name: 'Risk Calculated', description: 'Risk Engine assigned 64/100 (MEDIUM RISK)', metric: '64 / 100', icon: 'Flame' },
      { step: 6, name: 'Incident Created', description: `Incident ${incidentId} created for analyst review`, metric: incidentId, icon: 'FileText' },
      { step: 7, name: 'Response Selected', description: 'Selected policy: MONITOR with deep telemetry', metric: 'MONITOR', icon: 'ShieldCheck' },
      { step: 8, name: 'Firewall Rule Simulated', description: 'Applied passive packet inspection mirror', metric: 'MONITOR Rule', icon: 'Shield' },
      { step: 9, name: 'SIEM Event Created', description: `Logged anomaly event ${eventId} in SIEM`, metric: eventId, icon: 'Database' },
      { step: 10, name: 'SOC Dashboard Updated', description: 'Updated monitored connections counter', metric: 'Synced', icon: 'Layers' }
    ]
  };
}

// 6. Generate Suspicious Connection
export function generateSuspiciousConnection(): GeneratedSimulationResult {
  const time = getFormattedTime();
  const idNum = Math.floor(1000 + Math.random() * 9000);
  const eventId = `EVT-${idNum}`;
  const sourceIp = '10.0.0.57';
  const destinationIp = '10.0.0.15';
  const incidentId = `INC-00${idNum.toString().slice(-2)}`;

  const networkEvent: NetworkEvent = {
    id: eventId,
    timestamp: time,
    sourceIp,
    destinationIp,
    sourcePort: 51200,
    destinationPort: 443,
    protocol: 'HTTPS',
    packetCount: 56,
    bytes: 7800,
    connectionRate: 14,
    uniquePorts: 1,
    synCount: 4,
    entropy: 0.62,
    status: 'SUSPICIOUS',
    payloadInfo: 'Unusual payload byte distribution on internal socket'
  };

  const threat: Threat = {
    id: `THR-2026-${idNum}`,
    eventId,
    type: 'Suspicious Connection',
    confidence: 76,
    anomalyScore: 0.62,
    riskScore: 48,
    severity: 'MEDIUM',
    sourceIp,
    destinationIp,
    timestamp: time,
    indicators: [
      'Non-standard TLS cipher suite requested',
      'Asymmetric egress/ingress ratio',
      'Slight deviation from internal host baseline'
    ],
    explanation: 'Connection flagged for active DPI inspection due to slight heuristic variance.',
    features: {
      packetCount: 56,
      byteCount: 7800,
      connectionRate: 14,
      uniquePorts: 1,
      synCount: 4,
      entropy: 0.62
    }
  };

  const incident: Incident = {
    id: incidentId,
    threatType: 'Suspicious Connection',
    sourceIp,
    destinationIp,
    riskScore: 48,
    severity: 'MEDIUM',
    action: 'MONITOR',
    status: 'ANALYZING',
    timestamp: time,
    summary: 'Unusual payload byte distribution on internal port 443. Traffic monitored via active telemetry.',
    siemEventId: eventId,
    confidence: 76,
    anomalyScore: 0.62,
    factors: [
      { name: 'Entropy Variance', level: 'MEDIUM', points: 24 },
      { name: 'Non-Standard TLS Cipher', level: 'LOW', points: 14 },
      { name: 'Baseline Deviation', level: 'LOW', points: 10 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: time, description: 'Internal socket variance detected', completed: true },
      { stage: 'ANALYZING', timestamp: time, description: 'Feature vector analyzed by ML engine', completed: true },
      { stage: 'HIGH RISK', timestamp: time, description: 'Risk: 48/100 (MEDIUM)', completed: true },
      { stage: 'CONTAINMENT', timestamp: time, description: 'Passive DPI inspection assigned', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: time, description: 'Traffic permitted with telemetry logging', completed: true },
      { stage: 'SIEM LOGGED', timestamp: time, description: `SIEM event ${eventId} logged`, completed: true },
      { stage: 'RESOLVED', timestamp: time, description: 'Under observation', completed: false }
    ]
  };

  const siemEvent: SIEMEvent = {
    id: eventId,
    timestamp: time,
    eventType: 'SUSPICIOUS_CONN',
    sourceIp,
    destination: `${destinationIp}:443`,
    threat: 'CIPHER_VARIANCE',
    riskScore: 48,
    severity: 'MEDIUM',
    action: 'MONITOR',
    status: 'INVESTIGATING',
    category: 'Network',
    rawJson: JSON.stringify({
      timestamp: time,
      event: 'SUSPICIOUS_CONN',
      src: sourceIp,
      dst: `${destinationIp}:443`,
      risk: 48,
      severity: 'MEDIUM',
      action: 'MONITOR'
    }, null, 2)
  };

  return {
    scenario: 'Suspicious Cipher Connection',
    networkEvent,
    threat,
    incident,
    siemEvent,
    steps: [
      { step: 1, name: 'Traffic Generated', description: 'Internal host connection initiated on port 443', metric: '14 req/sec', icon: 'Radio' },
      { step: 2, name: 'Features Extracted', description: 'Vector: [56, 7800, 14, 1, 4, 0.62]', metric: 'Entropy: 0.62', icon: 'Cpu' },
      { step: 3, name: 'Random Forest Analysis', description: 'Evaluated cipher pattern', metric: '76% Match', icon: 'Brain' },
      { step: 4, name: 'Isolation Forest Analysis', description: 'Anomaly score 0.62 above baseline', metric: 'Score: 0.62', icon: 'Binary' },
      { step: 5, name: 'Risk Calculated', description: 'Composite score: 48/100 (MEDIUM RISK)', metric: '48 / 100', icon: 'Flame' },
      { step: 6, name: 'Incident Created', description: `Incident ${incidentId} created`, metric: incidentId, icon: 'FileText' },
      { step: 7, name: 'Response Selected', description: 'Action: MONITOR connection', metric: 'MONITOR', icon: 'ShieldCheck' },
      { step: 8, name: 'Firewall Rule Simulated', description: 'Monitoring filter applied', metric: 'MON-Filter', icon: 'Shield' },
      { step: 9, name: 'SIEM Event Created', description: `SIEM logged event ${eventId}`, metric: eventId, icon: 'Database' },
      { step: 10, name: 'SOC Dashboard Updated', description: 'Dashboard stats updated', metric: 'Synced', icon: 'Layers' }
    ]
  };
}

// Unified random live event generator with realistic proportions:
// 70% Normal, 15% Monitor, 10% High, 5% Critical
export function generateRandomLiveEvent(): GeneratedSimulationResult {
  const rand = Math.random();
  if (rand < 0.70) {
    return generateNormalTraffic();
  } else if (rand < 0.85) {
    return Math.random() > 0.5 ? generateAnomaly() : generateSuspiciousConnection();
  } else if (rand < 0.95) {
    return generateBruteForce();
  } else {
    return Math.random() > 0.5 ? generatePortScan() : generateDoS();
  }
}
