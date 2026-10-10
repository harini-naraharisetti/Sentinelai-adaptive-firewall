'use client';

import React, { useState, useMemo } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  ShieldAlert, 
  Flame, 
  Database, 
  AlertOctagon,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export const GlobalSearchModal: React.FC = () => {
  const router = useRouter();
  const { 
    isSearchOpen, 
    setSearchOpen, 
    threats, 
    incidents, 
    firewallRules, 
    siemEvents,
    openThreatModal,
    openIncidentModal,
    openSiemModal
  } = useSecurity();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { threats: [], incidents: [], rules: [], siem: [] };
    const q = query.toLowerCase();

    const matchedThreats = threats.filter(t => 
      t.id.toLowerCase().includes(q) ||
      (t.type && t.type.toLowerCase().includes(q)) ||
      (t.threatType && t.threatType.toLowerCase().includes(q)) ||
      t.sourceIp.toLowerCase().includes(q) ||
      t.destinationIp.toLowerCase().includes(q) ||
      t.severity.toLowerCase().includes(q)
    );

    const matchedIncidents = incidents.filter(i => 
      i.id.toLowerCase().includes(q) ||
      i.threatType.toLowerCase().includes(q) ||
      i.sourceIp.toLowerCase().includes(q) ||
      i.destinationIp.toLowerCase().includes(q) ||
      i.summary.toLowerCase().includes(q)
    );

    const matchedRules = firewallRules.filter(r => 
      r.id.toLowerCase().includes(q) ||
      r.sourceIp.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q) ||
      r.action.toLowerCase().includes(q)
    );

    const matchedSiem = siemEvents.filter(e => 
      e.id.toLowerCase().includes(q) ||
      e.eventType.toLowerCase().includes(q) ||
      (e.sourceIp && e.sourceIp.toLowerCase().includes(q)) ||
      (e.source && e.source.toLowerCase().includes(q)) ||
      (e.destination && e.destination.toLowerCase().includes(q))
    );

    return {
      threats: matchedThreats.slice(0, 4),
      incidents: matchedIncidents.slice(0, 4),
      rules: matchedRules.slice(0, 4),
      siem: matchedSiem.slice(0, 4)
    };
  }, [query, threats, incidents, firewallRules, siemEvents]);

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden z-10 font-sans"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <Search className="w-5 h-5 text-slate-500" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search threats, incidents (INC-0042), rules, SIEM events, IPs..."
              className="flex-1 bg-transparent border-none text-slate-900 placeholder-slate-400 font-medium text-sm focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-slate-600 hover:text-slate-950 text-xs font-bold">
                Clear
              </button>
            )}
            <button
              onClick={() => setSearchOpen(false)}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs custom-scrollbar">
            {!query.trim() ? (
              <div className="py-8 text-center text-slate-500 space-y-1">
                <Search className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="font-bold text-slate-900">Quick Global Search</p>
                <p className="text-xs text-slate-600 font-medium">Type an IP like <code>10.0.0.25</code>, an incident ID like <code>INC-0042</code>, or &quot;Port Scan&quot;.</p>
              </div>
            ) : (
              <>
                {/* Threats Results */}
                {searchResults.threats.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#00875a] tracking-wider block mb-2">
                      Threats ({searchResults.threats.length})
                    </span>
                    <div className="space-y-1.5">
                      {searchResults.threats.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            setSearchOpen(false);
                            openThreatModal(t);
                          }}
                          className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <ShieldAlert className="w-4 h-4 text-rose-500" />
                            <div>
                              <strong className="text-slate-900 font-bold">{t.type}</strong>
                              <span className="text-slate-600 font-mono text-[11px] font-medium block">{t.sourceIp} → {t.destinationIp}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-rose-600 font-bold">{t.riskScore}/100</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Incidents Results */}
                {searchResults.incidents.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-800 tracking-wider block mb-2">
                      Incidents ({searchResults.incidents.length})
                    </span>
                    <div className="space-y-1.5">
                      {searchResults.incidents.map((inc) => (
                        <div
                          key={inc.id}
                          onClick={() => {
                            setSearchOpen(false);
                            openIncidentModal(inc);
                          }}
                          className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <AlertOctagon className="w-4 h-4 text-amber-500" />
                            <div>
                              <strong className="text-slate-900 font-mono font-bold">{inc.id}</strong>
                              <span className="text-slate-600 text-[11px] font-medium block">{inc.threatType} • {inc.sourceIp}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-bold">{inc.status}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rules Results */}
                {searchResults.rules.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-800 tracking-wider block mb-2">
                      Firewall Rules ({searchResults.rules.length})
                    </span>
                    <div className="space-y-1.5">
                      {searchResults.rules.map((r) => (
                        <div
                          key={r.id}
                          onClick={() => {
                            setSearchOpen(false);
                            router.push('/firewall');
                          }}
                          className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <Flame className="w-4 h-4 text-amber-500" />
                            <div>
                              <strong className="text-slate-900 font-mono font-bold">{r.id}</strong>
                              <span className="text-slate-600 text-[11px] font-medium block">{r.action} from {r.sourceIp}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-bold">{r.status}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SIEM Results */}
                {searchResults.siem.length > 0 && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider block mb-2">
                      SIEM Events ({searchResults.siem.length})
                    </span>
                    <div className="space-y-1.5">
                      {searchResults.siem.map((evt) => (
                        <div
                          key={evt.id}
                          onClick={() => {
                            setSearchOpen(false);
                            openSiemModal(evt);
                          }}
                          className="p-3 rounded-2xl bg-slate-50 hover:bg-purple-50/50 border border-slate-200/80 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <Database className="w-4 h-4 text-purple-500" />
                            <div>
                              <strong className="text-slate-900 font-mono font-bold">{evt.id}</strong>
                              <span className="text-slate-600 text-[11px] font-medium block">{evt.eventType} • {evt.sourceIp || evt.source}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-bold">{evt.action}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
            <span>Press <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 font-bold">ESC</kbd> to exit search</span>
            <span>SentinelAI Global In-Memory Index</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
