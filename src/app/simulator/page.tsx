'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { DemoDisclaimer } from '../../components/common/DemoDisclaimer';
import { RiskMeter } from '../../components/common/RiskMeter';
import { 
  FlaskConical, 
  Play, 
  Radio, 
  Cpu, 
  Brain, 
  ShieldAlert, 
  Flame, 
  ShieldBan, 
  FileText, 
  BellRing, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Binary, 
  Database,
  Sparkles,
  Search,
  Lock,
  Waves,
  AlertTriangle,
  Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';

export default function SimulatorPage() {
  const { 
    runAttackSimulation, 
    isSimulating, 
    currentSimulation, 
    activeStepIndex 
  } = useSecurity();

  const attackScenarios = [
    {
      id: 'PORT_SCAN',
      title: 'Port Scan',
      icon: Search,
      badge: 'Reconnaissance',
      riskScore: 91,
      severity: 'CRITICAL',
      desc: 'Rapid multi-port TCP SYN probe across 38 ports from 10.0.0.25 targeting SSH & HTTP.'
    },
    {
      id: 'BRUTE_FORCE',
      title: 'Brute Force',
      icon: Lock,
      badge: 'Credential Attack',
      riskScore: 87,
      severity: 'HIGH',
      desc: '140 failed SSH authentication attempts per minute targeting Port 22 on 10.0.0.15.'
    },
    {
      id: 'DOS_FLOOD',
      title: 'DoS-like Traffic',
      icon: Waves,
      badge: 'Volumetric Ingress',
      riskScore: 96,
      severity: 'CRITICAL',
      desc: 'High-frequency 920 req/sec HTTP GET connection flood exhausting internal web server.'
    },
    {
      id: 'NETWORK_ANOMALY',
      title: 'Network Anomaly',
      icon: AlertTriangle,
      badge: 'Covert Beacon',
      riskScore: 64,
      severity: 'MEDIUM',
      desc: 'Periodic covert TLS beaconing with elevated entropy rhythm (15.2s interval) from 10.0.0.30.'
    },
    {
      id: 'SUSPICIOUS_CONN',
      title: 'Suspicious Connection',
      icon: LinkIcon,
      badge: 'Cipher Variance',
      riskScore: 48,
      severity: 'MEDIUM',
      desc: 'Non-standard TLS cipher suite requested on internal socket 10.0.0.57:443.'
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Cyber Attack Simulation Lab
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Safely simulate attack scenarios and observe the complete detection → risk → response → SIEM pipeline.
            </p>
          </div>
        </div>
      </div>

      <DemoDisclaimer />

      {/* Main Grid: Scenarios & 10-Step Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario Selection Cards */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-5 rounded-3xl bg-white border border-slate-100/90 shadow-card">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00875a]" />
              Attack Scenarios
            </h3>

            <div className="space-y-3">
              {attackScenarios.map((scen) => {
                const Icon = scen.icon;
                const isSelected = currentSimulation?.threat.type.toLowerCase().includes(scen.title.toLowerCase());

                return (
                  <div
                    key={scen.id}
                    className={`p-4 rounded-2xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-emerald-50/50 border-[#00875a] shadow-brand-sm'
                        : 'bg-slate-50/80 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#00875a]" />
                        <strong className="text-slate-900 text-sm font-bold">{scen.title}</strong>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {scen.badge}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 mt-1 leading-normal font-medium">
                      {scen.desc}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-200/70">
                      <span className="text-rose-600 font-bold text-[11px]">
                        Risk: {scen.riskScore}/100
                      </span>
                      <button
                        onClick={() => runAttackSimulation(scen.id)}
                        disabled={isSimulating}
                        className="px-3.5 py-1.5 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white font-bold text-[11px] shadow-brand transition-all disabled:opacity-50 flex items-center gap-1.5"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Simulate</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 10-Step Interactive Pipeline Execution Card */}
        <div className="lg:col-span-8 bg-white border border-slate-100/90 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${isSimulating ? 'bg-amber-400 animate-ping' : 'bg-[#00875a]'}`} />
                <h4 className="font-bold text-sm text-slate-900 tracking-tight">
                  {isSimulating ? 'Pipeline Executing 10-Stage Lifecycle...' : currentSimulation ? `Simulation Active: ${currentSimulation.scenario}` : 'Complete 10-Stage Defense Lifecycle'}
                </h4>
              </div>
              {currentSimulation && (
                <span className="text-xs text-[#00875a] font-bold">
                  Step {Math.min(10, activeStepIndex + 1)} / 10
                </span>
              )}
            </div>

            {!currentSimulation ? (
              <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-3xl p-6">
                <FlaskConical className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-pulse" />
                <h4 className="font-bold text-sm text-slate-900">
                  Simulation Engine Ready
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 font-medium">
                  Click <strong>&quot;Simulate&quot;</strong> on any scenario to trigger the full 10-stage detection, feature extraction, ML classification, risk scoring, adaptive response, and SIEM logging.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* 10 Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentSimulation.steps.map((step, idx) => {
                    const isCompleted = activeStepIndex > idx;
                    const isCurrent = activeStepIndex === idx;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border transition-all text-xs ${
                          isCurrent
                            ? 'bg-emerald-50 border-[#00875a] shadow-brand-sm ring-1 ring-[#00875a]'
                            : isCompleted
                            ? 'bg-slate-50 border-emerald-300 text-slate-900'
                            : 'bg-slate-50/40 border-slate-200/80 text-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-800">
                              {step.step < 10 ? `0${step.step}` : step.step}
                            </span>
                            <strong className="text-slate-900 text-xs">{step.name}</strong>
                          </div>
                          {isCompleted && (
                            <CheckCircle2 className="w-4 h-4 text-[#00875a] flex-shrink-0" />
                          )}
                          {isCurrent && (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00875a] animate-ping" />
                          )}
                        </div>

                        <p className="text-[11px] text-slate-700 mt-1 leading-normal font-medium">
                          {step.description}
                        </p>

                        <div className="mt-2 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                          <span className="text-slate-600 font-medium">Output:</span>
                          <strong className="text-slate-900 font-bold">{step.metric}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Final Result Summary Banner */}
                {activeStepIndex >= 9 && (
                  <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <div>
                      <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                        <ShieldAlert className="w-5 h-5 text-rose-600 animate-pulse" />
                        <span>🚨 Threat Detected: {currentSimulation.threat.type.toUpperCase()}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 mt-1.5 font-medium">
                        <span>Risk: <strong className="text-rose-600">{currentSimulation.threat.riskScore}/100</strong></span>
                        <span>Severity: <strong className="text-slate-900">{currentSimulation.threat.severity}</strong></span>
                        <span>Response: <strong className="text-[#00875a]">{currentSimulation.threat.severity === 'CRITICAL' ? 'BLOCK SIMULATED' : 'MONITOR'}</strong></span>
                        <span>Incident: <strong className="text-amber-800">{currentSimulation.incident.id}</strong></span>
                        <span>SIEM: <strong className="text-[#00875a]">LOGGED</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        href="/incidents"
                        className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 shadow-sm transition-all"
                      >
                        View Incident
                      </Link>
                      <Link
                        href="/firewall"
                        className="px-4 py-2 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold shadow-brand transition-all"
                      >
                        Firewall Rules →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
