'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Terminal, 
  FlaskConical, 
  Radio, 
  Database, 
  Layers, 
  CheckCircle2, 
  KeyRound, 
  Compass, 
  Fingerprint,
  Lock
} from 'lucide-react';
import { soundFx } from '../../services/soundEffects';

export const LandingPage: React.FC = () => {
  const { openLoginModal } = useSecurity();

  const handleLaunchLogin = () => {
    soundFx.playClick();
    openLoginModal('soc_lead@sentinelai.sec');
  };

  return (
    <div className="space-y-16 py-4 font-sans w-full">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-white rounded-3xl p-8 sm:p-12 md:p-16 shadow-card border border-slate-200/90 overflow-hidden text-center space-y-8">
        
        {/* Subtle decorative background gradients */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none" />

        {/* Top Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-[#00875a] text-xs font-bold shadow-sm animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#00875a] animate-ping" />
          <span>SentinelAI 2.0 • AI-Driven Zero-Trust SOC Platform</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            AI-Powered Network Intrusion Detection &amp;{' '}
            <span className="text-[#00875a]">Automated Response</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
            Combines real-time packet flow inspection, Dual-Model Machine Learning (Random Forest + XGBoost), composite risk scoring, adaptive firewall quarantine, and unified SIEM incident investigation into one seamless SOC command center.
          </p>
        </div>

        {/* Primary Call To Actions (Single clean login button) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            onClick={handleLaunchLogin}
            className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#00875a] hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <KeyRound className="w-4 h-4" />
            <span>Sign In to SOC Console</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          <a
            href="#architecture"
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
          >
            <Compass className="w-4 h-4 text-slate-500" />
            <span>Explore Architecture</span>
          </a>
        </div>

        {/* Live Key Metrics Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-slate-100 text-left">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">AI Accuracy</span>
            <div className="text-xl font-black text-slate-900 flex items-center gap-1.5">
              <span>99.4%</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-bold">Dual-Model</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Random Forest + XGBoost</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Detection Speed</span>
            <div className="text-xl font-black text-slate-900">&lt; 12 ms</div>
            <span className="text-[10px] text-slate-500 font-medium">Real-time packet flow rating</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Containment MTTR</span>
            <div className="text-xl font-black text-slate-900">&lt; 1.8s</div>
            <span className="text-[10px] text-slate-500 font-medium">Autonomous ACL deployment</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Safe Sandbox</span>
            <div className="text-xl font-black text-emerald-700">100% Local</div>
            <span className="text-[10px] text-slate-500 font-medium">Zero backend dependencies</span>
          </div>
        </div>

      </section>

      {/* 2. PROBLEM STATEMENT VS. SENTINELAI SOLUTION */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#00875a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Problem &amp; Solution Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why Modern Cybersecurity Demands Autonomous AI Defense
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Bridging the dangerous gap between high-volume passive alerts and rapid, closed-loop containment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Traditional Problem Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-rose-200/80 space-y-5 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600">The Problem</span>
                <h3 className="text-lg font-bold text-slate-900">Traditional Static Security Limits</h3>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>Severe Alert Fatigue:</strong> Over 10,000 unprioritized raw packets &amp; false positives flood analysts daily without risk scoring context.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>Delayed Manual Containment:</strong> Average mean time to quarantine (MTTR) is 42+ minutes, allowing adversaries to move laterally and exfiltrate data.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>Disconnected Tool Silos:</strong> Network logs, firewall rulebases, URL scanners, and SIEM indexes operate in separate disconnected tools.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
                <span className="text-rose-600 font-bold">✕</span>
                <span><strong>Blind to Zero-Day Heuristics:</strong> Rule-based systems fail to spot suspicious domain entropy, abnormal byte flows, or novel port scan patterns.</span>
              </li>
            </ul>
          </div>

          {/* SentinelAI Solution Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-emerald-200/80 space-y-5 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#00875a]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#00875a]">The Solution</span>
                <h3 className="text-lg font-bold text-slate-900">SentinelAI Autonomous Closed-Loop Architecture</h3>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 font-medium">
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                <span><strong>Dual-Model ML Threat Scoring:</strong> Evaluates 10 flow telemetry features using ensemble Random Forest &amp; XGBoost algorithms with confidence metrics.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                <span><strong>Automated Closed-Loop Firewall:</strong> Automatically generates and activates IP/port blocking rules for high-risk threats in microsecond timeframes.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                <span><strong>Unified SIEM &amp; Incident Lifecycle:</strong> Real-time event lakehouse with structured incident tracking from detection to quarantine and resolution.</span>
              </li>
              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                <span><strong>Heuristic URL Scanner &amp; AI SOC Copilot:</strong> Inspects Shannon domain entropy, lexical markers, and provides interactive AI forensic assistance.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. CORE FEATURE PILLARS */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#00875a]">
            <Layers className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            6 Specialized Modules in a Single Unified SOC
          </h2>
          <p className="text-sm text-slate-600 font-medium">
            Explore the complete suite of security defense tools available inside SentinelAI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Pillar 1: ML Engine */}
          <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-3.5 hover:border-[#00875a]/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Dual-Model ML Threat Engine</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Analyzes incoming network flow vectors using simulated Random Forest (pattern matching) and XGBoost (anomaly scoring) with detailed feature breakdowns and confidence levels.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-[#00875a] font-bold">
              <span>View in AI Threats module</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Pillar 2: Adaptive Firewall */}
          <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-3.5 hover:border-[#00875a]/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#00875a] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Adaptive Automated Firewall</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Autonomous rule generation engine that instantaneously converts high-risk threat detections into active IP and port blocking policies with rule hit telemetry tracking.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[#00875a] font-bold text-[11px]">
              <span>Inspect active rulebase</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Pillar 3: SIEM & Incidents */}
          <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-3.5 hover:border-[#00875a]/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Unified SIEM &amp; Incident Desk</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Centralized SIEM event log lakehouse with multi-stage incident tracking (Detected → Investigating → Contained → Resolved), raw JSON log viewer, and exportable reports.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[#00875a] font-bold text-[11px]">
              <span>Access incident timeline</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Pillar 4: URL Scanner */}
          <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-3.5 hover:border-[#00875a]/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Heuristic Zero-Day URL Scanner</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Calculates domain Shannon entropy, detects brand impersonation typosquatting, analyzes TLD risk ratings, and lets analysts dispatch suspicious URLs directly to the SIEM.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[#00875a] font-bold text-[11px]">
              <span>Scan malicious URLs</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Pillar 5: Attack Simulator */}
          <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-3.5 hover:border-[#00875a]/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Multi-Vector Attack Simulator</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Test defenses against 5 simulated cyberattack scenarios (SYN Port Scans, SSH Brute Force, DoS Floods, Anomalies) with a live 10-step progress visualization pipeline.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[#00875a] font-bold text-[11px]">
              <span>Launch live simulation</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Pillar 6: AI Copilot & DEFCON */}
          <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-3.5 hover:border-[#00875a]/50 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#00875a] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900">AI SOC Copilot &amp; DEFCON 1</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Chat in natural language with an AI security co-pilot to triage incidents, explain complex attack vectors, and trigger emergency global DEFCON 1 lockdowns.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[#00875a] font-bold text-[11px]">
              <span>Open copilot assistant</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. ARCHITECTURE & EXECUTION PIPELINE */}
      <section id="architecture" className="bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-slate-200/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#00875a]">
              <Cpu className="w-3.5 h-3.5" />
              <span>System Architecture</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              End-to-End Autonomous Defense Workflow Pipeline
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full self-start">
            6 Sequential Phases
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#00875a] bg-emerald-100 px-2 py-0.5 rounded-full">Phase 1</span>
              <Radio className="w-4 h-4 text-slate-400" />
            </div>
            <h5 className="text-sm font-bold text-slate-900">Live Ingress Ingestion</h5>
            <p className="text-xs text-slate-600">
              Captures real-time packet telemetry, byte rates, packet counts, protocol distributions, and endpoint IPs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#00875a] bg-emerald-100 px-2 py-0.5 rounded-full">Phase 2</span>
              <Activity className="w-4 h-4 text-slate-400" />
            </div>
            <h5 className="text-sm font-bold text-slate-900">Flow Feature Extraction</h5>
            <p className="text-xs text-slate-600">
              Computes 10 normalized statistical flow vectors including syn/ack ratios, burst frequency, and port entropy.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#00875a] bg-emerald-100 px-2 py-0.5 rounded-full">Phase 3</span>
              <Cpu className="w-4 h-4 text-slate-400" />
            </div>
            <h5 className="text-sm font-bold text-slate-900">Dual-Model ML Inference</h5>
            <p className="text-xs text-slate-600">
              Random Forest classifies attack family while XGBoost calculates composite anomaly risk probability.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#00875a] bg-emerald-100 px-2 py-0.5 rounded-full">Phase 4</span>
              <Zap className="w-4 h-4 text-slate-400" />
            </div>
            <h5 className="text-sm font-bold text-slate-900">Adaptive Firewall Quarantine</h5>
            <p className="text-xs text-slate-600">
              For threats with risk &gt; 80, dynamic ACL block rules are auto-generated and dispatched to the active rulebase.
            </p>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#00875a] bg-emerald-100 px-2 py-0.5 rounded-full">Phase 5</span>
              <Database className="w-4 h-4 text-slate-400" />
            </div>
            <h5 className="text-sm font-bold text-slate-900">SIEM Lakehouse Ingestion</h5>
            <p className="text-xs text-slate-600">
              Raw JSON telemetry logs are indexed into the searchable SIEM store with MITRE ATT&amp;CK mappings.
            </p>
          </div>

          {/* Step 6 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#00875a] bg-emerald-100 px-2 py-0.5 rounded-full">Phase 6</span>
              <Sparkles className="w-4 h-4 text-slate-400" />
            </div>
            <h5 className="text-sm font-bold text-slate-900">AI Copilot Forensic Triage</h5>
            <p className="text-xs text-slate-600">
              Security analysts interact with the AI assistant for root cause analysis, mitigation guidance, and reporting.
            </p>
          </div>

        </div>
      </section>

      {/* 5. DEMO ACCESS & AUTHENTICATION SANDBOX */}
      <section className="bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden space-y-6 text-center">
        
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Fingerprint className="w-3.5 h-3.5" />
            <span>Interactive Evaluation Access</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Authenticate into SentinelAI Command Center
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Access pre-configured SOC clearance with real-time ML telemetry, incident triage, and adaptive firewall controls.
          </p>
        </div>

        <div className="max-w-md mx-auto p-5 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-4">
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1 text-left">
            <div className="flex justify-between">
              <span className="text-slate-500">Operator ID:</span>
              <span className="text-slate-200">soc_lead@sentinelai.sec</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Passkey:</span>
              <span className="text-emerald-400">demo1234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Clearance:</span>
              <span className="text-emerald-400">TS-SCI // ALPHA-9</span>
            </div>
          </div>

          <button
            onClick={handleLaunchLogin}
            className="w-full py-3 px-4 rounded-xl bg-[#00875a] hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <KeyRound className="w-4 h-4" />
            <span>Sign In to SOC Workspace</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="p-3 bg-slate-950/70 border border-slate-800 text-xs text-slate-400 leading-relaxed text-center max-w-xl mx-auto rounded-xl">
          <strong className="text-slate-200">100% Client-Side Evaluation:</strong> No backend keys required. All telemetry, ML detection algorithms, and firewall block policies run dynamically in your browser.
        </div>

      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-card border border-slate-200/90 text-center space-y-5">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Ready to Experience Autonomous AI Cyber Defense?
        </h3>
        <p className="text-sm text-slate-600 font-medium max-w-xl mx-auto">
          Explore real-time network attack simulation, microsecond firewall quarantine, and heuristic URL zero-day scanning.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={handleLaunchLogin}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#00875a] hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open SentinelAI Command Center</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>

    </div>
  );
};
