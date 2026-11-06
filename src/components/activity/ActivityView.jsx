import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';
import {
  Footprints,
  Flame,
  MapPin,
  Timer,
  Plus,
  TrendingUp,
  Award,
  Calendar,
  Zap,
  CheckCircle2,
  Clock,
  ArrowUpRight,
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

export const ActivityView = () => {
  const { todayActivity, updateTodaySteps, activityLogs, addToast } = useFitness();
  const { currentUser } = useAuth();

  const [stepInput, setStepInput] = useState('');
  const stepGoal = currentUser?.stepGoal || 10000;

  const currentSteps = todayActivity?.steps || 8640;
  const currentDistance = todayActivity?.distanceKm || 6.4;
  const currentCalories = todayActivity?.caloriesBurned || 460;
  const currentMinutes = todayActivity?.activeMinutes || 48;

  const progressPercent = Math.min(100, Math.round((currentSteps / stepGoal) * 100));

  const handleAddSteps = (additional) => {
    updateTodaySteps(currentSteps + additional);
  };

  const handleSetCustomSteps = (e) => {
    e.preventDefault();
    if (!stepInput) return;
    const val = Math.max(0, Number(stepInput));
    updateTodaySteps(val);
    setStepInput('');
  };

  // Past 7 days data
  const pastDays = getPastDaysList(7);
  const chartData = pastDays.map((d) => {
    const act = activityLogs.find((a) => a.date === d.dateStr);
    return {
      name: d.dayName,
      date: d.formatted,
      steps: act?.steps || 0,
      calories: act?.caloriesBurned || 0,
      distance: act?.distanceKm || 0,
    };
  });

  const totalWeeklySteps = chartData.reduce((sum, item) => sum + item.steps, 0);
  const avgWeeklySteps = Math.round(totalWeeklySteps / chartData.length);
  const bestDay = [...chartData].sort((a, b) => b.steps - a.steps)[0];

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Footprints className="w-6 h-6 stroke-[2.5]" />
            </div>
            Daily Activity & Step Tracking
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track daily movement, walking distance, active calories, and cadence consistency.
          </p>
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs shadow-sm">
            <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            <span>{progressPercent >= 100 ? 'Goal Achieved!' : `${progressPercent}% of Daily Goal`}</span>
          </div>
        </div>
      </div>

      {/* Main Top Section: Step Ring (Left) & Metrics/Controls (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Step Progress Gauge Card (col-span-5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between text-center relative overflow-hidden">
          {/* Top Header */}
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Step Counter
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {progressPercent}% Complete
            </span>
          </div>

          {/* SVG Circular Progress Ring */}
          <div className="relative my-6 flex items-center justify-center">
            <svg className="w-52 h-52 transform -rotate-90">
              <circle
                cx="104"
                cy="104"
                r="88"
                stroke="currentColor"
                strokeWidth="14"
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              <circle
                cx="104"
                cy="104"
                r="88"
                stroke="#10b981"
                strokeWidth="14"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - progressPercent / 100)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Centered Values */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <Footprints className="w-6 h-6 text-emerald-500 mb-1" />
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight tabular-nums">
                {currentSteps.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-semibold mt-1">
                Goal: {stepGoal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Bottom Progress Bar & Details */}
          <div className="w-full space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Daily Benchmark</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {currentSteps >= stepGoal ? 'Completed 🎉' : `${(stepGoal - currentSteps).toLocaleString()} steps left`}
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3 Metric Cards + Quick Adder (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          {/* 3 Secondary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Distance Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Total Distance
                </span>
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {currentDistance}
                  </span>
                  <span className="text-xs font-medium text-slate-400">km</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  ≈ {(currentDistance * 0.621371).toFixed(1)} miles
                </p>
              </div>
            </div>

            {/* Active Calories Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Active Energy
                </span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Flame className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {currentCalories}
                  </span>
                  <span className="text-xs font-medium text-slate-400">kcal</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Walking energy burn
                </p>
              </div>
            </div>

            {/* Active Minutes Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Active Time
                </span>
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
                  <Timer className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {currentMinutes}
                  </span>
                  <span className="text-xs font-medium text-slate-400">mins</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Brisk cadence time
                </p>
              </div>
            </div>
          </div>

          {/* Quick Increment Controls & Set Total Box */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Quick Increment Shortcuts
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Quickly add walking steps from your fitness tracker or phone:
              </p>
            </div>

            {/* Quick Increment Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => handleAddSteps(500)}
                className="h-10 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" /> 500
              </button>
              <button
                type="button"
                onClick={() => handleAddSteps(1000)}
                className="h-10 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" /> 1,000
              </button>
              <button
                type="button"
                onClick={() => handleAddSteps(2500)}
                className="h-10 px-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" /> 2,500
              </button>
              <button
                type="button"
                onClick={() => handleAddSteps(5000)}
                className="h-10 px-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" /> 5,000
              </button>
            </div>

            {/* Set Exact Total Form */}
            <form onSubmit={handleSetCustomSteps} className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="relative flex-1">
                <input
                  type="number"
                  min="0"
                  value={stepInput}
                  onChange={(e) => setStepInput(e.target.value)}
                  placeholder="Set exact total steps (e.g. 10250)..."
                  className="w-full h-10 px-3.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-10 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95 shrink-0"
              >
                Set Total
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section: 7-Day History Chart (col-8) & Insights (col-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* 7-Day Steps Bar Chart (col-span-8) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-500" />
                7-Day Step History
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily step tracking with target reference line ({stepGoal.toLocaleString()} steps)
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Avg: {avgWeeklySteps.toLocaleString()} steps</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 15, left: -5, bottom: 0 }}>
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
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700 text-xs space-y-1">
                          <p className="font-bold text-slate-300">{item.date || label}</p>
                          <p className="text-emerald-400 font-medium">👟 Steps: {item.steps?.toLocaleString()}</p>
                          <p className="text-sky-400 font-medium">📍 Distance: {item.distance} km</p>
                          <p className="text-amber-400 font-medium">🔥 Burned: {item.calories} kcal</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={stepGoal}
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  label={{ value: `${stepGoal / 1000}k Goal`, fill: '#10b981', fontSize: 10, position: 'right' }}
                />
                <Bar dataKey="steps" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={38} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Movement Insights & Milestones (col-span-4) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-amber-500" />
              Activity Milestones & Insights
            </h3>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    Best Day This Week
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {bestDay?.name} ({bestDay?.date})
                  </span>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                  {bestDay?.steps?.toLocaleString()} steps
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    Weekly Total Distance
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {chartData.reduce((sum, item) => sum + item.distance, 0).toFixed(1)} km
                  </span>
                </div>
                <span className="text-xs font-bold text-sky-500">
                  Cumulative
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                  Cardiovascular Health Fact
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Walking 8,000–10,000 steps daily reduces all-cause cardiovascular mortality by over 40% and boosts insulin sensitivity.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Keep your streak going!</span>
            <span className="font-bold text-emerald-500 flex items-center gap-1">
              Active Pace <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
