'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ShieldAlert, 
  Flame, 
  Brain, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  Network, 
  Cpu, 
  FileCode,
  Activity,
  Layers
} from 'lucide-react';
import { RiskMeter } from '../common/RiskMeter';

export const ThreatDetailModal: React.FC = () => {
  const { 
    selectedThreat, 
    isThreatModalOpen, 
    closeThreatModal
  } = useSecurity();

  if (!isThreatModalOpen || !selectedThreat) return null;

  const isHigh = selectedThreat.severity === 'HIGH' || selectedThreat.severity === 'CRITICAL';
  const isMed = selectedThreat.severity === 'MEDIUM';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeThreatModal}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto font-sans"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-2xl ${
                isHigh ? 'bg-rose-50 text-rose-600' : isMed ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-[#00875a]'
              }`}>
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {selectedThreat.type || selectedThreat.threatType}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isHigh ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {selectedThreat.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Simulated Detection ID: {selectedThreat.id} • {selectedThreat.timestamp}
                </p>
              </div>
            </div>

            <button
              onClick={closeThreatModal}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs custom-scrollbar">
            {/* AI Diagnostics & Dual Model Scoring */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center text-center">
                <span className="text-slate-600 text-[10px] uppercase font-bold tracking-wider mb-1">Composite Risk Score</span>
                <span className={`text-3xl font-black ${isHigh ? 'text-rose-600' : isMed ? 'text-amber-600' : 'text-[#00875a]'}`}>
                  {selectedThreat.riskScore}/100
                </span>
                <span className="text-[10px] text-slate-600 mt-1 font-semibold">Autonomous Threshold Met</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-slate-700 text-[10px] uppercase font-bold flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-[#00875a]" /> Random Forest
                </span>
                <div className="flex justify-between items-center text-slate-800">
                  <span className="text-slate-600 font-medium">Class:</span>
                  <strong className="text-slate-900">{selectedThreat.type || selectedThreat.threatType}</strong>
                </div>
                <div className="flex justify-between items-center text-slate-800">
                  <span className="text-slate-600 font-medium">Confidence:</span>
                  <strong className="text-[#00875a]">{selectedThreat.confidence || selectedThreat.mlConfidence || 94}%</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-slate-700 text-[10px] uppercase font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-purple-600" /> Isolation Forest
                </span>
                <div className="flex justify-between items-center text-slate-800">
                  <span className="text-slate-600 font-medium">Score:</span>
                  <strong className="text-slate-900">{(selectedThreat.anomalyScore ?? 0.87).toFixed(2)}</strong>
                </div>
                <div className="flex justify-between items-center text-slate-800">
                  <span className="text-slate-600 font-medium">Status:</span>
                  <strong className="text-purple-700 font-bold">Anomaly Detected</strong>
                </div>
              </div>
            </div>

            {/* Network Vector Metadata */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span className="text-slate-700 text-[10px] uppercase font-bold flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-[#00875a]" /> Flow Vector Attributes
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">Source IP</span>
                  <p className="font-bold text-slate-900 font-mono mt-0.5">{selectedThreat.sourceIp}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">Target Asset</span>
                  <p className="font-bold text-slate-900 font-mono mt-0.5">{selectedThreat.destinationIp}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">Protocol</span>
                  <p className="font-bold text-slate-900 mt-0.5">{selectedThreat.protocol || 'TCP'}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-slate-600 text-[10px] font-bold uppercase tracking-wider">Response Action</span>
                  <p className="font-bold text-rose-600 mt-0.5">{selectedThreat.action || 'BLOCK'}</p>
                </div>
              </div>
            </div>

            {/* AI Explanation / Reasoning */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 text-slate-700 space-y-1.5">
              <span className="font-bold flex items-center gap-1.5 text-[#00875a]">
                <Layers className="w-4 h-4" /> Detection Rationale &amp; Feature Attribution
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {selectedThreat.explanation || selectedThreat.aiExplanation || 'The simulated Random Forest engine identified irregular packet flow characteristics exceeding standard baseline behavioral profiles.'}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-600 font-medium">
              Simulated AI Inference • Demo Sandbox
            </span>
            <button
              onClick={closeThreatModal}
              className="px-5 py-2 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white font-bold text-xs transition-all shadow-brand"
            >
              Close Inspector
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
