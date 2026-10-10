'use client';

import React from 'react';
import { SIEMEventTable } from '../../components/siem/SIEMEventTable';
import { DemoDisclaimer } from '../../components/common/DemoDisclaimer';
import { Database, ShieldAlert } from 'lucide-react';

export default function SIEMPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              SIEM Centralized Security Event Intelligence
            </h1>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Standardized audit event ingestion, security incident filtering, raw payload forensics, and compliance log trails.
          </p>
        </div>
      </div>

      <DemoDisclaimer />

      {/* SIEM Event Table with Top KPIs and Multi-Filters */}
      <SIEMEventTable />
    </div>
  );
}
