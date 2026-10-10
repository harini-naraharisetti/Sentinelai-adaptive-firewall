'use client';

import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { LandingPage } from '../components/landing/LandingPage';
import { KPIGrid } from '../components/dashboard/KPIGrid';
import { WiFiRestrictionsCard } from '../components/dashboard/WiFiRestrictionsCard';
import { GlobalAttackMap } from '../components/dashboard/GlobalAttackMap';
import { LiveEventFeed } from '../components/dashboard/LiveEventFeed';
import { QuickSimulatorBanner } from '../components/dashboard/QuickSimulatorBanner';
import { MitreAttackMatrix } from '../components/threats/MitreAttackMatrix';
import { ThreatsTable } from '../components/threats/ThreatsTable';
import { DemoDisclaimer } from '../components/common/DemoDisclaimer';
import { EmergencyLockdownBanner } from '../components/common/EmergencyLockdownBanner';
import { 
  Calendar, 
  ChevronDown, 
  Plus, 
  FlaskConical, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ShieldAlert, 
  Flame, 
  Brain, 
  Zap, 
  Link as LinkIcon, 
  Database,
  Globe,
  Info
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { 
    isAuthenticated, 
    currentUser, 
    viewMode, 
    setViewMode, 
    openLoginModal 
  } = useSecurity();
  const [dateRange, setDateRange] = useState('29 Jun, 2025 - 29 August, 2025');

  // If user is not authenticated or explicitly viewing landing showcase, render LandingPage
  if (!isAuthenticated || viewMode === 'landing') {
    return <LandingPage />;
  }

  return (
    <div className="space-y-6 font-sans animate-fadeIn">
      
      {/* Top Welcome Title Bar (Matching "Welcome Back, Sujon" from reference image) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome Back, <span className="text-slate-900">{currentUser?.name || 'USER'}</span>
            </h1>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
              {currentUser?.badge || 'SOC Lead'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-semibold">
            SentinelAI • AI-Powered Network Intrusion Detection &amp; Automated Incident Response
          </p>
        </div>

        {/* Right: Date Picker Pill, Project Showcase link & Action Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Project Showcase Button */}
          <button
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-2.5 rounded-full border border-slate-200 shadow-sm text-xs font-bold transition-colors"
            title="View Project Showcase and Problem Statement"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>Project Overview</span>
          </button>

          {/* Date Selector Pill */}
          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-slate-200 shadow-sm text-xs font-bold text-slate-800 cursor-pointer hover:bg-slate-50 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
          </div>

          {/* Add Action Button */}
          <Link
            href="/simulator"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Simulate Attack</span>
          </Link>
        </div>
      </div>

      {/* Emergency DEFCON Lockdown Bar */}
      <EmergencyLockdownBanner />

      {/* KPI Cards Grid & 3 Main Hero Columns (Matching reference image) */}
      <KPIGrid />

      {/* Enterprise Wi-Fi & Wireless Perimeter Restrictions Module */}
      <WiFiRestrictionsCard />

      {/* Live Global Cyber Attack Map */}
      <GlobalAttackMap />

      {/* Interactive Quick Simulator Banner */}
      <QuickSimulatorBanner />

      {/* Bottom Payment History / Security Event Feed (Matching bottom row of image) */}
      <LiveEventFeed />

      {/* Interactive MITRE ATT&CK Framework Matrix */}
      <MitreAttackMatrix />

      {/* Active Threats Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900">
              Active Security Threats &amp; AI Forensics
            </h3>
          </div>
          <Link 
            href="/threats" 
            className="text-xs font-bold text-[#00875a] hover:text-emerald-800 flex items-center gap-1 transition-colors"
          >
            <span>Open Threat Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ThreatsTable limit={5} showFilters={false} />
      </div>

      {/* 5 Core Pillars Feature Cards (Matching clean card style) */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00875a]" />
              Autonomous Closed-Loop Security Capabilities
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              &ldquo;Detect. Analyze. Score. Respond. Alert. Protect.&rdquo; — Complete SOC Telemetry Pipeline
            </p>
          </div>
          <span className="text-xs font-bold text-[#00875a] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            5 Core Pillars
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 hover:bg-slate-100 transition-colors">
            <Flame className="w-5 h-5 text-amber-600 mb-2" />
            <strong className="text-slate-900 block font-bold text-sm">Adaptive Firewall</strong>
            <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">Auto-generates rules (e.g. AUTO-0042) to drop attacker sockets.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 hover:bg-slate-100 transition-colors">
            <Brain className="w-5 h-5 text-purple-600 mb-2" />
            <strong className="text-slate-900 block font-bold text-sm">AI Threat Detection</strong>
            <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">Random Forest &amp; Isolation Forest models for anomaly classification.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 hover:bg-slate-100 transition-colors">
            <Zap className="w-5 h-5 text-emerald-600 mb-2" />
            <strong className="text-slate-900 block font-bold text-sm">Real-Time Risk Engine</strong>
            <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">Composite 0–100 scoring based on multi-dimensional telemetry.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 hover:bg-slate-100 transition-colors">
            <LinkIcon className="w-5 h-5 text-[#00875a] mb-2" />
            <strong className="text-slate-900 block font-bold text-sm">URL Security Analysis</strong>
            <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">Heuristic inspection of domains, entropy, and token patterns.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 hover:bg-slate-100 transition-colors">
            <Database className="w-5 h-5 text-blue-600 mb-2" />
            <strong className="text-slate-900 block font-bold text-sm">SIEM Intelligence</strong>
            <p className="text-xs text-slate-600 mt-1 leading-normal font-medium">Centralized audit trail, event streaming, and SOC alert queue.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
