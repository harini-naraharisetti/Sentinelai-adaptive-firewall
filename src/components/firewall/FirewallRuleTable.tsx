'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { 
  Flame, 
  Plus, 
  ShieldCheck, 
  ShieldBan, 
  ToggleLeft, 
  ToggleRight, 
  Search, 
  Trash2,
  Eye,
  Info,
  Layers,
  AlertTriangle,
  X
} from 'lucide-react';
import { FirewallRule } from '../../types/security';

export const FirewallRuleTable: React.FC = () => {
  const { 
    firewallRules, 
    toggleFirewallRule, 
    deleteFirewallRule, 
    addFirewallRule, 
    stats 
  } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<FirewallRule | null>(null);

  // New Rule Form State
  const [newSource, setNewSource] = useState('10.0.0.99');
  const [newDest, setNewDest] = useState('10.0.0.10');
  const [newPort, setNewPort] = useState('443');
  const [newProto, setNewProto] = useState('TCP');
  const [newAction, setNewAction] = useState<'BLOCK' | 'ALLOW' | 'MONITOR'>('BLOCK');
  const [newReason, setNewReason] = useState('SOC Operator Manual Policy');

  const filteredRules = firewallRules.filter(r => 
    r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.sourceIp.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.destinationIp && r.destinationIp.toLowerCase().includes(searchQuery.toLowerCase())) ||
    r.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const autoRulesCount = firewallRules.filter(r => r.generated).length;
  const manualRulesCount = firewallRules.filter(r => !r.generated).length;
  const activeRulesCount = firewallRules.filter(r => r.status === 'ACTIVE').length;

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    addFirewallRule({
      sourceIp: newSource,
      destinationIp: newDest,
      port: newPort,
      protocol: newProto,
      action: newAction,
      reason: newReason
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Firewall Status & Metrics Banner */}
      <div className="bg-white border border-slate-100/90 rounded-3xl p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00875a] flex items-center justify-center shadow-brand-sm">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Adaptive AI Firewall
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00875a] animate-ping" />
                  SIMULATION ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Status: Simulation Active • Active Rules: {activeRulesCount} • Auto Generated: {autoRulesCount} • Manual: {manualRulesCount}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-brand self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Manual Rule</span>
          </button>
        </div>

        {/* Disclaimer Requirement */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-center gap-2.5 font-medium">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Note:</strong> This rule is a simulated response and operates within the demonstration sandbox without modifying host firewall policies.
          </span>
        </div>

        {/* 4 Firewall KPI Metrics */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Active Rules</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{activeRulesCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Auto-Generated (AI)</span>
            <p className="text-xl font-bold text-[#00875a] mt-0.5">{autoRulesCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Manual Rules</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{manualRulesCount}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Simulated Blocks</span>
            <p className="text-xl font-bold text-rose-600 mt-0.5">{stats.blockedSources}</p>
          </div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-white border border-slate-100/90 rounded-3xl overflow-hidden shadow-card">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldBan className="w-4 h-4 text-slate-700" />
            <h4 className="font-bold text-sm text-slate-900">
              Simulated Firewall Rulebase
            </h4>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              {filteredRules.length} Rules
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rule ID, source IP, reason..."
              className="pl-9 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#00875a] focus:bg-white w-64 font-medium transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 text-slate-700 border-b border-slate-200 text-[10px] uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-5">Rule ID</th>
                <th className="py-3.5 px-5">Action</th>
                <th className="py-3.5 px-5">Source IP</th>
                <th className="py-3.5 px-5">Destination</th>
                <th className="py-3.5 px-5">Port</th>
                <th className="py-3.5 px-5">Reason</th>
                <th className="py-3.5 px-5">Risk</th>
                <th className="py-3.5 px-5">Created</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Rule Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {filteredRules.map((rule) => {
                const isActive = rule.status === 'ACTIVE';

                return (
                  <tr key={rule.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                      <span>{rule.id}</span>
                      {rule.generated && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-[#00875a] border border-emerald-100 font-bold">
                          AI AUTO
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        rule.action === 'BLOCK' || rule.action === 'DROP'
                          ? 'bg-rose-50 text-rose-600 border border-rose-200'
                          : rule.action === 'MONITOR'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-[#00875a] border border-emerald-200'
                      }`}>
                        {rule.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono">
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg inline-block">
                        {rule.sourceIp}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-slate-700 font-medium">{rule.destinationIp || '10.0.0.10'}</td>
                    <td className="py-3.5 px-5 font-mono text-slate-700 font-medium">{rule.port || 'Any'}</td>
                    <td className="py-3.5 px-5 text-slate-800 max-w-xs truncate font-medium">{rule.reason}</td>
                    <td className="py-3.5 px-5 text-rose-600 font-bold">{rule.riskScore}/100</td>
                    <td className="py-3.5 px-5 text-slate-600 text-[11px] font-mono font-medium">{rule.createdAt}</td>
                    <td className="py-3.5 px-5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        isActive ? 'bg-emerald-50 text-[#00875a] border border-emerald-200' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {rule.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedRule(rule)}
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                          title="View Rule"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleFirewallRule(rule.id)}
                          className={`p-1.5 rounded-xl transition-colors ${
                            isActive ? 'text-[#00875a] hover:text-amber-600' : 'text-slate-500 hover:text-[#00875a]'
                          }`}
                          title={isActive ? 'Disable Simulation' : 'Enable Simulation'}
                        >
                          {isActive ? <ToggleRight className="w-5 h-5 inline" /> : <ToggleLeft className="w-5 h-5 inline" />}
                        </button>
                        <button
                          onClick={() => deleteFirewallRule(rule.id)}
                          className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
                          title="Delete Demo Rule"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Rule Detail Modal */}
      {selectedRule && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex justify-center items-center bg-slate-900/40 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-100 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#00875a]" />
                <h3 className="text-base font-bold text-slate-900">
                  Rule {selectedRule.id}
                </h3>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                selectedRule.status === 'ACTIVE' ? 'bg-emerald-50 text-[#00875a] border border-emerald-200' : 'bg-slate-100 text-slate-700'
              }`}>
                {selectedRule.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600 font-bold">ACTION:</span>
                <span className="font-bold text-rose-600">{selectedRule.action}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600 font-bold">SOURCE:</span>
                <span className="font-mono font-bold text-slate-900">{selectedRule.sourceIp}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600 font-bold">DESTINATION:</span>
                <span className="font-mono text-slate-900 font-semibold">{selectedRule.destinationIp || '10.0.0.10'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600 font-bold">PORT &amp; PROTOCOL:</span>
                <span className="text-slate-900 font-semibold">{selectedRule.port || 'Any'} ({selectedRule.protocol || 'TCP'})</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600 font-bold">REASON:</span>
                <span className="text-slate-900 font-medium text-right max-w-[200px]">{selectedRule.reason}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-600 font-bold">RISK SCORE:</span>
                <span className="text-rose-600 font-bold">{selectedRule.riskScore} / 100</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-600 font-bold">CREATED:</span>
                <span className="text-slate-800 font-mono font-medium">{selectedRule.createdAt}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-medium">
              This rule is a simulated response and does not modify the operating system firewall.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRule(null)}
                className="px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Rule Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex justify-center items-center bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white border border-slate-100 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#00875a]" />
                Create Simulated Firewall Rule
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3.5">
              <div>
                <label className="block text-slate-500 text-[11px] font-semibold mb-1">Source IP / CIDR</label>
                <input
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 focus:outline-none focus:border-[#00875a] focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 text-[11px] font-semibold mb-1">Destination IP</label>
                  <input
                    type="text"
                    value={newDest}
                    onChange={(e) => setNewDest(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 focus:outline-none focus:border-[#00875a] focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-[11px] font-semibold mb-1">Port</label>
                  <input
                    type="text"
                    value={newPort}
                    onChange={(e) => setNewPort(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 focus:outline-none focus:border-[#00875a] focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 text-[11px] font-semibold mb-1">Protocol</label>
                  <select
                    value={newProto}
                    onChange={(e) => setNewProto(e.target.value)}
                    className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 focus:outline-none focus:border-[#00875a]"
                  >
                    <option value="TCP">TCP</option>
                    <option value="UDP">UDP</option>
                    <option value="HTTPS">HTTPS</option>
                    <option value="DNS">DNS</option>
                    <option value="ICMP">ICMP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 text-[11px] font-semibold mb-1">Action</label>
                  <select
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value as any)}
                    className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 focus:outline-none focus:border-[#00875a]"
                  >
                    <option value="BLOCK">BLOCK</option>
                    <option value="MONITOR">MONITOR</option>
                    <option value="ALLOW">ALLOW</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-500 text-[11px] font-semibold mb-1">Policy Reason</label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  className="w-full p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-900 focus:outline-none focus:border-[#00875a] focus:bg-white"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-2xl bg-slate-100 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-2xl bg-[#00875a] hover:bg-[#00704a] text-white font-bold shadow-brand"
                >
                  Create Simulated Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
