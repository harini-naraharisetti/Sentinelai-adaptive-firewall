'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  Play, 
  Pause, 
  Trash2, 
  Radio, 
  Search, 
  Filter, 
  Activity, 
  ArrowUpRight,
  ShieldAlert, 
  ArrowUpDown,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { NetworkEvent } from '../../types/security';
import { NetworkFlowModal } from './NetworkFlowModal';

export const LivePacketStream: React.FC = () => {
  const { 
    networkEvents, 
    isLiveSimulationRunning, 
    pauseLiveSimulation, 
    resumeLiveSimulation, 
    clearTraffic, 
    generateManualThreat, 
    openNetworkModal 
  } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'NORMAL' | 'SUSPICIOUS' | 'BLOCKED'>('ALL');

  const filteredEvents = networkEvents.filter(event => {
    const matchesSearch = 
      event.sourceIp.includes(searchQuery) ||
      event.destinationIp.includes(searchQuery) ||
      event.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.destinationPort && event.destinationPort.toString().includes(searchQuery)) ||
      (event.payloadInfo && event.payloadInfo.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || event.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'BLOCKED':
        return 'bg-rose-50 text-rose-700 border border-rose-200 font-bold';
      case 'SUSPICIOUS':
        return 'bg-amber-50 text-amber-800 border border-amber-200 font-bold';
      case 'MONITORED':
        return 'bg-purple-50 text-purple-800 border border-purple-200 font-semibold';
      default:
        return 'bg-emerald-50 text-[#00875a] border border-emerald-200 font-bold';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Live Network Traffic Stream
              </h1>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                Simulated high-frequency network stream. Click any row to inspect deep flow features &amp; AI vector inputs.
              </p>
            </div>
          </div>
        </div>

        {/* Live Stream Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {isLiveSimulationRunning ? (
            <button
              onClick={pauseLiveSimulation}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-all shadow-sm"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Stream</span>
            </button>
          ) : (
            <button
              onClick={resumeLiveSimulation}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#00875a] text-xs font-bold transition-all shadow-sm"
            >
              <Play className="w-3.5 h-3.5 text-[#00875a]" />
              <span>Resume Stream</span>
            </button>
          )}

          <button
            onClick={() => generateManualThreat('PORT_SCAN')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold shadow-brand transition-all"
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Generate Threat</span>
          </button>

          <button
            onClick={clearTraffic}
            className="p-2.5 rounded-2xl bg-white hover:bg-rose-50 border border-slate-200 text-slate-600 hover:text-rose-600 transition-colors shadow-sm"
            title="Clear Traffic Stream"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stream Status Banner */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${isLiveSimulationRunning ? 'bg-[#00875a] animate-ping' : 'bg-amber-500'}`} />
          <span className="text-slate-900 font-bold">
            Stream Status: {isLiveSimulationRunning ? 'Transmitting Simulated Packets' : 'Stream Paused'}
          </span>
          <span className="text-slate-600 font-semibold">({networkEvents.length} frames in buffer)</span>
        </div>

        <div className="flex items-center gap-2 font-bold">
          <span className="text-slate-600 text-xs">Distribution:</span>
          <span className="text-[11px] bg-emerald-50 text-[#00875a] px-2.5 py-0.5 rounded-full border border-emerald-200">70% Normal</span>
          <span className="text-[11px] bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">15% Monitored</span>
          <span className="text-[11px] bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">15% Threat</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-card flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by Source IP, Protocol, Port, or Payload keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-[#00875a] focus:bg-white text-slate-900 placeholder-slate-400 outline-none text-xs font-semibold transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto font-bold">
          {(['ALL', 'NORMAL', 'SUSPICIOUS', 'BLOCKED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-[#00875a] text-white shadow-brand-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Network Traffic Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-600 uppercase text-[10px] tracking-wider font-bold">
                <th className="py-3.5 px-5">Time</th>
                <th className="py-3.5 px-5">Source IP</th>
                <th className="py-3.5 px-5">Destination</th>
                <th className="py-3.5 px-5">Port</th>
                <th className="py-3.5 px-5">Protocol</th>
                <th className="py-3.5 px-5">Packets</th>
                <th className="py-3.5 px-5">Bytes</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  onClick={() => openNetworkModal(event)}
                  className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-5 text-slate-600 font-mono text-xs font-medium">
                    {event.timestamp}
                  </td>
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-900 group-hover:text-[#00875a] transition-colors">
                    {event.sourceIp}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-slate-800 font-semibold">
                    {event.destinationIp}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-slate-700 font-semibold">
                    {event.destinationPort}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200/60">
                      {event.protocol}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-mono text-slate-800 font-semibold">
                    {event.packetCount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-slate-700 font-medium">
                    {(event.bytes / 1024).toFixed(1)} KB
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] ${getStatusBadge(event.status)}`}>
                      ● {event.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openNetworkModal(event);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-[#00875a] border border-slate-200 group-hover:border-emerald-200 text-xs font-bold transition-all"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Network Flow Inspector Modal */}
      <NetworkFlowModal />
    </div>
  );
};
