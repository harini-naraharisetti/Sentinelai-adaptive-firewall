'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Crosshair, 
  CheckCircle2, 
  Layers, 
  X, 
  ExternalLink, 
  Flame, 
  Lock, 
  Search, 
  Activity, 
  Sparkles,
  Info
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
  desc: string;
  mitigation: string;
  isTriggered: boolean;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

const MITRE_TACTICS: { name: string; id: string; techniques: MitreTechnique[] }[] = [
  {
    name: 'Reconnaissance',
    id: 'TA0043',
    techniques: [
      { id: 'T1595', name: 'Active Port Scanning', tactic: 'Reconnaissance', desc: 'Adversary scans IP blocks and ports to gather host service vulnerabilities.', mitigation: 'Deploy Adaptive Firewall SYN rate limiter & blackhole scanner IP.', isTriggered: true, severity: 'CRITICAL' },
      { id: 'T1590', name: 'Gather Network Info', tactic: 'Reconnaissance', desc: 'Probing DNS zone files and routing paths.', mitigation: 'Restrict DNS queries and enforce zero-trust egress.', isTriggered: false, severity: 'LOW' }
    ]
  },
  {
    name: 'Initial Access',
    id: 'TA0001',
    techniques: [
      { id: 'T1190', name: 'Exploit Public App', tactic: 'Initial Access', desc: 'Attempting SQLi / command injection against HTTP APIs.', mitigation: 'Enforce WAF signature inspection and sanitize payload parameters.', isTriggered: true, severity: 'HIGH' },
      { id: 'T1566', name: 'Spearphishing Link', tactic: 'Initial Access', desc: 'Malicious domain embedded in email aiming for credential harvesting.', mitigation: 'URL Heuristic Analyzer auto-evaluates character entropy and typosquatting.', isTriggered: true, severity: 'HIGH' }
    ]
  },
  {
    name: 'Credential Access',
    id: 'TA0006',
    techniques: [
      { id: 'T1110', name: 'Brute Force (SSH/RDP)', tactic: 'Credential Access', desc: 'Rapid dictionary authorization attempts against Port 22/3389.', mitigation: 'Automatic fail2ban ACL synthesis after 5 failed authentication attempts.', isTriggered: true, severity: 'CRITICAL' },
      { id: 'T1555', name: 'Credentials from Vault', tactic: 'Credential Access', desc: 'Adversaries search local processes for unencrypted secrets.', mitigation: 'Enforce hardware-backed WebAuthn keys and strict memory isolation.', isTriggered: false, severity: 'MEDIUM' }
    ]
  },
  {
    name: 'Defense Evasion',
    id: 'TA0005',
    techniques: [
      { id: 'T1070', name: 'Indicator Removal', tactic: 'Defense Evasion', desc: 'Deleting host logs to tamper with forensic timeline.', mitigation: 'Immutable append-only SIEM telemetry mirroring with SHA256 hashes.', isTriggered: true, severity: 'MEDIUM' },
      { id: 'T1027', name: 'Obfuscated Payloads', tactic: 'Defense Evasion', desc: 'Payloads encoded in high-entropy base64 or XOR routines.', mitigation: 'Dual-Model ML Anomaly Detector triggers high loss deviation.', isTriggered: true, severity: 'HIGH' }
    ]
  },
  {
    name: 'Exfiltration',
    id: 'TA0010',
    techniques: [
      { id: 'T1048', name: 'Alt-Protocol Exfil', tactic: 'Exfiltration', desc: 'Stealing sensitive database records via encrypted DNS/ICMP tunnels.', mitigation: 'Deep Packet Inspection filters DNS payload sizes > 512 bytes.', isTriggered: true, severity: 'HIGH' },
      { id: 'T1567', name: 'Exfil to Cloud Webhook', tactic: 'Exfiltration', desc: 'Pushing archive data to external unapproved cloud storage.', mitigation: 'Block unauthorized outbound egress sockets.', isTriggered: false, severity: 'LOW' }
    ]
  },
  {
    name: 'Impact / DoS',
    id: 'TA0040',
    techniques: [
      { id: 'T1498', name: 'Network Denial of Service', tactic: 'Impact', desc: 'Volumetric packet flood overwhelming edge load balancers.', mitigation: 'Adaptive Firewall drops ingress traffic bursts surpassing 40,000 pps.', isTriggered: true, severity: 'CRITICAL' },
      { id: 'T1499', name: 'Endpoint Resource Exhaustion', tactic: 'Impact', desc: 'Targeting CPU threads with memory leak loops.', mitigation: 'Process supervisor limits container cgroup quotas.', isTriggered: false, severity: 'MEDIUM' }
    ]
  }
];

export const MitreAttackMatrix: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<MitreTechnique | null>(null);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 font-sans space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-rose-600" />
            <h3 className="font-extrabold text-base text-slate-900 tracking-tight">
              MITRE ATT&amp;CK Matrix Enterprise Framework
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00875a] border border-emerald-200">
              v14 Enterprise
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Live mapping of detected network flow vectors to adversary tactics and automated mitigations
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            6 Live Mapped Tactics
          </span>
        </div>
      </div>

      {/* MITRE Columns Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {MITRE_TACTICS.map((tactic) => (
          <div 
            key={tactic.id} 
            className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/70 flex flex-col space-y-2"
          >
            {/* Tactic Column Header */}
            <div className="pb-2 border-b border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">{tactic.id}</span>
                <span className="text-[10px] font-bold text-slate-600">{tactic.techniques.length} Tech</span>
              </div>
              <h4 className="text-xs font-extrabold text-slate-900 mt-0.5">
                {tactic.name}
              </h4>
            </div>

            {/* Techniques under this Tactic */}
            <div className="space-y-2 flex-1">
              {tactic.techniques.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTech(tech)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer group ${
                    tech.isTriggered
                      ? 'bg-white hover:bg-rose-50/50 border-rose-300 shadow-sm ring-1 ring-rose-200'
                      : 'bg-white hover:bg-slate-100 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-slate-900">
                      {tech.id}
                    </span>
                    {tech.isTriggered && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        tech.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-tight group-hover:text-[#00875a] transition-colors">
                    {tech.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Technique Detail Modal */}
      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white font-mono font-bold text-xs">
                  {selectedTech.id}
                </span>
                <h4 className="font-extrabold text-base text-slate-900">
                  {selectedTech.name}
                </h4>
              </div>
              <button 
                onClick={() => setSelectedTech(null)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase font-mono text-slate-400 block mb-1">
                  MITRE Tactic Category
                </span>
                <strong className="text-slate-900">{selectedTech.tactic}</strong>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase font-mono text-slate-400 block mb-1">
                  Adversary Technique Description
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {selectedTech.desc}
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                <span className="text-[10px] font-bold uppercase font-mono text-emerald-800 block mb-1">
                  🛡️ SentinelAI Automated Countermeasure
                </span>
                <p className="font-semibold leading-relaxed">
                  {selectedTech.mitigation}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedTech(null)}
                className="py-2 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
