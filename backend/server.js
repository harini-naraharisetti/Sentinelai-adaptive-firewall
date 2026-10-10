require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const NetworkEvent = require('./models/NetworkEvent');
const Threat = require('./models/Threat');
const FirewallRule = require('./models/FirewallRule');
const SIEMEvent = require('./models/SIEMEvent');

// ANSI Color Constants
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

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Pretty Request Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  const time = new Date().toLocaleTimeString();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const methodColor = req.method === 'GET' ? c.cyan : req.method === 'POST' ? c.green : c.yellow;
    const statusColor = res.statusCode >= 400 ? c.red : c.emerald;

    if (req.originalUrl !== '/api/health') {
      console.log(
        `${c.gray}[${time}]${c.reset} ${methodColor}${c.bold}${req.method.padEnd(6)}${c.reset} ` +
        `${c.white}${req.originalUrl.padEnd(28)}${c.reset} ` +
        `${statusColor}${res.statusCode}${c.reset} ${c.gray}(${duration}ms)${c.reset}`
      );
    }
  });
  next();
});

// Connect to MongoDB
connectDB();

// 1. Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'SentinelAI Cyber SOC Backend',
    database: 'MongoDB (sentinelai_db)',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// 2. Network Events Endpoints
app.get('/api/network-events', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const events = await NetworkEvent.find().sort({ createdAt: -1 }).limit(limit);
    res.json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/network-events', async (req, res) => {
  try {
    const newEvent = new NetworkEvent(req.body);
    await newEvent.save();
    console.log(`  ${c.green}❯ Ingested packet flow:${c.reset} ${c.bold}${newEvent.sourceIp}${c.reset} -> ${newEvent.destinationIp}:${newEvent.port} (${newEvent.status})`);
    res.status(201).json({ success: true, data: newEvent });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 3. Live Batch Ingestion Endpoint
app.post('/api/live-stream/ingest', async (req, res) => {
  try {
    const { networkEvent, threat, firewallRule, siemEvent } = req.body;
    const results = {};

    if (networkEvent) {
      results.networkEvent = await NetworkEvent.findOneAndUpdate(
        { id: networkEvent.id },
        networkEvent,
        { upsert: true, new: true }
      );
    }

    if (threat) {
      results.threat = await Threat.findOneAndUpdate(
        { id: threat.id },
        threat,
        { upsert: true, new: true }
      );
      console.log(`  ${c.red}${c.bold}🚨 THREAT RECORDED:${c.reset} ${c.yellow}${threat.type}${c.reset} from ${threat.sourceIp} | Risk: ${threat.riskScore}/100`);
    }

    if (firewallRule) {
      results.firewallRule = await FirewallRule.findOneAndUpdate(
        { id: firewallRule.id },
        firewallRule,
        { upsert: true, new: true }
      );
      console.log(`  ${c.emerald}${c.bold}🛡️ ACL RULE SYNCED:${c.reset} ${firewallRule.id} -> ${firewallRule.action} for ${firewallRule.sourceIp}`);
    }

    if (siemEvent) {
      results.siemEvent = await SIEMEvent.findOneAndUpdate(
        { id: siemEvent.id },
        siemEvent,
        { upsert: true, new: true }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Live stream telemetry persisted to MongoDB',
      stored: results
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 4. Threats Endpoints
app.get('/api/threats', async (req, res) => {
  try {
    const threats = await Threat.find().sort({ createdAt: -1 });
    res.json({ success: true, count: threats.length, data: threats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/threats', async (req, res) => {
  try {
    const newThreat = new Threat(req.body);
    await newThreat.save();
    res.status(201).json({ success: true, data: newThreat });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 5. Firewall Rules Endpoints
app.get('/api/firewall-rules', async (req, res) => {
  try {
    const rules = await FirewallRule.find().sort({ createdAt: -1 });
    res.json({ success: true, count: rules.length, data: rules });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/firewall-rules', async (req, res) => {
  try {
    const newRule = new FirewallRule(req.body);
    await newRule.save();
    res.status(201).json({ success: true, data: newRule });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 6. SIEM Events Endpoints
app.get('/api/siem-events', async (req, res) => {
  try {
    const events = await SIEMEvent.find().sort({ createdAt: -1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/siem-events', async (req, res) => {
  try {
    const newSiem = new SIEMEvent(req.body);
    await newSiem.save();
    res.status(201).json({ success: true, data: newSiem });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 7. Stats Summary Endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const totalEvents = await NetworkEvent.countDocuments();
    const threatsDetected = await Threat.countDocuments();
    const blockedRules = await FirewallRule.countDocuments({ action: 'BLOCK' });
    const siemEventsCount = await SIEMEvent.countDocuments();

    res.json({
      success: true,
      data: {
        totalEvents,
        threatsDetected,
        blockedRules,
        siemEventsCount,
        securityPosture: '98% Optimal'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start listening with neat banner display
app.listen(PORT, () => {
  console.log('\n' + c.emerald + c.bold + '╔══════════════════════════════════════════════════════════════════╗' + c.reset);
  console.log(c.emerald + c.bold + '║          🛡️  SENTINEL AI — CYBERSECURITY SOC BACKEND API         ║' + c.reset);
  console.log(c.emerald + c.bold + '╚══════════════════════════════════════════════════════════════════╝' + c.reset);
  console.log(`[${c.green}SYSTEM${c.reset}]   ${c.bold}⚡ Server Status:${c.reset}  ${c.green}ONLINE${c.reset} (Port ${PORT})`);
  console.log(`[${c.cyan}NETWORK${c.reset}]  ${c.bold}🚀 API URL:${c.reset}        ${c.cyan}http://localhost:${PORT}${c.reset}`);
  console.log(`[${c.purple}INGEST${c.reset}]   ${c.bold}📡 Live Ingest:${c.reset}    ${c.white}POST /api/live-stream/ingest${c.reset}`);
  console.log(c.gray + '──────────────────────────────────────────────────────────────────' + c.reset);
  console.log(c.bold + 'Available API Routes:' + c.reset);
  console.log(`  ${c.cyan}GET${c.reset}   /api/health             → Health & MongoDB Status`);
  console.log(`  ${c.cyan}GET${c.reset}   /api/network-events     → Raw Flow Telemetry Vectors`);
  console.log(`  ${c.green}POST${c.reset}  /api/live-stream/ingest → Real-Time Packet Stream`);
  console.log(`  ${c.cyan}GET${c.reset}   /api/threats            → AI-Classified Threat Records`);
  console.log(`  ${c.cyan}GET${c.reset}   /api/firewall-rules     → Adaptive ACL Rulebase`);
  console.log(`  ${c.cyan}GET${c.reset}   /api/siem-events        → SIEM Lakehouse Log Store`);
  console.log(`  ${c.cyan}GET${c.reset}   /api/stats              → Aggregate Posture Metrics`);
  console.log(c.gray + '──────────────────────────────────────────────────────────────────\n' + c.reset);
});
