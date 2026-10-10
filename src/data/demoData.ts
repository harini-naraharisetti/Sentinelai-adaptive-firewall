import { NetworkEvent, Threat, Incident, FirewallRule, SIEMEvent } from '../types/security';

// 30+ Realistic Simulated Network Events
export const INITIAL_NETWORK_EVENTS: NetworkEvent[] = [
  { id: 'EVT-1042', timestamp: '21:05:32', sourceIp: '10.0.0.25', destinationIp: '10.0.0.10', sourcePort: 52144, destinationPort: 22, protocol: 'TCP', packetCount: 842, bytes: 120420, connectionRate: 92, uniquePorts: 38, synCount: 720, entropy: 0.82, status: 'BLOCKED', payloadInfo: '[SYN] Probe sequence across 38 ports' },
  { id: 'EVT-1041', timestamp: '21:05:28', sourceIp: '10.0.0.42', destinationIp: '10.0.0.15', sourcePort: 48920, destinationPort: 22, protocol: 'TCP', packetCount: 1240, bytes: 184500, connectionRate: 140, uniquePorts: 1, synCount: 140, entropy: 0.74, status: 'BLOCKED', payloadInfo: 'SSH-2.0-OpenSSH_8.2 credential dictionary auth flood' },
  { id: 'EVT-1040', timestamp: '21:05:21', sourceIp: '10.0.0.30', destinationIp: '10.0.0.10', sourcePort: 58102, destinationPort: 443, protocol: 'HTTPS', packetCount: 412, bytes: 452000, connectionRate: 32, uniquePorts: 1, synCount: 12, entropy: 0.89, status: 'SUSPICIOUS', payloadInfo: 'Periodic TLS handshakes (15.2s cadence beacon)' },
  { id: 'EVT-1039', timestamp: '21:05:14', sourceIp: '10.0.0.88', destinationIp: '10.0.0.10', sourcePort: 61002, destinationPort: 80, protocol: 'TCP', packetCount: 14800, bytes: 2450000, connectionRate: 920, uniquePorts: 1, synCount: 8900, entropy: 0.28, status: 'BLOCKED', payloadInfo: 'Volumetric HTTP GET flood exhausting worker pool' },
  { id: 'EVT-1038', timestamp: '21:05:08', sourceIp: '10.0.0.50', destinationIp: '10.0.0.1', sourcePort: 54120, destinationPort: 443, protocol: 'HTTPS', packetCount: 14, bytes: 1820, connectionRate: 2, uniquePorts: 1, synCount: 2, entropy: 0.78, status: 'BLOCKED', payloadInfo: 'DNS query to phishing host secure-login.fake-auth.xyz' },
  { id: 'EVT-1037', timestamp: '21:05:01', sourceIp: '10.0.0.14', destinationIp: '10.0.0.10', sourcePort: 44102, destinationPort: 443, protocol: 'HTTPS', packetCount: 24, bytes: 3420, connectionRate: 8, uniquePorts: 1, synCount: 2, entropy: 0.42, status: 'NORMAL', payloadInfo: 'Standard authenticated mTLS REST query' },
  { id: 'EVT-1036', timestamp: '21:04:55', sourceIp: '10.0.0.18', destinationIp: '10.0.0.10', sourcePort: 49200, destinationPort: 53, protocol: 'DNS', packetCount: 8, bytes: 890, connectionRate: 3, uniquePorts: 1, synCount: 0, entropy: 0.35, status: 'NORMAL', payloadInfo: 'DNS resolution for api.internal.cloud' },
  { id: 'EVT-1035', timestamp: '21:04:48', sourceIp: '10.0.0.57', destinationIp: '10.0.0.15', sourcePort: 51200, destinationPort: 443, protocol: 'HTTPS', packetCount: 56, bytes: 7800, connectionRate: 14, uniquePorts: 1, synCount: 4, entropy: 0.62, status: 'SUSPICIOUS', payloadInfo: 'Unusual payload byte distribution on internal socket' },
  { id: 'EVT-1034', timestamp: '21:04:40', sourceIp: '10.0.0.12', destinationIp: '10.0.0.10', sourcePort: 42100, destinationPort: 443, protocol: 'HTTPS', packetCount: 18, bytes: 2100, connectionRate: 4, uniquePorts: 1, synCount: 2, entropy: 0.38, status: 'NORMAL', payloadInfo: 'Valid microservice telemetry pulse' },
  { id: 'EVT-1033', timestamp: '21:04:32', sourceIp: '10.0.0.81', destinationIp: '10.0.0.10', sourcePort: 56700, destinationPort: 3306, protocol: 'TCP', packetCount: 620, bytes: 89000, connectionRate: 84, uniquePorts: 1, synCount: 510, entropy: 0.71, status: 'BLOCKED', payloadInfo: 'Database port bruteforce attempt on MySQL port' },
  { id: 'EVT-1032', timestamp: '21:04:25', sourceIp: '10.0.0.19', destinationIp: '10.0.0.10', sourcePort: 48110, destinationPort: 443, protocol: 'HTTPS', packetCount: 32, bytes: 4800, connectionRate: 6, uniquePorts: 1, synCount: 2, entropy: 0.44, status: 'NORMAL', payloadInfo: 'OAuth token refresh query' },
  { id: 'EVT-1031', timestamp: '21:04:18', sourceIp: '10.0.0.65', destinationIp: '10.0.0.2', sourcePort: 43200, destinationPort: 53, protocol: 'DNS', packetCount: 28, bytes: 3420, connectionRate: 8, uniquePorts: 1, synCount: 0, entropy: 0.49, status: 'NORMAL', payloadInfo: 'Internal PTR record lookup' },
  { id: 'EVT-1030', timestamp: '21:04:10', sourceIp: '10.0.0.25', destinationIp: '10.0.0.10', sourcePort: 52140, destinationPort: 8080, protocol: 'TCP', packetCount: 340, bytes: 48000, connectionRate: 78, uniquePorts: 12, synCount: 310, entropy: 0.81, status: 'BLOCKED', payloadInfo: 'Web application admin endpoint scan' },
  { id: 'EVT-1029', timestamp: '21:04:02', sourceIp: '10.0.0.11', destinationIp: '10.0.0.10', sourcePort: 38900, destinationPort: 443, protocol: 'HTTPS', packetCount: 16, bytes: 1950, connectionRate: 3, uniquePorts: 1, synCount: 2, entropy: 0.36, status: 'NORMAL', payloadInfo: 'Kubernetes ingress health check probe' },
  { id: 'EVT-1028', timestamp: '21:03:54', sourceIp: '10.0.0.99', destinationIp: '10.0.0.15', sourcePort: 59100, destinationPort: 445, protocol: 'TCP', packetCount: 420, bytes: 64000, connectionRate: 62, uniquePorts: 2, synCount: 380, entropy: 0.69, status: 'BLOCKED', payloadInfo: 'SMB protocol probe (EternalBlue signature trait)' },
  { id: 'EVT-1027', timestamp: '21:03:45', sourceIp: '10.0.0.13', destinationIp: '10.0.0.10', sourcePort: 41200, destinationPort: 443, protocol: 'HTTPS', packetCount: 22, bytes: 2900, connectionRate: 5, uniquePorts: 1, synCount: 2, entropy: 0.41, status: 'NORMAL', payloadInfo: 'Standard REST telemetry point' },
  { id: 'EVT-1026', timestamp: '21:03:38', sourceIp: '10.0.0.42', destinationIp: '10.0.0.15', sourcePort: 48918, destinationPort: 22, protocol: 'TCP', packetCount: 890, bytes: 132000, connectionRate: 110, uniquePorts: 1, synCount: 95, entropy: 0.72, status: 'BLOCKED', payloadInfo: 'Repeated authentication teardowns' },
  { id: 'EVT-1025', timestamp: '21:03:30', sourceIp: '10.0.0.21', destinationIp: '10.0.0.10', sourcePort: 47800, destinationPort: 443, protocol: 'HTTPS', packetCount: 19, bytes: 2400, connectionRate: 4, uniquePorts: 1, synCount: 2, entropy: 0.39, status: 'NORMAL', payloadInfo: 'Configuration pull request' },
  { id: 'EVT-1024', timestamp: '21:03:22', sourceIp: '10.0.0.30', destinationIp: '10.0.0.10', sourcePort: 58098, destinationPort: 443, protocol: 'HTTPS', packetCount: 380, bytes: 410000, connectionRate: 28, uniquePorts: 1, synCount: 8, entropy: 0.88, status: 'SUSPICIOUS', payloadInfo: 'C2 heartbeat interval repetition' },
  { id: 'EVT-1023', timestamp: '21:03:15', sourceIp: '10.0.0.16', destinationIp: '10.0.0.10', sourcePort: 46200, destinationPort: 443, protocol: 'HTTPS', packetCount: 26, bytes: 3100, connectionRate: 6, uniquePorts: 1, synCount: 2, entropy: 0.43, status: 'NORMAL', payloadInfo: 'User session verification' },
  { id: 'EVT-1022', timestamp: '21:03:07', sourceIp: '10.0.0.88', destinationIp: '10.0.0.10', sourcePort: 60998, destinationPort: 80, protocol: 'TCP', packetCount: 8900, bytes: 1420000, connectionRate: 740, uniquePorts: 1, synCount: 6200, entropy: 0.29, status: 'BLOCKED', payloadInfo: 'TCP SYN flood traffic stream' },
  { id: 'EVT-1021', timestamp: '21:02:59', sourceIp: '10.0.0.14', destinationIp: '10.0.0.10', sourcePort: 44098, destinationPort: 443, protocol: 'HTTPS', packetCount: 15, bytes: 1800, connectionRate: 3, uniquePorts: 1, synCount: 2, entropy: 0.37, status: 'NORMAL', payloadInfo: 'Audit log forwarder sync' },
  { id: 'EVT-1020', timestamp: '21:02:51', sourceIp: '10.0.0.50', destinationIp: '10.0.0.1', sourcePort: 54115, destinationPort: 443, protocol: 'HTTPS', packetCount: 12, bytes: 1450, connectionRate: 2, uniquePorts: 1, synCount: 2, entropy: 0.77, status: 'BLOCKED', payloadInfo: 'Malicious domain egress blocked' },
  { id: 'EVT-1019', timestamp: '21:02:44', sourceIp: '10.0.0.17', destinationIp: '10.0.0.10', sourcePort: 45600, destinationPort: 443, protocol: 'HTTPS', packetCount: 21, bytes: 2700, connectionRate: 5, uniquePorts: 1, synCount: 2, entropy: 0.40, status: 'NORMAL', payloadInfo: 'Standard application telemetry' },
  { id: 'EVT-1018', timestamp: '21:02:36', sourceIp: '10.0.0.73', destinationIp: '10.0.0.10', sourcePort: 53100, destinationPort: 21, protocol: 'TCP', packetCount: 280, bytes: 34000, connectionRate: 48, uniquePorts: 1, synCount: 240, entropy: 0.65, status: 'SUSPICIOUS', payloadInfo: 'Unauthenticated FTP control connection' },
  { id: 'EVT-1017', timestamp: '21:02:28', sourceIp: '10.0.0.10', destinationIp: '10.0.0.2', sourcePort: 42300, destinationPort: 53, protocol: 'DNS', packetCount: 6, bytes: 720, connectionRate: 2, uniquePorts: 1, synCount: 0, entropy: 0.33, status: 'NORMAL', payloadInfo: 'Internal gateway name resolution' },
  { id: 'EVT-1016', timestamp: '21:02:20', sourceIp: '10.0.0.25', destinationIp: '10.0.0.10', sourcePort: 52136, destinationPort: 443, protocol: 'TCP', packetCount: 410, bytes: 58000, connectionRate: 82, uniquePorts: 18, synCount: 380, entropy: 0.83, status: 'BLOCKED', payloadInfo: 'Sequential TCP port scan' },
  { id: 'EVT-1015', timestamp: '21:02:12', sourceIp: '10.0.0.22', destinationIp: '10.0.0.10', sourcePort: 48900, destinationPort: 443, protocol: 'HTTPS', packetCount: 25, bytes: 3200, connectionRate: 5, uniquePorts: 1, synCount: 2, entropy: 0.42, status: 'NORMAL', payloadInfo: 'REST API JSON payload query' },
  { id: 'EVT-1014', timestamp: '21:02:05', sourceIp: '10.0.0.42', destinationIp: '10.0.0.15', sourcePort: 48912, destinationPort: 22, protocol: 'TCP', packetCount: 620, bytes: 94000, connectionRate: 98, uniquePorts: 1, synCount: 78, entropy: 0.70, status: 'BLOCKED', payloadInfo: 'Failed credential attempt burst' },
  { id: 'EVT-1013', timestamp: '21:01:58', sourceIp: '10.0.0.15', destinationIp: '10.0.0.10', sourcePort: 41900, destinationPort: 443, protocol: 'HTTPS', packetCount: 17, bytes: 2150, connectionRate: 4, uniquePorts: 1, synCount: 2, entropy: 0.38, status: 'NORMAL', payloadInfo: 'Heartbeat ping response' },
];

// 12 Realistic Simulated Threats
export const INITIAL_THREATS: Threat[] = [
  {
    id: 'THR-2026-00142',
    eventId: 'EVT-1042',
    type: 'Port Scan',
    confidence: 94,
    anomalyScore: 0.87,
    riskScore: 91,
    severity: 'CRITICAL',
    sourceIp: '10.0.0.25',
    destinationIp: '10.0.0.10',
    timestamp: '21:05:32',
    indicators: [
      'High connection frequency (>400 req/sec)',
      'Sequential probe on 38 distinct destination ports',
      'Abnormal TCP SYN-without-ACK pattern',
      'Unusual packet rate violating baseline threshold',
      'Behavior differs significantly from historical baseline'
    ],
    explanation: 'Traffic behavior significantly differs from normal baseline cluster and strongly resembles a multi-port reconnaissance probe pattern (Random Forest Tree #14 and Isolation Forest Anomaly Index 0.87).',
    features: { packetCount: 842, byteCount: 120420, connectionRate: 92, uniquePorts: 38, synCount: 720, entropy: 0.82 }
  },
  {
    id: 'THR-2026-00141',
    eventId: 'EVT-1041',
    type: 'Brute Force',
    confidence: 91,
    anomalyScore: 0.84,
    riskScore: 87,
    severity: 'HIGH',
    sourceIp: '10.0.0.42',
    destinationIp: '10.0.0.15',
    timestamp: '21:05:28',
    indicators: [
      'High failed authentication rate (140 attempts/min)',
      'Known dictionary-based SSH username permutations',
      'Repetitive key-exchange teardowns',
      'Exceeds threshold for single-source auth frequency'
    ],
    explanation: 'Rapid succession of authentication handshakes matching credential-stuffing signature profile. Adaptive policy applied immediate source quarantine.',
    features: { packetCount: 1240, byteCount: 184500, connectionRate: 140, uniquePorts: 1, synCount: 140, entropy: 0.74 }
  },
  {
    id: 'THR-2026-00140',
    eventId: 'EVT-1040',
    type: 'Network Anomaly',
    confidence: 82,
    anomalyScore: 0.76,
    riskScore: 64,
    severity: 'MEDIUM',
    sourceIp: '10.0.0.30',
    destinationIp: '10.0.0.10',
    timestamp: '21:05:21',
    indicators: [
      'Unusual outbound payload byte distribution',
      'Periodic heartbeat beaconing rhythm (~15.2s interval)',
      'Slight deviation from corporate TLS cipher fingerprint',
      'Payload entropy elevated above normal API payloads'
    ],
    explanation: 'Periodic beacon-like TLS handshakes detected by Isolation Forest. Below immediate blocking threshold (64/100); auto-routed to enhanced DPI telemetry monitoring.',
    features: { packetCount: 412, byteCount: 452000, connectionRate: 32, uniquePorts: 1, synCount: 12, entropy: 0.89 }
  },
  {
    id: 'THR-2026-00139',
    eventId: 'EVT-1039',
    type: 'DoS-like Traffic',
    confidence: 98,
    anomalyScore: 0.94,
    riskScore: 96,
    severity: 'CRITICAL',
    sourceIp: '10.0.0.88',
    destinationIp: '10.0.0.10',
    timestamp: '21:05:14',
    indicators: [
      'Volumetric HTTP GET flood exceeding 8,500 req/sec',
      'Asymmetric bandwidth consumption',
      'Incomplete HTTP request headers (Slowloris trait)',
      'TCP connection exhaustion vector'
    ],
    explanation: 'Classifier detected volumetric connection flood overwhelming web application worker pool. Adaptive firewall dropped connection at ingress edge.',
    features: { packetCount: 14800, byteCount: 2450000, connectionRate: 920, uniquePorts: 1, synCount: 8900, entropy: 0.28 }
  },
  {
    id: 'THR-2026-00138',
    eventId: 'EVT-1038',
    type: 'Malicious URL',
    confidence: 92,
    anomalyScore: 0.88,
    riskScore: 88,
    severity: 'HIGH',
    sourceIp: '10.0.0.50',
    destinationIp: '10.0.0.1',
    timestamp: '21:05:08',
    indicators: [
      'Target URL contains homograph typo-squatting',
      'High subdomain depth with credential keyword tokens',
      'Newly registered dynamic DNS endpoint structure',
      'Heuristic analyzer detected phishing payload pattern'
    ],
    explanation: 'URL Heuristic analysis triggered 4 high-risk flags. Automated rule synthesized to restrict internal egress to destination host.',
    features: { packetCount: 14, byteCount: 1820, connectionRate: 2, uniquePorts: 1, synCount: 2, entropy: 0.78 }
  },
  {
    id: 'THR-2026-00137',
    eventId: 'EVT-1035',
    type: 'Suspicious Connection',
    confidence: 76,
    anomalyScore: 0.62,
    riskScore: 48,
    severity: 'MEDIUM',
    sourceIp: '10.0.0.57',
    destinationIp: '10.0.0.15',
    timestamp: '21:04:48',
    indicators: [
      'Non-standard TLS cipher suite requested',
      'Asymmetric egress/ingress ratio',
      'Slight deviation from internal host baseline'
    ],
    explanation: 'Connection flagged for active DPI inspection due to slight heuristic variance.',
    features: { packetCount: 56, byteCount: 7800, connectionRate: 14, uniquePorts: 1, synCount: 4, entropy: 0.62 }
  },
  {
    id: 'THR-2026-00136',
    eventId: 'EVT-1033',
    type: 'Brute Force',
    confidence: 89,
    anomalyScore: 0.81,
    riskScore: 85,
    severity: 'HIGH',
    sourceIp: '10.0.0.81',
    destinationIp: '10.0.0.10',
    timestamp: '21:04:32',
    indicators: [
      'Rapid MySQL authentication failure loop on port 3306',
      'Database dictionary guessing signature',
      'Connection reset rate exceeds threshold'
    ],
    explanation: 'Automated database credential attack detected and dropped.',
    features: { packetCount: 620, byteCount: 89000, connectionRate: 84, uniquePorts: 1, synCount: 510, entropy: 0.71 }
  },
  {
    id: 'THR-2026-00135',
    eventId: 'EVT-1030',
    type: 'Port Scan',
    confidence: 93,
    anomalyScore: 0.86,
    riskScore: 89,
    severity: 'HIGH',
    sourceIp: '10.0.0.25',
    destinationIp: '10.0.0.10',
    timestamp: '21:04:10',
    indicators: [
      'Targeted web proxy scan across alternate HTTP ports (8080, 8443, 8000)',
      'High SYN packet ratio'
    ],
    explanation: 'Reconnaissance sweep targeted secondary application ports.',
    features: { packetCount: 340, byteCount: 48000, connectionRate: 78, uniquePorts: 12, synCount: 310, entropy: 0.81 }
  },
  {
    id: 'THR-2026-00134',
    eventId: 'EVT-1028',
    type: 'Network Anomaly',
    confidence: 88,
    anomalyScore: 0.83,
    riskScore: 82,
    severity: 'HIGH',
    sourceIp: '10.0.0.99',
    destinationIp: '10.0.0.15',
    timestamp: '21:03:54',
    indicators: [
      'SMB Port 445 probe matching EternalBlue signature',
      'Unusual named pipe buffer allocation'
    ],
    explanation: 'Exploit probe on legacy file sharing protocol blocked.',
    features: { packetCount: 420, byteCount: 64000, connectionRate: 62, uniquePorts: 2, synCount: 380, entropy: 0.69 }
  },
  {
    id: 'THR-2026-00133',
    eventId: 'EVT-1018',
    type: 'Suspicious Connection',
    confidence: 74,
    anomalyScore: 0.58,
    riskScore: 42,
    severity: 'MEDIUM',
    sourceIp: '10.0.0.73',
    destinationIp: '10.0.0.10',
    timestamp: '21:02:36',
    indicators: [
      'Unencrypted FTP control attempt on port 21',
      'Source not in approved file transfer whitelist'
    ],
    explanation: 'Unencrypted protocol use flagged for active SOC observation.',
    features: { packetCount: 280, byteCount: 34000, connectionRate: 48, uniquePorts: 1, synCount: 240, entropy: 0.65 }
  },
  {
    id: 'THR-2026-00132',
    eventId: 'EVT-1016',
    type: 'Port Scan',
    confidence: 95,
    anomalyScore: 0.89,
    riskScore: 92,
    severity: 'CRITICAL',
    sourceIp: '10.0.0.25',
    destinationIp: '10.0.0.10',
    timestamp: '21:02:20',
    indicators: [
      'High-speed multi-vector socket exploration',
      'Port dispersion across 18 endpoints'
    ],
    explanation: 'Comprehensive reconnaissance probe dropped by adaptive rule AUTO-0042.',
    features: { packetCount: 410, byteCount: 58000, connectionRate: 82, uniquePorts: 18, synCount: 380, entropy: 0.83 }
  },
  {
    id: 'THR-2026-00131',
    eventId: 'EVT-1014',
    type: 'Brute Force',
    confidence: 90,
    anomalyScore: 0.80,
    riskScore: 84,
    severity: 'HIGH',
    sourceIp: '10.0.0.42',
    destinationIp: '10.0.0.15',
    timestamp: '21:02:05',
    indicators: [
      'Repetitive SSH authentication handshake failure bursts'
    ],
    explanation: 'Credential guessing attack quarantined.',
    features: { packetCount: 620, byteCount: 94000, connectionRate: 98, uniquePorts: 1, synCount: 78, entropy: 0.70 }
  }
];

// 6 Realistic Simulated Incidents
export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-0042',
    threatType: 'Port Scan',
    sourceIp: '10.0.0.25',
    destinationIp: '10.0.0.10',
    riskScore: 91,
    severity: 'CRITICAL',
    action: 'BLOCK',
    status: 'CONTAINED',
    timestamp: '21:05:32',
    summary: 'Source 10.0.0.25 executed rapid multi-port TCP reconnaissance sweep across 38 sockets. Adaptive firewall synthesized rule AUTO-0042 to drop all incoming packets.',
    ruleId: 'AUTO-0042',
    siemEventId: 'EVT-1042',
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
      { stage: 'DETECTED', timestamp: '21:05:30', description: 'Inbound packet burst detected on edge interface', completed: true },
      { stage: 'ANALYZING', timestamp: '21:05:31', description: 'Random Forest (94%) & Isolation Forest (0.87) classified threat', completed: true },
      { stage: 'HIGH RISK', timestamp: '21:05:31', description: 'Risk Engine calculated composite score 91/100 (CRITICAL)', completed: true },
      { stage: 'CONTAINMENT', timestamp: '21:05:32', description: 'Applied adaptive isolation policy', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: '21:05:32', description: 'Firewall Rule AUTO-0042 synthesized to DROP traffic', completed: true },
      { stage: 'SIEM LOGGED', timestamp: '21:05:32', description: 'Incident EVT-1042 dispatched to SIEM stream', completed: true },
      { stage: 'RESOLVED', timestamp: '21:10:00', description: 'Pending analyst sign-off and root cause review', completed: false }
    ]
  },
  {
    id: 'INC-0041',
    threatType: 'Brute Force',
    sourceIp: '10.0.0.42',
    destinationIp: '10.0.0.15',
    riskScore: 87,
    severity: 'HIGH',
    action: 'BLOCK',
    status: 'CONTAINED',
    timestamp: '21:05:28',
    summary: '140 failed SSH authentication attempts/minute on port 22. Source quarantined by adaptive rule AUTO-0039.',
    ruleId: 'AUTO-0039',
    siemEventId: 'EVT-1041',
    confidence: 91,
    anomalyScore: 0.84,
    factors: [
      { name: 'Threat Classification', level: 'HIGH', points: 42 },
      { name: 'Failed Auth Rate', level: 'HIGH', points: 25 },
      { name: 'Connection Velocity', level: 'MEDIUM', points: 12 },
      { name: 'Target Service Sensitivity', level: 'HIGH', points: 8 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: '21:05:25', description: 'SSH failed auth threshold breached (140 req/min)', completed: true },
      { stage: 'ANALYZING', timestamp: '21:05:26', description: 'Classified as Dictionary Brute Force attack', completed: true },
      { stage: 'HIGH RISK', timestamp: '21:05:27', description: 'Composite Risk scored at 87/100', completed: true },
      { stage: 'CONTAINMENT', timestamp: '21:05:28', description: 'Adaptive rule AUTO-0039 applied to drop port 22', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: '21:05:28', description: 'Quarantined source IP 10.0.0.42', completed: true },
      { stage: 'SIEM LOGGED', timestamp: '21:05:28', description: 'SIEM event EVT-1041 logged', completed: true },
      { stage: 'RESOLVED', timestamp: '21:15:00', description: 'Host verification complete', completed: false }
    ]
  },
  {
    id: 'INC-0040',
    threatType: 'Network Anomaly',
    sourceIp: '10.0.0.30',
    destinationIp: '10.0.0.10',
    riskScore: 64,
    severity: 'MEDIUM',
    action: 'MONITOR',
    status: 'ANALYZING',
    timestamp: '21:05:21',
    summary: 'Periodic TLS heartbeat beaconing detected by Isolation Forest. Auto-routed to deep telemetry monitoring.',
    siemEventId: 'EVT-1040',
    confidence: 82,
    anomalyScore: 0.76,
    factors: [
      { name: 'Anomaly Score', level: 'MEDIUM', points: 30 },
      { name: 'Entropy Variance', level: 'MEDIUM', points: 20 },
      { name: 'Rhythm Uniformity', level: 'LOW', points: 14 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: '21:05:18', description: 'Isolation Forest flagged outbound TLS timing pattern', completed: true },
      { stage: 'ANALYZING', timestamp: '21:05:20', description: 'Correlating with internal asset baseline', completed: true },
      { stage: 'HIGH RISK', timestamp: '21:05:21', description: 'Score evaluated: 64/100 (MEDIUM RISK)', completed: true },
      { stage: 'CONTAINMENT', timestamp: '21:05:21', description: 'Policy action: Enhanced DPI Mirroring', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: '21:05:21', description: 'Non-blocking passive surveillance active', completed: true },
      { stage: 'SIEM LOGGED', timestamp: '21:05:21', description: 'SIEM audit point registered', completed: true },
      { stage: 'RESOLVED', timestamp: '21:20:00', description: 'In progress', completed: false }
    ]
  },
  {
    id: 'INC-0039',
    threatType: 'DoS-like Traffic',
    sourceIp: '10.0.0.88',
    destinationIp: '10.0.0.10',
    riskScore: 96,
    severity: 'CRITICAL',
    action: 'BLOCK',
    status: 'CONTAINED',
    timestamp: '21:05:14',
    summary: 'Volumetric rate-limiter triggered by 8,500 req/sec HTTP GET flood. Ingress dropped at edge router.',
    ruleId: 'AUTO-0028',
    siemEventId: 'EVT-1039',
    confidence: 98,
    anomalyScore: 0.94,
    factors: [
      { name: 'Bandwidth Asymmetry', level: 'HIGH', points: 50 },
      { name: 'Connection Velocity', level: 'HIGH', points: 30 },
      { name: 'Header Incompleteness', level: 'HIGH', points: 16 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: '21:05:10', description: 'Volumetric ingress flood detected', completed: true },
      { stage: 'ANALYZING', timestamp: '21:05:12', description: 'Slowloris / HTTP exhaustion vector classified', completed: true },
      { stage: 'HIGH RISK', timestamp: '21:05:13', description: 'Risk: 96/100 (CRITICAL)', completed: true },
      { stage: 'CONTAINMENT', timestamp: '21:05:14', description: 'Dynamic rate limit dropped source', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: '21:05:14', description: 'Rule AUTO-0028 synthesized', completed: true },
      { stage: 'SIEM LOGGED', timestamp: '21:05:14', description: 'Logged to SIEM queue', completed: true },
      { stage: 'RESOLVED', timestamp: '21:06:00', description: 'Mitigated at ingress edge', completed: true }
    ]
  },
  {
    id: 'INC-0038',
    threatType: 'Malicious URL',
    sourceIp: '10.0.0.50',
    destinationIp: '10.0.0.1',
    riskScore: 88,
    severity: 'HIGH',
    action: 'BLOCK',
    status: 'CONTAINED',
    timestamp: '21:05:08',
    summary: 'Phishing domain heuristic trigger on internal host DNS egress. Destination blocked.',
    ruleId: 'AUTO-0019',
    siemEventId: 'EVT-1038',
    confidence: 92,
    anomalyScore: 0.88,
    factors: [
      { name: 'Phishing Keywords', level: 'HIGH', points: 40 },
      { name: 'Subdomain Depth', level: 'HIGH', points: 25 },
      { name: 'TLD Risk', level: 'HIGH', points: 23 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: '21:05:05', description: 'Outbound DNS resolution requested to fake-auth.xyz', completed: true },
      { stage: 'ANALYZING', timestamp: '21:05:06', description: 'Heuristic analyzer detected 4 critical phishing flags', completed: true },
      { stage: 'HIGH RISK', timestamp: '21:05:07', description: 'Risk scored at 88/100', completed: true },
      { stage: 'CONTAINMENT', timestamp: '21:05:08', description: 'Egress filter AUTO-0019 applied', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: '21:05:08', description: 'Egress dropped', completed: true },
      { stage: 'SIEM LOGGED', timestamp: '21:05:08', description: 'SIEM incident created', completed: true },
      { stage: 'RESOLVED', timestamp: '21:10:00', description: 'Host isolated from endpoint manager', completed: false }
    ]
  },
  {
    id: 'INC-0037',
    threatType: 'Suspicious Connection',
    sourceIp: '10.0.0.57',
    destinationIp: '10.0.0.15',
    riskScore: 48,
    severity: 'MEDIUM',
    action: 'MONITOR',
    status: 'ANALYZING',
    timestamp: '21:04:48',
    summary: 'Unusual payload byte distribution on internal port 443. Traffic monitored via active telemetry.',
    siemEventId: 'EVT-1035',
    confidence: 76,
    anomalyScore: 0.62,
    factors: [
      { name: 'Entropy Variance', level: 'MEDIUM', points: 24 },
      { name: 'Non-Standard TLS Cipher', level: 'LOW', points: 14 },
      { name: 'Baseline Deviation', level: 'LOW', points: 10 }
    ],
    timeline: [
      { stage: 'DETECTED', timestamp: '21:04:45', description: 'Internal socket variance detected', completed: true },
      { stage: 'ANALYZING', timestamp: '21:04:46', description: 'Feature vector analyzed by ML engine', completed: true },
      { stage: 'HIGH RISK', timestamp: '21:04:47', description: 'Risk: 48/100 (MEDIUM)', completed: true },
      { stage: 'CONTAINMENT', timestamp: '21:04:48', description: 'Passive DPI inspection assigned', completed: true },
      { stage: 'BLOCK SIMULATED', timestamp: '21:04:48', description: 'Traffic permitted with telemetry logging', completed: true },
      { stage: 'SIEM LOGGED', timestamp: '21:04:48', description: 'SIEM event EVT-1035 logged', completed: true },
      { stage: 'RESOLVED', timestamp: '21:30:00', description: 'Under observation', completed: false }
    ]
  }
];

// 8 Realistic Simulated Firewall Rules
export const INITIAL_FIREWALL_RULES: FirewallRule[] = [
  { id: 'AUTO-0042', sourceIp: '10.0.0.25', destinationIp: '10.0.0.10', port: 'Multiple (21,22,80,443)', protocol: 'TCP', reason: 'AI Detected: Sequential Port Scan Reconnaissance', action: 'BLOCK', riskScore: 91, status: 'ACTIVE', generated: true, createdAt: '21:05:32', hitsCount: 1420 },
  { id: 'AUTO-0039', sourceIp: '10.0.0.42', destinationIp: '10.0.0.15', port: '22', protocol: 'TCP', reason: 'AI Detected: SSH Brute Force / Auth Flood', action: 'BLOCK', riskScore: 87, status: 'ACTIVE', generated: true, createdAt: '21:05:28', hitsCount: 890 },
  { id: 'AUTO-0028', sourceIp: '10.0.0.88', destinationIp: '10.0.0.10', port: '80', protocol: 'TCP', reason: 'Volumetric Rate-Limiter: DoS Flood Mitigation', action: 'BLOCK', riskScore: 96, status: 'ACTIVE', generated: true, createdAt: '21:05:14', hitsCount: 15400 },
  { id: 'AUTO-0019', sourceIp: '10.0.0.50', destinationIp: '10.0.0.1', port: '443', protocol: 'HTTPS', reason: 'URL Phishing / Malicious Domain Egress Block', action: 'BLOCK', riskScore: 88, status: 'ACTIVE', generated: true, createdAt: '21:05:08', hitsCount: 18 },
  { id: 'AUTO-0015', sourceIp: '10.0.0.81', destinationIp: '10.0.0.10', port: '3306', protocol: 'TCP', reason: 'AI Detected: Database Port Bruteforce Mitigation', action: 'BLOCK', riskScore: 85, status: 'ACTIVE', generated: true, createdAt: '21:04:32', hitsCount: 620 },
  { id: 'AUTO-0012', sourceIp: '10.0.0.99', destinationIp: '10.0.0.15', port: '445', protocol: 'TCP', reason: 'AI Detected: SMB Vulnerability Probe Quarantine', action: 'BLOCK', riskScore: 82, status: 'ACTIVE', generated: true, createdAt: '21:03:54', hitsCount: 420 },
  { id: 'POL-0005', sourceIp: '10.0.0.0/24', destinationIp: '10.0.0.10', port: '443', protocol: 'HTTPS', reason: 'Core Application HTTPS Ingress Baseline', action: 'ALLOW', riskScore: 10, status: 'ACTIVE', generated: false, createdAt: '08:00:00', hitsCount: 89400 },
  { id: 'MON-0012', sourceIp: '10.0.0.30', destinationIp: '10.0.0.10', port: '443', protocol: 'HTTPS', reason: 'Heuristic Anomaly Flag: Enhanced Deep Packet Telemetry', action: 'MONITOR', riskScore: 64, status: 'ACTIVE', generated: true, createdAt: '21:05:21', hitsCount: 340 }
];

// 30 Realistic Simulated SIEM Events
export const INITIAL_SIEM_EVENTS: SIEMEvent[] = [
  { id: 'EVT-1042', timestamp: '21:05:32', eventType: 'NETWORK_INTRUSION', sourceIp: '10.0.0.25', destination: '10.0.0.10:22', threat: 'PORT_SCAN', riskScore: 91, severity: 'CRITICAL', action: 'BLOCK', status: 'CONTAINED', category: 'Network', rawJson: '{"timestamp":"21:05:32","event":"NETWORK_INTRUSION","src":"10.0.0.25","dst":"10.0.0.10","risk":91,"severity":"CRITICAL","action":"BLOCK","detector":"RandomForestClassifier","confidence":0.94}' },
  { id: 'EVT-1041', timestamp: '21:05:28', eventType: 'AUTH_ATTACK', sourceIp: '10.0.0.42', destination: '10.0.0.15:22', threat: 'BRUTE_FORCE', riskScore: 87, severity: 'HIGH', action: 'BLOCK', status: 'CONTAINED', category: 'Authentication', rawJson: '{"timestamp":"21:05:28","event":"AUTH_ATTACK","src":"10.0.0.42","dst":"10.0.0.15:22","risk":87,"severity":"HIGH","action":"BLOCK","service":"sshd","failed_attempts":140}' },
  { id: 'EVT-1040', timestamp: '21:05:21', eventType: 'TRAFFIC_ANOMALY', sourceIp: '10.0.0.30', destination: '10.0.0.10:443', threat: 'NETWORK_ANOMALY', riskScore: 64, severity: 'MEDIUM', action: 'MONITOR', status: 'INVESTIGATING', category: 'Network', rawJson: '{"timestamp":"21:05:21","event":"TRAFFIC_ANOMALY","src":"10.0.0.30","dst":"10.0.0.10:443","risk":64,"severity":"MEDIUM","action":"MONITOR","model":"IsolationForest","anomaly_index":0.76}' },
  { id: 'EVT-1039', timestamp: '21:05:14', eventType: 'DOS_FLOOD', sourceIp: '10.0.0.88', destination: '10.0.0.10:80', threat: 'DOS_ATTACK', riskScore: 96, severity: 'CRITICAL', action: 'BLOCK', status: 'CONTAINED', category: 'Network', rawJson: '{"timestamp":"21:05:14","event":"DOS_FLOOD","src":"10.0.0.88","dst":"10.0.0.10:80","risk":96,"severity":"CRITICAL","action":"BLOCK","rate_req_sec":920}' },
  { id: 'EVT-1038', timestamp: '21:05:08', eventType: 'MALICIOUS_URL', sourceIp: '10.0.0.50', destination: 'secure-login.fake-auth.xyz', threat: 'PHISHING', riskScore: 88, severity: 'HIGH', action: 'BLOCK', status: 'CONTAINED', category: 'URL Intelligence', rawJson: '{"timestamp":"21:05:08","event":"MALICIOUS_URL","src":"10.0.0.50","dst":"fake-auth.xyz","risk":88,"severity":"HIGH","action":"BLOCK","verdict":"PHISHING"}' },
  { id: 'EVT-1037', timestamp: '21:05:01', eventType: 'NORMAL_TRAFFIC', sourceIp: '10.0.0.14', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 12, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:05:01","event":"NORMAL_TRAFFIC","src":"10.0.0.14","dst":"10.0.0.10:443","action":"ALLOW","status":"OK"}' },
  { id: 'EVT-1036', timestamp: '21:04:55', eventType: 'DNS_QUERY', sourceIp: '10.0.0.18', destination: '10.0.0.10:53', threat: 'BENIGN', riskScore: 8, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:04:55","event":"DNS_QUERY","src":"10.0.0.18","action":"ALLOW"}' },
  { id: 'EVT-1035', timestamp: '21:04:48', eventType: 'SUSPICIOUS_CONN', sourceIp: '10.0.0.57', destination: '10.0.0.15:443', threat: 'CIPHER_VARIANCE', riskScore: 48, severity: 'MEDIUM', action: 'MONITOR', status: 'INVESTIGATING', category: 'Network', rawJson: '{"timestamp":"21:04:48","event":"SUSPICIOUS_CONN","src":"10.0.0.57","action":"MONITOR"}' },
  { id: 'EVT-1034', timestamp: '21:04:40', eventType: 'NORMAL_TRAFFIC', sourceIp: '10.0.0.12', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 10, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:04:40","event":"NORMAL_TRAFFIC","src":"10.0.0.12","action":"ALLOW"}' },
  { id: 'EVT-1033', timestamp: '21:04:32', eventType: 'DB_INTRUSION', sourceIp: '10.0.0.81', destination: '10.0.0.10:3306', threat: 'MYSQL_BRUTE_FORCE', riskScore: 85, severity: 'HIGH', action: 'BLOCK', status: 'CONTAINED', category: 'Database', rawJson: '{"timestamp":"21:04:32","event":"DB_INTRUSION","src":"10.0.0.81","action":"BLOCK"}' },
  { id: 'EVT-1032', timestamp: '21:04:25', eventType: 'AUTH_REFRESH', sourceIp: '10.0.0.19', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 6, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Authentication', rawJson: '{"timestamp":"21:04:25","event":"AUTH_REFRESH","src":"10.0.0.19","action":"ALLOW"}' },
  { id: 'EVT-1031', timestamp: '21:04:18', eventType: 'DNS_QUERY', sourceIp: '10.0.0.65', destination: '10.0.0.2:53', threat: 'BENIGN', riskScore: 14, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:04:18","event":"DNS_QUERY","src":"10.0.0.65","action":"ALLOW"}' },
  { id: 'EVT-1030', timestamp: '21:04:10', eventType: 'NETWORK_INTRUSION', sourceIp: '10.0.0.25', destination: '10.0.0.10:8080', threat: 'PORT_SCAN', riskScore: 89, severity: 'HIGH', action: 'BLOCK', status: 'CONTAINED', category: 'Network', rawJson: '{"timestamp":"21:04:10","event":"NETWORK_INTRUSION","src":"10.0.0.25","action":"BLOCK"}' },
  { id: 'EVT-1029', timestamp: '21:04:02', eventType: 'HEALTH_PROBE', sourceIp: '10.0.0.11', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 4, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:04:02","event":"HEALTH_PROBE","src":"10.0.0.11","action":"ALLOW"}' },
  { id: 'EVT-1028', timestamp: '21:03:54', eventType: 'EXPLOIT_PROBE', sourceIp: '10.0.0.99', destination: '10.0.0.15:445', threat: 'SMB_ANOMALY', riskScore: 82, severity: 'HIGH', action: 'BLOCK', status: 'CONTAINED', category: 'Network', rawJson: '{"timestamp":"21:03:54","event":"EXPLOIT_PROBE","src":"10.0.0.99","action":"BLOCK"}' },
  { id: 'EVT-1027', timestamp: '21:03:45', eventType: 'NORMAL_TRAFFIC', sourceIp: '10.0.0.13', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 11, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:03:45","event":"NORMAL_TRAFFIC","src":"10.0.0.13","action":"ALLOW"}' },
  { id: 'EVT-1026', timestamp: '21:03:38', eventType: 'AUTH_ATTACK', sourceIp: '10.0.0.42', destination: '10.0.0.15:22', threat: 'BRUTE_FORCE', riskScore: 86, severity: 'HIGH', action: 'BLOCK', status: 'CONTAINED', category: 'Authentication', rawJson: '{"timestamp":"21:03:38","event":"AUTH_ATTACK","src":"10.0.0.42","action":"BLOCK"}' },
  { id: 'EVT-1025', timestamp: '21:03:30', eventType: 'CONFIG_PULL', sourceIp: '10.0.0.21', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 7, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:03:30","event":"CONFIG_PULL","src":"10.0.0.21","action":"ALLOW"}' },
  { id: 'EVT-1024', timestamp: '21:03:22', eventType: 'TRAFFIC_ANOMALY', sourceIp: '10.0.0.30', destination: '10.0.0.10:443', threat: 'C2_BEACON', riskScore: 68, severity: 'MEDIUM', action: 'MONITOR', status: 'INVESTIGATING', category: 'Network', rawJson: '{"timestamp":"21:03:22","event":"TRAFFIC_ANOMALY","src":"10.0.0.30","action":"MONITOR"}' },
  { id: 'EVT-1023', timestamp: '21:03:15', eventType: 'NORMAL_TRAFFIC', sourceIp: '10.0.0.16', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 9, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:03:15","event":"NORMAL_TRAFFIC","src":"10.0.0.16","action":"ALLOW"}' },
  { id: 'EVT-1022', timestamp: '21:03:07', eventType: 'DOS_FLOOD', sourceIp: '10.0.0.88', destination: '10.0.0.10:80', threat: 'SYN_FLOOD', riskScore: 94, severity: 'CRITICAL', action: 'BLOCK', status: 'CONTAINED', category: 'Network', rawJson: '{"timestamp":"21:03:07","event":"DOS_FLOOD","src":"10.0.0.88","action":"BLOCK"}' },
  { id: 'EVT-1021', timestamp: '21:02:59', eventType: 'AUDIT_SYNC', sourceIp: '10.0.0.14', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 5, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:02:59","event":"AUDIT_SYNC","src":"10.0.0.14","action":"ALLOW"}' },
  { id: 'EVT-1020', timestamp: '21:02:51', eventType: 'MALICIOUS_URL', sourceIp: '10.0.0.50', destination: 'fake-auth.xyz', threat: 'PHISHING', riskScore: 88, severity: 'HIGH', action: 'BLOCK', status: 'CONTAINED', category: 'URL Intelligence', rawJson: '{"timestamp":"21:02:51","event":"MALICIOUS_URL","src":"10.0.0.50","action":"BLOCK"}' },
  { id: 'EVT-1019', timestamp: '21:02:44', eventType: 'NORMAL_TRAFFIC', sourceIp: '10.0.0.17', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 8, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:02:44","event":"NORMAL_TRAFFIC","src":"10.0.0.17","action":"ALLOW"}' },
  { id: 'EVT-1018', timestamp: '21:02:36', eventType: 'SUSPICIOUS_CONN', sourceIp: '10.0.0.73', destination: '10.0.0.10:21', threat: 'UNENCRYPTED_FTP', riskScore: 42, severity: 'MEDIUM', action: 'MONITOR', status: 'INVESTIGATING', category: 'Network', rawJson: '{"timestamp":"21:02:36","event":"SUSPICIOUS_CONN","src":"10.0.0.73","action":"MONITOR"}' },
  { id: 'EVT-1017', timestamp: '21:02:28', eventType: 'DNS_QUERY', sourceIp: '10.0.0.10', destination: '10.0.0.2:53', threat: 'BENIGN', riskScore: 4, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:02:28","event":"DNS_QUERY","src":"10.0.0.10","action":"ALLOW"}' },
  { id: 'EVT-1016', timestamp: '21:02:20', eventType: 'NETWORK_INTRUSION', sourceIp: '10.0.0.25', destination: '10.0.0.10:443', threat: 'PORT_SCAN', riskScore: 92, severity: 'CRITICAL', action: 'BLOCK', status: 'CONTAINED', category: 'Network', rawJson: '{"timestamp":"21:02:20","event":"NETWORK_INTRUSION","src":"10.0.0.25","action":"BLOCK"}' },
  { id: 'EVT-1015', timestamp: '21:02:12', eventType: 'NORMAL_TRAFFIC', sourceIp: '10.0.0.22', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 11, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:02:12","event":"NORMAL_TRAFFIC","src":"10.0.0.22","action":"ALLOW"}' },
  { id: 'EVT-1014', timestamp: '21:02:05', eventType: 'AUTH_ATTACK', sourceIp: '10.0.0.42', destination: '10.0.0.15:22', threat: 'BRUTE_FORCE', riskScore: 84, severity: 'HIGH', action: 'BLOCK', status: 'CONTAINED', category: 'Authentication', rawJson: '{"timestamp":"21:02:05","event":"AUTH_ATTACK","src":"10.0.0.42","action":"BLOCK"}' },
  { id: 'EVT-1013', timestamp: '21:01:58', eventType: 'HEARTBEAT_PING', sourceIp: '10.0.0.15', destination: '10.0.0.10:443', threat: 'BENIGN', riskScore: 6, severity: 'LOW', action: 'ALLOW', status: 'LOGGED', category: 'Network', rawJson: '{"timestamp":"21:01:58","event":"HEARTBEAT_PING","src":"10.0.0.15","action":"ALLOW"}' }
];
