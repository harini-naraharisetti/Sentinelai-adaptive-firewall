'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { DemoDisclaimer } from '../../components/common/DemoDisclaimer';
import { 
  Sliders, 
  Activity, 
  Cpu, 
  Flame, 
  Database, 
  ShieldCheck, 
  Bell, 
  ToggleLeft, 
  ToggleRight, 
  CheckCircle2, 
  Server,
  Layers,
  Sparkles
} from 'lucide-react';

export default function SettingsPage() {
  const { stats } = useSecurity();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [highRiskAlerts, setHighRiskAlerts] = useState(true);
  const [firewallAlerts, setFirewallAlerts] = useState(true);
  const [urlAlerts, setUrlAlerts] = useState(true);

  const [lowThreshold, setLowThreshold] = useState(30);
  const [medThreshold, setMedThreshold] = useState(70);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Platform Configuration &amp; System Health
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Configure demo simulation thresholds, model parameters, alert triggers, and inspect runtime health.
            </p>
          </div>
        </div>
      </div>

      <DemoDisclaimer />

      {/* System Health Cards Grid */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3.5 flex items-center gap-2">
          <Server className="w-4 h-4 text-[#00875a]" />
          Component Health &amp; Subsystem Telemetry
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* Frontend Card */}
          <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Frontend Service</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00875a] animate-pulse" />
            </div>
            <strong className="text-slate-900 text-sm font-bold block">🟢 Online</strong>
            <span className="text-[11px] text-slate-500 mt-1 block font-medium">Next.js 14 App Router</span>
          </div>

          {/* AI Engine Card */}
          <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Demo AI Engine</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00875a] animate-pulse" />
            </div>
            <strong className="text-slate-900 text-sm font-bold block">🟢 Ready</strong>
            <span className="text-[11px] text-slate-500 mt-1 block font-medium">Random Forest (F1: 94.8%)</span>
          </div>

          {/* Firewall Card */}
          <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Firewall Controller</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <strong className="text-amber-700 text-sm font-bold block">🟡 Demo Mode</strong>
            <span className="text-[11px] text-slate-500 mt-1 block font-medium">6 Active Synthetic Rules</span>
          </div>

          {/* SIEM Card */}
          <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">SIEM Ingestion</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#00875a] animate-pulse" />
            </div>
            <strong className="text-slate-900 text-sm font-bold block">🟢 Connected</strong>
            <span className="text-[11px] text-slate-500 mt-1 block font-medium">Event Streaming Pipeline</span>
          </div>

          {/* Database Card */}
          <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] uppercase font-semibold">Data Store</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            </div>
            <strong className="text-amber-700 text-sm font-bold block">🟡 Memory Store</strong>
            <span className="text-[11px] text-slate-500 mt-1 block font-medium">Stateful In-Browser DB</span>
          </div>
        </div>
      </div>

      {/* Settings Sections Form */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Risk Thresholds Settings */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100/90 shadow-card space-y-4">
          <div className="pb-4 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00875a]" />
              Risk Engine Thresholds
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
              Define the classification cut-offs for automated firewall decisions.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1.5 font-medium">
                <span className="text-[#00875a] font-bold">LOW RISK TIER: 0 – {lowThreshold}</span>
                <span className="text-slate-400">Action: ALLOW</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                value={lowThreshold}
                onChange={(e) => setLowThreshold(parseInt(e.target.value))}
                className="w-full accent-[#00875a]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1.5 font-medium">
                <span className="text-amber-700 font-bold">MEDIUM RISK TIER: {lowThreshold + 1} – {medThreshold}</span>
                <span className="text-slate-400">Action: MONITOR</span>
              </div>
              <input
                type="range"
                min="50"
                max="85"
                value={medThreshold}
                onChange={(e) => setMedThreshold(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-800">
              <span className="font-bold block">HIGH RISK TIER: {medThreshold + 1} – 100</span>
              <span className="text-[11px] text-rose-600 mt-0.5 block font-medium">Action: AUTOMATIC DROP &amp; RULE SYNTHESIS</span>
            </div>
          </div>
        </div>

        {/* Notifications & Demo Toggles */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100/90 shadow-card space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-100 mb-4">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-600" />
                Notification &amp; Incident Dispatch
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                Toggle automated popups and alert center dispatches.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <strong className="text-slate-900 block">High-Risk Incident Alerts</strong>
                  <span className="text-[11px] text-slate-500 font-medium">Dispatches popup notifications for critical threats</span>
                </div>
                <button
                  type="button"
                  onClick={() => setHighRiskAlerts(!highRiskAlerts)}
                  className="text-[#00875a]"
                >
                  {highRiskAlerts ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-slate-300" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <strong className="text-slate-900 block">Firewall Auto-Block Alerts</strong>
                  <span className="text-[11px] text-slate-500 font-medium">Notifications when AUTO rules are synthesized</span>
                </div>
                <button
                  type="button"
                  onClick={() => setFirewallAlerts(!firewallAlerts)}
                  className="text-[#00875a]"
                >
                  {firewallAlerts ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-slate-300" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <strong className="text-slate-900 block">URL Security Heuristic Warnings</strong>
                  <span className="text-[11px] text-slate-500 font-medium">Notify when phishing keywords are detected</span>
                </div>
                <button
                  type="button"
                  onClick={() => setUrlAlerts(!urlAlerts)}
                  className="text-[#00875a]"
                >
                  {urlAlerts ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-slate-300" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-[#00875a] font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4" /> Settings updated successfully
              </span>
            ) : <div />}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white font-bold transition-all shadow-brand"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
