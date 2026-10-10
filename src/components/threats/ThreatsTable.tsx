'use client';

import React, { useState } from 'react';
import { Threat } from '../../types/security';
import { useSecurity } from '../../context/SecurityContext';
import { 
  ShieldAlert, 
  Search, 
  ChevronRight,
  ShieldCheck,
  Flame,
  Activity,
  Lock,
  Waves,
  Link as LinkIcon
} from 'lucide-react';

interface ThreatsTableProps {
  threatList?: Threat[];
  limit?: number;
  showFilters?: boolean;
}

export const ThreatsTable: React.FC<ThreatsTableProps> = ({ 
  threatList, 
  limit, 
  showFilters = true 
}) => {
  const { threats: contextThreats, openThreatModal } = useSecurity();
  const allThreats = threatList || contextThreats;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filteredThreats = allThreats.filter(t => {
    const typeStr = t.type || t.threatType || '';
    const srcStr = t.sourceIp || '';
    const dstStr = t.destinationIp || '';

    const matchesSearch = 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      typeStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srcStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dstStr.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = selectedSeverity === 'ALL' || t.severity === selectedSeverity;

    return matchesSearch && matchesSeverity;
  });

  const displayedThreats = limit ? filteredThreats.slice(0, limit) : filteredThreats;

  const getThreatIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('port') || t.includes('scan')) return { icon: Search, bg: 'bg-rose-50 text-rose-600' };
    if (t.includes('brute') || t.includes('auth')) return { icon: Lock, bg: 'bg-amber-50 text-amber-600' };
    if (t.includes('dos') || t.includes('flood')) return { icon: Waves, bg: 'bg-purple-50 text-purple-600' };
    if (t.includes('url') || t.includes('phish')) return { icon: LinkIcon, bg: 'bg-blue-50 text-blue-600' };
    return { icon: Activity, bg: 'bg-emerald-50 text-[#00875a]' };
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-card font-sans">
      {/* Table Controls */}
      {showFilters && (
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00875a] flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Active Security Threat Records
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {filteredThreats.length} AI classified anomalies
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search threats or IPs..."
                className="pl-9 pr-3.5 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00875a] w-48 sm:w-60 font-semibold"
              />
            </div>

            {/* Severity Filter Pills */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-bold">
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    selectedSeverity === sev 
                      ? 'bg-[#00875a] text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/90 text-slate-600 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-5">Threat Type</th>
              <th className="py-3.5 px-4">Severity</th>
              <th className="py-3.5 px-4">Source IP</th>
              <th className="py-3.5 px-4">Target Asset</th>
              <th className="py-3.5 px-4">Risk Score</th>
              <th className="py-3.5 px-4">ML Conf.</th>
              <th className="py-3.5 px-4">Response</th>
              <th className="py-3.5 px-4">Timestamp</th>
              <th className="py-3.5 px-5 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayedThreats.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10 text-center text-slate-500 font-semibold text-xs">
                  No threats match the active filter criteria.
                </td>
              </tr>
            ) : (
              displayedThreats.map((threat) => {
                const isCritical = threat.severity === 'CRITICAL';
                const isHigh = threat.severity === 'HIGH';
                const isMedium = threat.severity === 'MEDIUM';
                const confidenceVal = threat.confidence || threat.mlConfidence || 94;
                const typeVal = threat.type || threat.threatType || 'Network Intrusion';
                const badge = getThreatIcon(typeVal);
                const Icon = badge.icon;

                return (
                  <tr
                    key={threat.id}
                    onClick={() => openThreatModal(threat)}
                    className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                  >
                    {/* Threat Name + Circular Icon Badge */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${badge.bg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <strong className="block text-slate-900 font-bold group-hover:text-[#00875a] transition-colors text-sm">
                            {typeVal}
                          </strong>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {threat.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Severity Pill */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isCritical 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : isHigh 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                          : isMedium 
                          ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' 
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {threat.severity}
                      </span>
                    </td>

                    {/* Source IP */}
                    <td className="py-3.5 px-4 font-mono font-bold">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-900 border border-slate-200/80">
                        {threat.sourceIp}
                      </span>
                    </td>

                    {/* Destination */}
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">
                      <span className="block truncate max-w-[140px] font-mono text-xs">
                        {threat.destinationIp}
                      </span>
                      <span className="text-[11px] text-slate-500 font-sans font-medium">
                        {threat.protocol || 'TCP'} • {typeof threat.destinationPort === 'string' ? threat.destinationPort.slice(0, 15) : (threat.destinationPort || '22')}
                      </span>
                    </td>

                    {/* Risk Score */}
                    <td className="py-3.5 px-4 font-bold">
                      <span className={`text-sm ${isHigh || isCritical ? 'text-rose-600 font-black' : isMedium ? 'text-amber-700 font-black' : 'text-[#00875a] font-black'}`}>
                        {threat.riskScore} <span className="text-xs text-slate-400 font-semibold">/100</span>
                      </span>
                    </td>

                    {/* ML Confidence Bar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-14 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-[#00875a] h-full rounded-full" 
                            style={{ width: `${confidenceVal}%` }} 
                          />
                        </div>
                        <span className="text-slate-900 text-xs font-bold">
                          {confidenceVal}%
                        </span>
                      </div>
                    </td>

                    {/* Action Pill */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        threat.action === 'BLOCK' || threat.action === 'BLOCKED'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : threat.action === 'MONITOR'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {threat.action || 'BLOCK'}
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-xs whitespace-nowrap font-medium">
                      {threat.timestamp}
                    </td>

                    {/* Inspect Arrow */}
                    <td className="py-3.5 px-5 text-right">
                      <button className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#00875a] hover:text-white text-slate-700 inline-flex items-center justify-center transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
