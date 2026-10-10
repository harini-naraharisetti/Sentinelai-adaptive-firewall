'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  AlertOctagon, 
  ShieldAlert, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Flame, 
  ChevronRight,
  ShieldBan,
  Radio,
  SlidersHorizontal,
  RefreshCw,
  ArrowUpRight
} from 'lucide-react';
import { Incident } from '../../types/security';

export const IncidentsList: React.FC = () => {
  const { 
    incidents, 
    openIncidentModal, 
    resolveIncident, 
    quarantineIncident,
    stats,
    generateManualThreat 
  } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'DETECTED' | 'ANALYZING' | 'CONTAINED' | 'RESOLVED'>('ALL');

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = 
      incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.threatType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.sourceIp.includes(searchQuery) ||
      incident.destinationIp.includes(searchQuery);

    const matchesSeverity = severityFilter === 'ALL' || incident.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || incident.status === statusFilter;

    return matchesSearch && matchesSeverity && matchesStatus;
  });

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'DETECTED':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'ANALYZING':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'CONTAINED':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'RESOLVED':
        return 'bg-emerald-50 text-[#00875a] border border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Metric Cards */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-brand-sm">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Security Incident Response
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Automated lifecycle response tracking: detection, ML containment, firewall rule synthesis, and SIEM dispatch.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => generateManualThreat('PORT_SCAN')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold shadow-brand transition-all"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Simulate Port Scan Incident</span>
          </button>
        </div>
      </div>

      {/* Incident Status Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card">
          <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">Active Incidents</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{stats.activeIncidents}</div>
          <div className="text-[11px] text-amber-700 mt-1 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Requiring Review
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card">
          <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">Critical Severity</div>
          <div className="text-2xl font-bold text-rose-600 mt-1">
            {incidents.filter(i => i.severity === 'CRITICAL' && i.status !== 'RESOLVED').length}
          </div>
          <div className="text-[11px] text-rose-600 mt-1 font-bold">Auto-Contained</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card">
          <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">Contained by Rules</div>
          <div className="text-2xl font-bold text-[#00875a] mt-1">
            {incidents.filter(i => i.status === 'CONTAINED').length}
          </div>
          <div className="text-[11px] text-[#00875a] mt-1 font-bold">Firewall Active</div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card">
          <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">Resolved</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {incidents.filter(i => i.status === 'RESOLVED').length}
          </div>
          <div className="text-[11px] text-slate-600 mt-1 font-bold">Closed Incidents</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-100/90 shadow-card flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search Box */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by incident ID (e.g. INC-0042), threat type, IP..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 focus:border-[#00875a] focus:bg-white text-slate-900 placeholder-slate-400 outline-none text-xs font-medium transition-all"
          />
        </div>

        {/* Severity Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all ${
                severityFilter === sev
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {(['ALL', 'CONTAINED', 'ANALYZING', 'RESOLVED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#00875a] text-white shadow-brand-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/70'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-3xl border border-slate-100/90 shadow-card overflow-hidden">
        {filteredIncidents.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#00875a] mx-auto" />
            <div className="text-sm font-bold text-slate-900">No Active Incidents Found</div>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
              Your security environment currently has no unresolved simulated incidents matching the query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700 uppercase text-[10px] tracking-wider font-bold">
                  <th className="py-3.5 px-5">Incident ID</th>
                  <th className="py-3.5 px-5">Threat Type</th>
                  <th className="py-3.5 px-5">Source IP</th>
                  <th className="py-3.5 px-5">Target IP</th>
                  <th className="py-3.5 px-5">Risk Score</th>
                  <th className="py-3.5 px-5">Severity</th>
                  <th className="py-3.5 px-5">Response Action</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {filteredIncidents.map((incident) => (
                  <tr
                    key={incident.id}
                    onClick={() => openIncidentModal(incident)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-5 font-bold text-slate-900 group-hover:text-[#00875a] transition-colors flex items-center gap-1.5 font-mono">
                      <AlertOctagon className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00875a]" />
                      <span>{incident.id}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-900 font-bold">
                      {incident.threatType}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="font-mono text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-lg">
                        {incident.sourceIp}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 font-mono font-medium">
                      {incident.destinationIp}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="font-bold text-rose-600 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-rose-500" />
                        {incident.riskScore}/100
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getSeverityBadge(incident.severity)}`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        incident.action === 'BLOCK'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : incident.action === 'MONITOR'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-[#00875a] border border-emerald-200'
                      }`}>
                        {incident.action} SIMULATED
                      </span>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getStatusBadge(incident.status)}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {incident.status !== 'RESOLVED' ? (
                          <>
                            <button
                              onClick={() => quarantineIncident(incident.id)}
                              className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-all"
                              title="Simulate Quarantine"
                            >
                              Quarantine
                            </button>
                            <button
                              onClick={() => resolveIncident(incident.id)}
                              className="px-3 py-1 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold transition-all shadow-brand-sm"
                              title="Resolve Incident"
                            >
                              Resolve
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-[#00875a] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                          </span>
                        )}
                        <button
                          onClick={() => openIncidentModal(incident)}
                          className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 ml-1"
                          title="View Details"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
