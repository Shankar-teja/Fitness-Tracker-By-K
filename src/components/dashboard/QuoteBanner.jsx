import React, { useState } from 'react';
import { MOTIVATIONAL_QUOTES } from '../../utils/sampleData';
import { Flame, RefreshCw } from 'lucide-react';

export const QuoteBanner = () => {
  const [index, setIndex] = useState(0);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  const current = MOTIVATIONAL_QUOTES[index];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 via-emerald-600 to-teal-600 p-5 sm:p-6 text-white shadow-lg shadow-brand-600/15">
      {/* Background ambient pattern */}
      <div className="absolute -right-8 -top-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-20 -bottom-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl text-white shrink-0 mt-0.5">
            <Flame className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse-subtle" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100/90">
              Daily Motivation & Focus
            </span>
            <blockquote className="mt-1 text-base sm:text-lg font-semibold tracking-tight leading-snug">
              “{current.quote}”
            </blockquote>
            <p className="mt-1.5 text-xs text-emerald-100 font-medium">
              — {current.author}
            </p>
          </div>
        </div>

        <button
          onClick={nextQuote}
          className="p-2 bg-white/15 hover:bg-white/25 rounded-xl transition-all text-white/90 hover:text-white shrink-0"
          title="Next Quote"
          aria-label="Next Quote"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

