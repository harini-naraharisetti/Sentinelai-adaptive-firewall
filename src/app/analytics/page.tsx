'use client';

import React from 'react';
import { AnalyticsOverview } from '../../components/analytics/AnalyticsOverview';
import { SecurityPostureGauge } from '../../components/analytics/SecurityPostureGauge';
import { DemoDisclaimer } from '../../components/common/DemoDisclaimer';
import { BarChart3, ShieldCheck } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#00875a]" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Threat Intelligence &amp; Posture Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Historical incident aggregation, attack vector breakdown, and multi-domain defense evaluation.
          </p>
        </div>
      </div>

      <DemoDisclaimer />

      {/* Security Posture Index Gauge */}
      <SecurityPostureGauge />

      {/* Main Multi-Chart Analytics Component */}
      <AnalyticsOverview />
    </div>
  );
}
