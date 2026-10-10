const mongoose = require('mongoose');

const FirewallRuleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  sourceIp: { type: String, required: true },
  destinationIp: { type: String, default: '10.0.0.10' },
  port: { type: mongoose.Schema.Types.Mixed, default: 'Any' },
  protocol: { type: String, default: 'TCP' },
  action: { type: String, enum: ['BLOCK', 'ALLOW', 'MONITOR', 'DROP'], default: 'BLOCK' },
  reason: { type: String, required: true },
  riskScore: { type: Number, default: 85 },
  status: { type: String, enum: ['ACTIVE', 'DISABLED'], default: 'ACTIVE' },
  generated: { type: Boolean, default: true },
  createdAt: { type: String, required: true },
  createdBy: { type: String, default: 'SentinelAI Autonomous Engine' },
  hitsCount: { type: Number, default: 0 },
  expiresIn: { type: String, default: '24h 00m' }
});

module.exports = mongoose.model('FirewallRule', FirewallRuleSchema);
