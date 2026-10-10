'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ShieldAlert, PieChart as PieIcon, Flame, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const ThreatOverviewCard: React.FC = () => {
  const { threats } = useSecurity();

  const totalThreats = threats.length;
  const highThreats = threats.filter(t => t.severity === 'HIGH' || t.severity === 'CRITICAL').length;
  const medThreats = threats.filter(t => t.severity === 'MEDIUM').length;
  const lowThreats = threats.filter(t => t.severity === 'LOW' || t.severity === 'INFO').length;

  const threatDistribution = [
    { name: 'Port Scan', count: threats.filter(t => (t.type || t.threatType) === 'Port Scan').length, color: '#e11d48' },
    { name: 'Brute Force', count: threats.filter(t => (t.type || t.threatType) === 'Brute Force').length, color: '#ea580c' },
    { name: 'Network Anomaly', count: threats.filter(t => (t.type || t.threatType) === 'Network Anomaly').length, color: '#d97706' },
    { name: 'DoS-like Traffic', count: threats.filter(t => (t.type || t.threatType) === 'DoS-like Traffic' || (t.type || t.threatType)?.includes('DoS')).length, color: '#ec4899' },
    { name: 'Suspicious Connection', count: threats.filter(t => (t.type || t.threatType) === 'Suspicious Connection').length, color: '#0284c7' },
    { name: 'Malicious URL', count: threats.filter(t => (t.type || t.threatType) === 'Malicious URL').length, color: '#8b5cf6' },
  ].filter(t => t.count > 0);

  return (
    <div className="bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <h4 className="font-bold text-sm text-slate-900">
            Threat Severity &amp; Category Breakdown
          </h4>
        </div>
        <span className="text-xs text-slate-600 font-medium">
          Total: <strong className="text-slate-900">{totalThreats} Detections</strong>
        </span>
      </div>

      {/* 4 Quick Stat Badges */}
      <div className="grid grid-cols-4 gap-2.5 text-xs mb-5">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
          <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider block">Total</span>
          <strong className="text-slate-900 text-base mt-0.5 block">{totalThreats}</strong>
        </div>
        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-center">
          <span className="text-rose-700 text-[10px] uppercase font-bold tracking-wider block">Critical/High</span>
          <strong className="text-rose-700 text-base mt-0.5 block">{highThreats}</strong>
        </div>
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <span className="text-amber-800 text-[10px] uppercase font-bold tracking-wider block">Medium</span>
          <strong className="text-amber-800 text-base mt-0.5 block">{medThreats}</strong>
        </div>
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
          <span className="text-[#00875a] text-[10px] uppercase font-bold tracking-wider block">Low</span>
          <strong className="text-[#00875a] text-base mt-0.5 block">{lowThreats}</strong>
        </div>
      </div>

      {/* Threats List Progress Bars */}
      <div className="space-y-3 text-xs pt-1">
        {threatDistribution.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">{item.name}</span>
              <strong className="text-slate-900 font-bold">{item.count} detection{item.count !== 1 ? 's' : ''}</strong>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700" 
                style={{ 
                  backgroundColor: item.color, 
                  width: `${Math.max(8, (item.count / totalThreats) * 100)}%` 
                }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
