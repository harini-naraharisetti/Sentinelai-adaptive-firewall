const mongoose = require('mongoose');

const ThreatSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  threatType: { type: String },
  severity: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], required: true },
  riskScore: { type: Number, required: true },
  confidence: { type: Number, default: 90 },
  anomalyScore: { type: Number, default: 0.8 },
  sourceIp: { type: String, required: true },
  destinationIp: { type: String, required: true },
  destinationPort: { type: mongoose.Schema.Types.Mixed, default: 'Any' },
  protocol: { type: String, default: 'TCP' },
  action: { type: String, default: 'BLOCK' },
  status: { type: String, default: 'ACTIVE' },
  firewallRuleId: { type: String },
  timestamp: { type: String, required: true },
  indicators: [{ type: String }],
  aiExplanation: { type: String },
  features: {
    packetCount: Number,
    byteCount: Number,
    connectionCount: Number,
    connectionRate: mongoose.Schema.Types.Mixed,
    uniquePorts: Number,
    synCount: Number,
    flowDurationMs: Number,
    entropy: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Threat', ThreatSchema);
