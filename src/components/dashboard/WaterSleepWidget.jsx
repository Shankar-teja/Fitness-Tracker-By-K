import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';
import { Droplets, MoonStar, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WaterSleepWidget = () => {
  const { todayWaterTotal, addWater, todaySleep } = useFitness();
  const { currentUser } = useAuth();

  const waterGoal = currentUser?.waterGoal || 2800;
  const sleepGoal = currentUser?.sleepGoal || 8.0;

  const waterPercent = Math.min(100, Math.round((todayWaterTotal / waterGoal) * 100));
  const sleepDuration = todaySleep?.durationHours || 7.75;
  const sleepPercent = Math.min(100, Math.round((sleepDuration / sleepGoal) * 100));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Water Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">Water Intake</h5>
                <p className="text-[11px] text-slate-400">Target: {waterGoal} ml</p>
              </div>
            </div>
            <Link
              to="/water"
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-0.5"
            >
              Details <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {todayWaterTotal}{' '}
              <span className="text-xs font-medium text-slate-400">ml</span>
            </span>
            <span className="text-xs font-bold text-cyan-500">{waterPercent}%</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-4">
            <div
              className="h-full bg-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${waterPercent}%` }}
            />
          </div>
        </div>

        {/* Quick Log Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-medium text-slate-400">Quick Drink:</span>
          <button
            onClick={() => addWater(250)}
            className="flex-1 py-1.5 px-2 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            250ml
          </button>
          <button
            onClick={() => addWater(500)}
            className="flex-1 py-1.5 px-2 bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            500ml
          </button>
        </div>
      </div>

      {/* Sleep Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
                <MoonStar className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">Sleep & Recovery</h5>
                <p className="text-[11px] text-slate-400">Target: {sleepGoal} hrs</p>
              </div>
            </div>
            <Link
              to="/sleep"
              className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-0.5"
            >
              Details <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {sleepDuration}{' '}
              <span className="text-xs font-medium text-slate-400">hours</span>
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20">
              Score: {todaySleep?.score || 92} ({todaySleep?.quality || 'Good'})
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mb-4">
            <div
              className="h-full bg-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${sleepPercent}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span>Bedtime: <strong className="text-slate-800 dark:text-slate-200">{todaySleep?.bedtime || '23:15'}</strong></span>
          <span>Wake: <strong className="text-slate-800 dark:text-slate-200">{todaySleep?.wakeTime || '07:00'}</strong></span>
        </div>
      </div>
    </div>
  );
};

