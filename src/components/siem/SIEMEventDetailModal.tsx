'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Terminal, ShieldAlert, CheckCircle2, Copy, Layers, ExternalLink } from 'lucide-react';

export const SIEMEventDetailModal: React.FC = () => {
  const { selectedSiemEvent, isSiemModalOpen, closeSiemModal, addToast } = useSecurity();

  if (!isSiemModalOpen || !selectedSiemEvent) return null;

  const rawJsonString = selectedSiemEvent.rawJson || selectedSiemEvent.rawLog || JSON.stringify(selectedSiemEvent, null, 2);

  const copyLog = () => {
    navigator.clipboard.writeText(rawJsonString);
    addToast({
      title: 'Log Copied',
      message: 'Raw JSON log payload copied to clipboard.',
      type: 'info'
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSiemModal}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto font-sans"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900">
                    SIEM Event {selectedSiemEvent.id}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {selectedSiemEvent.eventType}
                  </span>
                </div>
                <span className="text-xs text-slate-600 font-medium">
                  Ingested at {selectedSiemEvent.timestamp} • Threat: <strong className="text-slate-900">{selectedSiemEvent.threat || 'BENIGN'}</strong>
                </span>
              </div>
            </div>
            <button
              onClick={closeSiemModal}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto custom-scrollbar text-xs">
            {/* Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Severity</span>
                <p className={`font-bold text-base mt-0.5 ${
                  selectedSiemEvent.severity === 'HIGH' || selectedSiemEvent.severity === 'CRITICAL' ? 'text-rose-600' : 'text-amber-700'
                }`}>
                  {selectedSiemEvent.severity}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Risk Score</span>
                <p className="font-bold text-base text-slate-900 mt-0.5">{selectedSiemEvent.riskScore} / 100</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Action Taken</span>
                <p className="font-bold text-base text-slate-900 mt-0.5">{selectedSiemEvent.action}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Status</span>
                <p className="font-bold text-base text-[#00875a] mt-0.5">{selectedSiemEvent.status}</p>
              </div>
            </div>

            {/* Source & Destination */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Source Address</span>
                <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{selectedSiemEvent.sourceIp || selectedSiemEvent.source}</p>
              </div>
              <div className="text-right">
                <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider">Destination Host</span>
                <p className="font-mono text-slate-900 font-semibold text-sm mt-0.5">{(selectedSiemEvent as any).destinationIp || selectedSiemEvent.destination || '10.0.0.10'}</p>
              </div>
            </div>

            {/* Raw JSON Forensic Viewer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-slate-600" />
                  Forensic Raw JSON Payload
                </span>
                <button
                  onClick={copyLog}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto custom-scrollbar max-h-56 leading-relaxed">
                {rawJsonString}
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={closeSiemModal}
              className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
            >
              Close Explorer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
