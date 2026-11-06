import React from 'react';
import { INITIAL_PRESET_WORKOUTS } from '../../utils/sampleData';
import { Flame, Clock, Plus, Zap } from 'lucide-react';

export const WorkoutPresets = ({ onSelectPreset }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" />
          Quick 1-Click Workout Templates
        </h4>
        <span className="text-xs text-slate-400">Click any preset to log instantly</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {INITIAL_PRESET_WORKOUTS.slice(0, 4).map((preset) => (
          <div
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className="group p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/50 dark:hover:border-brand-500/50 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  {preset.category}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {preset.intensity}
                </span>
              </div>
              <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {preset.title}
              </h5>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                {preset.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> {preset.duration}m
              </span>
              <span className="flex items-center gap-1 text-amber-500 font-semibold">
                <Flame className="w-3 h-3" /> {preset.caloriesBurned} kcal
              </span>
              <span className="p-1 rounded-md bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

