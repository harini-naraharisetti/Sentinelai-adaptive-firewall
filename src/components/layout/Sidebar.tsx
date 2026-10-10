'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Layers, 
  Activity, 
  Cpu, 
  AlertOctagon, 
  Flame, 
  Database, 
  Link as LinkIcon, 
  BarChart3, 
  FlaskConical, 
  Settings, 
  ShieldCheck,
  Sparkles,
  Search,
  Radio,
  SlidersHorizontal,
  Power,
  Globe
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { toggleCopilot, toggleSearch, resetDemo, viewMode, setViewMode } = useSecurity();

  const dockNavItems = [
    { name: 'Dashboard', href: '/', icon: Layers },
    { name: 'Live Traffic', href: '/traffic', icon: Activity },
    { name: 'AI Threats', href: '/threats', icon: Cpu },
    { name: 'Incidents', href: '/incidents', icon: AlertOctagon },
    { name: 'Adaptive Firewall', href: '/firewall', icon: Flame },
    { name: 'SIEM Logs', href: '/siem', icon: Database },
    { name: 'URL Security', href: '/url-security', icon: LinkIcon },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Simulation Lab', href: '/simulator', icon: FlaskConical },
  ];

  return (
    <aside className="hidden md:flex flex-col items-center bg-white rounded-3xl p-3 shadow-card border border-slate-200/80 sticky top-24 z-20 space-y-4">
      {/* Top Primary Hub Icon (Matching the green grid/apps icon in image) */}
      <Link
        href="/"
        onClick={() => setViewMode('dashboard')}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
          pathname === '/' && viewMode === 'dashboard'
            ? 'bg-[#00875a] text-white shadow-brand-sm' 
            : 'bg-emerald-50 text-[#00875a] hover:bg-emerald-100'
        }`}
        title="SOC Overview Dashboard"
      >
        <Layers className="w-6 h-6" />
      </Link>

      {/* Main Navigation Dock Icons */}
      <div className="flex flex-col items-center gap-1.5 py-1">
        {dockNavItems.slice(1).map((item) => {
          const isActive = pathname === item.href && viewMode === 'dashboard';
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setViewMode('dashboard')}
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all group relative ${
                isActive
                  ? 'bg-[#00875a] text-white shadow-brand-sm'
                  : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
              }`}
              title={item.name}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />

              {/* Tooltip on hover */}
              <span className="absolute left-full ml-3 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-8 h-[1px] bg-slate-200" />

      {/* Bottom Utility Icons (Matching image bottom dock) */}
      <div className="flex flex-col items-center gap-1.5">
        <button
          onClick={() => setViewMode(viewMode === 'landing' ? 'dashboard' : 'landing')}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all group relative ${
            viewMode === 'landing'
              ? 'bg-emerald-100 text-emerald-800'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Project Overview Showcase"
        >
          <Globe className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
            Project Overview
          </span>
        </button>

        <button
          onClick={toggleCopilot}
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-purple-600 bg-purple-50 hover:bg-purple-100 transition-all group relative"
          title="AI SOC Copilot"
        >
          <Sparkles className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
            ✦ AI Copilot
          </span>
        </button>

        <button
          onClick={resetDemo}
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all group relative"
          title="Reset Simulation State"
        >
          <Power className="w-5 h-5" />
          <span className="absolute left-full ml-3 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg z-50">
            Reset Demo State
          </span>
        </button>
      </div>
    </aside>
  );
};
