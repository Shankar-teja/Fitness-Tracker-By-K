import React from 'react';
import { Link } from 'react-router-dom';
import { useFitness } from '../../context/FitnessContext';
import { Dumbbell, Flame, Clock, ArrowRight } from 'lucide-react';
import { getRelativeDateLabel } from '../../utils/dateUtils';

export const RecentWorkoutsWidget = () => {
  const { workouts } = useFitness();
  const recent = workouts.slice(0, 4);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-brand-500" />
            Recent Workouts
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Latest training sessions logged
          </p>
        </div>
        <Link
          to="/workouts"
          className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
        >
          View All ({workouts.length}) <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">
          No workouts logged yet. Click "Quick Log" to add your first training session!
        </div>
      ) : (
        <div className="space-y-3">
          {recent.map((w) => (
            <div
              key={w.id}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100/80 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs shrink-0">
                  {w.category.slice(0, 3).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {w.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span>{getRelativeDateLabel(w.date)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                      <Clock className="w-3 h-3" /> {w.duration}m
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-medium">
                      <Flame className="w-3 h-3" /> {w.caloriesBurned} kcal
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                  w.intensity === 'High'
                    ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    : w.intensity === 'Medium'
                    ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                }`}
              >
                {w.intensity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

