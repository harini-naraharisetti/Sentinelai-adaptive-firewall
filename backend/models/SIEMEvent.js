const mongoose = require('mongoose');

const SIEMEventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  eventType: { type: String, required: true },
  sourceIp: { type: String, required: true },
  destination: { type: String, default: '10.0.0.10' },
  threat: { type: String, required: true },
  riskScore: { type: Number, required: true },
  severity: { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], required: true },
  action: { type: String, default: 'BLOCK' },
  status: { type: String, default: 'CONTAINED' },
  category: { type: String, default: 'Network Intrusion' },
  summary: { type: String },
  confidence: { type: Number, default: 94 },
  rawJson: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SIEMEvent', SIEMEventSchema);
