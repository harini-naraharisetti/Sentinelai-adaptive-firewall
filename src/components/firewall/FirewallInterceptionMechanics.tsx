'use client';

import React, { useState } from 'react';
import { 
  ShieldBan, 
  Cpu, 
  Zap, 
  Radio, 
  Layers, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Terminal,
  Server,
  Play,
  Crosshair
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { playCyberSound } from '../../services/soundEffects';

export const FirewallInterceptionMechanics: React.FC = () => {
  const { addToast } = useSecurity();
  const [activeTab, setActiveTab] = useState<'ebpf' | 'tcprst' | 'honeypot' | 'bgp'>('ebpf');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLog, setSimLog] = useState<string>('System idle. Ready for real-time packet interception demonstration.');

  const runInterceptionDemo = (type: 'ebpf' | 'tcprst' | 'honeypot' | 'bgp') => {
    setActiveTab(type);
    setIsSimulating(true);
    playCyberSound('tick');

    if (type === 'ebpf') {
      setSimLog('⚡ [eBPF/XDP] Inspecting raw NIC driver frame from 10.0.0.25... Packet DROPPED in 0.04ms before kernel memory allocation!');
      setTimeout(() => {
        playCyberSound('blockSuccess');
        setIsSimulating(false);
        addToast({
          title: 'eBPF / XDP Kernel Drop Simulated',
          message: 'Malicious frame dropped at NIC driver layer. 0 CPU cycle overhead.',
          type: 'success'
        });
      }, 1000);
    } else if (type === 'tcprst') {
      setSimLog('🛡️ [TCP RST Injection] Attacker Port 22 SSH socket detected. Injecting TCP RST sequence flag... Socket terminated!');
      setTimeout(() => {
        playCyberSound('blockSuccess');
        setIsSimulating(false);
        addToast({
          title: 'TCP RST Socket Kill Executed',
          message: 'Injected TCP Reset flag. Attacker session killed & AUTO-0042 ACL rule deployed.',
          type: 'critical'
        });
      }, 1000);
    } else if (type === 'honeypot') {
      setSimLog('🎭 [Deceptive NAT Redirection] Nmap port scan detected from 10.0.0.38. Diverting traffic to isolated honeypot sandbox...');
      setTimeout(() => {
        playCyberSound('success');
        setIsSimulating(false);
        addToast({
          title: 'Attacker Diverted to Honeypot',
          message: 'Production servers protected. Attacker trapped in decoy sandbox logging forensic payloads.',
          type: 'info'
        });
      }, 1000);
    } else if (type === 'bgp') {
      setSimLog('🌐 [BGP Blackholing] Volumetric DoS burst detected (>50,000 pps). Announcing BGP null-route to upstream ISP...');
      setTimeout(() => {
        playCyberSound('blockSuccess');
        setIsSimulating(false);
        addToast({
          title: 'Upstream BGP Blackhole Engaged',
          message: 'Attacker IP null-routed at ISP tier before reaching edge gateway.',
          type: 'critical'
        });
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/80 font-sans space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-brand-sm">
            <ShieldBan className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                How the Adaptive AI Firewall Stops Attacks
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                4 ENFORCEMENT LAYERS
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Deep-dive technical mechanics: From kernel eBPF packet drops to automated dynamic ACL rule deployment
            </p>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 text-white px-3.5 py-1.5 rounded-2xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Active Response Engine: <strong className="text-emerald-400">ARMED</strong></span>
        </div>
      </div>

      {/* 4 Enforcement Layers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Layer 1: eBPF / XDP Kernel Drop */}
        <div 
          onClick={() => runInterceptionDemo('ebpf')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
            activeTab === 'ebpf' 
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]' 
              : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-900'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'ebpf' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-200 text-slate-700'
              }`}>
                LAYER 1 • KERNEL
              </span>
              <Cpu className={`w-4 h-4 ${activeTab === 'ebpf' ? 'text-emerald-400' : 'text-slate-600'}`} />
            </div>
            <h4 className="font-extrabold text-sm">eBPF / XDP Packet Drop</h4>
            <p className={`text-xs mt-1.5 leading-relaxed ${activeTab === 'ebpf' ? 'text-slate-300' : 'text-slate-600'}`}>
              Drops malicious packets directly inside the Network Interface Card (NIC) driver before allocating CPU kernel memory (&lt; 0.05ms).
            </p>
          </div>

          <div className={`pt-2 border-t text-[11px] font-mono font-bold flex items-center justify-between ${
            activeTab === 'ebpf' ? 'border-slate-800 text-emerald-400' : 'border-slate-200 text-[#00875a]'
          }`}>
            <span>Speed: &lt; 0.05ms</span>
            <span>Click to Test ❯</span>
          </div>
        </div>

        {/* Layer 2: TCP Reset (RST) Socket Kill */}
        <div 
          onClick={() => runInterceptionDemo('tcprst')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
            activeTab === 'tcprst' 
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]' 
              : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-900'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'tcprst' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-200 text-slate-700'
              }`}>
                LAYER 2 • TRANSPORT
              </span>
              <Zap className={`w-4 h-4 ${activeTab === 'tcprst' ? 'text-rose-400' : 'text-slate-600'}`} />
            </div>
            <h4 className="font-extrabold text-sm">TCP RST Socket Termination</h4>
            <p className={`text-xs mt-1.5 leading-relaxed ${activeTab === 'tcprst' ? 'text-slate-300' : 'text-slate-600'}`}>
              Injects immediate TCP Reset (RST) control flags to sever active brute-force or SSH credential attacks in real time.
            </p>
          </div>

          <div className={`pt-2 border-t text-[11px] font-mono font-bold flex items-center justify-between ${
            activeTab === 'tcprst' ? 'border-slate-800 text-rose-400' : 'border-slate-200 text-rose-600'
          }`}>
            <span>Socket Kill: Instant</span>
            <span>Click to Test ❯</span>
          </div>
        </div>

        {/* Layer 3: Deceptive Honeypot Redirection */}
        <div 
          onClick={() => runInterceptionDemo('honeypot')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
            activeTab === 'honeypot' 
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]' 
              : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-900'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'honeypot' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-200 text-slate-700'
              }`}>
                LAYER 3 • APPLICATION
              </span>
              <Crosshair className={`w-4 h-4 ${activeTab === 'honeypot' ? 'text-cyan-400' : 'text-slate-600'}`} />
            </div>
            <h4 className="font-extrabold text-sm">Honeypot Sandbox Decoy</h4>
            <p className={`text-xs mt-1.5 leading-relaxed ${activeTab === 'honeypot' ? 'text-slate-300' : 'text-slate-600'}`}>
              Port scans and reconnaissance probes are transparently rerouted to synthetic honeypots to log payload signatures without risk.
            </p>
          </div>

          <div className={`pt-2 border-t text-[11px] font-mono font-bold flex items-center justify-between ${
            activeTab === 'honeypot' ? 'border-slate-800 text-cyan-400' : 'border-slate-200 text-cyan-700'
          }`}>
            <span>Deception: Active</span>
            <span>Click to Test ❯</span>
          </div>
        </div>

        {/* Layer 4: Upstream BGP Null-Routing */}
        <div 
          onClick={() => runInterceptionDemo('bgp')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
            activeTab === 'bgp' 
              ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-[1.02]' 
              : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-900'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'bgp' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-200 text-slate-700'
              }`}>
                LAYER 4 • NETWORK EDGE
              </span>
              <Flame className={`w-4 h-4 ${activeTab === 'bgp' ? 'text-amber-400' : 'text-slate-600'}`} />
            </div>
            <h4 className="font-extrabold text-sm">BGP Blackhole / Null-Route</h4>
            <p className={`text-xs mt-1.5 leading-relaxed ${activeTab === 'bgp' ? 'text-slate-300' : 'text-slate-600'}`}>
              For volumetric DoS surges (&gt; 40,000 pps), the firewall broadcasts BGP community null-routes to discard traffic at ISP transit tier.
            </p>
          </div>

          <div className={`pt-2 border-t text-[11px] font-mono font-bold flex items-center justify-between ${
            activeTab === 'bgp' ? 'border-slate-800 text-amber-400' : 'border-slate-200 text-amber-700'
          }`}>
            <span>DDoS Cap: &gt; 100 Gbps</span>
            <span>Click to Test ❯</span>
          </div>
        </div>

      </div>

      {/* Interactive Interception Terminal Simulator */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-bold">FIREWALL PACKET INTERCEPTION KERNEL LOG</span>
          </div>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE TELEMETRY
          </span>
        </div>

        <div className="text-emerald-300 py-1 font-semibold flex items-center gap-2">
          <span className="text-emerald-500 font-bold">❯</span>
          <span className={isSimulating ? 'animate-pulse text-white' : ''}>{simLog}</span>
        </div>
      </div>

    </div>
  );
};
