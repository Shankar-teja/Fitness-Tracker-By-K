import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';
import {
  Droplets,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  Clock,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { getPastDaysList, getTodayDateString } from '../../utils/dateUtils';

export const WaterView = () => {
  const {
    waterLogs,
    addWater,
    removeWaterLog,
    resetTodayWater,
    todayWaterTotal,
  } = useFitness();
  const { currentUser, updateProfile } = useAuth();

  const [customAmount, setCustomAmount] = useState('250');
  const [goalEditing, setGoalEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(currentUser?.waterGoal?.toString() || '2800');

  const todayStr = getTodayDateString();
  const waterGoal = currentUser?.waterGoal || 2800;

  const percentage = Math.min(100, Math.round((todayWaterTotal / waterGoal) * 100));
  const remaining = Math.max(0, waterGoal - todayWaterTotal);

  // Today's drink logs
  const todayDrinks = waterLogs.filter((w) => w.date === todayStr);

  // 7-day chart data
  const pastDays = getPastDaysList(7);
  const chartData = pastDays.map((d) => {
    const dayTotal = waterLogs
      .filter((w) => w.date === d.dateStr)
      .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    return {
      name: d.dayName,
      date: d.formatted,
      amount: dayTotal,
      goal: waterGoal,
    };
  });

  const handleSaveGoal = (e) => {
    e.preventDefault();
    const g = Number(newGoal) || 2800;
    updateProfile({ waterGoal: g });
    setGoalEditing(false);
  };

  const QUICK_CONTAINERS = [
    { label: 'Small Glass', amount: 200, icon: '🥛' },
    { label: 'Standard Glass', amount: 250, icon: '🥛' },
    { label: 'Water Bottle', amount: 500, icon: '🧴' },
    { label: 'Sport Flask', amount: 750, icon: '🍶' },
    { label: 'Large Jug', amount: 1000, icon: '🫙' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Droplets className="w-7 h-7 text-cyan-500" />
            Hydration & Water Tracking
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Maintain optimal cellular hydration, endurance, and metabolic health.
          </p>
        </div>

        <button
          onClick={resetTodayWater}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:border-rose-500/30 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Today
        </button>
      </div>

      {/* Main Hydration Visual & Quick Log Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Animated Water Cylinder Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Today's Target
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {waterGoal}
                </span>
                <span className="text-xs text-slate-400 font-medium">ml</span>
              </div>
            </div>

            <button
              onClick={() => setGoalEditing((prev) => !prev)}
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              {goalEditing ? 'Cancel' : 'Edit Target'}
            </button>
          </div>

          {/* Goal Edit Input */}
          {goalEditing && (
            <form onSubmit={handleSaveGoal} className="w-full mb-4 flex gap-2">
              <input
                type="number"
                min="500"
                step="100"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-cyan-600 text-white rounded-xl text-xs font-bold"
              >
                Save
              </button>
            </form>
          )}

          {/* Graphical Water Cup */}
          <div className="relative w-44 h-64 rounded-3xl border-4 border-cyan-400/40 bg-gradient-to-b from-cyan-500/5 to-cyan-500/10 overflow-hidden shadow-inner my-2 flex flex-col justify-end">
            {/* Water Fill Level */}
            <div
              className="w-full bg-gradient-to-t from-cyan-600 via-cyan-500 to-sky-400 transition-all duration-700 ease-out relative"
              style={{ height: `${percentage}%` }}
            >
              {/* Ripple Effect Top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-white/30 rounded-full animate-pulse" />
            </div>

            {/* Inner Percentage Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none drop-shadow">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {percentage}%
              </span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mt-1">
                {todayWaterTotal} / {waterGoal} ml
              </span>
            </div>
          </div>

          <div className="w-full text-center mt-3">
            {remaining > 0 ? (
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                💧 <strong className="text-cyan-500">{remaining} ml</strong> remaining to reach daily hydration goal.
              </p>
            ) : (
              <p className="text-xs font-bold text-emerald-500 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Daily hydration goal accomplished!
              </p>
            )}
          </div>
        </div>

        {/* Quick Log Presets & Custom Entry */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Log Water Consumption
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Tap a container size to log with 1-click:
            </p>

            {/* Quick Portions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
              {QUICK_CONTAINERS.map((c) => (
                <button
                  key={c.amount}
                  onClick={() => addWater(c.amount)}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-cyan-500/10 transition-all flex flex-col items-center gap-1 group text-center"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {c.icon}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                    +{c.amount} ml
                  </span>
                  <span className="text-[10px] text-slate-400">{c.label}</span>
                </button>
              ))}

              {/* Custom Input Card */}
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between">
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  Custom (ml):
                </label>
                <div className="flex gap-1.5 mt-1">
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                  <button
                    onClick={() => addWater(Number(customAmount) || 250)}
                    className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Hydration Tip Banner */}
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-900 dark:text-cyan-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
              <span>
                <strong>Hydration Tip:</strong> Drinking 500ml of water right after waking up helps jumpstart your metabolism, flushes out toxins, and increases mental focus for morning workouts!
              </span>
            </div>
          </div>

          {/* Today's Log Timeline */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Today's Drink History ({todayDrinks.length} entries)
            </h4>

            {todayDrinks.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">
                No water logged yet today. Click any container button above to record your first drink.
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {todayDrinks.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                        <Droplets className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          +{entry.amount} ml
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{entry.time || 'Today'}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeWaterLog(entry.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 7-Day Hydration History Bar Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-500" />
              7-Day Hydration Trend
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Daily water intake vs your goal of {waterGoal} ml
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <XAxis
                dataKey="name"
                stroke="currentColor"
                className="text-xs text-slate-400 dark:text-slate-500 font-medium"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="currentColor"
                className="text-xs text-slate-400 dark:text-slate-500 font-medium"
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const val = payload[0].value;
                    const pct = Math.round((val / waterGoal) * 100);
                    return (
                      <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700 text-xs space-y-1">
                        <p className="font-bold text-slate-300">{payload[0]?.payload?.date || label}</p>
                        <p className="text-cyan-400 font-medium">💧 Intake: {val} ml</p>
                        <p className="text-slate-400 font-medium">Goal: {waterGoal} ml ({pct}%)</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={waterGoal} stroke="#06b6d4" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'Goal', fill: '#06b6d4', fontSize: 10, position: 'right' }} />
              <Bar dataKey="amount" fill="#06b6d4" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

