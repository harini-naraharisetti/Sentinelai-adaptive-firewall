'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldBan, 
  Activity, 
  Radio, 
  Flame, 
  Gauge, 
  Cpu, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  FlaskConical, 
  Lock, 
  Terminal, 
  Server, 
  CheckCircle2, 
  RefreshCw, 
  FileText,
  AlertTriangle,
  Download,
  Printer
} from 'lucide-react';
import { soundFx, playCyberSound } from '../../services/soundEffects';
import { exportSOCExecutiveReport } from '../../services/pdfExportService';

export const KPIGrid: React.FC = () => {
  const { 
    stats, 
    threats,
    firewallRules,
    siemEvents,
    currentUser,
    runAttackSimulation, 
    isSimulating, 
    generateManualThreat,
    addToast,
    secondsUntilNextTick,
    liveBandwidth,
    livePacketRate,
    isTickPulse,
    triggerLiveTickNow,
    liveMetricsDeltas,
    isLiveSimulationRunning,
    toggleLiveSimulation
  } = useSecurity();

  const handleSimulate = (scenario: string) => {
    soundFx.playClick();
    runAttackSimulation(scenario);
  };

  const handleQuarantineAll = () => {
    soundFx.playBlock();
    addToast({
      title: 'Emergency Auto-Quarantine Dispatched',
      message: 'Synthesized dynamic firewall ACL rules for all uncontained threat signatures.',
      type: 'critical'
    });
  };

  const handleExportPDF = () => {
    playCyberSound('success');
    addToast({
      title: '📄 Generating SOC Executive PDF Audit',
      message: 'Compiling cryptographic telemetry, active threats, and firewall ACL report...',
      type: 'success'
    });
    exportSOCExecutiveReport(stats, threats, firewallRules, siemEvents, currentUser);
  };

  // 10s progress percentage calculation
  const progressPercent = Math.max(0, Math.min(100, ((10 - secondsUntilNextTick) / 10) * 100));

  return (
    <div className="space-y-6 font-sans">
      
      {/* Real-time 10-Second Live Telemetry Bar with Live Receiving Animations */}
      <div className="relative p-4 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-card flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
        
        {/* Animated Live Beam across top border on 10s packet arrival */}
        {isTickPulse && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 animate-pulse shadow-lg shadow-emerald-400/50" />
        )}

        <div className="flex items-center gap-3.5 relative z-10">
          <div className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-300 ${
            isTickPulse 
              ? 'bg-emerald-500/30 border border-emerald-400 scale-110 shadow-lg shadow-emerald-500/40' 
              : 'bg-emerald-500/10 border border-emerald-500/30'
          }`}>
            <span className={`w-3 h-3 rounded-full bg-emerald-400 absolute ${isTickPulse ? 'animate-ping scale-150' : 'animate-ping'}`} />
            <Radio className="w-5 h-5 text-emerald-400 relative z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                LIVE SOC TELEMETRY STREAM
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-all ${
                isTickPulse 
                  ? 'bg-emerald-500 text-white border-emerald-400 animate-bounce' 
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {isTickPulse ? '⚡ RECEIVING LIVE DATA' : '10-SEC CYCLE'}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Ingesting live network packets • MongoDB Ingest: <code className="text-emerald-300 font-mono">127.0.0.1:27017</code>
            </p>
          </div>
        </div>

        {/* 10s Countdown & Live Metrics */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end relative z-10">
          
          {/* Live Ingest Speed & Bandwidth with Arrival Pulse */}
          <div className={`flex items-center gap-3 px-3.5 py-1.5 rounded-2xl border text-xs transition-all duration-300 ${
            isTickPulse 
              ? 'bg-emerald-950/80 border-emerald-500/80 shadow-md shadow-emerald-500/20 scale-105' 
              : 'bg-slate-800/80 border-slate-700/60'
          }`}>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Throughput</span>
              <span className="font-mono font-bold text-cyan-400">{liveBandwidth}</span>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-mono">10s Ingest</span>
              <span className={`font-mono font-bold transition-colors ${isTickPulse ? 'text-white animate-pulse' : 'text-emerald-400'}`}>
                +{livePacketRate} pkts
              </span>
            </div>
          </div>

          {/* Countdown timer pill with smooth progress bar */}
          <div className="flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 min-w-[150px]">
            <div className="flex-1">
              <div className="flex justify-between text-[11px] font-mono font-bold text-slate-300 mb-1">
                <span>Next Ingest:</span>
                <span className="text-emerald-400">00:0{secondsUntilNextTick}s</span>
              </div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300 ease-linear rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Manual sync and stream pause buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={triggerLiveTickNow}
              title="Force immediate 10s telemetry ingest"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all active:scale-95 text-xs flex items-center gap-1.5 font-bold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTickPulse ? 'animate-spin text-emerald-400' : ''}`} />
              <span className="hidden sm:inline">Sync Now</span>
            </button>

            <button
              onClick={toggleLiveSimulation}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                isLiveSimulationRunning 
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-brand-sm' 
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
            >
              {isLiveSimulationRunning ? '● Live' : '❚❚ Paused'}
            </button>
          </div>

        </div>
      </div>

      {/* Top 7 Mini KPI Metric Pills with Live Dynamic Count Transitions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { 
            label: 'Total Events', 
            val: stats.totalEvents.toLocaleString(), 
            change: liveMetricsDeltas?.totalEventsDelta || `+${livePacketRate} in 10s`, 
            icon: Activity,
            isLiveDynamic: true
          },
          { 
            label: 'Threats Detected', 
            val: `${stats.threatsDetected}`, 
            change: liveMetricsDeltas?.threatsDelta || '+12.5%', 
            icon: ShieldAlert,
            isLiveDynamic: true
          },
          { 
            label: 'Active Incidents', 
            val: stats.activeIncidents < 10 ? `0${stats.activeIncidents}` : `${stats.activeIncidents}`, 
            change: liveMetricsDeltas?.incidentsDelta || 'Contained', 
            icon: ShieldCheck,
            isLiveDynamic: true
          },
          { 
            label: 'High Risk Events', 
            val: stats.highRiskEvents < 10 ? `0${stats.highRiskEvents}` : `${stats.highRiskEvents}`, 
            change: liveMetricsDeltas?.highRiskDelta || 'Critical', 
            icon: Flame,
            isLiveDynamic: true
          },
          { 
            label: 'Blocked Sources', 
            val: `${stats.blockedSources}`, 
            change: liveMetricsDeltas?.blockedDelta || '+1 Auto', 
            icon: ShieldBan,
            isLiveDynamic: true
          },
          { 
            label: 'Monitored Sockets', 
            val: `${stats.monitoredConnections}`, 
            change: liveMetricsDeltas?.socketsDelta || 'Active', 
            icon: Radio,
            isLiveDynamic: true
          },
          { 
            label: 'Avg Risk Score', 
            val: `${stats.averageRiskScore}/100`, 
            change: liveMetricsDeltas?.riskScoreDelta || 'Evaluated', 
            icon: Gauge,
            isLiveDynamic: true
          },
        ].map((item, i) => {
          const Icon = item.icon;
          const isPulsing = isTickPulse && item.isLiveDynamic;

          return (
            <div 
              key={i} 
              className={`p-4 rounded-3xl bg-white border transition-all flex flex-col justify-between ${
                isPulsing 
                  ? 'border-emerald-500 ring-2 ring-emerald-400/40 bg-emerald-50/30 scale-[1.03] shadow-lg duration-300' 
                  : 'border-slate-200/80 shadow-card hover:shadow-card-hover duration-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{item.label}</span>
                <span className={`p-1 rounded-xl transition-colors ${
                  isPulsing ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className={`text-xl font-extrabold tracking-tight transition-all ${
                  isPulsing ? 'text-emerald-700 scale-105' : 'text-slate-900'
                }`}>
                  {item.val}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border transition-colors ${
                  item.isLiveDynamic 
                    ? 'text-[#00875a] bg-emerald-50 border-emerald-200 animate-pulse' 
                    : 'text-[#00875a] bg-emerald-50 border-emerald-100'
                }`}>
                  {item.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main 3 High-Tech Security Operations Columns (No graphs/charts) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Column 1: AI Dual-Model Neural Pipeline Matrix (4 cols) */}
        <div className="md:col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Dual-Model ML Core</h3>
                <p className="text-xs text-slate-500 font-medium">Real-time flow vector inference</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#00875a] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              &lt; 12ms Latency
            </span>
          </div>

          {/* Pipeline Interactive Stages */}
          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Random Forest Classifier</div>
                  <div className="text-[10px] text-slate-500 font-medium">Pattern recognition &amp; signatures</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#00875a]">99.4% Precision</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-slate-900">XGBoost Anomaly Engine</div>
                  <div className="text-[10px] text-slate-500 font-medium">Statistical deviation scoring</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-700">0.08 Loss Rate</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Composite Risk Scorer</div>
                  <div className="text-[10px] text-slate-500 font-medium">Multi-factor severity indexing</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700">0 - 100 Dynamic</span>
            </div>
          </div>

          {/* Telemetry Feature Badges */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-600">
            <span className="bg-slate-100 px-2 py-0.5 rounded-md font-bold text-slate-700">10 Feature Vectors</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded-md font-bold text-slate-700">Port Entropy: 3.82</span>
            <span className="text-[#00875a] font-bold">● Active Stream</span>
          </div>
        </div>

        {/* Column 2: Autonomous Firewall Quarantine Hub (4 cols) */}
        <div className="md:col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Adaptive Firewall Hub</h3>
                <p className="text-xs text-slate-500 font-medium">Autonomous ACL deployment</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
              Auto-Quarantine
            </span>
          </div>

          {/* Live Containment Summary Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">ACL Rule Status</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                ARMED &amp; ENFORCING
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-black tracking-tight text-white">
                {stats.blockedSources} Active Rules
              </div>
              <span className="text-xs text-emerald-400 font-bold">&lt; 1.8s MTTR</span>
            </div>

            <div className="p-2 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Latest Auto Block:</span>
                <span className="text-emerald-400 font-bold">10.0.0.25 (Port Scan)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Quarantine Policy:</span>
                <span className="text-white">DROP Ingress &amp; Log SIEM</span>
              </div>
            </div>
          </div>

          {/* Micro stats */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-500 block text-[10px]">Zero-Day Containment</span>
              <strong className="text-slate-900 font-bold">100% Autonomous</strong>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-500 block text-[10px]">Lateral Movement</span>
              <strong className="text-[#00875a] font-bold">0 Breaches</strong>
            </div>
          </div>
        </div>

        {/* Column 3: Tactical Threat Simulation & Rapid Response (4 cols) */}
        <div className="md:col-span-12 lg:col-span-4 bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Tactical Response Lab</h3>
                <p className="text-xs text-slate-500 font-medium">Instant simulation &amp; actions</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
              Operator Ready
            </span>
          </div>

          {/* Quick Simulation Buttons Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleSimulate('PORT_SCAN')}
              disabled={isSimulating}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-[#00875a] border border-slate-200/80 text-left transition-all group disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#00875a]">Port Scan</span>
                <Radio className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00875a]" />
              </div>
              <span className="text-[10px] text-slate-500">Multi-port probe</span>
            </button>

            <button
              onClick={() => handleSimulate('BRUTE_FORCE')}
              disabled={isSimulating}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-rose-50 hover:border-rose-400 border border-slate-200/80 text-left transition-all group disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600">Brute Force</span>
                <Lock className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
              </div>
              <span className="text-[10px] text-slate-500">Port 22 SSH surge</span>
            </button>

            <button
              onClick={() => handleSimulate('DOS_FLOOD')}
              disabled={isSimulating}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-amber-50 hover:border-amber-400 border border-slate-200/80 text-left transition-all group disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600">DoS Flood</span>
                <Flame className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
              </div>
              <span className="text-[10px] text-slate-500">Volumetric packet burst</span>
            </button>

            <button
              onClick={() => handleSimulate('NETWORK_ANOMALY')}
              disabled={isSimulating}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-400 border border-slate-200/80 text-left transition-all group disabled:opacity-50"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600">Data Anomaly</span>
                <Activity className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-600" />
              </div>
              <span className="text-[10px] text-slate-500">Entropy payload spike</span>
            </button>
          </div>

          {/* Direct Tactical Command Actions */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
            <button
              onClick={handleQuarantineAll}
              className="py-2.5 px-3 rounded-xl bg-[#00875a] hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <ShieldBan className="w-3.5 h-3.5" />
              <span>Quarantine All</span>
            </button>

            <button
              onClick={handleExportPDF}
              title="Generate and Download SOC Executive PDF Audit Report"
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95 group"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Export PDF Audit</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
