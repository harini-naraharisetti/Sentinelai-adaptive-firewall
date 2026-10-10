import React from 'react';
import { IncidentsList } from '../../components/incidents/IncidentsList';

export const metadata = {
  title: 'Incident Response Lifecycle | SentinelAI SOC',
  description: 'Automated cybersecurity incident response, timeline analysis, and mitigation tracking.',
};

export default function IncidentsPage() {
  return <IncidentsList />;
}
