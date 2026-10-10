'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RiskMeterProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showLabel?: boolean;
  label?: string;
  subtitle?: string;
  animate?: boolean;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({
  score,
  maxScore = 100,
  size = 'md',
  showLabel = true,
  label,
  subtitle,
  animate = true
}) => {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  let riskTier: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  let colorClass = 'text-[#00875a]';
  let strokeColor = '#00875a';
  let badgeBg = 'bg-emerald-50 border-emerald-200 text-emerald-800';

  if (percentage >= 71) {
    riskTier = 'HIGH';
    colorClass = 'text-rose-600';
    strokeColor = '#e11d48';
    badgeBg = 'bg-rose-50 border-rose-200 text-rose-800';
  } else if (percentage >= 31) {
    riskTier = 'MEDIUM';
    colorClass = 'text-amber-600';
    strokeColor = '#d97706';
    badgeBg = 'bg-amber-50 border-amber-200 text-amber-800';
  }

  // Circular dimensions based on size
  const dimensions = {
    sm: { radius: 24, stroke: 4, width: 64, height: 64, text: 'text-sm font-bold', sub: 'text-[9px]' },
    md: { radius: 38, stroke: 6, width: 96, height: 96, text: 'text-xl font-extrabold', sub: 'text-[10px]' },
    lg: { radius: 56, stroke: 8, width: 140, height: 140, text: 'text-3xl font-extrabold', sub: 'text-xs' },
    hero: { radius: 76, stroke: 10, width: 190, height: 190, text: 'text-5xl font-black', sub: 'text-sm' },
  }[size];

  const circumference = 2 * Math.PI * dimensions.radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center text-center font-sans">
      <div 
        className="relative flex items-center justify-center"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <svg 
          width={dimensions.width} 
          height={dimensions.height} 
          className="rotate-[-90deg] transform"
        >
          {/* Background Track */}
          <circle
            cx={dimensions.width / 2}
            cy={dimensions.height / 2}
            r={dimensions.radius}
            stroke="#f1f5f9"
            strokeWidth={dimensions.stroke}
            fill="transparent"
          />
          {/* Animated Value Arc */}
          <motion.circle
            cx={dimensions.width / 2}
            cy={dimensions.height / 2}
            r={dimensions.radius}
            stroke={strokeColor}
            strokeWidth={dimensions.stroke}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: animate ? strokeDashoffset : strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className={`font-black tracking-tight ${colorClass} ${dimensions.text}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className={`text-slate-600 font-bold ${dimensions.sub}`}>
            / {maxScore}
          </span>
        </div>
      </div>

      {showLabel && (
        <div className="mt-2.5 flex flex-col items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-bold tracking-wide uppercase ${badgeBg}`}>
            {label || `${riskTier} RISK`}
          </span>
          {subtitle && (
            <span className="text-[11px] text-slate-600 font-medium mt-1 max-w-[200px] leading-tight">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
