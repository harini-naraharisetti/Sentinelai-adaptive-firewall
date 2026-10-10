'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  X, 
  ShieldAlert, 
  Cpu, 
  Flame, 
  CheckCircle2, 
  ShieldBan, 
  Database, 
  Activity, 
  Clock, 
  ExternalLink,
  Lock,
  Binary
} from 'lucide-react';

export const IncidentDetailModal: React.FC = () => {
  const { 
    selectedIncident, 
    isIncidentModalOpen, 
    closeIncidentModal,
    resolveIncident,
    quarantineIncident
  } = useSecurity();

  if (!isIncidentModalOpen || !selectedIncident) return null;

  const severityBadge = (severity: string) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn font-sans">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-white border border-slate-100 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-brand-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Incident {selectedIncident.id}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${severityBadge(selectedIncident.severity)}`}>
                  {selectedIncident.severity}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs bg-slate-100 text-slate-800 font-bold">
                  {selectedIncident.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {selectedIncident.summary}
              </p>
            </div>
          </div>
          <button
            onClick={closeIncidentModal}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-5 space-y-5 text-xs">
          {/* Key Incident Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Threat Type</div>
              <div className="text-sm font-bold text-slate-900 mt-1">{selectedIncident.threatType}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Source IP</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-1">{selectedIncident.sourceIp}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Target IP</div>
              <div className="text-sm font-bold text-slate-900 font-mono mt-1">{selectedIncident.destinationIp}</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">Composite Risk</div>
              <div className="text-sm font-bold text-rose-600 mt-1 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>{selectedIncident.riskScore} / 100</span>
              </div>
            </div>
          </div>

          {/* AI Analysis & Feature Model Breakdown */}
          <div className="p-5 rounded-3xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#00875a] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00875a]" />
                Simulated AI Classification Models
              </span>
              <span className="text-[11px] bg-emerald-100 text-[#00875a] px-2.5 py-0.5 rounded-full font-bold">
                Random Forest &amp; Isolation Forest
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="text-slate-600 text-[11px] font-bold">Random Forest Classification:</div>
                <div className="text-slate-900 font-bold text-sm flex items-center justify-between">
                  <span>{selectedIncident.threatType}</span>
                  <span className="text-[#00875a]">{selectedIncident.confidence || 94}% Confidence</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="text-slate-600 text-[11px] font-bold">Isolation Forest Anomaly Status:</div>
                <div className="text-slate-900 font-bold text-sm flex items-center justify-between">
                  <span className="text-amber-700 font-bold">Anomaly Confirmed</span>
                  <span className="text-purple-700 font-bold">Score: {selectedIncident.anomalyScore || 0.87}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Factors Breakdown */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Contributing Risk Factors
            </div>
            <div className="space-y-2">
              {selectedIncident.factors.map((factor, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 px-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm text-xs">
                  <span className="text-slate-800 font-semibold">{factor.name}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      factor.level === 'HIGH' ? 'text-rose-600 bg-rose-50' : factor.level === 'MEDIUM' ? 'text-amber-700 bg-amber-50' : 'text-[#00875a] bg-emerald-50'
                    }`}>
                      {factor.level}
                    </span>
                    <span className="text-slate-900 font-bold">+{factor.points}</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 font-bold text-slate-900 px-3.5">
                <span>Total Calculated Risk</span>
                <span className="text-rose-600 text-sm">{selectedIncident.riskScore} / 100</span>
              </div>
            </div>
          </div>

          {/* 7-Stage Incident Lifecycle Timeline */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#00875a]" />
              Incident Lifecycle Timeline
            </div>
            <div className="space-y-3 pt-1">
              {selectedIncident.timeline.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5 relative">
                  {idx < selectedIncident.timeline.length - 1 && (
                    <div className="absolute left-2.5 top-6 bottom-0 w-[1.5px] bg-slate-300" />
                  )}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 ${
                    step.completed ? 'bg-[#00875a] text-white shadow-brand-sm' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${step.completed ? 'text-slate-900' : 'text-slate-500'}`}>
                        {step.stage}
                      </span>
                      <span className="text-[10px] text-slate-600 font-semibold">{step.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 font-medium">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Automated Response & SIEM Mapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="text-[11px] font-bold text-[#00875a] flex items-center gap-1.5">
                <ShieldBan className="w-3.5 h-3.5" />
                Adaptive Firewall Action
              </div>
              <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>{selectedIncident.action} SIMULATED</span>
                <span className="text-xs text-slate-600 font-semibold">{selectedIncident.ruleId || 'Rule Auto-Generated'}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal font-medium">
                Synthesized simulated rule to restrict inbound packets from source.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-slate-600" />
                SIEM Event Linkage
              </div>
              <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>{selectedIncident.siemEventId || 'EVT-1042'}</span>
                <span className="text-xs text-[#00875a] font-bold">LOGGED</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal font-medium">
                Dispatched to real-time SIEM event stream with full telemetry vector.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-600 font-medium">
            * All containment actions operate locally in demonstration mode.
          </div>
          <div className="flex items-center gap-2">
            {selectedIncident.status !== 'RESOLVED' && (
              <>
                <button
                  onClick={() => quarantineIncident(selectedIncident.id)}
                  className="px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-all"
                >
                  Simulate Quarantine
                </button>
                <button
                  onClick={() => resolveIncident(selectedIncident.id)}
                  className="px-4 py-2 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white font-bold text-xs shadow-brand transition-all"
                >
                  Mark Resolved
                </button>
              </>
            )}
            <button
              onClick={closeIncidentModal}
              className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
