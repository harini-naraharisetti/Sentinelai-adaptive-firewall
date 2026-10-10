'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { analyzeUrlString, PRESET_URLS } from '../../services/urlAnalyzer';
import { URLScanResult } from '../../types/security';
import { 
  Link as LinkIcon, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Send, 
  Database, 
  CheckCircle2, 
  XCircle, 
  Info,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight,
  ShieldBan
} from 'lucide-react';
import { RiskMeter } from '../common/RiskMeter';

export const URLSecurityAnalyzer: React.FC = () => {
  const { analyzeUrl, pushUrlToSiem, addToast } = useSecurity();
  const [inputUrl, setInputUrl] = useState('https://example-login-security.com/verify');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<URLScanResult | null>(() => {
    return analyzeUrlString('https://example-login-security.com/verify');
  });
  const [hasSentToSiem, setHasSentToSiem] = useState(false);

  const handleAnalyze = async (urlToAnalyze?: string) => {
    const target = (urlToAnalyze || inputUrl).trim();
    if (!target) return;

    setIsAnalyzing(true);
    setHasSentToSiem(false);

    // Realistic inspection delay
    await new Promise(res => setTimeout(res, 350));

    const result = analyzeUrl(target);
    setCurrentResult(result);
    setIsAnalyzing(false);
  };

  const handleSendToSiem = () => {
    if (!currentResult || hasSentToSiem) return;
    pushUrlToSiem(currentResult);
    setHasSentToSiem(true);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* URL Input & Presets Bar */}
      <div className="bg-white border border-slate-100/90 rounded-3xl p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                Simulated Phishing &amp; URL Security Analyzer
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#00875a] text-[10px] font-bold">
                  Heuristic Engine
                </span>
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Analyzes domain entropy, subdomains, token patterns, and phishing heuristics locally.
              </p>
            </div>
          </div>

          <span className="text-xs px-3 py-1.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 font-bold self-start sm:self-auto">
            Zero Network Egress • Pure Browser Sandbox
          </span>
        </div>

        {/* Input & Analyze Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <LinkIcon className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Enter URL to inspect (e.g. https://example-login-security.com/verify)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 focus:border-[#00875a] focus:bg-white text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none transition-all"
            />
          </div>
          <button
            onClick={() => handleAnalyze()}
            disabled={isAnalyzing}
            className="px-6 py-3.5 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold transition-all shadow-brand flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Evaluating Heuristics...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Analyze URL</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-5 flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-600 font-bold mr-1">Quick Presets:</span>
          
          <button
            onClick={() => {
              setInputUrl(PRESET_URLS.exampleSpec);
              handleAnalyze(PRESET_URLS.exampleSpec);
            }}
            className="px-3.5 py-1.5 rounded-2xl bg-rose-50 border border-rose-200 hover:bg-rose-100/80 text-rose-700 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            Spec: example-login-security.com/verify
          </button>

          <button
            onClick={() => {
              setInputUrl(PRESET_URLS.safe);
              handleAnalyze(PRESET_URLS.safe);
            }}
            className="px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/80 text-[#00875a] text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#00875a]" />
            Internal Safe Domain
          </button>

          <button
            onClick={() => {
              setInputUrl(PRESET_URLS.highRisk);
              handleAnalyze(PRESET_URLS.highRisk);
            }}
            className="px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100/80 text-amber-900 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Credential Harvester
          </button>
        </div>
      </div>

      {/* Analysis Result Card */}
      {currentResult && (
        <div className="bg-white border border-slate-100/90 rounded-3xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] text-slate-600 uppercase font-bold tracking-wider block">Inspected Destination URL</span>
              <h4 className="font-bold text-sm text-slate-900 break-all mt-0.5 font-mono">
                {currentResult.url}
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                currentResult.verdict === 'HIGH RISK'
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : currentResult.verdict === 'SUSPICIOUS'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-emerald-50 text-[#00875a] border border-emerald-200'
              }`}>
                Verdict: {currentResult.verdict}
              </span>
            </div>
          </div>

          {/* Risk Gauge & Recommendation Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center bg-slate-50 p-6 rounded-3xl border border-slate-200/80 text-center">
              <span className="text-[10px] uppercase text-slate-700 font-bold mb-2">PHISHING RISK</span>
              <RiskMeter 
                score={currentResult.riskScore} 
                size="lg" 
                label={`${currentResult.verdict}`}
              />
              <span className="text-xs text-slate-600 font-medium mt-2">
                Confidence: <strong className="text-slate-900">{currentResult.confidence}%</strong>
              </span>
            </div>

            <div className="md:col-span-8 space-y-4">
              {/* Recommendation Box */}
              <div className={`p-5 rounded-3xl border ${
                currentResult.riskScore >= 71 
                  ? 'bg-rose-50/60 border-rose-200 text-rose-900' 
                  : currentResult.riskScore >= 31 
                  ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                  : 'bg-emerald-50/60 border-emerald-200 text-[#00875a]'
              }`}>
                <span className="text-xs font-bold uppercase block mb-1">
                  Recommendation:
                </span>
                <p className="text-xs leading-relaxed text-slate-800 font-medium">
                  {currentResult.recommendation}
                </p>
              </div>

              {/* SIEM Forward Trigger */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-purple-600" />
                    Dispatch to Centralized SIEM Layer
                  </h5>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                    Records structured event in SIEM index for SOC forensic correlation.
                  </p>
                </div>

                <button
                  onClick={handleSendToSiem}
                  disabled={hasSentToSiem}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all ${
                    hasSentToSiem
                      ? 'bg-emerald-50 border border-emerald-200 text-[#00875a] cursor-default'
                      : 'bg-[#00875a] hover:bg-[#00704a] text-white shadow-brand active:scale-95'
                  }`}
                >
                  {hasSentToSiem ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#00875a]" />
                      <span>Event Logged to SIEM</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Generate SIEM Event</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 10-Indicator Heuristic Inspection Breakdown */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00875a]" />
              Heuristic Parameter Breakdown (10 Indicators)
            </h5>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">HTTPS Protocol</span>
                <p className={`font-bold mt-0.5 ${currentResult.analysisDetails.hasHttps ? 'text-[#00875a]' : 'text-rose-600'}`}>
                  {currentResult.analysisDetails.hasHttps ? 'TLS Encrypted (Yes)' : 'Cleartext (No)'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Shannon Entropy</span>
                <p className="font-bold text-purple-700 mt-0.5">{currentResult.analysisDetails.domainEntropy} bits</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Subdomain Depth</span>
                <p className={`font-bold mt-0.5 ${currentResult.analysisDetails.subdomainCount >= 2 ? 'text-rose-600' : 'text-slate-900'}`}>
                  {currentResult.analysisDetails.subdomainCount} Subdomains
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">TLD Risk Tier</span>
                <p className={`font-bold mt-0.5 ${currentResult.analysisDetails.tldRisk === 'HIGH' ? 'text-rose-600' : 'text-[#00875a]'}`}>
                  {currentResult.analysisDetails.tldRisk}
                </p>
              </div>
            </div>

            {/* Checklist of Detected Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {currentResult.indicators.map((ind, i) => (
                <div 
                  key={i} 
                  className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
                    ind.type === 'critical'
                      ? 'bg-rose-50/50 border-rose-200 text-rose-900'
                      : ind.type === 'warning'
                      ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                      : 'bg-emerald-50/50 border-emerald-200 text-[#00875a]'
                  }`}
                >
                  {ind.type === 'critical' && <XCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />}
                  {ind.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />}
                  {ind.type === 'safe' && <CheckCircle2 className="w-4 h-4 text-[#00875a] mt-0.5 flex-shrink-0" />}
                  <div>
                    <strong className="block font-bold text-slate-900 text-xs">{ind.label}</strong>
                    <span className="text-[11px] text-slate-600 font-medium mt-0.5 leading-tight block">{ind.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
