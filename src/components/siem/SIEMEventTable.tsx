'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  Database, 
  Search, 
  Filter, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  Layers,
  Download,
  Flame,
  FileCode
} from 'lucide-react';
import { SIEMEvent } from '../../types/security';

export const SIEMEventTable: React.FC = () => {
  const { siemEvents, openSiemModal, addToast } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<string>('ALL');

  // Filter logic covering: All, Critical, High, Medium, Low, Blocked, Monitored, Allowed
  const filteredEvents = siemEvents.filter(e => {
    const src = (e.sourceIp || e.source || '').toLowerCase();
    const matchesSearch = 
      e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.eventType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      src.includes(searchQuery.toLowerCase()) ||
      (e.threat && e.threat.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.action && e.action.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (e.severity && e.severity.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    switch (filterMode) {
      case 'CRITICAL':
        return e.severity === 'CRITICAL';
      case 'HIGH':
        return e.severity === 'HIGH';
      case 'MEDIUM':
        return e.severity === 'MEDIUM';
      case 'LOW':
        return e.severity === 'LOW';
      case 'BLOCKED':
        return e.action === 'BLOCK' || e.action === 'BLOCKED' || e.action === 'DROP';
      case 'MONITORED':
        return e.action === 'MONITOR' || e.action === 'MONITORED';
      case 'ALLOWED':
        return e.action === 'ALLOW' || e.action === 'ALLOWED';
      case 'ALL':
      default:
        return true;
    }
  });

  const exportLogs = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredEvents, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `sentinelai-siem-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast({
      title: 'SIEM Log Export Complete',
      message: `${filteredEvents.length} security telemetry events exported to JSON.`,
      type: 'info'
    });
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      case 'HIGH':
        return 'bg-orange-50 text-orange-600 border border-orange-200';
      case 'MEDIUM':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      default:
        return 'bg-emerald-50 text-[#00875a] border border-emerald-200';
    }
  };

  const filterTabs = [
    'ALL',
    'CRITICAL',
    'HIGH',
    'MEDIUM',
    'LOW',
    'BLOCKED',
    'MONITORED',
    'ALLOWED'
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Stats Banner */}
      <div className="bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  SIEM Event Explorer
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#00875a] text-[10px] font-bold">
                  LIVE INGESTION
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Centralized telemetry stream with real-time risk tagging, intrusion indicators, and forensic audit JSON.
              </p>
            </div>
          </div>

          <button
            onClick={exportLogs}
            className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 hover:text-slate-950 border border-slate-200/70 text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-[#00875a]" />
            <span>Export SIEM JSON</span>
          </button>
        </div>

        {/* Quick KPI Counters */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Total Logged</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{siemEvents.length} Events</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Critical &amp; High</span>
            <p className="text-xl font-bold text-rose-600 mt-0.5">
              {siemEvents.filter(e => e.severity === 'CRITICAL' || e.severity === 'HIGH').length}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Blocked Events</span>
            <p className="text-xl font-bold text-amber-700 mt-0.5">
              {siemEvents.filter(e => e.action === 'BLOCK' || e.action === 'BLOCKED' || e.action === 'DROP').length}
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Contained Incidents</span>
            <p className="text-xl font-bold text-[#00875a] mt-0.5">
              {siemEvents.filter(e => e.status === 'CONTAINED' || e.status === 'RESOLVED').length}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-100/90 shadow-card flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by IP, Event ID, Threat, Severity, Action..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 focus:border-[#00875a] focus:bg-white text-slate-900 placeholder-slate-400 outline-none text-xs font-medium transition-all"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterMode(tab)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                filterMode === tab
                  ? 'bg-[#00875a] text-white shadow-brand-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* SIEM Events Table */}
      <div className="bg-white rounded-3xl border border-slate-100/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-700 border-b border-slate-200 text-[10px] uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-5">Timestamp</th>
                <th className="py-3.5 px-5">Event ID</th>
                <th className="py-3.5 px-5">Event Type</th>
                <th className="py-3.5 px-5">Source</th>
                <th className="py-3.5 px-5">Threat</th>
                <th className="py-3.5 px-5">Risk</th>
                <th className="py-3.5 px-5">Severity</th>
                <th className="py-3.5 px-5">Action</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Raw JSON</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-500 font-medium">
                    No SIEM events match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr
                    key={event.id}
                    onClick={() => openSiemModal(event)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-5 text-slate-600 text-[11px] font-mono font-medium">{event.timestamp}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-900 group-hover:text-[#00875a] font-mono">
                      {event.id}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">
                        {event.eventType}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg inline-block">
                        {event.sourceIp || event.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      {event.threat || 'BENIGN'}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="font-bold text-rose-600">{event.riskScore}/100</span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getSeverityBadge(event.severity)}`}>
                        {event.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        event.action === 'BLOCK' || event.action === 'BLOCKED' || event.action === 'DROP'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : event.action === 'MONITOR' || event.action === 'MONITORED'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-[#00875a] border border-emerald-200'
                      }`}>
                        {event.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 font-bold">
                        {event.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button className="px-3 py-1 rounded-xl bg-slate-100 group-hover:bg-purple-50 text-slate-700 group-hover:text-purple-800 border border-slate-200/70 group-hover:border-purple-200 text-xs font-bold transition-all inline-flex items-center gap-1.5 ml-auto">
                        <FileCode className="w-3.5 h-3.5" />
                        <span>JSON</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
