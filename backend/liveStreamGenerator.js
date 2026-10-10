require('dotenv').config();
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
  purple: '\x1b[35m',
  white: '\x1b[37m',
  gray: '\x1b[90m'
};

function getRandomIp() {
  return `10.0.0.${Math.floor(10 + Math.random() * 85)}`;
}

function getFormattedTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

async function startLivePacketStream() {
  console.log('\n' + c.purple + c.bold + '╔══════════════════════════════════════════════════════════════════╗' + c.reset);
  console.log(c.purple + c.bold + '║      📡  SENTINEL AI — LIVE TELEMETRY STREAM TO MONGODB          ║' + c.reset);
  console.log(c.purple + c.bold + '╚══════════════════════════════════════════════════════════════════╝' + c.reset);

  await connectDB();
  console.log(`[${c.green}STREAM${c.reset}]  ${c.bold}Ingesting live network packet flows every 3.5s...${c.reset}`);
  console.log(`[${c.yellow}CONTROLS${c.reset}] Press ${c.bold}Ctrl+C${c.reset} to stop the stream.\n`);
  console.log(c.gray + '──────────────────────────────────────────────────────────────────' + c.reset);

  let packetCounter = 2000;

  setInterval(async () => {
    packetCounter++;
    const isAnomaly = Math.random() < 0.28;
    const time = getFormattedTime();
    const eventId = `EVT-${packetCounter}`;
    const srcIp = getRandomIp();

    if (!isAnomaly) {
      const normalEvent = {
        id: eventId,
        timestamp: time,
        sourceIp: srcIp,
        destinationIp: '10.0.0.10',
        port: 443,
        protocol: 'HTTPS',
        packetCount: Math.floor(12 + Math.random() * 40),
        bytes: Math.floor(1200 + Math.random() * 8000),
        connectionRate: Math.floor(1 + Math.random() * 4),
        uniquePorts: 1,
        synCount: 1,
        entropy: parseFloat((0.25 + Math.random() * 0.35).toFixed(2)),
        status: 'NORMAL',
        payloadInfo: 'Standard encrypted browser TLS 1.3 socket'
      };

      try {
        await NetworkEvent.create(normalEvent);
        console.log(`${c.gray}[${time}]${c.reset} ${c.green}🟢 NORMAL${c.reset}   ${c.white}${srcIp.padEnd(14)}${c.reset} ➔ 10.0.0.10:443 ${c.gray}(${normalEvent.bytes} bytes, entropy ${normalEvent.entropy})${c.reset}`);
      } catch (e) {
        console.error('Save error:', e.message);
      }
    } else {
      const threatTypes = [
        { type: 'Port Scan', port: 80, severity: 'HIGH', risk: 88, action: 'BLOCK' },
        { type: 'Brute Force', port: 22, severity: 'HIGH', risk: 91, action: 'BLOCK' },
        { type: 'DoS Flood', port: 80, severity: 'CRITICAL', risk: 96, action: 'BLOCK' },
        { type: 'Data Exfiltration', port: 443, severity: 'HIGH', risk: 84, action: 'BLOCK' }
      ];
      const selected = threatTypes[Math.floor(Math.random() * threatTypes.length)];
      const ruleId = `AUTO-${Math.floor(1000 + Math.random() * 9000)}`;

      const maliciousNetwork = {
        id: eventId,
        timestamp: time,
        sourceIp: srcIp,
        destinationIp: '10.0.0.10',
        port: selected.port,
        protocol: 'TCP',
        packetCount: Math.floor(450 + Math.random() * 3000),
        bytes: Math.floor(80000 + Math.random() * 500000),
        connectionRate: Math.floor(85 + Math.random() * 300),
        uniquePorts: selected.type === 'Port Scan' ? 38 : 1,
        synCount: Math.floor(200 + Math.random() * 1500),
        entropy: parseFloat((3.5 + Math.random() * 2.5).toFixed(2)),
        status: 'BLOCKED',
        payloadInfo: `Simulated ${selected.type} anomalous signature`
      };

      const threatDoc = {
        id: `THR-${Math.floor(1000 + Math.random() * 9000)}`,
        type: selected.type,
        severity: selected.severity,
        riskScore: selected.risk,
        confidence: 94,
        anomalyScore: 0.88,
        sourceIp: srcIp,
        destinationIp: '10.0.0.10',
        destinationPort: selected.port,
        protocol: 'TCP',
        action: selected.action,
        status: 'ACTIVE',
        firewallRuleId: ruleId,
        timestamp: time,
        indicators: ['Unusual connection rate', 'Anomalous entropy spike', 'Ensemble ML match'],
        aiExplanation: `Ensemble Random Forest & XGBoost classified ${selected.type} with risk score ${selected.risk}/100.`,
        features: {
          packetCount: maliciousNetwork.packetCount,
          byteCount: maliciousNetwork.bytes,
          connectionRate: maliciousNetwork.connectionRate,
          uniquePorts: maliciousNetwork.uniquePorts,
          synCount: maliciousNetwork.synCount,
          entropy: maliciousNetwork.entropy
        }
      };

      const ruleDoc = {
        id: ruleId,
        sourceIp: srcIp,
        destinationIp: '10.0.0.10',
        port: 'Any',
        protocol: 'TCP',
        action: 'BLOCK',
        reason: `AI Detected: ${selected.type} (Risk: ${selected.risk}/100)`,
        riskScore: selected.risk,
        status: 'ACTIVE',
        createdAt: time,
        hitsCount: 1
      };

      const siemDoc = {
        id: `SIEM-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: time,
        eventType: `${selected.type.toUpperCase().replace(/\s+/g, '_')}_DETECTED`,
        sourceIp: srcIp,
        destination: '10.0.0.10',
        threat: selected.type,
        riskScore: selected.risk,
        severity: selected.severity,
        action: selected.action,
        status: 'CONTAINED',
        category: 'Network Intrusion',
        summary: `Autonomous firewall deployed Rule ${ruleId} for ${selected.type} from ${srcIp}.`,
        confidence: 94,
        rawJson: JSON.stringify({ source: srcIp, threat: selected.type, risk: selected.risk, rule: ruleId })
      };

      try {
        await NetworkEvent.create(maliciousNetwork);
        await Threat.create(threatDoc);
        await FirewallRule.create(ruleDoc);
        await SIEMEvent.create(siemDoc);
        console.log(`${c.gray}[${time}]${c.reset} ${c.red}${c.bold}🚨 THREAT BLOCKED${c.reset} ${c.yellow}${srcIp.padEnd(14)}${c.reset} ➔ ${selected.type} | Risk: ${selected.risk}/100 | Rule: ${c.emerald}${ruleId}${c.reset}`);
      } catch (e) {
        console.error('Intrusion save error:', e.message);
      }
    }
  }, 3500);
}

startLivePacketStream();
