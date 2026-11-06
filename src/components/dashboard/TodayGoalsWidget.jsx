import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { Target, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TodayGoalsWidget = () => {
  const { goals, toggleGoalCompleted } = useFitness();
  const displayGoals = goals.slice(0, 4);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-500" />
              Active Goals
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track and complete your milestones
            </p>
          </div>
          <Link
            to="/goals"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            Manage <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5">
          {displayGoals.map((g) => {
            const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));

            return (
              <div
                key={g.id}
                onClick={() => toggleGoalCompleted(g.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  g.isCompleted
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button className="text-emerald-500 shrink-0">
                    {g.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white dark:text-slate-900" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </button>
                  <div className="min-w-0">
                    <p
                      className={`text-xs font-bold truncate ${
                        g.isCompleted
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {g.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {g.currentValue} / {g.targetValue} {g.unit} ({pct}%)
                    </p>
                  </div>
                </div>

                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 shrink-0">
                  {g.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

