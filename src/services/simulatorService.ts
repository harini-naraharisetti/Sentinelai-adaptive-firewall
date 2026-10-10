import { 
  GeneratedSimulationResult, 
  generatePortScan, 
  generateBruteForce, 
  generateDoS, 
  generateAnomaly, 
  generateSuspiciousConnection, 
  generateNormalTraffic 
} from './simulationEngine';
import { SimulationStep, Threat, FirewallRule, SIEMEvent, NotificationItem } from '../types/security';

export type AttackScenario = 
  | 'PORT_SCAN'
  | 'BRUTE_FORCE'
  | 'NETWORK_ANOMALY'
  | 'HIGH_RISK_URL'
  | 'NORMAL_TRAFFIC';

export interface SimulationPayload {
  scenario: AttackScenario;
  title: string;
  threat: Threat;
  firewallRule?: FirewallRule;
  siemEvent: SIEMEvent;
  notification: NotificationItem;
  steps: {
    title: string;
    description: string;
    metric?: string;
    icon: string;
  }[];
}

export function generateSimulationData(scenario: AttackScenario): SimulationPayload {
  let sim: GeneratedSimulationResult;

  switch (scenario) {
    case 'PORT_SCAN':
      sim = generatePortScan();
      break;
    case 'BRUTE_FORCE':
      sim = generateBruteForce();
      break;
    case 'NETWORK_ANOMALY':
      sim = generateAnomaly();
      break;
    default:
      sim = generatePortScan();
  }

  return {
    scenario,
    title: `Simulated ${sim.threat.type}`,
    threat: sim.threat,
    firewallRule: sim.firewallRule,
    siemEvent: sim.siemEvent,
    notification: {
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      title: `🚨 THREAT DETECTED: ${sim.threat.type}`,
      message: `${sim.threat.type} from ${sim.threat.sourceIp} | Risk: ${sim.threat.riskScore}/100`,
      severity: sim.threat.severity,
      timestamp: sim.threat.timestamp,
      read: false,
      threatId: sim.threat.id,
      ruleId: sim.firewallRule?.id,
      action: sim.threat.action
    },
    steps: sim.steps.map(s => ({
      title: s.name,
      description: s.description,
      metric: s.metric,
      icon: s.icon
    }))
  };
}
