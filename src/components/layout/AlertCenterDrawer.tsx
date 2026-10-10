'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Bell, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCheck, 
  ExternalLink, 
  CheckCircle,
  ShieldCheck
} from 'lucide-react';

export const AlertCenterDrawer: React.FC = () => {
  const { 
    incidents,
    threats,
    openIncidentModal,
    openThreatModal,
    resolveIncident,
    quarantineIncident,
    isSearchOpen,
    setSearchOpen
  } = useSecurity();

  const [isOpen, setIsOpen] = React.useState(false);

  // We can expose an internal toggle or listen to events
  if (!isOpen) return null;

  const unresolvedIncidents = incidents.filter(i => i.status !== 'RESOLVED');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-100 shadow-2xl flex flex-col z-10 font-sans"
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-50 text-rose-600 shadow-sm">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 tracking-tight">
                  SOC Alert Center
                </h3>
                <span className="text-xs text-slate-600 font-medium">
                  {unresolvedIncidents.length} Active Security Alerts
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-xs">
            {unresolvedIncidents.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs font-medium">
                <CheckCircle className="w-8 h-8 text-[#00875a] mx-auto mb-2 opacity-80" />
                No active security alerts in queue.
              </div>
            ) : (
              unresolvedIncidents.map((inc) => {
                const isCritical = inc.severity === 'CRITICAL';
                return (
                  <div
                    key={inc.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCritical
                        ? 'bg-rose-50/50 border-rose-200 shadow-sm' 
                        : 'bg-amber-50/50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {isCritical ? (
                          <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        )}
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          isCritical ? 'text-rose-700' : 'text-amber-800'
                        }`}>
                          {inc.severity} ALERT • {inc.id}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono font-medium">
                        {inc.timestamp}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {inc.threatType}
                    </h4>

                    <div className="mt-3 py-2 px-2.5 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-600 font-medium">Source: <strong className="text-slate-900 font-mono">{inc.sourceIp}</strong></span>
                      <span className="text-slate-600 font-medium">Risk: <strong className={isCritical ? 'text-rose-600 font-bold' : 'text-amber-700 font-bold'}>{inc.riskScore}/100</strong></span>
                      <span className="px-1.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                        {inc.action}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex items-center justify-end gap-2 text-xs">
                      <button
                        onClick={() => {
                          openIncidentModal(inc);
                          setIsOpen(false);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-800 text-[11px] font-bold flex items-center gap-1 transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                        View Incident
                      </button>
                      <button
                        onClick={() => resolveIncident(inc.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#00875a] hover:bg-[#00704a] text-white text-[11px] font-bold transition-colors shadow-brand-sm"
                      >
                        Resolve
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
