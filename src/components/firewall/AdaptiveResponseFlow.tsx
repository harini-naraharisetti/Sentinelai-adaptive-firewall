'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, AlertTriangle, ShieldBan, FileText, BellRing, Brain, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdaptiveResponseFlow: React.FC = () => {
  return (
    <div className="bg-white border border-slate-100/90 rounded-3xl p-6 sm:p-8 shadow-card font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#00875a]" />
            Adaptive AI Firewall Response Architecture
          </h4>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            Automated dynamic decision matrix mapping composite ML threat scores to real-time enforcement policies.
          </p>
        </div>
      </div>

      {/* 3 Core Threshold Paths */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Low Risk Path */}
        <div className="p-5 rounded-3xl bg-emerald-50/50 border border-emerald-200/80 text-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
              LOW RISK (0–30)
            </span>
            <ShieldCheck className="w-5 h-5 text-[#00875a]" />
          </div>
          <div className="my-2 flex items-center gap-2 text-[#00875a] font-bold text-sm">
            <span>Action: ALLOW</span>
          </div>
          <p className="text-slate-700 text-[11px] font-medium leading-relaxed">
            Traffic matches expected baseline cluster. Full line-rate throughput without packet throttling.
          </p>
        </div>

        {/* Medium Risk Path */}
        <div className="p-5 rounded-3xl bg-amber-50/50 border border-amber-200/80 text-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
              MEDIUM RISK (31–70)
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="my-2 flex items-center gap-2 text-amber-800 font-bold text-sm">
            <span>Action: MONITOR</span>
          </div>
          <p className="text-slate-700 text-[11px] font-medium leading-relaxed">
            Slight anomaly deviation detected. Dynamic session mirroring routed to Deep Packet Inspection (DPI).
          </p>
        </div>

        {/* High Risk Path */}
        <div className="p-5 rounded-3xl bg-rose-50/50 border border-rose-200/80 text-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 font-bold text-[11px]">
              HIGH RISK (71–100)
            </span>
            <ShieldBan className="w-5 h-5 text-rose-600" />
          </div>
          <div className="my-2 flex items-center gap-2 text-rose-600 font-bold text-sm">
            <span>Action: BLOCK (DROP)</span>
          </div>
          <p className="text-slate-700 text-[11px] font-medium leading-relaxed">
            Critical attack signature detected. Automated rule synthesized instantly (e.g. AUTO-0042) to drop socket.
          </p>
        </div>
      </div>

      {/* Live Pipeline Flow Example */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
        <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Brain className="w-4 h-4 text-[#00875a]" />
          Execution Lifecycle Walkthrough (Live Example)
        </h5>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center min-w-[120px]">
            <span className="text-slate-600 text-[10px] font-bold uppercase">Risk Evaluation</span>
            <strong className="text-rose-600 text-sm mt-1">Score: 91/100</strong>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col items-center text-center min-w-[120px]">
            <span className="text-rose-700 text-[10px] font-bold uppercase">Verdict</span>
            <strong className="text-rose-800 text-sm mt-1">HIGH RISK</strong>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col items-center text-center min-w-[120px]">
            <span className="text-rose-700 text-[10px] font-bold uppercase">Firewall Policy</span>
            <strong className="text-rose-800 text-sm mt-1">DROP &amp; QUARANTINE</strong>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block" />

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center text-center min-w-[120px]">
            <span className="text-[#00875a] text-[10px] font-bold uppercase">SIEM Ingestion</span>
            <strong className="text-[#00875a] text-sm mt-1">EVT-1042 DISPATCHED</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
