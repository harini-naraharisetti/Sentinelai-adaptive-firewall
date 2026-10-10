require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const NetworkEvent = require('./models/NetworkEvent');
const Threat = require('./models/Threat');
const FirewallRule = require('./models/FirewallRule');
const SIEMEvent = require('./models/SIEMEvent');

// ANSI Colors
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  emerald: '\x1b[38;5;35m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  white: '\x1b[37m',
  gray: '\x1b[90m'
};

const sampleNetworkEvents = [
  {
    id: 'EVT-1001',
    timestamp: '11:42:05 PM',
    sourceIp: '10.0.0.25',
    destinationIp: '10.0.0.10',
    port: 80,
    protocol: 'TCP',
    packetCount: 842,
    bytes: 120420,
    connectionRate: 92,
    uniquePorts: 38,
    synCount: 720,
    entropy: 3.82,
    status: 'BLOCKED',
    payloadInfo: 'Sequential SYN sweep probe targeting ports 21-8080'
  },
  {
    id: 'EVT-1002',
    timestamp: '11:42:10 PM',
    sourceIp: '10.0.0.42',
    destinationIp: '10.0.0.15',
    port: 22,
    protocol: 'TCP',
    packetCount: 1240,
    bytes: 98400,
    connectionRate: 140,
    uniquePorts: 1,
    synCount: 220,
    entropy: 2.15,
    status: 'BLOCKED',
    payloadInfo: 'SSH authentication handshake burst (140 req/min)'
  },
  {
    id: 'EVT-1003',
    timestamp: '11:42:18 PM',
    sourceIp: '10.0.0.64',
    destinationIp: '10.0.0.10',
    port: 443,
    protocol: 'HTTPS',
    packetCount: 14,
    bytes: 2840,
    connectionRate: 2,
    uniquePorts: 1,
    synCount: 1,
    entropy: 0.42,
    status: 'NORMAL',
    payloadInfo: 'Standard TLS 1.3 encrypted browser session'
  },
  {
    id: 'EVT-1004',
    timestamp: '11:42:25 PM',
    sourceIp: '10.0.0.88',
    destinationIp: '10.0.0.10',
    port: 80,
    protocol: 'TCP',
    packetCount: 6850,
    bytes: 940000,
    connectionRate: 850,
    uniquePorts: 1,
    synCount: 4200,
    entropy: 1.12,
    status: 'BLOCKED',
    payloadInfo: 'Volumetric HTTP GET flood exceeding 800 req/sec'
  },
  {
    id: 'EVT-1005',
    timestamp: '11:42:31 PM',
    sourceIp: '10.0.0.19',
    destinationIp: '10.0.0.10',
    port: 443,
    protocol: 'TCP',
    packetCount: 195,
    bytes: 845000,
    connectionRate: 45,
    uniquePorts: 1,
    synCount: 2,
    entropy: 5.94,
    status: 'BLOCKED',
    payloadInfo: 'Outbound compressed encrypted data stream exfiltration'
  }
];

const sampleThreats = [
  {
    id: 'THR-2026-0042',
    type: 'Port Scan',
    severity: 'HIGH',
    riskScore: 91,
    confidence: 94,
    anomalyScore: 0.89,
    sourceIp: '10.0.0.25',
    destinationIp: '10.0.0.10',
    destinationPort: 'Multiple (21, 22, 80, 443, 8080)',
    protocol: 'TCP',
    action: 'BLOCK',
    status: 'ACTIVE',
    firewallRuleId: 'AUTO-0042',
    timestamp: '11:42:05 PM',
    indicators: ['High connection rate (>90/s)', '38 distinct ports targeted', 'High SYN/ACK ratio'],
    aiExplanation: 'Random Forest (94% confidence) identified multi-port reconnaissance probe pattern.',
    features: { packetCount: 842, byteCount: 120420, connectionRate: 92, uniquePorts: 38, synCount: 720, entropy: 3.82 }
  },
  {
    id: 'THR-2026-0043',
    type: 'Brute Force',
    severity: 'HIGH',
    riskScore: 87,
    confidence: 91,
    anomalyScore: 0.84,
    sourceIp: '10.0.0.42',
    destinationIp: '10.0.0.15',
    destinationPort: 22,
    protocol: 'TCP',
    action: 'BLOCK',
    status: 'ACTIVE',
    firewallRuleId: 'AUTO-0039',
    timestamp: '11:42:10 PM',
    indicators: ['Port 22 SSH surge', '140 failed auth attempts/min', 'Automated dictionary signature'],
    aiExplanation: 'Rapid credential guessing attack targeting administrative SSH service.',
    features: { packetCount: 1240, byteCount: 98400, connectionRate: 140, uniquePorts: 1, synCount: 220, entropy: 2.15 }
  }
];

const sampleRules = [
  {
    id: 'AUTO-0042',
    sourceIp: '10.0.0.25',
    destinationIp: '10.0.0.10',
    port: 'Any',
    protocol: 'TCP',
    action: 'BLOCK',
    reason: 'AI Detected: Sequential Port Scan Reconnaissance (Risk: 91/100)',
    riskScore: 91,
    status: 'ACTIVE',
    createdAt: '11:42:06 PM',
    hitsCount: 184
  },
  {
    id: 'AUTO-0039',
    sourceIp: '10.0.0.42',
    destinationIp: '10.0.0.15',
    port: 22,
    protocol: 'TCP',
    action: 'BLOCK',
    reason: 'AI Detected: SSH Credential Brute Force (Risk: 87/100)',
    riskScore: 87,
    status: 'ACTIVE',
    createdAt: '11:42:11 PM',
    hitsCount: 92
  }
];

const sampleSIEM = [
  {
    id: 'SIEM-EVT-4201',
    timestamp: '11:42:06 PM',
    eventType: 'PORT_SCAN_ATTACK',
    sourceIp: '10.0.0.25',
    destination: '10.0.0.10',
    threat: 'Port Scan Reconnaissance',
    riskScore: 91,
    severity: 'HIGH',
    action: 'BLOCK',
    status: 'CONTAINED',
    category: 'Network Reconnaissance',
    summary: 'Multi-port SYN sweep detected and automatically quarantined by Rule AUTO-0042.',
    confidence: 94,
    rawJson: JSON.stringify({ source: '10.0.0.25', ports: 38, rate: 92, model: 'RandomForest', score: 91 })
  }
];

const seedData = async () => {
  console.log('\n' + c.cyan + c.bold + '╔══════════════════════════════════════════════════════════════════╗' + c.reset);
  console.log(c.cyan + c.bold + '║          🌱  SENTINEL AI — MONGODB TELEMETRY SEEDER              ║' + c.reset);
  console.log(c.cyan + c.bold + '╚══════════════════════════════════════════════════════════════════╝' + c.reset);

  await connectDB();

  try {
    console.log(`[${c.yellow}CLEANUP${c.reset}]  ${c.dim}Purging existing test records...${c.reset}`);
    await NetworkEvent.deleteMany({});
    await Threat.deleteMany({});
    await FirewallRule.deleteMany({});
    await SIEMEvent.deleteMany({});

    console.log(`[${c.green}SEEDING${c.reset}]  ${c.bold}Writing network baseline records into MongoDB...${c.reset}`);
    await NetworkEvent.insertMany(sampleNetworkEvents);
    await Threat.insertMany(sampleThreats);
    await FirewallRule.insertMany(sampleRules);
    await SIEMEvent.insertMany(sampleSIEM);

    console.log(c.gray + '──────────────────────────────────────────────────────────────────' + c.reset);
    console.log(`${c.emerald}${c.bold}✨ SEED OPERATION COMPLETE!${c.reset}`);
    console.log(`  ❯ Network Events:  ${c.white}${sampleNetworkEvents.length}${c.reset} documents`);
    console.log(`  ❯ AI Threats:      ${c.white}${sampleThreats.length}${c.reset} documents`);
    console.log(`  ❯ Firewall Rules:  ${c.white}${sampleRules.length}${c.reset} documents`);
    console.log(`  ❯ SIEM Events:     ${c.white}${sampleSIEM.length}${c.reset} documents`);
    console.log(c.gray + '──────────────────────────────────────────────────────────────────\n' + c.reset);
    process.exit(0);
  } catch (err) {
    console.error(`[${c.red}ERROR${c.reset}] ${err.message}`);
    process.exit(1);
  }
};

seedData();
