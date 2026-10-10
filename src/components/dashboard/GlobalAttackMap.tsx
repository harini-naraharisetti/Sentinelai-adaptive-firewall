'use client';

import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  ShieldAlert, 
  Radio, 
  Zap, 
  MapPin, 
  Activity, 
  Flame, 
  CheckCircle2, 
  Crosshair,
  Maximize2
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

interface AttackNode {
  id: string;
  country: string;
  city: string;
  flag: string;
  lat: number; // % y (0-100)
  lon: number; // % x (0-100)
  ip: string;
  threatType: string;
  rate: string;
  risk: number;
  status: 'BLOCKED' | 'INTERCEPTING' | 'ANALYZING';
}

const ATTACK_ORIGINS: AttackNode[] = [
  { id: '1', country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', lon: 52, lat: 30, ip: '185.220.101.5', threatType: 'SYN Port Sweep', rate: '2.4 GB/s', risk: 89, status: 'BLOCKED' },
  { id: '2', country: 'China', city: 'Shanghai', flag: '🇨🇳', lon: 80, lat: 40, ip: '218.92.0.12', threatType: 'SSH Credential Surge', rate: '140 req/s', risk: 94, status: 'BLOCKED' },
  { id: '3', country: 'Russia', city: 'Moscow', flag: '🇷🇺', lon: 62, lat: 26, ip: '95.173.136.2', threatType: 'Volumetric DoS', rate: '68.4 MB/s', risk: 91, status: 'BLOCKED' },
  { id: '4', country: 'Brazil', city: 'São Paulo', flag: '🇧🇷', lon: 32, lat: 74, ip: '177.54.144.18', threatType: 'Entropy Exfiltration', rate: '412 KB/s', risk: 84, status: 'INTERCEPTING' },
  { id: '5', country: 'Singapore', city: 'Singapore', flag: '🇸🇬', lon: 78, lat: 56, ip: '103.253.25.9', threatType: 'Heuristic Phishing', rate: '12 req/m', risk: 78, status: 'BLOCKED' },
  { id: '6', country: 'Netherlands', city: 'Amsterdam', flag: '🇳🇱', lon: 50, lat: 28, ip: '194.26.29.11', threatType: 'Multi-port Probe', rate: '1.2 GB/s', risk: 87, status: 'ANALYZING' },
  { id: '7', country: 'United States', city: 'San Jose', flag: '🇺🇸', lon: 18, lat: 36, ip: '45.33.32.156', threatType: 'Command Injection', rate: '88 req/s', risk: 92, status: 'BLOCKED' },
];

// SOC Target Center (US-East)
const TARGET_SOC = { lon: 26, lat: 34, label: 'SentinelAI SOC Honeypot [US-EAST]' };

export const GlobalAttackMap: React.FC = () => {
  const { isTickPulse, livePacketRate, liveBandwidth } = useSecurity();
  const [activeNode, setActiveNode] = useState<AttackNode>(ATTACK_ORIGINS[0]);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Cycle through active attack highlights on 10s tick
  useEffect(() => {
    const idx = Math.floor(Math.random() * ATTACK_ORIGINS.length);
    setActiveNode(ATTACK_ORIGINS[idx]);
    setPulseCount(prev => prev + 1);
  }, [isTickPulse]);

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      
      {/* Background Ambient Cyber Glows */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Globe className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-white tracking-tight">
                Live Global Cyber Attack Map
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                7 ACTIVE ARCS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Real-time Geo-IP trajectory tracking &amp; autonomous perimeter honeypot interception
            </p>
          </div>
        </div>

        {/* Top Badges */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Target: <strong className="text-emerald-400">{TARGET_SOC.label}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Map + Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 relative z-10 items-center">
        
        {/* World Map Vector Graphic (8 Cols) */}
        <div className="lg:col-span-8 relative aspect-[16/9] w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-4 flex items-center justify-center overflow-hidden">
          
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

          {/* World Map SVG Canvas */}
          <svg className="w-full h-full relative z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="laserBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="0.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Simplified World Continents Outlines */}
            {/* North America */}
            <path d="M 12,22 Q 22,20 28,30 Q 24,42 16,36 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.4" />
            {/* South America */}
            <path d="M 28,52 Q 35,55 33,78 Q 26,72 27,56 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.4" />
            {/* Europe */}
            <path d="M 48,22 Q 56,20 58,32 Q 48,34 46,26 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.4" />
            {/* Africa */}
            <path d="M 48,38 Q 60,40 56,66 Q 46,58 47,42 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.4" />
            {/* Asia */}
            <path d="M 60,20 Q 86,22 84,46 Q 66,48 60,30 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.4" />
            {/* Australia */}
            <path d="M 80,64 Q 90,62 88,78 Q 78,76 80,66 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.4" />

            {/* Attack Trajectory Arcs from Attackers to SOC Target */}
            {ATTACK_ORIGINS.map((node) => {
              const midX = (node.lon + TARGET_SOC.lon) / 2;
              const midY = Math.min(node.lat, TARGET_SOC.lat) - 8; // Arc curvature upward

              return (
                <g key={node.id}>
                  {/* Trajectory background curve */}
                  <path
                    d={`M ${node.lon},${node.lat} Q ${midX},${midY} ${TARGET_SOC.lon},${TARGET_SOC.lat}`}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="0.5"
                    strokeDasharray="1,1"
                    opacity="0.35"
                  />

                  {/* Animated laser beam packet */}
                  <path
                    d={`M ${node.lon},${node.lat} Q ${midX},${midY} ${TARGET_SOC.lon},${TARGET_SOC.lat}`}
                    fill="none"
                    stroke="url(#laserBeam)"
                    strokeWidth="0.8"
                    strokeDasharray="4,12"
                    filter="url(#glow)"
                    className="animate-pulse"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="100;0"
                      dur={`${1.8 + Number(node.id) * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              );
            })}

            {/* Attacker Origin Nodes */}
            {ATTACK_ORIGINS.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <g 
                  key={node.id} 
                  className="cursor-pointer group"
                  onClick={() => setActiveNode(node)}
                >
                  <circle
                    cx={node.lon}
                    cy={node.lat}
                    r={isSelected ? 2.5 : 1.6}
                    fill="#f43f5e"
                    className="animate-ping opacity-75"
                  />
                  <circle
                    cx={node.lon}
                    cy={node.lat}
                    r={isSelected ? 1.8 : 1.2}
                    fill={isSelected ? '#fbbf24' : '#f43f5e'}
                    stroke="#fff"
                    strokeWidth="0.3"
                  />
                </g>
              );
            })}

            {/* Central SOC Target Node */}
            <circle
              cx={TARGET_SOC.lon}
              cy={TARGET_SOC.lat}
              r="4"
              fill="#10b981"
              className="animate-ping opacity-40"
            />
            <circle
              cx={TARGET_SOC.lon}
              cy={TARGET_SOC.lat}
              r="2.2"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          </svg>

          {/* Floating Radar Tag */}
          <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Telemetry: <strong>{liveBandwidth}</strong> • Ingest: <strong>+{livePacketRate} pkts/10s</strong></span>
          </div>
        </div>

        {/* Selected Attack Origin Inspector (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Intercepted Origin
              </span>
              <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 rounded-full">
                {activeNode.status}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-3.5">
              <span className="text-3xl">{activeNode.flag}</span>
              <div>
                <h4 className="text-base font-extrabold text-white">
                  {activeNode.city}, {activeNode.country}
                </h4>
                <code className="text-xs font-mono text-emerald-400">
                  {activeNode.ip}
                </code>
              </div>
            </div>
          </div>

          {/* Node Spec Sheet */}
          <div className="space-y-2 text-xs font-mono bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
            <div className="flex justify-between text-slate-400">
              <span>Attack Vector:</span>
              <strong className="text-white">{activeNode.threatType}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Traffic Rate:</span>
              <strong className="text-cyan-400">{activeNode.rate}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Composite Risk:</span>
              <strong className="text-rose-400">{activeNode.risk} / 100</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Defense Action:</span>
              <strong className="text-emerald-400">Adaptive ACL Drop</strong>
            </div>
          </div>

          {/* Selectable Origin Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">
              Active Intercept Nodes ({ATTACK_ORIGINS.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ATTACK_ORIGINS.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                    activeNode.id === node.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <span>{node.flag}</span>
                  <span>{node.city}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
