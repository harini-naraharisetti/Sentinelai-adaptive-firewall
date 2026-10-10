const mongoose = require('mongoose');

const NetworkEventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  sourceIp: { type: String, required: true },
  destinationIp: { type: String, required: true },
  port: { type: Number, required: true },
  protocol: { type: String, enum: ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS'], default: 'TCP' },
  packetCount: { type: Number, default: 10 },
  bytes: { type: Number, default: 1200 },
  connectionRate: { type: Number, default: 2 },
  uniquePorts: { type: Number, default: 1 },
  synCount: { type: Number, default: 0 },
  entropy: { type: Number, default: 0.45 },
  status: { type: String, enum: ['NORMAL', 'SUSPICIOUS', 'BLOCKED', 'MONITORED'], default: 'NORMAL' },
  payloadInfo: { type: String, default: 'Standard encrypted TLS socket handshake' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NetworkEvent', NetworkEventSchema);
