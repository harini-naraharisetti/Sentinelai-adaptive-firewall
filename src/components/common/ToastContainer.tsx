'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useSecurity();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isCritical = toast.type === 'critical';
          const isWarning = toast.type === 'warning';
          const isSuccess = toast.type === 'success';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto p-4 rounded-2xl border bg-white shadow-2xl flex items-start gap-3 relative overflow-hidden font-sans ${
                isCritical 
                  ? 'border-rose-200' 
                  : isWarning 
                  ? 'border-amber-200' 
                  : isSuccess 
                  ? 'border-emerald-200'
                  : 'border-slate-200'
              }`}
            >
              {/* Top Accent Line */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : isSuccess ? 'bg-[#00875a]' : 'bg-blue-500'
                }`} 
              />

              <div className="mt-0.5 flex-shrink-0">
                {isCritical && <ShieldAlert className="w-5 h-5 text-rose-600 animate-pulse" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#00875a]" />}
                {!isCritical && !isWarning && !isSuccess && <Info className="w-5 h-5 text-blue-600" />}
              </div>

              <div className="flex-1 pr-2">
                <h4 className="text-xs font-bold text-slate-900 tracking-wide uppercase">
                  {toast.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-xl hover:bg-slate-100"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
