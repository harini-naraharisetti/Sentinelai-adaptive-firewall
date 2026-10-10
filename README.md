# 🛡️ SentinelAI

### AI-Powered Network Intrusion Detection & Automated Incident Response
*(Adaptive AI Firewall with SIEM-Based Threat Intelligence, Zero-Trust Command Center & Wireless Perimeter Shield)*

<div align="center">

![Security Status](https://img.shields.io/badge/SECURITY%20POSTURE-98%25%20OPTIMAL-emerald?style=for-the-badge&logo=shield)
![Platform](https://img.shields.io/badge/PLATFORM-NEXT.JS%2014-black?style=for-the-badge&logo=nextdotjs)
![Intelligence](https://img.shields.io/badge/AI%2FML-DUAL--MODEL%20INFERENCE-emerald?style=for-the-badge)
![Wi-Fi Shield](https://img.shields.io/badge/WIRELESS-802.11w%20PMF%20ACTIVE-cyan?style=for-the-badge&logo=wifi)
![Firewall Interception](https://img.shields.io/badge/FIREWALL-4--LAYER%20eBPF%20KILL-rose?style=for-the-badge)
![Attack Map](https://img.shields.io/badge/GEO--IP-GLOBAL%20ATTACK%20MAP-rose?style=for-the-badge)
![Voice Announcer](https://img.shields.io/badge/AUDIO-AI%20VOICE%20SYNTHESIS-purple?style=for-the-badge)
![License](https://img.shields.io/badge/LICENSE-MIT-slate?style=for-the-badge)

<br />

### *"Autonomous Threat Intelligence, Real-Time ML Classification, 4-Layer Firewall Interception & Enterprise Wi-Fi Shield"*

A state-of-the-art, full-screen interactive cybersecurity operations platform featuring an **Enterprise Wi-Fi & Wireless Restrictions Perimeter Shield**, **4-Layer Technical Firewall Interception Mechanics**, **Real-Time 10-Second Telemetry Ingest Engine**, **Live Global Cyber Attack Map**, **AI Voice Alert Announcer**, **MITRE ATT&CK Matrix Navigator**, **One-Click Executive PDF Audit Exporter**, **Dual-Model ML Threat Detection** (Random Forest + XGBoost), **Adaptive Firewall Containment**, **Heuristic URL Scanner**, and **MongoDB Live Packet Streaming**.

🟢 **100% CLIENT-SIDE SIMULATION WITH OPTIONAL MONGODB BACKEND**
> *SentinelAI is an interactive cybersecurity demonstration built for hackathons and technical evaluations. All network packet flows, AI ML predictions, dynamic firewall ACLs, incidents, and SIEM events are generated dynamically with real-time browser audio synthesis, Web Speech announcements, and PDF audit generation.*

[📶 Wi-Fi Restrictions](#-enterprise-wi-fi--wireless-restrictions-perimeter) • [🛡️ Firewall Interception](#️-how-the-firewall-stops-attacks-4-layer-technical-mechanics) • [⚡ 10s Telemetry Engine](#-real-time-10-second-live-telemetry-engine) • [🌐 Global Attack Map](#-live-global-cyber-attack-map) • [🗣️ AI Voice Announcer](#️-ai-voice-alert-announcer-web-speech-api) • [⚔️ MITRE ATT&CK](#️-interactive-mitre-attck-matrix-navigator) • [📄 PDF Audit Exporter](#-one-click-soc-executive-pdf-audit-exporter) • [🚀 Quick Start](#-quick-start--execution)

</div>

---

## 📑 Table of Contents
1. [🌟 Executive Summary](#-executive-summary)
2. [📶 Enterprise Wi-Fi & Wireless Restrictions Perimeter](#-enterprise-wi-fi--wireless-restrictions-perimeter)
3. [🛡️ How the Firewall Stops Attacks (4-Layer Technical Mechanics)](#️-how-the-firewall-stops-attacks-4-layer-technical-mechanics)
4. [⚡ Real-Time 10-Second Live Telemetry Engine](#-real-time-10-second-live-telemetry-engine)
5. [🌐 Live Global Cyber Attack Map](#-live-global-cyber-attack-map)
6. [🗣️ AI Voice Alert Announcer (Web Speech API)](#️-ai-voice-alert-announcer-web-speech-api)
7. [⚔️ Interactive MITRE ATT&CK Matrix Navigator](#️-interactive-mitre-attck-matrix-navigator)
8. [📄 One-Click SOC Executive PDF Audit Exporter](#-one-click-soc-executive-pdf-audit-exporter)
9. [🌐 Project Landing Page & Showcase](#-project-landing-page--showcase)
10. [🔐 Single Login & Fast Clearance Authentication](#-single-login--fast-clearance-authentication)
11. [✨ Core Security Platform Modules](#-core-security-platform-modules)
12. [💾 Sample MongoDB Real-Time Ingest Backend](#-sample-mongodb-real-time-ingest-backend)
13. [📊 Feature Vector & Composite Risk Math](#-feature-vector--composite-risk-math)
14. [🚀 Quick Start & Execution](#-quick-start--execution)
15. [⚖️ Security Demonstration Disclaimer](#-security-demonstration-disclaimer)

---

## 🌟 Executive Summary

**SentinelAI** bridges the dangerous gap between high-volume passive security alerts and microsecond autonomous containment. Modern Security Operations Centers (SOCs) are overwhelmed by alert fatigue, fragmented log silos, and slow manual response times (averaging 42+ minutes). 

SentinelAI continuously inspects ingress network flow vectors, executes **Dual-Model ML classification** (Random Forest for signature matching + XGBoost for anomaly probability), calculates an explainable **0–100 composite risk score**, automatically deploys dynamic firewall ACL rules (`AUTO-XXXX`), enforces **802.1X / PMF Wireless Restrictions**, executes **4-Layer Kernel eBPF/XDP Interception**, and manages incidents through a structured lifecycle with real-time SIEM indexing, Geo-IP threat mapping, voice alerts, and executive PDF audit logging.

---

## 📶 Enterprise Wi-Fi & Wireless Restrictions Perimeter

Located prominently in the **SOC Dashboard Command Center** ([`WiFiRestrictionsCard.tsx`](src/components/dashboard/WiFiRestrictionsCard.tsx)), this module enforces strict zero-trust wireless containment policies, real-time RF frequency spectrum monitoring, and unauthorized client isolation:

### 🛡️ 6 Active Zero-Trust Wireless Policies:
1. **Client-to-Client AP Isolation**: Enforces hardware Layer 2 client isolation on all Access Points. Prevents infected endpoints from scanning subnets, executing ARP spoofing/poisoning, or moving laterally.
2. **Strict 802.1X MAC Whitelist**: All wireless connections require an enterprise RADIUS handshake and hardware MAC address registration. Unregistered MAC addresses receive immediate automated 802.11 Deauthentication frames.
3. **Rogue AP & Evil Twin Shield**: Continuously listens for rogue BSSIDs broadcasting the corporate SSID. When detected, automated RF counter-measures jam the rogue beacon and alert SOC operators.
4. **Protected Management Frames (PMF / 802.11w)**: Cryptographically signs wireless management frames to completely neutralize Wi-Fi deauth/disassociation attacks and WPA handshake sniffing.
5. **5.0 GHz Spectrum Enforcement Only**: Disables legacy 2.4 GHz bands across corporate zones to eliminate long-range parking-lot sniffing, legacy WEP/WPA fallback vulnerabilities, and RF channel noise.
6. **Dynamic Guest Bandwidth Throttling**: Strict 15 Mbps rate cap per guest client with complete egress port blocking (only outbound TCP `80` and `443` permitted).

### 📡 Interactive Features:
* **Live RF Frequency Sweep Scanner**: Real-time animated radar sweep displaying active channels (`CH 36`, `CH 44`, `CH 149`), 5.0 GHz spectrum telemetry, and noise floor diagnostics (`-92 dBm`).
* **Hardware MAC Registration Modal**: SOC leads can register new corporate laptops, phones, and IoT sensors with custom device name, department attribution, and hardware MAC address whitelisting.
* **Instant RF Lockdown Protocol**: One-click emergency trigger that drops all guest networks and locks corporate wireless down to TS-SCI clearance hardware only.

---

## 🛡️ How the Firewall Stops Attacks (4-Layer Technical Mechanics)

Located in the **Adaptive Firewall Command Center** ([`FirewallInterceptionMechanics.tsx`](src/components/firewall/FirewallInterceptionMechanics.tsx)), this section provides an in-depth technical breakdown and interactive live simulator showing exactly how SentinelAI neutralizes threats across 4 autonomous containment layers:

```
[ Ingress Malicious Packet Stream ]
                 │
  ┌──────────────▼──────────────┐
  │ Layer 1: eBPF / XDP Kernel  │  ─── Volumetric DDoS / SYN Floods ───► [ ⚡ DROP in NIC Space < 0.05ms ]
  └──────────────┬──────────────┘
                 │ (Stateful TCP inspection)
  ┌──────────────▼──────────────┐
  │ Layer 2: TCP RST Injection  │  ─── Brute Force / SSH Surges ───────► [ ⚡ Socket Terminated < 1.2ms ]
  └──────────────┬──────────────┘
                 │ (Reconnaissance / Scanners)
  ┌──────────────▼──────────────┐
  │ Layer 3: Honeypot Decoy DNAT│  ─── Port Scans / Directory Traversal ─► [ ⚡ Diverted to Decoy Sandbox ]
  └──────────────┬──────────────┘
                 │ (Advanced Persistent Threats)
  ┌──────────────▼──────────────┐
  │ Layer 4: BGP Flowspec Null  │  ─── Malicious CIDR / Tor Exfiltration ──► [ ⚡ Dropped at ISP Edge Tier ]
  └─────────────────────────────┘
```

### 1️⃣ Layer 1: eBPF / XDP Kernel Drop (`< 0.05ms` Latency)
* **Target Attack Vectors**: Volumetric DDoS, SYN Floods, UDP Amplification, ICMP Death Floods.
* **Technical Mechanism**: Bypasses the Linux kernel network stack (`sk_buff`) entirely. Attaches byte-code hooks directly to the network interface card (NIC) driver ring buffer via **eXpress Data Path (XDP)**. Malicious IP packets matching composite risk criteria are dropped in hardware memory space before consuming CPU cycles.

### 2️⃣ Layer 2: Stateful TCP RST & Socket Termination (`< 1.2ms` Latency)
* **Target Attack Vectors**: SSH Credential Stuffing, Database Brute Force, Malicious API Floods.
* **Technical Mechanism**: Injects spoofed bidirectional TCP packets with the `RST` (Reset) and `ACK` flags enabled into both the adversary and server sockets. Instantly closes the TCP three-way handshake, tears down the active socket descriptor, and prevents further authentication attempts.

### 3️⃣ Layer 3: Honeypot Decoy Redirection (`< 3.8ms` Latency)
* **Target Attack Vectors**: Nmap Port Scans, Directory Traversal, Zero-Day Exploit Probes.
* **Technical Mechanism**: Transparently rewrites ingress IP destination headers (`DNAT`) to steer suspicious scanning packets into an isolated, instrumented Docker decoy honeypot (`192.168.100.245`). The adversary interacts with fake vulnerable services while SentinelAI logs their TTPs (Tactics, Techniques, and Procedures).

### 4️⃣ Layer 4: BGP Blackholing & Upstream Null-Routing (`< 12.0ms` Latency)
* **Target Attack Vectors**: Advanced Persistent Threats (APTs), Tor Exit Exfiltration, Malicious Autonomous Systems (ASNs).
* **Technical Mechanism**: Automatically broadcasts RFC 5575 BGP Flowspec update advertisements to upstream Tier-1 Internet Service Providers. Diverts the attacker's entire `/24` or `/32` IP prefix into `Null0` routing blackholes across international peering exchanges.

### 🕹️ Interactive Multi-Stage Mitigation Simulator:
* Select any live attack vector (**Volumetric SYN Flood**, **SSH Brute-Force Surge**, **Nmap Stealth Port Sweep**, **Tor Ransomware Exfil**).
* Watch the **multi-stage visual execution pipeline** (Signature Ingest $\rightarrow$ ML Inference $\rightarrow$ Layered Interception $\rightarrow$ Dynamic ACL Synthesis).
* View real-time mitigation logs, latency diagnostics, and automatically generated firewall rules (`AUTO-XXXX`).

---

## ⚡ Real-Time 10-Second Live Telemetry Engine

The entire SOC Command Center updates dynamically on an **exact 10-second cadence**:
* **Rolling Packet Accumulator**: Automatically adds `+18` to `+52` real packets every 10 seconds into `stats.totalEvents` (`18,600+` baseline).
* **Precise 1-Second Countdown Ticker**: Visual progress bar (`00:10s` down to `00:01s` $\rightarrow$ `FLASH SYNC`).
* **Synchronized Metric Jitter**: All **7 KPI metrics** (Total Events, Threats Detected, Active Incidents, High Risk Events, Blocked Sources, Monitored Sockets, Avg Risk Score) and their delta tags update in real time.
* **Ingress Arrival Pulse**: Top telemetry banner triggers a green laser beam animation (`emerald-400` $\rightarrow$ `cyan-400`) and the incident table highlights the newest arriving event row.
* **MongoDB Ingestion**: Every 10-second batch is asynchronously mirrored to the MongoDB backend (`POST http://localhost:5000/api/live-stream/ingest`).

---

## 🌐 Live Global Cyber Attack Map

A full-screen interactive cyber threat map embedded directly into the SOC Dashboard:
* **Interactive World Canvas**: Dark glassmorphic vector world map displaying incoming threat vectors from global adversary nodes (Frankfurt, Shanghai, Moscow, São Paulo, Amsterdam, Singapore, San Jose).
* **Animated Trajectory Arcs**: Pulsing laser projectile curves flying from adversary coordinates towards the **SentinelAI SOC Honeypot [US-East]**.
* **Intercepted Origin Inspector**: Click any attacker node to inspect Geo-IP, throughput rate (e.g. `2.4 GB/s`), attack vector (e.g. `SYN Port Sweep`, `SSH Surge`), and mitigation status.

---

## 🗣️ AI Voice Alert Announcer (Web Speech API)

High-tech voice synthesis for hands-free SOC operational awareness:
* **Speech Synthesis Engine**: Built on the native Web Speech API (zero cloud latency).
* **Automated Announcements**: Verbally announces high/critical threat detections and firewall quarantine deployments in real time.
* **TopNav Audio/Voice Toggle**: Includes a dedicated **Voice Toggle Button (`🔊 / 🔇`)** in the top navigation bar to enable or mute voice alerts anytime.

---

## ⚔️ Interactive MITRE ATT&CK Matrix Navigator

Integrated MITRE ATT&CK Enterprise Framework (v14):
* **6 Tactic Columns**: *Reconnaissance (TA0043)*, *Initial Access (TA0001)*, *Credential Access (TA0006)*, *Defense Evasion (TA0005)*, *Exfiltration (TA0010)*, *Impact / DoS (TA0040)*.
* **Live Tactic Mapping**: Active threat signatures automatically highlight matching technique cards with pulsating `ACTIVE` badges.
* **Technique Detail Modal**: Click any technique (e.g., `T1595 - Port Scanning`, `T1110 - Brute Force`, `T1498 - Network DoS`) to view adversary descriptions and the **SentinelAI Automated Countermeasure**.

---

## 📄 One-Click SOC Executive PDF Audit Exporter

Generates high-fidelity, printable executive cybersecurity compliance audit reports:
* **Classification Stamp**: `TS-SCI // ALPHA-9 • SOC COMPLIANCE AUDIT` with SHA256 cryptographic digest.
* **Executive Summary**: Overview of total ingress packets, detected threats, and posture score.
* **Active Threat Signatures Table**: ML model confidence ratings, target ports, and mitigation actions.
* **Adaptive Firewall ACL Table**: Active auto-enforced rules (`AUTO-XXXX`) and drop policies.
* **SIEM Forensic Log Table**: Timestamped audit trail for regulatory compliance.
* **Direct Print / PDF Download**: Automatically opens the browser print & save-as-PDF dialog.

---

## 🌐 Project Landing Page & Showcase

Access the dedicated **Project Showcase Landing Page** (`/landing` or toggle from TopNav):
* **SaaS Hero Presentation**: Mission overview, core defense stats, and feature breakdowns.
* **Problem vs. Solution Comparison**: Side-by-side breakdown of traditional security vs. SentinelAI.
* **6-Phase Pipeline Flowchart**: Visual diagram from Ingress Telemetry to AI Copilot Triage.
* **Interactive Navigation**: Switch between Project Showcase and SOC Dashboard instantly.

---

## 🔐 Single Login & Fast Clearance Authentication

Streamlined, zero-friction authentication:
* **Single User Profile**: Pre-configured for **`USER`** (`user@sentinelai.sec` / `demo1234`).
* **Clearance Level**: `TS-SCI // ALPHA-9` • Role: `SOC Lead`.
* **Snappy Authentication Pipeline**: Fast ~400ms multi-step terminal verification with confetti celebration.

---

## ✨ Core Security Platform Modules

| Module | Route | Key Capabilities |
| :--- | :--- | :--- |
| **SOC Dashboard** | [`/`](src/app/page.tsx) | Live 10s telemetry ribbon, Wi-Fi Restrictions Card, Global Attack Map, MITRE ATT&CK Matrix, KPIGrid, Incident History. |
| **Adaptive Firewall** | [`/firewall`](src/app/firewall/page.tsx) | 4-Layer Interception Mechanics breakdown, live interactive simulator, dynamic ACL synthesis (`AUTO-XXXX`), rule toggle/delete. |
| **Live Traffic** | [`/traffic`](src/app/traffic/page.tsx) | Real-time bandwidth charts, Deep Packet Inspection (DPI) stream, protocol entropy metrics. |
| **AI Threat Intelligence** | [`/threats`](src/app/threats/page.tsx) | Dual-model ML inference (Random Forest + XGBoost), feature vectors, MITRE ATT&CK matrix. |
| **Incident Response** | [`/incidents`](src/app/incidents/page.tsx) | 6-stage lifecycle tracking (`Detected` $\rightarrow$ `Contained` $\rightarrow$ `Resolved`), IP isolation actions. |
| **SIEM Lakehouse** | [`/siem`](src/app/siem/page.tsx) | Multi-filter audit query bar, raw packet JSON inspector, exportable logs. |
| **URL Security Shield** | [`/url-security`](src/app/url-security/page.tsx) | Heuristic domain scanner, character entropy scoring, phishing detection, SIEM push. |
| **Posture Analytics** | [`/analytics`](src/app/analytics/page.tsx) | Dynamic security posture index gauge, attack category distribution. |
| **Tactical Simulator** | [`/simulator`](src/app/simulator/page.tsx) | 4 multi-stage attack scenarios (Port Scan, Brute Force, DoS, Anomaly) with interactive playback. |
| **AI SOC Copilot** | `TopNav` Drawer | Interactive cybersecurity assistant for threat triage, firewall rule advice, and MITRE mapping. |

---

## 💾 Sample MongoDB Real-Time Ingest Backend

An optional lightweight Express/Mongoose backend (`backend/`):
* **Database URI**: `mongodb://127.0.0.1:27017/sentinelai_db`
* **Models**: `NetworkEvent.js`, `Threat.js`, `FirewallRule.js`, `SIEMEvent.js`
* **Live Ingestion Endpoint**: `POST /api/live-stream/ingest`
* **Real-Time Stream Generator**: `node backend/liveStreamGenerator.js`

---

## 📊 Feature Vector & Composite Risk Math

SentinelAI evaluates 10 flow features per packet:
$$\vec{x} = [\text{pktCount}, \text{bytes}, \text{connRate}, \text{uniquePorts}, \text{synRatio}, \text{entropy}, \text{geoRisk}, \text{failAuth}, \text{protoAnomaly}, \text{burstDensity}]$$

### Composite Risk Formulation:
$$\text{RiskScore} = \min(100, \max(0, 0.35 \cdot S_{\text{RF}} + 0.35 \cdot A_{\text{XGB}} + 0.15 \cdot E_{\text{entropy}} + 0.15 \cdot H_{\text{heuristic}}))$$

---

## 🚀 Quick Start & Execution

### 1. Start the Next.js Frontend
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Optional: Start the MongoDB Backend
```bash
cd backend
npm install
node seed.js    # Seed sample database
npm start       # Start API server on http://localhost:5000
```

---

## ⚖️ Security Demonstration Disclaimer

*SentinelAI is a cybersecurity Security Operations Center (SOC) demonstration built for educational, technical evaluation, and hackathon presentation purposes. All network packet telemetry, AI ML classifications, automated firewall ACL rules, and SIEM logs are generated and processed within a secure browser evaluation sandbox.*

<div align="center">
<b>SentinelAI Autonomous SOC • Detect. Analyze. Score. Respond. Protect.</b>
</div>
