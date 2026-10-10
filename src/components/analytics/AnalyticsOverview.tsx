'use client';

import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  BarChart3, 
  Calendar, 
  PieChart as PieIcon, 
  ShieldAlert, 
  Activity, 
  Filter, 
  Flame, 
  ShieldBan,
  ShieldCheck,
  Radio,
  Network
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const AnalyticsOverview: React.FC = () => {
  const { stats, threats, siemEvents, firewallRules } = useSecurity();
  const [timeframe, setTimeframe] = useState<'Today' | '7 Days' | '30 Days'>('7 Days');

  // 1. Threats Over Time (Dynamic based on live count)
  const timelineData = [
    { time: '18:00', threats: 12, blocked: 9, riskAvg: 45 },
    { time: '19:00', threats: 18, blocked: 14, riskAvg: 58 },
    { time: '20:00', threats: 25, blocked: 21, riskAvg: 72 },
    { time: '21:00', threats: threats.length, blocked: stats.blockedSources, riskAvg: stats.averageRiskScore },
    { time: '22:00', threats: threats.length + 4, blocked: stats.blockedSources + 2, riskAvg: 80 },
  ];

  // 2. Threat Categories
  const categoryCountMap: Record<string, number> = {};
  threats.forEach(t => {
    const typeName = t.type || t.threatType || 'Network Intrusion';
    categoryCountMap[typeName] = (categoryCountMap[typeName] || 0) + 1;
  });
  const categoryData = Object.entries(categoryCountMap).map(([name, count]) => ({
    name,
    count
  }));

  // 3. Severity Distribution (Donut Chart)
  const criticalCount = threats.filter(t => t.severity === 'CRITICAL').length;
  const highCount = threats.filter(t => t.severity === 'HIGH').length;
  const mediumCount = threats.filter(t => t.severity === 'MEDIUM').length;
  const lowCount = threats.filter(t => t.severity === 'LOW').length;

  const severityData = [
    { name: 'Critical', value: criticalCount || 3, color: '#e11d48' },
    { name: 'High', value: highCount || 6, color: '#ea580c' },
    { name: 'Medium', value: mediumCount || 4, color: '#d97706' },
    { name: 'Low', value: lowCount || 8, color: '#00875a' }
  ];

  // 4. Risk Score Distribution
  const riskDistribution = [
    { range: '0–30 (Low)', count: 18 },
    { range: '31–50 (Med)', count: 12 },
    { range: '51–70 (Elev)', count: 9 },
    { range: '71–85 (High)', count: threats.filter(t => t.riskScore >= 71 && t.riskScore <= 85).length || 6 },
    { range: '86–100 (Crit)', count: threats.filter(t => t.riskScore > 85).length || 5 },
  ];

  // 5. Response Actions Breakdown
  const responseData = [
    { action: 'ALLOW', count: 420, color: '#00875a' },
    { action: 'MONITOR', count: 64, color: '#d97706' },
    { action: 'BLOCK', count: stats.blockedSources, color: '#e11d48' }
  ];

  // 6. Top Source IPs
  const topIps = [
    { ip: '10.0.0.25', threat: 'Port Scan Recon', count: 1420, risk: 91, status: 'BLOCKED' },
    { ip: '10.0.0.88', threat: 'DoS Flood', count: 15400, risk: 96, status: 'BLOCKED' },
    { ip: '10.0.0.42', threat: 'SSH Brute Force', count: 890, risk: 87, status: 'BLOCKED' },
    { ip: '10.0.0.81', threat: 'MySQL Probe', count: 620, risk: 85, status: 'BLOCKED' },
    { ip: '10.0.0.30', threat: 'TLS Beacon Anomaly', count: 340, risk: 64, status: 'MONITORED' },
    { ip: '10.0.0.50', threat: 'Phishing DNS Egress', count: 18, risk: 88, status: 'BLOCKED' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-slate-200/80 rounded-2xl shadow-xl font-sans text-xs">
          <p className="text-slate-900 font-bold mb-1">{label || payload[0]?.name}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 text-slate-600 font-medium">
              <span className="flex items-center gap-1.5" style={{ color: entry.color || entry.fill }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                {entry.name || 'Count'}:
              </span>
              <strong className="text-slate-900 font-bold">{entry.value}</strong>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Bar */}
      <div className="p-6 bg-white border border-slate-100/90 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-card">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Cybersecurity SOC Analytics
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Correlated metrics across telemetry streams, risk vectors, automated responses, and top attack sources.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 p-1.5 rounded-2xl text-xs">
          {(['Today', '7 Days', '30 Days'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3.5 py-1.5 rounded-xl transition-all font-bold ${
                timeframe === t ? 'bg-[#00875a] text-white shadow-brand-sm' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Threats Over Time & Severity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Threats Over Time Chart */}
        <div className="lg:col-span-8 bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00875a]" />
              Threats Over Time &amp; Mitigations
            </h4>
            <span className="text-xs text-slate-600 font-bold">Hourly Timeline</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="threatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="blockGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00875a" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#00875a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontWeight={600} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={600} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#334155', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="threats" name="Threats Detected" stroke="#e11d48" strokeWidth={2.5} fillOpacity={1} fill="url(#threatGrad)" />
                <Area type="monotone" dataKey="blocked" name="Firewall Blocked" stroke="#00875a" strokeWidth={2.5} fillOpacity={1} fill="url(#blockGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Distribution Donut */}
        <div className="lg:col-span-4 bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-purple-600" />
              Severity Distribution
            </h4>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={3} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs pt-3 border-t border-slate-100">
            {severityData.map((t, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-2 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  {t.name}
                </span>
                <strong className="text-slate-900 font-bold">{t.value} Incidents</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Threat Categories (Bar) & Risk Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Threat Categories */}
        <div className="lg:col-span-6 bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              Threat Categories
            </h4>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} fontWeight={600} />
                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={10} fontWeight={600} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 6, 6, 0]} name="Detections" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Score Distribution */}
        <div className="lg:col-span-6 bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-600" />
              Risk Score Distribution
            </h4>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="range" stroke="#64748b" fontSize={10} fontWeight={600} />
                <YAxis stroke="#64748b" fontSize={11} fontWeight={600} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Evaluated Flows" fill="#00875a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Response Actions & Top Source IPs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Response Actions Breakdown */}
        <div className="lg:col-span-4 bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card flex flex-col justify-between">
          <div className="pb-4 border-b border-slate-100 mb-4">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00875a]" />
              Automated Response Actions
            </h4>
          </div>

          <div className="space-y-3 my-auto">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-rose-700 font-bold uppercase">BLOCK</span>
                <p className="text-[11px] text-slate-600 font-medium">High &amp; Critical Risk Drops</p>
              </div>
              <span className="text-xl font-bold text-rose-700">{stats.blockedSources}</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-900 font-bold uppercase">MONITOR</span>
                <p className="text-[11px] text-slate-600 font-medium">Deep Packet Inspection Mirror</p>
              </div>
              <span className="text-xl font-bold text-amber-800">24</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#00875a] font-bold uppercase">ALLOW</span>
                <p className="text-[11px] text-slate-600 font-medium">Benign Flow Transmission</p>
              </div>
              <span className="text-xl font-bold text-[#00875a]">420</span>
            </div>
          </div>
        </div>

        {/* Top Source IPs Table */}
        <div className="lg:col-span-8 bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Network className="w-4 h-4 text-[#00875a]" />
              Top Simulated Source IPs by Threat Frequency
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] text-slate-700 uppercase font-bold tracking-wider">
                  <th className="py-3 px-3">Source IP</th>
                  <th className="py-3 px-3">Primary Threat</th>
                  <th className="py-3 px-3">Hits</th>
                  <th className="py-3 px-3">Risk Score</th>
                  <th className="py-3 px-3 text-right">Firewall Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topIps.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-lg inline-block">{row.ip}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-800 font-semibold">{row.threat}</td>
                    <td className="py-3 px-3 text-slate-700 font-mono font-medium">{row.count.toLocaleString()}</td>
                    <td className="py-3 px-3 font-bold text-rose-600">{row.risk}/100</td>
                    <td className="py-3 px-3 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        row.status === 'BLOCKED' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
