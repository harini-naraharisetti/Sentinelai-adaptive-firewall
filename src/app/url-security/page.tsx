'use client';

import React from 'react';
import { URLSecurityAnalyzer } from '../../components/url/URLSecurityAnalyzer';
import { DemoDisclaimer } from '../../components/common/DemoDisclaimer';
import { Link as LinkIcon, ShieldCheck } from 'lucide-react';

export default function URLSecurityPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <LinkIcon className="w-6 h-6 text-[#00875a]" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              URL Security &amp; Phishing Detection Engine
            </h1>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Real-time client-side heuristic inspection of domains, character entropy, typosquatting, and SIEM dispatch.
          </p>
        </div>
      </div>

      <DemoDisclaimer />

      {/* Main URL Security Analyzer */}
      <URLSecurityAnalyzer />
    </div>
  );
}
