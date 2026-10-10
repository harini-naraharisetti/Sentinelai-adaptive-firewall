'use client';

import React, { useState, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Activity, Radio, ShieldBan, ShieldCheck, Zap } from 'lucide-react';

export const LiveTelemetryCharts: React.FC = () => {
  const { networkEvents, stats, isLiveSimulationRunning } = useSecurity();

  // Initial rolling telemetry dataset
  const [telemetryData, setTelemetryData] = useState<Array<{
    time: string;
    incoming: number;
    outgoing: number;
    bandwidthMbps: number;
    suspicious: number;
    monitored: number;
    blocked: number;
    allowed: number;
  }>>([
    { time: '21:00', incoming: 420, outgoing: 380, bandwidthMbps: 48.2, suspicious: 12, monitored: 24, blocked: 4, allowed: 760 },
    { time: '21:01', incoming: 580, outgoing: 490, bandwidthMbps: 54.1, suspicious: 18, monitored: 32, blocked: 7, allowed: 1010 },
    { time: '21:02', incoming: 690, outgoing: 510, bandwidthMbps: 62.8, suspicious: 25, monitored: 41, blocked: 12, allowed: 1120 },
    { time: '21:03', incoming: 530, outgoing: 460, bandwidthMbps: 51.0, suspicious: 15, monitored: 28, blocked: 6, allowed: 940 },
    { time: '21:04', incoming: 780, outgoing: 640, bandwidthMbps: 74.3, suspicious: 34, monitored: 52, blocked: 19, allowed: 1310 },
    { time: '21:05', incoming: 620, outgoing: 580, bandwidthMbps: 59.7, suspicious: 21, monitored: 35, blocked: 9, allowed: 1130 },
    { time: '21:06', incoming: 840, outgoing: 710, bandwidthMbps: 81.2, suspicious: 42, monitored: 61, blocked: 24, allowed: 1420 },
    { time: '21:07', incoming: 670, outgoing: 590, bandwidthMbps: 63.5, suspicious: 22, monitored: 38, blocked: 11, allowed: 1190 },
  ]);

  // Periodic rolling update when live simulation is active
  useEffect(() => {
    if (!isLiveSimulationRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const last = telemetryData[telemetryData.length - 1] || {
        incoming: 600,
        outgoing: 500,
        bandwidthMbps: 55,
        suspicious: 20,
        monitored: 30,
        blocked: 10,
        allowed: 1000
      };

      const incomingVariance = Math.floor(Math.random() * 200 - 90);
      const newIncoming = Math.max(250, last.incoming + incomingVariance);
      const newOutgoing = Math.max(200, Math.floor(newIncoming * 0.85 + (Math.random() * 60 - 30)));
      const newBandwidth = +(newIncoming * 0.08 + Math.random() * 5).toFixed(1);
      
      const newSuspicious = Math.max(5, Math.floor(newIncoming * 0.04 + Math.random() * 10));
      const newMonitored = Math.max(10, Math.floor(newIncoming * 0.06 + Math.random() * 12));
      const newBlocked = Math.max(2, Math.floor(newIncoming * 0.02 + Math.random() * 6));
      const newAllowed = newIncoming + newOutgoing - (newSuspicious + newBlocked);

      const nextPoint = {
        time: timeStr,
        incoming: newIncoming,
        outgoing: newOutgoing,
        bandwidthMbps: newBandwidth,
        suspicious: newSuspicious,
        monitored: newMonitored,
        blocked: newBlocked,
        allowed: Math.max(100, newAllowed)
      };

      setTelemetryData(prev => {
        const slice = prev.length >= 12 ? prev.slice(1) : prev;
        return [...slice, nextPoint];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isLiveSimulationRunning, telemetryData]);

  const currentBandwidth = telemetryData[telemetryData.length - 1]?.bandwidthMbps || 58.4;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xl text-xs font-sans">
          <p className="text-slate-900 font-bold mb-1.5">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 py-0.5">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <strong className="text-slate-900 font-bold">{entry.value.toLocaleString()} flows</strong>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Telemetry Header Card */}
      <div className="p-6 bg-white border border-slate-200/80 rounded-3xl shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              Live Network Telemetry Stream
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#00875a] text-[10px] font-bold">
                STREAM ONLINE
              </span>
            </h3>
            <p className="text-xs text-slate-600 font-semibold mt-0.5">
              Real-time bandwidth monitoring, DPI telemetry inspection, and socket classification.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <span className="text-slate-600 font-semibold">Bandwidth:</span>
            <strong className="text-slate-900 font-bold">{currentBandwidth} Mbps</strong>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <span className="text-slate-600 font-semibold">Active Sockets:</span>
            <strong className="text-[#00875a] font-bold">{(stats.monitoredConnections * 18 + 1200).toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* Main Chart: Ingress vs Egress Bandwidth Flows */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-card">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00875a]" />
            <h4 className="font-bold text-sm text-slate-900">
              Incoming vs Outgoing Network Traffic
            </h4>
          </div>
          <span className="text-xs text-slate-600 font-semibold">
            Flows / 3.5-Second Window
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="incomingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00875a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00875a" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="outgoingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontWeight={600} />
              <YAxis stroke="#64748b" fontSize={11} fontWeight={600} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontWeight: 600 }} />
              <Area type="monotone" dataKey="incoming" name="Incoming Traffic" stroke="#00875a" strokeWidth={2.5} fillOpacity={1} fill="url(#incomingGrad)" />
              <Area type="monotone" dataKey="outgoing" name="Outgoing Traffic" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#outgoingGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Suspicious / Blocked / Monitored / Allowed breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blocked vs Suspicious vs Monitored */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <ShieldBan className="w-4 h-4 text-rose-600" />
              <h4 className="font-bold text-sm text-slate-900">
                Suspicious, Monitored &amp; Blocked Flows
              </h4>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={telemetryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontWeight={600} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={600} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontWeight: 600 }} />
                <Bar dataKey="suspicious" name="Suspicious" fill="#d97706" radius={[6, 6, 0, 0]} />
                <Bar dataKey="monitored" name="Monitored" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="blocked" name="Blocked (Dropped)" fill="#e11d48" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allowed Traffic Baseline */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00875a]" />
              <h4 className="font-bold text-sm text-slate-900">
                Allowed Traffic Volume (Clean Baseline)
              </h4>
            </div>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontWeight={600} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={600} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontWeight: 600 }} />
                <Line type="monotone" dataKey="allowed" name="Allowed Flows" stroke="#00875a" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
