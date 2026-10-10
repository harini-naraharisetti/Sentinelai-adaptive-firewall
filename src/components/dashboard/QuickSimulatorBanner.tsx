'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { FlaskConical, Play, ArrowRight, Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export const QuickSimulatorBanner: React.FC = () => {
  const { runAttackSimulation, isSimulating } = useSecurity();

  const scenarios = [
    { id: 'PORT_SCAN', label: 'Port Scan', icon: '🔎', color: 'hover:border-rose-400 bg-rose-50/70 text-rose-900 border-rose-100', desc: 'AUTO-0042 • Risk 91' },
    { id: 'BRUTE_FORCE', label: 'Brute Force', icon: '🔐', color: 'hover:border-amber-400 bg-amber-50/70 text-amber-900 border-amber-100', desc: 'SSH Flood • Risk 87' },
    { id: 'DOS_FLOOD', label: 'DoS Traffic', icon: '🌊', color: 'hover:border-purple-400 bg-purple-50/70 text-purple-900 border-purple-100', desc: 'Volumetric • Risk 96' },
    { id: 'NETWORK_ANOMALY', label: 'Anomaly', icon: '⚠️', color: 'hover:border-yellow-400 bg-yellow-50/70 text-yellow-900 border-yellow-100', desc: 'Beacon • Risk 64' },
    { id: 'SUSPICIOUS_CONN', label: 'Suspicious Socket', icon: '🔗', color: 'hover:border-emerald-400 bg-emerald-50/70 text-emerald-900 border-emerald-100', desc: 'Cipher Var • Risk 48' },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-card font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              Interactive Attack Simulation Lab
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#00875a] text-[10px] font-bold">
                Judge Demo Sandbox
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Trigger synthetic attacks to watch the complete AI detection, risk scoring, adaptive firewall response &amp; SIEM dispatch.
            </p>
          </div>
        </div>

        <Link
          href="/simulator"
          className="text-xs font-bold text-[#00875a] hover:text-emerald-800 flex items-center gap-1 transition-colors self-start md:self-auto"
        >
          <span>Open Full Lab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Quick Scenario Chips */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
        {scenarios.map((scen) => (
          <button
            key={scen.id}
            onClick={() => runAttackSimulation(scen.id)}
            disabled={isSimulating}
            className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${scen.color} disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span>{scen.icon}</span>
                <span>{scen.label}</span>
              </span>
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-500 group-hover:text-[#00875a] shadow-sm transition-colors">
                <Play className="w-3 h-3 ml-0.5 fill-current" />
              </div>
            </div>
            <span className="text-[11px] text-slate-600 font-semibold mt-1">
              {scen.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
