'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Radio, ShieldAlert, ShieldCheck, Flame, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const CyberRadarMap: React.FC = () => {
  const { threats } = useSecurity();

  const attackNodes = [
    { ip: '10.0.0.25', name: 'Recon Node A', type: 'Port Scan', x: '18%', y: '32%', color: '#e11d48', risk: 91, status: 'BLOCKED' },
    { ip: '10.0.0.42', name: 'Auth Probe B', type: 'Brute Force', x: '24%', y: '72%', color: '#ea580c', risk: 87, status: 'BLOCKED' },
    { ip: '10.0.0.30', name: 'Beacon Node C', type: 'TLS Anomaly', x: '78%', y: '28%', color: '#d97706', risk: 64, status: 'MONITORED' },
    { ip: 'fake-auth.xyz', name: 'Phishing Egress', type: 'Malicious URL', x: '82%', y: '68%', color: '#8b5cf6', risk: 88, status: 'FLAGGED' },
  ];

  return (
    <div className="bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card relative overflow-hidden font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              Global Threat Vector Radar &amp; Ingress Topology
              <span className="w-2 h-2 rounded-full bg-[#00875a] animate-ping" />
            </h4>
            <span className="text-xs text-slate-400 font-medium">
              Simulated ingress vectors intercepted at corporate perimeter
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">● 3 Ingress Drops</span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">● 1 Monitored</span>
        </div>
      </div>

      {/* Interactive Topology Canvas Container */}
      <div className="relative w-full h-64 sm:h-72 bg-slate-50/80 rounded-3xl border border-slate-200/70 overflow-hidden flex items-center justify-center">
        {/* Radar Rings Grid */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 rounded-full border border-slate-200/80" />
          <div className="w-56 h-56 rounded-full border border-slate-200/60" />
          <div className="w-80 h-80 rounded-full border border-slate-200/40" />
          <div className="w-full h-full border-t border-b border-slate-200/30 absolute" />
          <div className="w-full h-full border-l border-r border-slate-200/30 absolute" />
        </div>

        {/* Center Target: Protected SOC Gateway */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-[#00875a] p-[2px] shadow-brand">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#00875a]" />
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-800 mt-2 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-sm font-mono">
            SOC Edge Gateway (10.0.0.10)
          </span>
        </div>

        {/* Attack Vector Nodes */}
        {attackNodes.map((node, i) => (
          <motion.div
            key={i}
            style={{ left: node.x, top: node.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            whileHover={{ scale: 1.15 }}
          >
            {/* Glowing Attacker Node */}
            <div 
              className="relative p-2.5 rounded-2xl bg-white border shadow-card flex items-center gap-2"
              style={{ borderColor: node.color }}
            >
              <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: node.color }} />
              <div className="text-[11px] leading-tight">
                <span className="font-bold text-slate-900 font-mono block">{node.ip}</span>
                <span className="text-slate-400 text-[10px] font-medium">{node.type}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
