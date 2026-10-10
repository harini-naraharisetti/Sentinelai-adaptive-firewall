# 🛡️ SentinelAI — Sample MongoDB Backend

This folder contains a lightweight **Sample Node.js / Express / Mongoose Backend** designed to demonstrate storing and retrieving SentinelAI network telemetry data, threat detections, adaptive firewall rules, and SIEM events in a **MongoDB** database (default port `27017` or `27010`).

---

## 📁 Project Structure

```text
backend/
├── config/
│   └── db.js                 # MongoDB Connection Handler (supports 27017 / 27010)
├── models/
│   ├── NetworkEvent.js       # Mongoose Schema for raw network packet flows
│   ├── Threat.js             # Mongoose Schema for AI-classified threats
│   ├── FirewallRule.js       # Mongoose Schema for dynamic synthesized ACL rules
│   └── SIEMEvent.js          # Mongoose Schema for indexed SIEM forensic events
├── .env                      # Environment configuration
├── package.json              # Backend dependencies (Express, Mongoose, CORS)
├── seed.js                   # Instant database seeder script with sample telemetry
├── server.js                 # Express REST API Server
└── README.md                 # Documentation & Execution Guide
```

---

## 🚀 Quick Start Guide

### 1. Ensure MongoDB is Running
Make sure your local MongoDB service is running on default port `27017` (or `27010`):

```bash
# Example with mongod or docker
mongod --dbpath /path/to/data --port 27017

# Or with Docker
docker run -d -p 27017:27017 --name sentinel-mongo mongo:latest
```

*(If you are using port `27010`, update `MONGO_URI` in `backend/.env` to `mongodb://127.0.0.1:27010/sentinelai_db`)*.

---

### 2. Install Backend Dependencies
Open a terminal in the `backend/` folder:

```bash
cd backend
npm install
```

---

### 3. Seed Sample Data into MongoDB
Run the database seed script to populate sample network packet flows, threat signatures, firewall rules, and SIEM logs:

```bash
npm run seed
```

---

### 4. Continuous Live Packet Stream to MongoDB
To run a continuous live network packet generator that streams simulated traffic and AI threats into MongoDB every 3.5 seconds:

```bash
npm run live
```

Output:
```text
✅ MongoDB Connected successfully: 127.0.0.1:27017/sentinelai_db
📡 Starting continuous live network packet stream to MongoDB...
[11:45:02 PM] 🟢 INGRESS NORMAL: 10.0.0.45 -> 10.0.0.10:443 (Bytes: 4280)
[11:45:06 PM] 🚨 THREAT INGESTED & AUTO-BLOCKED: Port Scan from 10.0.0.25 -> Rule AUTO-4201 active in MongoDB!
```

---

### 5. Start the Sample API Server

```bash
npm start
```

The server will start on **`http://localhost:5000`**.

---

## 📡 Available Sample REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & MongoDB status |
| `GET` | `/api/network-events` | Fetch all network telemetry flows |
| `POST` | `/api/network-events` | Ingest a new simulated packet flow |
| `POST` | `/api/live-stream/ingest` | Real-time batch ingest (packet, threat, rule & SIEM) |
| `GET` | `/api/threats` | Fetch AI-classified security threats |
| `POST` | `/api/threats` | Insert new AI threat detection |
| `GET` | `/api/firewall-rules` | Fetch dynamic firewall ACL rules |
| `POST` | `/api/firewall-rules` | Deploy new adaptive firewall rule |
| `GET` | `/api/siem-events` | Fetch indexed SIEM forensic records |
| `POST` | `/api/siem-events` | Record new SIEM incident event |
| `GET` | `/api/stats` | Summary counts & security posture |

---

## 📋 Sample Schema Breakdown

```javascript
// NetworkEvent Schema
{
  id: "EVT-1001",
  timestamp: "11:42:05 PM",
  sourceIp: "10.0.0.25",
  destinationIp: "10.0.0.10",
  port: 80,
  protocol: "TCP",
  packetCount: 842,
  bytes: 120420,
  connectionRate: 92,
  uniquePorts: 38,
  synCount: 720,
  entropy: 3.82,
  status: "BLOCKED",
  payloadInfo: "Sequential SYN sweep probe targeting ports 21-8080"
}
```
