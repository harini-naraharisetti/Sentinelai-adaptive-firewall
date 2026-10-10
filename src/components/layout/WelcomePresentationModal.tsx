'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Brain, 
  Flame, 
  Database, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Terminal, 
  Layers, 
  AlertTriangle, 
  Activity, 
  Lock,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Radar,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCyberSound } from '../../services/soundEffects';

interface WelcomePresentationProps {
  isOpen: boolean;
  onClose: () => void;
  onEnterDashboard: () => void;
}

export const WelcomePresentationModal: React.FC<WelcomePresentationProps> = ({
  isOpen,
  onClose,
  onEnterDashboard
}) => {
  // Stages: 'BOOTING' -> 'START_SCREEN' -> 'PROBLEM_STATEMENT' -> 'PROPOSED_SOLUTION'
  const [stage, setStage] = useState<'BOOTING' | 'START_SCREEN' | 'PROBLEM_STATEMENT' | 'PROPOSED_SOLUTION'>('BOOTING');
  const [bootProgress, setBootProgress] = useState(0);
  const [bootLog, setBootLog] = useState('Initializing SentinelAI Secure Enclave...');

  // Boot sequence simulation on mount
  useEffect(() => {
    if (!isOpen) return;

    // Reset sequence
    setStage('BOOTING');
    setBootProgress(0);

    const logs = [
      { progress: 15, log: 'Loading Random Forest Classifier & Isolation Forest Engine...' },
      { progress: 35, log: 'Synthesizing Adaptive Firewall Rule Generator...' },
      { progress: 60, log: 'Establishing SIEM Forensic Event Correlation Pipeline...' },
      { progress: 85, log: 'Initializing Feature Extraction Matrix [Packets, Bytes, Rate, Ports, SYN, Entropy]...' },
      { progress: 100, log: 'SOC Command Center Ready • SentinelAI Online' },
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < logs.length) {
        setBootProgress(logs[currentIdx].progress);
        setBootLog(logs[currentIdx].log);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStage('START_SCREEN');
        }, 400);
      }
    }, 420);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinishAndEnter = () => {
    try {
      playCyberSound('success');
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#8b5cf6', '#10b981']
      });
    } catch {}
    onEnterDashboard();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center items-center">
        {/* Dark cyber backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-cyber-950/95 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="relative w-full max-w-4xl bg-cyber-950 border border-cyber-700 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden z-10 my-auto font-mono flex flex-col min-h-[580px] max-h-[90vh]"
        >
          {/* Top Header */}
          <div className="p-4 sm:p-5 border-b border-cyber-800 bg-cyber-900/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-glow-cyan flex-shrink-0">
                <div className="w-full h-full bg-cyber-900 rounded-[11px] flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white tracking-wider flex items-center gap-2">
                  🛡️ SentinelAI
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                    DEMO MODE • SIMULATED TELEMETRY
                  </span>
                </h3>
                <p className="text-[10px] text-cyber-400">
                  AI-Powered Network Intrusion Detection &amp; Automated Incident Response
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {stage !== 'BOOTING' && (
                <button
                  onClick={handleFinishAndEnter}
                  className="px-3 py-1.5 rounded-xl bg-cyber-850 hover:bg-cyber-800 border border-cyber-700 text-cyber-300 hover:text-white text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Skip to Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* STAGE 1: BOOTING SEQUENCE ANIMATION */}
          {stage === 'BOOTING' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 animate-pulse shadow-glow-cyan flex items-center justify-center">
                  <div className="w-full h-full bg-cyber-950 rounded-[15px] flex items-center justify-center">
                    <Radar className="w-10 h-10 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                </div>
                <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />
              </div>

              <div className="space-y-3 max-w-md w-full">
                <div className="flex items-center justify-between text-xs text-cyber-300 font-bold">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    System Initialization
                  </span>
                  <span className="text-cyan-400 font-mono font-black">{bootProgress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-cyber-900 h-2.5 rounded-full overflow-hidden border border-cyber-800 p-[1px]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full shadow-[0_0_10px_#06b6d4]"
                    initial={{ width: 0 }}
                    animate={{ width: `${bootProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <p className="text-[11px] text-cyber-400 h-5 font-mono truncate">
                  {bootLog}
                </p>
              </div>
            </div>
          )}

          {/* STAGE 2: "LET'S START" HERO WELCOME SCREEN */}
          {stage === 'START_SCREEN' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>CYBERSECURITY SOC DEMO PLATFORM</span>
              </div>

              <div className="space-y-3 max-w-2xl">
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  🛡️ SentinelAI
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mt-1">
                    AI-Powered Network Intrusion Detection &amp; Automated Incident Response
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-cyber-300 leading-relaxed font-sans max-w-xl mx-auto">
                  A closed-loop Security Operations Center platform combining simulated AI threat detection, risk-based automated response, adaptive firewall quarantine, and centralized SIEM logging.
                </p>
              </div>

              {/* 4 Feature Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs text-cyber-300 font-mono">
                <span className="px-3 py-1.5 rounded-xl bg-cyber-900/80 border border-cyber-800 flex items-center gap-1.5 text-purple-300">
                  <Brain className="w-3.5 h-3.5 text-purple-400" /> Random Forest &amp; Isolation Forest
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-cyber-900/80 border border-cyber-800 flex items-center gap-1.5 text-amber-300">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> 0–100 Risk Engine
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-cyber-900/80 border border-cyber-800 flex items-center gap-1.5 text-cyan-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Adaptive Firewall
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-cyber-900/80 border border-cyber-800 flex items-center gap-1.5 text-emerald-300">
                  <Database className="w-3.5 h-3.5 text-emerald-400" /> Centralized SIEM
                </span>
              </div>

              {/* Big "Let's Start" Action Button */}
              <div className="pt-3">
                <button
                  onClick={() => setStage('PROBLEM_STATEMENT')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm sm:text-base transition-all shadow-glow-cyan hover:scale-105 active:scale-95 flex items-center gap-3 group"
                >
                  <Zap className="w-5 h-5 text-cyan-200 group-hover:animate-bounce" />
                  <span>Let&apos;s Start • View Problem Statement &amp; Solution</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: 🔐 PROBLEM STATEMENT */}
          {stage === 'PROBLEM_STATEMENT' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 p-6 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Step indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[11px] font-bold border border-red-500/30">
                      STEP 1 OF 2
                    </span>
                    <span className="text-xs text-cyber-400">Context &amp; Challenges</span>
                  </div>
                  <span className="text-xs text-red-400 font-bold">🔐 Problem Statement</span>
                </div>

                <div className="border-b border-cyber-800 pb-3">
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span className="text-red-400">🔐</span> Problem Statement
                  </h2>
                  <p className="text-xs text-cyan-300 mt-1">
                    AI-Powered Network Intrusion Detection &amp; Automated Response
                  </p>
                </div>

                {/* Problem Statement text as requested */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 rounded-2xl bg-cyber-900/80 border border-cyber-800 space-y-2">
                    <div className="flex items-center gap-2 text-red-400 font-mono font-bold">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Evolving Network-Based Threats</span>
                    </div>
                    <p className="text-cyber-300 leading-relaxed">
                      Modern organizations continuously face network-based threats such as <strong>port scanning</strong>, <strong>brute-force attacks</strong>, <strong>abnormal traffic</strong>, <strong>suspicious connections</strong>, and evolving attack patterns. Traditional security systems mainly depend on predefined rules and may generate large numbers of alerts without effectively prioritizing their severity.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyber-900/80 border border-cyber-800 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 font-mono font-bold">
                      <Layers className="w-4 h-4" />
                      <span>Triage &amp; Containment Bottlenecks</span>
                    </div>
                    <p className="text-cyber-300 leading-relaxed">
                      Moreover, detecting an intrusion is only the first step. Security teams must determine how dangerous the activity is, decide an appropriate response, contain the threat, record the incident, and investigate it from a centralized location.
                    </p>
                  </div>
                </div>

                {/* Need Statement */}
                <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-3">
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-cyan-400" />
                    Therefore, there is a need for an intelligent security platform that can:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    {[
                      'Combine network intrusion detection & feature extraction',
                      'Provide AI-based threat analysis (Random Forest & Isolation Forest)',
                      'Calculate composite 0–100 risk assessment with explainability',
                      'Execute automated response & adaptive firewall quarantine',
                      'Manage end-to-end incident lifecycles (Containment & Triage)',
                      'Centralize forensic SIEM event logging & SOC telemetry'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-cyber-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="pt-4 border-t border-cyber-800 flex items-center justify-between">
                <button
                  onClick={() => setStage('START_SCREEN')}
                  className="px-4 py-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-cyber-400 text-xs transition-colors"
                >
                  ← Back
                </button>

                <button
                  onClick={() => setStage('PROPOSED_SOLUTION')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-glow-cyan flex items-center gap-2"
                >
                  <span>See Proposed Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 4: 💡 PROPOSED SOLUTION */}
          {stage === 'PROPOSED_SOLUTION' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 p-6 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Step indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                      STEP 2 OF 2
                    </span>
                    <span className="text-xs text-cyber-400">Architecture &amp; Closed-Loop Response</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">💡 Proposed Solution</span>
                </div>

                <div className="border-b border-cyber-800 pb-3">
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span className="text-emerald-400">💡</span> Proposed Solution
                  </h2>
                  <p className="text-xs text-cyan-300 mt-1">
                    AI-Powered Network Intrusion Detection and Automated Response Platform
                  </p>
                </div>

                {/* Proposed Solution text */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-cyber-900 to-cyan-950/40 border border-emerald-500/30 text-xs font-sans leading-relaxed text-cyber-200">
                  We propose an <strong>AI-Powered Network Intrusion Detection and Automated Response Platform</strong> that monitors network activity, extracts relevant traffic features, analyzes suspicious behavior using <strong>Random Forest classification</strong> and <strong>Isolation Forest anomaly detection</strong>, and generates a <strong>0–100 risk score</strong>.
                </div>

                {/* Risk-based response tier ladder */}
                <div>
                  <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    Based on the risk level, the system applies a risk-based response:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 shadow-sm">
                      <div className="flex items-center justify-between text-emerald-400 font-bold text-xs mb-1">
                        <span>🟢 0–30</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">SAFE</span>
                      </div>
                      <strong className="text-white text-sm block">→ ALLOW</strong>
                      <span className="text-[11px] text-cyber-400 mt-1 block">Benign traffic permitted without inspection delay.</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 shadow-sm">
                      <div className="flex items-center justify-between text-amber-400 font-bold text-xs mb-1">
                        <span>🟡 31–70</span>
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px]">ELEVATED</span>
                      </div>
                      <strong className="text-white text-sm block">→ MONITOR</strong>
                      <span className="text-[11px] text-cyber-400 mt-1 block">Traffic is flagged for DPI behavioral telemetry.</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 shadow-sm">
                      <div className="flex items-center justify-between text-red-400 font-bold text-xs mb-1">
                        <span>🔴 71–100</span>
                        <span className="px-1.5 py-0.2 rounded bg-red-500/20 text-red-300 text-[10px]">CRITICAL</span>
                      </div>
                      <strong className="text-white text-sm block">→ BLOCK</strong>
                      <span className="text-[11px] text-cyber-400 mt-1 block">Instant AUTO-XXXX firewall rule synthesized.</span>
                    </div>
                  </div>
                </div>

                {/* Explanation text as requested in prompt */}
                <div className="p-4 rounded-2xl bg-cyber-950 border border-cyber-800 space-y-2 text-xs font-sans text-cyber-300 leading-relaxed">
                  <p>
                    When a high-risk intrusion is detected, the platform creates a <strong>security incident</strong> and simulates an <strong>adaptive firewall response</strong>. The incident is then recorded as a <strong>structured SIEM event</strong> and displayed through a centralized <strong>SOC dashboard</strong>, allowing security analysts to understand what happened, why it was considered dangerous, and what response was taken.
                  </p>
                  <p className="text-[11px] text-cyan-400 font-mono pt-1">
                    * The current hackathon implementation is a frontend-only simulation, where network traffic, AI predictions, firewall actions, and SIEM events are simulated locally for safe demonstration.
                  </p>
                </div>
              </div>

              {/* Final Launch Action */}
              <div className="pt-4 border-t border-cyber-800 flex items-center justify-between">
                <button
                  onClick={() => setStage('PROBLEM_STATEMENT')}
                  className="px-4 py-2 rounded-xl bg-cyber-900 hover:bg-cyber-800 text-cyber-400 text-xs transition-colors"
                >
                  ← Problem Statement
                </button>

                <button
                  onClick={handleFinishAndEnter}
                  className="px-7 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-black text-sm shadow-glow-green hover:scale-105 active:scale-95 flex items-center gap-2.5 transition-all"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Enter SentinelAI SOC Dashboard →</span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
