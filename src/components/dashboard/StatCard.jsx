import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  unit,
  target,
  targetLabel = 'Goal',
  icon: Icon,
  iconBg = 'bg-brand-500/10 text-brand-500',
  progressPercent = 0,
  progressBarColor = 'bg-brand-500',
  changeText,
  changePositive = true,
  onClick,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progressPercent));

  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:border-brand-500/40' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${iconBg} shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              {unit}
            </span>
          )}
        </div>

        {target !== undefined && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {targetLabel}: <span className="font-semibold text-slate-700 dark:text-slate-300">{target}</span> {unit}
          </p>
        )}
      </div>

      {/* Progress Bar & Subtext */}
      <div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressBarColor}`}
            style={{ width: `${clampedProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {Math.round(clampedProgress)}%
          </span>
          {changeText && (
            <span
              className={`flex items-center font-medium ${
                changePositive ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {changePositive ? (
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              )}
              {changeText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

