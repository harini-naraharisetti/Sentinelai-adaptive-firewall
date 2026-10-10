'use client';

import React from 'react';
import { FirewallRuleTable } from '../../components/firewall/FirewallRuleTable';
import { AdaptiveResponseFlow } from '../../components/firewall/AdaptiveResponseFlow';
import { FirewallInterceptionMechanics } from '../../components/firewall/FirewallInterceptionMechanics';
import { DemoDisclaimer } from '../../components/common/DemoDisclaimer';
import { Flame, ShieldBan } from 'lucide-react';

export default function FirewallPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 font-sans">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#00875a]" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Adaptive AI Firewall &amp; Automated Enforcement
            </h1>
          </div>
          <p className="text-xs text-slate-600 font-medium mt-1">
            Dynamic rule synthesis, automatic socket quarantine, and egress/ingress policy enforcement.
          </p>
        </div>
      </div>

      <DemoDisclaimer />

      {/* How the Firewall Stops Attacks (Live Interception Mechanics & Simulator) */}
      <FirewallInterceptionMechanics />

      {/* Adaptive Response Flow Visual Diagram */}
      <AdaptiveResponseFlow />

      {/* Firewall Rules Management Table */}
      <FirewallRuleTable />
    </div>
  );
}
