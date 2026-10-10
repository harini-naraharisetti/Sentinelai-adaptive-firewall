'use client';

import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { WelcomePresentationModal } from './WelcomePresentationModal';

export const WelcomeModalWrapper: React.FC = () => {
  const { isWelcomeOpen, closeWelcomeModal } = useSecurity();

  return (
    <WelcomePresentationModal
      isOpen={isWelcomeOpen}
      onClose={closeWelcomeModal}
      onEnterDashboard={closeWelcomeModal}
    />
  );
};
