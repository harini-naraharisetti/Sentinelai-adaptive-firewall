'use client';

import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Radio, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Smartphone, 
  Laptop, 
  RefreshCw,
  Plus,
  X
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { playCyberSound } from '../../services/soundEffects';

interface WiFiPolicy {
  id: string;
  name: string;
  category: string;
  status: 'ACTIVE' | 'DISABLED';
  detail: string;
  badge: string;
}

const INITIAL_WIFI_POLICIES: WiFiPolicy[] = [
  { id: '1', name: 'Client AP Isolation', category: 'Zero-Trust', status: 'ACTIVE', detail: 'Prevents wireless devices from communicating with each other, blocking ARP spoofing and lateral sniffing.', badge: 'Isolation Active' },
  { id: '2', name: '802.1X Strict MAC Whitelisting', category: 'Access Control', status: 'ACTIVE', detail: 'Only company-registered hardware MAC addresses are allowed on corporate Wi-Fi. Unknown devices are dropped.', badge: 'NAC Enforced' },
  { id: '3', name: 'Rogue AP & Evil Twin Shield', category: 'RF Security', status: 'ACTIVE', detail: 'Continuous RF spectrum monitoring blocks rogue access points broadcasting duplicate SSIDs.', badge: '0 Rogue Detected' },
  { id: '4', name: '802.11w PMF (Deauth Attack Guard)', category: 'Protocol', status: 'ACTIVE', detail: 'Protected Management Frames prevent malicious Wi-Fi deauthentication and disassociation attacks.', badge: 'PMF Armed' },
  { id: '5', name: '5GHz / 6GHz Spectrum Only', category: 'RF Restriction', status: 'ACTIVE', detail: 'Legacy 2.4GHz band is disabled on internal subnets to eliminate IoT vulnerability vectors.', badge: '5GHz High-Speed' },
  { id: '6', name: 'Guest Bandwidth Quota (VLAN 40)', category: 'QoS & Isolation', status: 'ACTIVE', detail: 'Guest devices are confined to isolated VLAN 40 and bandwidth-throttled to max 15 Mbps.', badge: '15 Mbps Cap' },
];

export const WiFiRestrictionsCard: React.FC = () => {
  const { addToast, isTickPulse } = useSecurity();
  const [policies, setPolicies] = useState<WiFiPolicy[]>(INITIAL_WIFI_POLICIES);
  const [isScanning, setIsScanning] = useState(false);
  const [isAddMacOpen, setIsAddMacOpen] = useState(false);
  const [newMac, setNewMac] = useState('00:1A:2B:3C:4D:5E');
  const [newDeviceName, setNewDeviceName] = useState("SecOps MacBook Pro");

  const [macWhitelist, setMacWhitelist] = useState([
    { mac: '70:EE:50:81:92:44', device: "SOC Lead Terminal (Dell Precision)", status: 'AUTHORIZED' },
    { mac: '3C:22:FB:4A:11:09', device: "SecOps Admin MacBook Pro", status: 'AUTHORIZED' },
    { mac: 'A4:83:E7:66:3D:12', device: "Cyber Forensics iPad Pro", status: 'AUTHORIZED' },
  ]);

  const togglePolicy = (id: string) => {
    playCyberSound('click');
    setPolicies(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
        addToast({
          title: `Wi-Fi Policy Updated: ${p.name}`,
          message: `Restriction status changed to ${nextStatus}.`,
          type: nextStatus === 'ACTIVE' ? 'success' : 'warning'
        });
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleScanRF = () => {
    playCyberSound('tick');
    setIsScanning(true);
    addToast({
      title: '📡 Initiating Wi-Fi RF Spectrum & Rogue AP Sweep',
      message: 'Scanning 2.4GHz / 5GHz / 6GHz airwaves for unauthorized hotspots and spoofed beacons...',
      type: 'info'
    });

    setTimeout(() => {
      setIsScanning(false);
      playCyberSound('success');
      addToast({
        title: '✅ Wi-Fi RF Spectrum Sweep Clean',
        message: '0 Rogue Access Points • 0 Evil Twin Beacons • 100% WPA3-Enterprise Compliance.',
        type: 'success'
      });
    }, 2200);
  };

  const handleAddMac = (e: React.FormEvent) => {
    e.preventDefault();
    playCyberSound('success');
    setMacWhitelist(prev => [...prev, { mac: newMac, device: newDeviceName, status: 'AUTHORIZED' }]);
    setIsAddMacOpen(false);
    addToast({
      title: 'Device Whitelisted on Wi-Fi NAC',
      message: `MAC ${newMac} (${newDeviceName}) granted network access.`,
      type: 'success'
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 font-sans space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
            <Wifi className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Wi-Fi Perimeter &amp; Wireless Network Restrictions
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                WPA3-ENTERPRISE (802.1X)
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Enterprise SSID: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono font-bold">Sentinel_Corp_Secure_5G</code> • EAP-TLS Radius Auth
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleScanRF}
            disabled={isScanning}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin text-emerald-400' : ''}`} />
            <span>{isScanning ? 'Scanning Spectrum...' : 'Scan Rogue APs'}</span>
          </button>

          <button
            onClick={() => setIsAddMacOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#00875a] border border-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Whitelist MAC</span>
          </button>
        </div>
      </div>

      {/* Top 3 Live Wi-Fi Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-[#00875a]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Authenticated Devices</span>
              <strong className="block text-slate-900 text-sm font-extrabold mt-0.5">24 Connected (0 Rogue)</strong>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            802.1X Active
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-100 text-cyan-800">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">RF Airwave Security</span>
              <strong className="block text-slate-900 text-sm font-extrabold mt-0.5">PMF 802.11w Guarded</strong>
            </div>
          </div>
          <span className="text-[10px] font-bold text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full">
            Deauth Proof
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Guest Network Policy</span>
              <strong className="block text-slate-900 text-sm font-extrabold mt-0.5">VLAN 40 (15 Mbps Cap)</strong>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            Isolated
          </span>
        </div>
      </div>

      {/* 6 Core Enforced Restriction Policies Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00875a]" />
          Active Wireless Restriction Rules &amp; Zero-Trust Policies
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {policies.map((p) => {
            const isActive = p.status === 'ACTIVE';

            return (
              <div 
                key={p.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                  isActive 
                    ? 'bg-white border-slate-200 hover:border-emerald-300 shadow-sm' 
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                      {p.category}
                    </span>
                    <button
                      onClick={() => togglePolicy(p.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                        isActive 
                          ? 'bg-emerald-50 text-[#00875a] border-emerald-200' 
                          : 'bg-slate-200 text-slate-600 border-slate-300'
                      }`}
                    >
                      {isActive ? '● ENFORCED' : 'OFF'}
                    </button>
                  </div>

                  <strong className="block text-xs font-bold text-slate-900">
                    {p.name}
                  </strong>

                  <p className="text-[11px] text-slate-600 font-medium mt-1 leading-relaxed">
                    {p.detail}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-[#00875a] font-bold">{p.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Authorized Devices Whitelist Preview */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-800">
            Registered MAC Hardware Whitelist (Sample)
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            {macWhitelist.length} Devices Authorized
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          {macWhitelist.map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-500">{item.device}</div>
                <div className="text-xs font-bold text-slate-900">{item.mac}</div>
              </div>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                ALLOWED
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add MAC Whitelist Modal */}
      {isAddMacOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00875a] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">
                  Whitelist Hardware MAC Address
                </h4>
              </div>
              <button 
                onClick={() => setIsAddMacOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMac} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Device Friendly Name</label>
                <input
                  type="text"
                  required
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  placeholder="e.g. Lead Analyst Laptop"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#00875a]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Hardware MAC Address (XX:XX:XX:XX:XX:XX)</label>
                <input
                  type="text"
                  required
                  value={newMac}
                  onChange={(e) => setNewMac(e.target.value)}
                  placeholder="00:1A:2B:3C:4D:5E"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#00875a]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddMacOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#00875a] hover:bg-emerald-700 text-white font-bold"
                >
                  Whitelist &amp; Authorize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
