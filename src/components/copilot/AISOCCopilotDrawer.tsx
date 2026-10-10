'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  Brain, 
  Flame, 
  Database, 
  HelpCircle,
  Terminal,
  Layers,
  ChevronRight,
  ShieldBan
} from 'lucide-react';
import { playCyberSound } from '../../services/soundEffects';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  tags?: string[];
}

export const AISOCCopilotDrawer: React.FC = () => {
  const { 
    isCopilotOpen, 
    setCopilotOpen, 
    stats, 
    threats, 
    incidents, 
    firewallRules, 
    networkEvents 
  } = useSecurity();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Greetings Operator. I am SentinelAI SOC Copilot. I analyze simulated telemetry streams, Random Forest & Isolation Forest inference outputs, adaptive firewall decisions, and active incident response timelines. How can I assist your investigation?',
      time: 'Just now',
      tags: ['SentinelAI Copilot', 'Simulated ML Active']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Exact quick questions requested in user specification
  const quickPrompts = [
    'What are the highest risk threats?',
    'Why was 10.0.0.25 blocked?',
    'Show active incidents.',
    'Explain this port scan.',
    'What happened in the last 5 minutes?'
  ];

  const handleSend = async (userText?: string) => {
    const query = (userText || input).trim();
    if (!query) return;

    playCyberSound('click');
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Realistic response delay
    await new Promise(res => setTimeout(res, 500));

    let reply = '';
    let tags = ['AI Insight'];
    const lower = query.toLowerCase();

    if (lower.includes('why was 10.0.0.25 blocked') || (lower.includes('10.0.0.25') && lower.includes('block'))) {
      reply = 'Source 10.0.0.25 generated abnormal connection behavior with a high connection rate (92 req/sec) and multiple destination ports (38 sockets). The simulated detection engine classified the activity as a Port Scan and assigned a risk score of 91/100. Because the score exceeded the high-risk threshold (70/100), the simulated adaptive firewall generated rule AUTO-0042 to DROP ingress traffic and logged incident INC-0042 to SIEM.';
      tags = ['Forensic Analysis', 'Rule AUTO-0042', 'Risk 91/100'];
    } else if (lower.includes('highest risk') || lower.includes('high risk')) {
      const highest = threats.slice().sort((a, b) => b.riskScore - a.riskScore).slice(0, 3);
      reply = `The top high-risk threats currently flagged are:\n` +
        highest.map((t, idx) => `${idx + 1}. ${t.type} from ${t.sourceIp} (Risk ${t.riskScore}/100, Severity: ${t.severity}) → Action: ${t.action || 'BLOCK'}`).join('\n') +
        `\nAll high-risk vectors exceeding threshold 70 have triggered automated containment policies.`;
      tags = ['Threat Priority', `${highest.length} Critical Vectors`];
    } else if (lower.includes('active incident') || lower.includes('show incident')) {
      const active = incidents.filter(i => i.status !== 'RESOLVED');
      reply = `There are currently ${active.length} active incidents requiring SOC attention:\n` +
        active.slice(0, 4).map(i => `• [${i.id}] ${i.threatType} (${i.sourceIp} → ${i.destinationIp}) | Risk: ${i.riskScore}/100 | Status: ${i.status}`).join('\n') +
        `\nUse the /incidents tab to inspect full 7-stage lifecycle timelines.`;
      tags = ['Incident Queue', `${active.length} Active`];
    } else if (lower.includes('port scan') || lower.includes('explain port scan')) {
      reply = 'The simulated Port Scan was evaluated using feature vector [842, 120420, 92, 38, 720, 0.82]. Random Forest Classifier identified sequential TCP SYN probing with 94% confidence, and Isolation Forest detected an anomaly score of 0.87. Contributing risk factors: Threat Classification (+45), Anomaly Detection (+25), Connection Rate (+10), Unique Ports (+6), Suspicious TCP Flags (+5) totaling Risk 91/100.';
      tags = ['Random Forest 94%', 'Isolation Forest 0.87', 'Feature Vector'];
    } else if (lower.includes('5 minutes') || lower.includes('last 5') || lower.includes('recent')) {
      const recent = networkEvents.slice(0, 5);
      reply = `In the recent telemetry window, ${networkEvents.length} frames were inspected:\n` +
        recent.map(e => `• ${e.timestamp} | ${e.sourceIp} → ${e.destinationIp}:${e.destinationPort} (${e.protocol}) - Status: ${e.status}`).join('\n') +
        `\nSystem posture is healthy at ${stats.securityPosture}/100 with ${stats.blockedSources} sources currently quarantined.`;
      tags = ['Telemetry Stream', 'Audit Window'];
    } else {
      reply = `Understood. Current SentinelAI telemetry state: Total Events (${stats.totalEvents.toLocaleString()}), Detected Threats (${stats.threatsDetected}), Active Incidents (${stats.activeIncidents}), Blocked Sources (${stats.blockedSources}), Average Risk (${stats.averageRiskScore}/100). All modules are synchronized in real-time.`;
      tags = ['Telemetry Status', 'SentinelAI Core'];
    }

    playCyberSound('blip');
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: reply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tags
    }]);
    setIsTyping(false);
  };

  return (
    <AnimatePresence>
      {isCopilotOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans text-xs">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCopilotOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Right-Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white border-l border-slate-100 shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    AI SOC Copilot
                    <span className="text-[10px] bg-emerald-100 text-[#00875a] px-2 py-0.5 rounded-full font-bold">
                      Active
                    </span>
                  </h3>
                  <span className="text-[11px] text-slate-600 font-medium">
                    Local Deterministic Security Assistant
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCopilotOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {messages.map((m) => {
                const isAi = m.sender === 'ai';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`p-4 rounded-3xl max-w-[92%] text-xs ${
                        isAi
                          ? 'bg-slate-50 border border-slate-200/80 text-slate-900'
                          : 'bg-[#00875a] text-white shadow-brand-sm'
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-line font-medium">{m.text}</p>
                      {m.tags && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex flex-wrap gap-1">
                          {m.tags.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-full bg-white text-[10px] text-slate-800 font-bold border border-slate-200">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1 font-medium">
                      {m.time}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium">
                  <Sparkles className="w-4 h-4 text-[#00875a] animate-spin" />
                  <span>SentinelAI synthesizing telemetry forensics...</span>
                </div>
              )}
            </div>

            {/* Suggested Prompts Bar */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80">
              <span className="text-[10px] text-slate-700 uppercase font-bold block mb-2 tracking-wider">
                Suggested Prompts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((qp, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(qp)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#00875a] text-[11px] text-slate-800 hover:text-slate-950 transition-all shadow-sm flex items-center gap-1 text-left font-semibold"
                  >
                    <span>{qp}</span>
                    <ChevronRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* User Input Bar */}
            <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask SentinelAI Copilot anything..."
                className="flex-1 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 placeholder-slate-400 font-medium text-xs focus:outline-none focus:border-[#00875a] focus:bg-white transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-3 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white shadow-brand disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
