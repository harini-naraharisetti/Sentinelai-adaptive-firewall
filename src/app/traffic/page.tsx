'use client';

import React from 'react';
import { LiveTelemetryCharts } from '../../components/traffic/LiveTelemetryCharts';
import { LivePacketStream } from '../../components/traffic/LivePacketStream';
import { DemoDisclaimer } from '../../components/common/DemoDisclaimer';
import { Activity, Radio, Cpu, Layers } from 'lucide-react';

export default function TrafficPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#00875a]" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Live Network Telemetry &amp; Traffic Analysis
            </h1>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Real-time ingress/egress bandwidth monitoring, DPI inspection stream, and packet classification.
          </p>
        </div>
      </div>

      <DemoDisclaimer />

      {/* Live Telemetry Recharts Charts */}
      <LiveTelemetryCharts />

      {/* Live Packet DPI Console Stream */}
      <LivePacketStream />
    </div>
  );
}
