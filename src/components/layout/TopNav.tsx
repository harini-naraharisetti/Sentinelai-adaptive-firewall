'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSecurity } from '../../context/SecurityContext';
import { 
  Bell, 
  Search, 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Info,
  ShieldCheck,
  AlertTriangle,
  User,
  Radio,
  Layers,
  Activity,
  Cpu,
  Flame,
  Database,
  Link as LinkIcon,
  BarChart3,
  FlaskConical,
  CheckCircle2,
  Globe,
  KeyRound
} from 'lucide-react';
import { soundFx } from '../../services/soundEffects';
import { voiceAnnouncer } from '../../services/voiceAnnouncer';

export const TopNav: React.FC = () => {
  const pathname = usePathname();
  const { 
    isAuthenticated,
    currentUser,
    openLoginModal,
    logout,
    demoUsers,
    quickDemoLogin,
    viewMode,
    setViewMode,
    toggleSearch, 
    toggleCopilot, 
    isDefconLockdown, 
    toggleDefconLockdown,
    stats,
    incidents
  } = useSecurity();

  const [timeString, setTimeString] = useState<string>('');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleAudio = () => {
    soundFx.isMuted = !isAudioMuted;
    setIsAudioMuted(!isAudioMuted);
    if (isAudioMuted) {
      soundFx.playClick();
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'Live Traffic', href: '/traffic' },
    { name: 'AI Threats', href: '/threats' },
    { name: 'Incidents', href: '/incidents' },
    { name: 'Firewall', href: '/firewall' },
    { name: 'SIEM', href: '/siem' },
    { name: 'URL Security', href: '/url-security' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Simulator', href: '/simulator' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#f4f5f7]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-slate-200/70 font-sans w-full">
      <div className="w-full flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo (Quixotic style from image) */}
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            onClick={() => {
              if (isAuthenticated) setViewMode('dashboard');
            }}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#00875a] flex items-center justify-center text-white shadow-brand-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 font-sans">
                  Sentinel<span className="text-[#00875a]">AI</span>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full">
                  SOC
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-tight">
                AI Intrusion &amp; Response
              </span>
            </div>
          </Link>

          {/* Project Overview Button */}
          <button
            onClick={() => {
              soundFx.playClick();
              setViewMode(viewMode === 'landing' ? 'dashboard' : 'landing');
            }}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
              viewMode === 'landing'
                ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Toggle between Project Showcase and SOC Dashboard"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{viewMode === 'landing' ? 'Back to Dashboard' : 'Project Overview'}</span>
          </button>
        </div>

        {/* Center: Clean Floating Pill Navigation */}
        <nav className="hidden lg:flex items-center bg-white rounded-full p-1 border border-slate-200/90 shadow-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href && viewMode === 'dashboard';
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setViewMode('dashboard')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#00875a] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions, Search, Notifications, User Profile & Auth */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Global Search Button */}
          <button
            onClick={toggleSearch}
            className="p-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-sm transition-all"
            title="Search IPs, threats, events (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* AI SOC Copilot Pill Button */}
          <button
            onClick={toggleCopilot}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#00875a] hover:bg-emerald-700 text-white text-xs font-bold shadow-brand-sm transition-all active:scale-95"
            title="Open AI SOC Copilot Drawer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">AI Copilot</span>
          </button>

          {/* AI Voice Announcer Toggle */}
          <button
            onClick={() => {
              const enabled = voiceAnnouncer.toggleVoice();
              setIsVoiceActive(enabled);
            }}
            className={`p-2.5 rounded-full border shadow-sm transition-all flex items-center justify-center ${
              isVoiceActive
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
            title={`AI Voice Announcer: ${isVoiceActive ? 'ACTIVE (Click to Mute)' : 'MUTED (Click to Enable)'}`}
          >
            {isVoiceActive ? (
              <Volume2 className="w-4 h-4 text-[#00875a] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* DEFCON Toggle Switch */}
          <button
            onClick={toggleDefconLockdown}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              isDefconLockdown 
                ? 'bg-red-600 text-white shadow-lg animate-pulse' 
                : 'bg-white border border-slate-200/80 text-slate-600 hover:border-red-300 hover:text-red-600'
            }`}
            title="Toggle DEFCON 1 Emergency Containment"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isDefconLockdown ? 'DEFCON 1' : 'DEFCON'}</span>
          </button>

          {/* If Authenticated: User Avatar & Dropdown. If not: Sign In Button */}
          {isAuthenticated ? (
            <div className="relative pl-1">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-slate-200 transition-all focus:outline-none"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-900 to-slate-700 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white">
                    <span>{currentUser?.avatar || 'SA'}</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-72 p-4 rounded-3xl bg-white border border-slate-200 shadow-2xl z-50 animate-fadeIn font-sans space-y-3">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                        {currentUser?.avatar || 'SA'}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {currentUser?.name || 'Chief Analyst'}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {currentUser?.email || 'analyst@sentinelai.sec'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setViewMode('landing');
                          setShowUserMenu(false);
                        }}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900"
                      >
                        Project Info
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="text-xs font-bold text-rose-600 hover:text-rose-800"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => openLoginModal()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
