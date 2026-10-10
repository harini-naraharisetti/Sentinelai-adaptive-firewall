'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  X, 
  Activity, 
  Cpu, 
  Flame, 
  Binary, 
  Layers, 
  Hash, 
  Network, 
  ArrowRight,
  ShieldAlert, 
  Info
} from 'lucide-react';
import { extractFeatureVector } from '../../services/simulationEngine';

export const NetworkFlowModal: React.FC = () => {
  const { 
    selectedNetworkEvent, 
    isNetworkModalOpen, 
    closeNetworkModal 
  } = useSecurity();

  if (!isNetworkModalOpen || !selectedNetworkEvent) return null;

  const vector = extractFeatureVector(selectedNetworkEvent);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'BLOCKED':
        return 'bg-rose-50 text-rose-700 border border-rose-200 font-bold';
      case 'SUSPICIOUS':
        return 'bg-amber-50 text-amber-800 border border-amber-200 font-bold';
      case 'MONITORED':
        return 'bg-purple-50 text-purple-800 border border-purple-200 font-bold';
      default:
        return 'bg-emerald-50 text-[#00875a] border border-emerald-200 font-bold';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fadeIn font-sans">
      <div 
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  Network Flow Deep Inspection
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] ${getStatusBadge(selectedNetworkEvent.status)}`}>
                  {selectedNetworkEvent.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                Event ID: {selectedNetworkEvent.id} • Time: {selectedNetworkEvent.timestamp}
              </p>
            </div>
          </div>
          <button
            onClick={closeNetworkModal}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-4 text-xs">
          {/* Socket Connection Map */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Source Endpoint</span>
              <div className="text-slate-900 font-mono font-bold text-sm">{selectedNetworkEvent.sourceIp}</div>
              <div className="text-slate-600 font-mono text-xs font-semibold">Port: {selectedNetworkEvent.sourcePort}</div>
            </div>

            <div className="flex flex-col items-center justify-center px-4">
              <div className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-bold mb-1 shadow-sm">
                {selectedNetworkEvent.protocol}
              </div>
              <ArrowRight className="w-5 h-5 text-[#00875a]" />
            </div>

            <div className="space-y-1 text-right">
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Destination Endpoint</span>
              <div className="text-slate-900 font-mono font-bold text-sm">{selectedNetworkEvent.destinationIp}</div>
              <div className="text-slate-600 font-mono text-xs font-semibold">Port: {selectedNetworkEvent.destinationPort}</div>
            </div>
          </div>

          {/* Deep Packet Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-600 text-[10px] uppercase font-bold">Packet Count</span>
              <div className="text-slate-900 font-mono font-bold text-base mt-0.5">
                {selectedNetworkEvent.packetCount.toLocaleString()}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-600 text-[10px] uppercase font-bold">Total Bytes</span>
              <div className="text-slate-900 font-mono font-bold text-base mt-0.5">
                {(selectedNetworkEvent.bytes / 1024).toFixed(1)} KB
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-600 text-[10px] uppercase font-bold">Flow Rate</span>
              <div className="text-slate-900 font-mono font-bold text-base mt-0.5">
                {selectedNetworkEvent.connectionRate} req/s
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-600 text-[10px] uppercase font-bold">Entropy</span>
              <div className="text-slate-900 font-mono font-bold text-base mt-0.5">
                {selectedNetworkEvent.entropy}
              </div>
            </div>
          </div>

          {/* AI Vector Extraction Preview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Cpu className="w-4 h-4 text-[#00875a]" />
              <span>Extracted ML Feature Vector (Normalized 0-1)</span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              These extracted telemetry metrics feed into both the Local Random Forest classifier and the Neural Anomaly autoencoder.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
              {[
                { name: 'Packet Count', val: vector[0] },
                { name: 'Total Bytes', val: vector[1] },
                { name: 'Conn Rate', val: vector[2] },
                { name: 'Unique Ports', val: vector[3] },
                { name: 'SYN Count', val: vector[4] },
                { name: 'Entropy', val: vector[5] },
              ].map((item) => (
                <div key={item.name} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                  <div className="text-slate-600 truncate text-[10px] font-bold">{item.name}</div>
                  <div className="text-[#00875a] font-mono font-bold text-xs mt-0.5">{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Payload Snippet & Flags */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-900 font-bold">DPI Payload Signature &amp; TCP Flags</span>
              <div className="flex items-center gap-1.5">
                {((selectedNetworkEvent as any).flags || ['SYN', 'ACK']).map((flag: string) => (
                  <span key={flag} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-mono text-[10px] font-bold shadow-sm">
                    {flag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto">
              {selectedNetworkEvent.payloadInfo || 'SYN flood packet with spoofed sequence number headers.'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-semibold">
            Real-time simulated Deep Packet Inspection
          </span>
          <button
            onClick={closeNetworkModal}
            className="px-5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
