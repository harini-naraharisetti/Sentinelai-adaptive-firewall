import type { Metadata } from 'next';
import './globals.css';
import { SecurityProvider } from '../context/SecurityContext';
import { TopNav } from '../components/layout/TopNav';
import { AlertCenterDrawer } from '../components/layout/AlertCenterDrawer';
import { GlobalSearchModal } from '../components/layout/GlobalSearchModal';
import { AttackSimulatorModal } from '../components/layout/AttackSimulatorModal';
import { ThreatDetailModal } from '../components/threats/ThreatDetailModal';
import { IncidentDetailModal } from '../components/incidents/IncidentDetailModal';
import { SIEMEventDetailModal } from '../components/siem/SIEMEventDetailModal';
import { ToastContainer } from '../components/common/ToastContainer';
import { CyberNetworkCanvas } from '../components/common/CyberNetworkCanvas';
import { AISOCCopilotDrawer } from '../components/copilot/AISOCCopilotDrawer';
import { LoginModal } from '../components/auth/LoginModal';
import { AuthLoaderOverlay } from '../components/auth/AuthLoaderOverlay';

export const metadata: Metadata = {
  title: '🛡️ SentinelAI — AI-Powered Network Intrusion Detection & Automated Incident Response',
  description: 'SentinelAI Security Operations Center (SOC) demonstration platform featuring simulated ML threat detection, composite risk analysis, adaptive firewall quarantine, and SIEM logging.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[#f4f5f7] text-slate-900 min-h-screen antialiased selection:bg-emerald-100 selection:text-emerald-900 relative overflow-x-hidden">
        {/* Subtle Network Canvas Background */}
        <CyberNetworkCanvas />

        <SecurityProvider>
          <div className="min-h-screen flex flex-col relative z-10">
            {/* Top Navigation Bar with Logo & Pill Tabs */}
            <TopNav />

            {/* Content Body (Full Screen) */}
            <div className="flex-1 flex w-full px-4 sm:px-6 lg:px-8 py-4 items-start">
              {/* Main Content Viewport */}
              <main className="flex-1 min-w-0 space-y-6 pb-12 w-full">
                {children}
              </main>
            </div>

            {/* Clean Light Footer Disclaimer */}
            <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-4 px-6 text-center text-xs text-slate-500 font-sans">
              <div className="max-w-4xl mx-auto space-y-1">
                <p className="leading-relaxed">
                  <strong className="text-slate-700">🛡️ SentinelAI</strong> is a frontend cybersecurity demonstration created for educational and hackathon demonstration purposes. All network traffic, threat detections, AI predictions, firewall responses, incidents, and SIEM events are simulated locally. No real network traffic is inspected or blocked.
                </p>
                <p className="text-[11px] text-slate-400">
                  Client-Side Execution • Zero External API Dependencies • Safe Evaluation Sandbox
                </p>
              </div>
            </footer>
          </div>

          {/* Interactive Global Modals & Drawers */}
          <LoginModal />
          <AuthLoaderOverlay />
          <AlertCenterDrawer />
          <GlobalSearchModal />
          <AttackSimulatorModal />
          <ThreatDetailModal />
          <IncidentDetailModal />
          <SIEMEventDetailModal />
          <AISOCCopilotDrawer />
          <ToastContainer />
        </SecurityProvider>
      </body>
    </html>
  );
}
