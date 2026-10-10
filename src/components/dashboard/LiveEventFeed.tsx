'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  ArrowUpRight, 
  ShieldAlert, 
  CheckCircle2, 
  Flame, 
  ShieldBan, 
  Layers, 
  Search, 
  Lock, 
  Waves, 
  Link as LinkIcon, 
  Activity,
  UserCheck,
  ShieldCheck
} from 'lucide-react';

export const LiveEventFeed: React.FC = () => {
  const { siemEvents, openSiemModal, stats, isTickPulse, livePacketRate } = useSecurity();
  const recentEvents = siemEvents.slice(0, 5);

  const getEventIcon = (threat: string) => {
    const t = threat.toLowerCase();
    if (t.includes('port') || t.includes('scan')) {
      return { icon: Search, bg: 'bg-rose-50 text-rose-600', sub: '+18.67% SYN Rate' };
    }
    if (t.includes('brute') || t.includes('auth')) {
      return { icon: Lock, bg: 'bg-amber-50 text-amber-600', sub: '+9.34% Failed Pwd' };
    }
    if (t.includes('dos') || t.includes('flood')) {
      return { icon: Waves, bg: 'bg-purple-50 text-purple-600', sub: '+12.23% Volumetric' };
    }
    if (t.includes('url') || t.includes('phish')) {
      return { icon: LinkIcon, bg: 'bg-blue-50 text-blue-600', sub: 'Entropy 3.82' };
    }
    return { icon: Activity, bg: 'bg-emerald-50 text-[#00875a]', sub: 'Clean Baseline' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-sans">
      
      {/* Left 8 Cols: Payment History Table Style (Matching image) */}
      <div className="md:col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900">Security Incident History</h3>
              {isTickPulse && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full animate-bounce">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  +1 LIVE EVENT INGESTED
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Recent telemetry alerts and automated mitigations</p>
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Table Content matching image columns */}
        <div className="overflow-x-auto my-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-500 font-bold text-[11px] pb-3 border-b border-slate-100 uppercase tracking-wider">
                <th className="py-3">Threat Name</th>
                <th className="py-3">Date</th>
                <th className="py-3">Time</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentEvents.map((evt, idx) => {
                const badge = getEventIcon(evt.threat || evt.eventType);
                const Icon = badge.icon;
                const isHigh = evt.severity === 'CRITICAL' || evt.severity === 'HIGH';
                const isTopArriving = idx === 0 && isTickPulse;

                return (
                  <tr 
                    key={evt.id}
                    onClick={() => openSiemModal(evt)}
                    className={`transition-all duration-300 cursor-pointer group ${
                      isTopArriving ? 'bg-emerald-50/70 scale-[1.008] ring-1 ring-emerald-400/40' : 'hover:bg-slate-50/90'
                    }`}
                  >
                    {/* Name + Circular Icon Badge (Matching Dribbble/Google icons in image) */}
                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${badge.bg} flex items-center justify-center flex-shrink-0 shadow-sm ${
                          isTopArriving ? 'ring-2 ring-emerald-400 animate-pulse' : ''
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="block text-slate-900 font-bold group-hover:text-[#00875a] transition-colors text-sm">
                              {evt.threat || evt.eventType}
                            </strong>
                            {isTopArriving && (
                              <span className="text-[9px] font-mono font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded-full animate-pulse">
                                LIVE
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {evt.sourceIp || '10.0.0.25'} • {badge.sub}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 text-slate-700 font-semibold whitespace-nowrap">
                      16 Jun 2025
                    </td>

                    {/* Time */}
                    <td className="py-3.5 text-slate-600 font-mono font-medium whitespace-nowrap">
                      {evt.timestamp}
                    </td>

                    {/* Status with green dot (Matching image) */}
                    <td className="py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-slate-900 font-bold text-xs">
                        <span className={`w-2.5 h-2.5 rounded-full ${isHigh ? 'bg-[#00875a]' : 'bg-emerald-500'} shadow-sm ${
                          isTopArriving ? 'animate-ping' : ''
                        }`} />
                        {evt.status === 'CONTAINED' ? 'Contained' : evt.action === 'BLOCK' ? 'Auto Blocked' : 'Successful'}
                      </span>
                    </td>

                    {/* Amount / Risk Score */}
                    <td className="py-3.5 text-right font-black text-slate-900 text-sm whitespace-nowrap">
                      {evt.riskScore} <span className="text-xs text-slate-600 font-bold">/ 100</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing latest 5 synthetic incident streams</span>
          <span className="text-[#00875a] font-bold">● Telemetry Mirror Active</span>
        </div>
      </div>

      {/* Right 4 Cols: Amount of credit & Responders Card (Matching image bottom right) */}
      <div className="md:col-span-12 lg:col-span-4 space-y-6">
        
        {/* Protected Traffic Volume & Security Integrity Card */}
        <div className={`bg-white rounded-3xl p-6 shadow-card border transition-all duration-300 flex flex-col justify-between ${
          isTickPulse ? 'border-emerald-500 ring-2 ring-emerald-400/40 scale-[1.02] bg-emerald-50/20' : 'border-slate-200/80'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00875a] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Protected Ingress Volume</h4>
                <p className="text-[11px] text-slate-500 font-medium">Continuous zero-trust flow inspection</p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full animate-pulse">
              10s Real-Time
            </span>
          </div>

          <div className="my-3 flex items-center justify-between">
            <div>
              <div className={`text-3xl font-black tracking-tight transition-colors ${
                isTickPulse ? 'text-emerald-700' : 'text-slate-900'
              }`}>
                {stats.totalEvents.toLocaleString()} <span className="text-xs font-bold text-slate-500 font-mono">FLOWS</span>
              </div>
              <span className="text-xs text-emerald-800 font-semibold mt-0.5 block">
                +{livePacketRate} live packets / 10-sec cycle
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#00875a] text-xs font-bold border border-emerald-100">
              99.4% AI Score
            </span>
          </div>

          {/* Mandatory SOC Responders Avatars (Matching image avatars with +2 badge) */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-bold text-xs text-slate-900">Active SOC Responders</h5>
                <p className="text-[11px] text-slate-500 font-medium">On-call incident tier</p>
              </div>
              <button className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Team Avatars with +2 green badge */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-sm">
                  JD
                </div>
                <div className="w-9 h-9 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-sm">
                  AL
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-sm">
                  MK
                </div>
                <div className="w-9 h-9 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-sm">
                  SR
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-[#00875a] text-white font-bold text-xs flex items-center justify-center shadow-brand-sm ring-2 ring-white">
                +2
              </div>

              <span className="text-xs text-slate-700 font-bold ml-2">
                6 Active SOC Analysts
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
