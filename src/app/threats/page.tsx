'use client';

import React from 'react';
import { MLAnalysisPanel } from '../../components/threats/MLAnalysisPanel';
import { ThreatsTable } from '../../components/threats/ThreatsTable';
import { MitreAttackMatrix } from '../../components/threats/MitreAttackMatrix';
import { DemoDisclaimer } from '../../components/common/DemoDisclaimer';
import { Cpu, Brain, ShieldAlert } from 'lucide-react';

export default function ThreatDetectionPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AI Threat Detection &amp; ML Inference Engine
            </h1>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Machine-learning-based feature extraction, anomaly identification, and confidence-scored classification.
          </p>
        </div>
      </div>

      <DemoDisclaimer />

      {/* ML Analysis Top Panel */}
      <MLAnalysisPanel />

      {/* Interactive MITRE ATT&CK Matrix */}
      <MitreAttackMatrix />

      {/* Active Threats Table */}
      <div className="space-y-3 pt-2 font-sans">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          Detected Threat Signatures &amp; Active Incidents
        </h3>
        <ThreatsTable />
      </div>
    </div>
  );
}
