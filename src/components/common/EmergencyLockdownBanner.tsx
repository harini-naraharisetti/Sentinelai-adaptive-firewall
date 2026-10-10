'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ShieldAlert, AlertOctagon, Lock, ShieldCheck, Zap, Flame } from 'lucide-react';
import { soundFx } from '../../services/soundEffects';
import confetti from 'canvas-confetti';

export const EmergencyLockdownBanner: React.FC = () => {
  const { addToast, addFirewallRule } = useSecurity();
  const [isLockdown, setIsLockdown] = useState(false);

  const toggleLockdown = () => {
    const nextState = !isLockdown;
    setIsLockdown(nextState);

    if (nextState) {
      soundFx.playAlert();
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#f97316', '#dc2626']
        });
      } catch {}

      addFirewallRule({
        sourceIp: '0.0.0.0/0',
        destinationIp: '10.0.0.0/8',
        port: 'All Non-Essential',
        protocol: 'TCP/UDP',
        action: 'DROP',
        reason: 'EMERGENCY DEFCON 1: Automated Perimeter Lockdown Active'
      });

      addToast({
        title: '🚨 EMERGENCY DEFCON 1 ACTIVE',
        message: 'Perimeter lockdown applied. Non-essential ingress dropped. DPI strict inspection enabled.',
        type: 'critical'
      });
    } else {
      soundFx.playBlock();
      addToast({
        title: 'Normal Operational Posture Restored',
        message: 'Perimeter returned to standard AI adaptive enforcement policy.',
        type: 'success'
      });
    }
  };

  return (
    <div className={`p-4 sm:p-5 rounded-3xl border transition-all text-xs shadow-card font-sans ${
      isLockdown
        ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-500 shadow-xl animate-pulse'
        : 'bg-white border-slate-200/90 text-slate-900'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
            isLockdown ? 'bg-white/20 text-white' : 'bg-emerald-50 text-[#00875a]'
          }`}>
            {isLockdown ? <AlertOctagon className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <strong className={`text-sm sm:text-base font-bold tracking-tight ${isLockdown ? 'text-white' : 'text-slate-900'}`}>
                {isLockdown ? '🚨 DEFCON 1 — EMERGENCY PERIMETER LOCKDOWN' : 'DEFCON 5 — Adaptive AI Autonomous Defense'}
              </strong>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                isLockdown ? 'bg-white text-rose-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {isLockdown ? 'LOCKDOWN ACTIVE' : 'OPTIMAL'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 font-medium ${isLockdown ? 'text-rose-100' : 'text-slate-600'}`}>
              {isLockdown 
                ? 'All foreign ingress ports isolated. Strict AI anomaly quarantine enforced.'
                : 'Adaptive AI engine evaluating risk thresholds (0-30 Allow, 31-70 Monitor, 71-100 Drop).'}
            </p>
          </div>
        </div>

        <button
          onClick={toggleLockdown}
          className={`px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm active:scale-95 ${
            isLockdown
              ? 'bg-white text-rose-700 hover:bg-slate-100'
              : 'bg-rose-600 hover:bg-rose-700 text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>{isLockdown ? 'Deactivate Lockdown' : 'Trigger Emergency Lockdown'}</span>
        </button>
      </div>
    </div>
  );
};
