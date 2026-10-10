'use client';

import React from 'react';
import { AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface DemoDisclaimerProps {
  compact?: boolean;
}

export const DemoDisclaimer: React.FC<DemoDisclaimerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        Demo Mode • Simulated Environment
      </div>
    );
  }

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-4 px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900 font-sans shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-amber-100/80 text-amber-700 flex-shrink-0">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          <span className="font-bold text-amber-900 mr-2">Demo Mode Active</span>
          <span className="text-amber-800/90 font-medium">
            All network traffic, ML predictions, firewall actions, and SIEM events shown in this demonstration are simulated for testing and evaluation.
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold self-end sm:self-auto flex-shrink-0 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00875a]" />
        <span>Safe Browser Sandbox</span>
      </div>
    </div>
  );
};
