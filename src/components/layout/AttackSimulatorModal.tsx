'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FlaskConical, 
  X, 
  Play, 
  Radio, 
  Cpu, 
  Brain, 
  ShieldAlert, 
  Flame, 
  ShieldBan, 
  FileText, 
  BellRing, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Search,
  Lock,
  Waves,
  AlertTriangle,
  Link as LinkIcon
} from 'lucide-react';
import { RiskMeter } from '../common/RiskMeter';

export const AttackSimulatorModal: React.FC = () => {
  const { 
    isSimulating, 
    currentSimulation, 
    activeStepIndex,
    runAttackSimulation
  } = useSecurity();

  const [isOpen, setIsOpen] = React.useState(false);

  // Scenarios matching SentinelAI spec
  const scenarios = [
    {
      id: 'PORT_SCAN',
      title: 'Port Scan',
      icon: Search,
      badge: 'Risk 91 • CRITICAL',
      desc: 'Rapid multi-port TCP SYN probe across 38 ports from 10.0.0.25.'
    },
    {
      id: 'BRUTE_FORCE',
      title: 'Brute Force',
      icon: Lock,
      badge: 'Risk 87 • HIGH',
      desc: '140 failed SSH authentication attempts/minute on port 22.'
    },
    {
      id: 'DOS_FLOOD',
      title: 'DoS-like Traffic',
      icon: Waves,
      badge: 'Risk 96 • CRITICAL',
      desc: 'Volumetric HTTP GET flood exceeding 920 req/sec.'
    },
    {
      id: 'NETWORK_ANOMALY',
      title: 'Network Anomaly',
      icon: AlertTriangle,
      badge: 'Risk 64 • MEDIUM',
      desc: 'Covert TLS beaconing with elevated entropy from 10.0.0.30.'
    },
    {
      id: 'SUSPICIOUS_CONN',
      title: 'Suspicious Connection',
      icon: LinkIcon,
      badge: 'Risk 48 • MEDIUM',
      desc: 'Non-standard TLS cipher suite requested on internal socket.'
    }
  ];

  return null; // The dedicated /simulator route and direct triggers are the primary interaction point
};
