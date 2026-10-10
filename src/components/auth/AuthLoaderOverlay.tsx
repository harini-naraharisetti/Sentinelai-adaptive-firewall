'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  ShieldCheck, 
  Cpu, 
  Lock, 
  Sparkles, 
  Terminal, 
  Radio, 
  CheckCircle2, 
  Fingerprint, 
  Zap, 
  Activity 
} from 'lucide-react';

export const AuthLoaderOverlay: React.FC = () => {
  const { isLoggingIn, loginProgress, loginStepLog, currentUser } = useSecurity();

  if (!isLoggingIn) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fadeIn font-sans">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-8 shadow-2xl text-white overflow-hidden flex flex-col items-center text-center space-y-6">
        
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Central High-Tech Scanner Animation */}
        <div className="relative flex items-center justify-center">
          {/* Outer rotating dashed ring */}
          <div className="w-28 h-28 rounded-full border-2 border-dashed border-emerald-400/40 animate-spin" style={{ animationDuration: '8s' }} />
          
          {/* Middle pulsing ring */}
          <div className="absolute w-20 h-20 rounded-full border border-cyan-400/60 animate-ping opacity-30" style={{ animationDuration: '2s' }} />

          {/* Inner core badge */}
          <div className="absolute w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00875a] to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Fingerprint className="w-9 h-9 animate-pulse" />
          </div>
        </div>

        {/* Title & User Status */}
        <div className="space-y-1.5 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ESTABLISHING SOC ZERO-TRUST SESSION</span>
          </div>
          
          <h3 className="text-xl font-black text-white tracking-tight">
            Authenticating Security Clearance
          </h3>
          
          {currentUser && (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-300 font-medium">
              <span className="font-bold text-white">{currentUser.name}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-mono text-[11px]">{currentUser.clearanceLevel}</span>
            </div>
          )}
        </div>

        {/* Dynamic Progress Bar & Percentage */}
        <div className="w-full space-y-2 z-10">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-medium">Progress Pipeline</span>
            <span className="text-emerald-400 font-bold">{loginProgress}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-300 shadow-sm shadow-emerald-400/50"
              style={{ width: `${loginProgress}%` }}
            />
          </div>
        </div>

        {/* Live Terminal Log Stream */}
        <div className="w-full p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left font-mono text-xs space-y-1.5 z-10">
          <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>SOC KERNEL LOG</span>
            </div>
            <span className="text-emerald-500 animate-pulse">● LIVE</span>
          </div>
          <p className="text-emerald-300 text-[11px] font-semibold flex items-center gap-2 animate-fadeIn">
            <span className="text-emerald-500">❯</span>
            <span>{loginStepLog || 'Initializing runtime modules...'}</span>
          </p>
        </div>

        {/* Security Module Subsystems Indicator */}
        <div className="grid grid-cols-3 gap-2 w-full pt-1 text-[10px] font-mono text-slate-400 z-10">
          <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/40 flex flex-col items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[9px] text-slate-300">Dual ML Core</span>
            <span className="text-emerald-400 font-bold">READY</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/40 flex flex-col items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] text-slate-300">Auto Firewall</span>
            <span className="text-emerald-400 font-bold">ARMED</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/40 flex flex-col items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[9px] text-slate-300">SIEM Lakehouse</span>
            <span className="text-emerald-400 font-bold">SYNCED</span>
          </div>
        </div>

      </div>
    </div>
  );
};
