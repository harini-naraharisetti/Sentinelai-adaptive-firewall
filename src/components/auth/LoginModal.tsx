'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  ShieldCheck, 
  Mail, 
  KeyRound, 
  Sparkles, 
  ArrowRight, 
  X, 
  Eye, 
  EyeOff, 
  Fingerprint, 
  Terminal,
  Lock
} from 'lucide-react';
import { soundFx } from '../../services/soundEffects';

export const LoginModal: React.FC = () => {
  const { 
    isLoginModalOpen, 
    closeLoginModal, 
    login
  } = useSecurity();

  const [email, setEmail] = useState<string>('soc_lead@sentinelai.sec');
  const [password, setPassword] = useState<string>('demo1234');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberSession, setRememberSession] = useState<boolean>(true);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    login(email, password, 'Lead SOC Investigator');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn font-sans">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white relative">
          <button 
            onClick={() => {
              soundFx.playClick();
              closeLoginModal();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#00875a] flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight text-white">
                  Sentinel<span className="text-emerald-400">AI</span> Login
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Zero-Trust
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                SOC Command Center Authentication
              </p>
            </div>
          </div>
        </div>

        {/* Modal Form */}
        <div className="p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">SOC Operator ID / Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="soc_lead@sentinelai.sec"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Access Passkey</label>
                <span className="text-[11px] text-slate-500 font-medium">Default: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">demo1234</code></span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00875a]/30 focus:border-[#00875a] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Clearance & Token Toggles */}
            <div className="flex items-center justify-between gap-2 pt-1 text-xs text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={rememberSession} 
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="rounded text-[#00875a] focus:ring-[#00875a] w-3.5 h-3.5"
                />
                <span className="font-semibold text-slate-700">Remember Session</span>
              </label>

              <div className="flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-200">
                <Fingerprint className="w-3.5 h-3.5 text-[#00875a]" />
                <span>WebAuthn Token</span>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#00875a] hover:bg-emerald-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>Sign In &amp; Launch SOC Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </form>

          {/* Sandbox Note */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-2.5 text-[11px] text-slate-600">
            <Terminal className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Simulated Authentication:</strong> Pre-filled with demo credentials. Click <strong>Sign In</strong> to trigger the automated security verification and loader animation into the dashboard.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
