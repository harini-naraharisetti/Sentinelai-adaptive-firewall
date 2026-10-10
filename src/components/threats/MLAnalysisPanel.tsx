'use client';

import React from 'react';
import { Brain, Cpu, Zap, Activity, ShieldCheck, Flame, Layers, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskMeter } from '../common/RiskMeter';

export const MLAnalysisPanel: React.FC = () => {
  const { stats, threats } = useSecurity();
  const latestThreat = threats[0] || {
    id: 'THR-2026-00142',
    type: 'Port Scan',
    threatType: 'Port Scan',
    riskScore: 91,
    confidence: 94,
    anomalyScore: 0.87,
    action: 'BLOCK',
    features: {
      packetCount: 842,
      connectionCount: 127,
      uniquePorts: 38,
      byteCount: 120420,
      connectionRate: 92,
      synCount: 720,
      entropy: 0.82
    }
  };

  const totalInferenceCount = stats?.totalEvents || 12450;
  const threatsCount = stats?.threatsDetected || 24;
  const normalCount = Math.max(0, totalInferenceCount - threatsCount);

  return (
    <div className="space-y-6 font-sans">
      {/* Top AI Engine Status Banner (Clean White Card with Emerald Accents) */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  AI Threat Detection &amp; Inference Engine
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#00875a] text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00875a] animate-pulse" />
                  SIMULATED ML ACTIVE
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1 font-semibold">
                <span>Random Forest: <strong className="text-slate-900">● Active — Simulated</strong></span>
                <span className="text-slate-300">•</span>
                <span>Isolation Forest: <strong className="text-[#00875a]">● Active — Simulated</strong></span>
              </div>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 self-start md:self-auto">
            <span>Inference Pipeline: </span>
            <strong className="text-[#00875a]">Continuous Stream</strong>
          </div>
        </div>

        {/* Demo Model Metrics Grid */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] text-slate-600 font-bold uppercase block">Inference Count</span>
            <p className="text-base font-black text-slate-900 mt-1">{totalInferenceCount.toLocaleString()}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] text-slate-600 font-bold uppercase block">Normal Traffic</span>
            <p className="text-base font-black text-[#00875a] mt-1">{normalCount.toLocaleString()}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] text-slate-600 font-bold uppercase block">Anomalies Detected</span>
            <p className="text-base font-black text-amber-700 mt-1">{(threatsCount * 2 + 18).toLocaleString()}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] text-slate-600 font-bold uppercase block">Classified Threats</span>
            <p className="text-base font-black text-rose-600 mt-1">{threatsCount.toLocaleString()}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-600 font-bold uppercase block">Model Confidence</span>
            <p className="text-base font-black text-[#00875a] mt-1">94.8% F1-Score</p>
          </div>
        </div>
      </div>

      {/* Feature Extraction & Real-Time ML Analysis Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Feature Vector Card (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00875a]" />
                <h4 className="font-bold text-sm text-slate-900">
                  Extracted Feature Vector &amp; Dual-Model Scoring
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-500 font-bold">
                Flow ID: {latestThreat.id}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-600 font-bold uppercase">Packets Inspected</span>
                <p className="text-base font-black text-slate-900 mt-0.5">{latestThreat.features?.packetCount || 842}</p>
                <span className="text-[10px] text-slate-500 font-medium">Flow volume count</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-600 font-bold uppercase">Bytes Transferred</span>
                <p className="text-base font-black text-slate-900 mt-0.5">{(((latestThreat.features?.byteCount || 120420)) / 1024).toFixed(1)} KB</p>
                <span className="text-[10px] text-slate-500 font-medium">{latestThreat.features?.byteCount || 120420} bytes</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-600 font-bold uppercase">Unique Ports</span>
                <p className="text-base font-black text-purple-700 mt-0.5">{latestThreat.features?.uniquePorts || 38}</p>
                <span className="text-[10px] text-slate-500 font-medium">Port dispersion</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-600 font-bold uppercase">Connection Rate</span>
                <p className="text-base font-black text-rose-600 mt-0.5">{latestThreat.features?.connectionRate || 92}/sec</p>
                <span className="text-[10px] text-slate-500 font-medium">Velocity probe</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-600 font-bold uppercase">SYN Packet Count</span>
                <p className="text-base font-black text-amber-700 mt-0.5">{latestThreat.features?.synCount || 720}</p>
                <span className="text-[10px] text-slate-500 font-medium">SYN flag burst</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-600 font-bold uppercase">Entropy Ratio</span>
                <p className="text-base font-black text-[#00875a] mt-0.5">{(latestThreat.features?.entropy ?? 0.82).toFixed(2)}</p>
                <span className="text-[10px] text-slate-500 font-medium">Payload randomness</span>
              </div>
            </div>

            {/* Numerical Feature Vector Array */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 mb-4 text-xs font-sans">
              <span className="text-[11px] text-slate-700 font-bold uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#00875a]" /> Numerical Feature Vector [F]:
              </span>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono text-xs font-semibold shadow-inner">
                [{latestThreat.features?.packetCount || 842}, {latestThreat.features?.byteCount || 120420}, {latestThreat.features?.connectionRate || 92}, {latestThreat.features?.uniquePorts || 38}, {latestThreat.features?.synCount || 720}, {latestThreat.features?.entropy || 0.82}]
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <div>
                <span className="text-xs font-bold text-slate-900">
                  Random Forest: <strong className="text-rose-700 uppercase">{latestThreat.type || latestThreat.threatType} ({latestThreat.confidence || 94}%)</strong>
                </span>
                <span className="text-[11px] text-slate-700 font-medium block">
                  Isolation Forest: <strong className="text-purple-700">Anomaly Detected (Score: {(latestThreat.anomalyScore ?? 0.87).toFixed(2)})</strong>
                </span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold border border-rose-200">
              {latestThreat.action || 'BLOCK'}
            </span>
          </div>
        </div>

        {/* Risk Engine Visual Meter (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-card flex flex-col items-center justify-between text-center">
          <div className="w-full text-left pb-3 border-b border-slate-100 mb-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-sm text-slate-900">
                Composite Risk Engine
              </h4>
            </div>
          </div>

          <div className="my-4">
            <RiskMeter 
              score={latestThreat.riskScore} 
              size="hero" 
              label={`${latestThreat.riskScore >= 71 ? 'HIGH' : latestThreat.riskScore >= 31 ? 'MEDIUM' : 'LOW'} RISK`} 
            />
          </div>

          <div className="w-full text-left p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700 font-medium leading-normal">
            <p className="font-bold text-slate-900 mb-2">Scoring Breakdown:</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Threat Classification Weight:</span>
                <span className="text-rose-600 font-bold">+45</span>
              </div>
              <div className="flex justify-between">
                <span>Anomaly Score Contribution:</span>
                <span className="text-purple-600 font-bold">+25</span>
              </div>
              <div className="flex justify-between">
                <span>Connection Velocity Factor:</span>
                <span className="text-amber-700 font-bold">+10</span>
              </div>
              <div className="flex justify-between">
                <span>Port Dispersion Spread:</span>
                <span className="text-[#00875a] font-bold">+06</span>
              </div>
              <div className="flex justify-between">
                <span>SYN Flag Burst Factor:</span>
                <span className="text-blue-600 font-bold">+05</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-slate-900 text-xs">
                <span>Total Composite Risk:</span>
                <span className="text-rose-600">{latestThreat.riskScore} / 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
