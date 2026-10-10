'use client';

import React from 'react';
import { ShieldCheck, Layers, Cpu, Flame, Link as LinkIcon, Database } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskMeter } from '../common/RiskMeter';

export const SecurityPostureGauge: React.FC = () => {
  const { stats } = useSecurity();

  const breakdowns = [
    { label: 'Network Protection', score: 88, icon: Layers, color: 'text-emerald-600', barColor: 'bg-[#00875a]' },
    { label: 'AI Threat Detection', score: 84, icon: Cpu, color: 'text-purple-600', barColor: 'bg-purple-600' },
    { label: 'Firewall Adaptive Response', score: 91, icon: Flame, color: 'text-amber-600', barColor: 'bg-amber-500' },
    { label: 'URL Security Heuristics', score: 76, icon: LinkIcon, color: 'text-emerald-700', barColor: 'bg-emerald-600' },
    { label: 'SIEM Ingestion & Visibility', score: 86, icon: Database, color: 'text-blue-600', barColor: 'bg-blue-600' },
  ];

  return (
    <div className="bg-white border border-slate-100/90 rounded-3xl p-6 sm:p-8 shadow-card font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
        <div>
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00875a]" />
            Composite Security Posture Index
          </h4>
          <span className="text-xs text-slate-600 font-medium">
            Weighted multi-vector defense posture evaluation.
          </span>
        </div>

        <span className="text-xs px-3 py-1 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-800 font-bold self-start sm:self-auto">
          Security Score: 87/100
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Posture Score Hero */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border border-slate-200/80 text-center">
          <RiskMeter 
            score={stats.securityPosture} 
            size="hero" 
            showLabel={false} 
          />
          <div className="mt-3">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-[#00875a] font-bold text-xs">
              STATUS: GOOD DEFENSE
            </span>
            <p className="text-xs text-slate-600 font-medium mt-2 max-w-[220px]">
              Adaptive firewall &amp; AI classifier continuously mitigating incoming threats.
            </p>
          </div>
        </div>

        {/* Right 5-Domain Vector Breakdown */}
        <div className="md:col-span-7 space-y-4 text-xs">
          {breakdowns.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-700 font-medium">
                    <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    {item.label}
                  </span>
                  <strong className="text-slate-900 font-bold">{item.score} / 100</strong>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.barColor} transition-all duration-1000`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
