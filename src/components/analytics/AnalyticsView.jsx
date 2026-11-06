import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  Scale,
  Plus,
  Flame,
  Award,
  Activity,
  Dumbbell,
  Calendar,
  Trash2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Legend,
} from 'recharts';
import { Modal } from '../common/Modal';
import { formatDateDisplay, getTodayDateString } from '../../utils/dateUtils';

const WORKOUT_COLORS = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ec4899', '#3b82f6'];

export const AnalyticsView = () => {
  const { weightLogs, addWeightLog, deleteWeightLog, workouts, activityLogs, meals } = useFitness();
  const { currentUser } = useAuth();

  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState(currentUser?.weight?.toString() || '74.2');
  const [weightNotes, setWeightNotes] = useState('');

  const targetWeight = currentUser?.targetWeight || 70.0;

  // Weight Trend Data sorted ascending by date
  const weightChartData = [...weightLogs]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((log) => ({
      date: formatDateDisplay(log.date),
      weight: log.weight,
      target: targetWeight,
    }));

  // Workout Category Distribution Data
  const categoryCounts = workouts.reduce((acc, w) => {
    acc[w.category] = (acc[w.category] || 0) + 1;
    return acc;
  }, {});

  const workoutCategoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Total fitness achievements
  const totalBurnedAll = workouts.reduce((sum, w) => sum + (Number(w.caloriesBurned) || 0), 0);
  const currentWeightVal = weightLogs.length > 0 ? weightLogs[weightLogs.length - 1].weight : 74.2;
  const startWeightVal = weightLogs.length > 0 ? weightLogs[0].weight : 76.5;
  const weightChange = Number((currentWeightVal - startWeightVal).toFixed(1));

  const handleWeightSubmit = (e) => {
    e.preventDefault();
    if (!newWeight) return;
    addWeightLog(Number(newWeight), weightNotes);
    setIsWeightModalOpen(false);
    setWeightNotes('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <TrendingUp className="w-7 h-7 text-brand-500" />
            Progress Analytics & Trends
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Data-driven insights on body weight trajectories, training volume, and lifestyle consistency.
          </p>
        </div>

        <button
          onClick={() => setIsWeightModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm shadow-md shadow-brand-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Scale className="w-4 h-4 stroke-[2.5]" />
          Log Weight Check-in
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Current Weight</span>
            <Scale className="w-4 h-4 text-brand-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {currentWeightVal} <span className="text-xs font-normal text-slate-400">kg</span>
          </p>
          <span className="text-[11px] text-emerald-500 font-medium">
            Target: {targetWeight} kg
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Net Weight Change</span>
            <TrendingUp className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {weightChange > 0 ? `+${weightChange}` : weightChange}{' '}
            <span className="text-xs font-normal text-slate-400">kg</span>
          </p>
          <span className="text-[11px] text-sky-500 font-medium">Since first weigh-in</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Total Workouts</span>
            <Dumbbell className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {workouts.length}
          </p>
          <span className="text-[11px] text-violet-500 font-medium">Lifetime sessions</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Total Calories Burned</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalBurnedAll.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-400">kcal</span>
          </p>
          <span className="text-[11px] text-amber-500 font-medium">Across all training</span>
        </div>
      </div>

      {/* Main Weight Progress Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-brand-500" />
              Body Weight Trend & Target Trajectory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Recorded weight logs with green dashed target weight line ({targetWeight} kg)
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightChartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <XAxis
                dataKey="date"
                stroke="currentColor"
                className="text-xs text-slate-400 dark:text-slate-500 font-medium"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={['auto', 'auto']}
                stroke="currentColor"
                className="text-xs text-slate-400 dark:text-slate-500 font-medium"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}kg`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700 text-xs space-y-1">
                        <p className="font-bold text-slate-300">{label}</p>
                        <p className="text-brand-400 font-bold">Weight: {payload[0]?.value} kg</p>
                        <p className="text-slate-400">Goal Target: {targetWeight} kg</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine
                y={targetWeight}
                stroke="#10b981"
                strokeDasharray="4 4"
                strokeWidth={2}
                label={{ value: `Goal (${targetWeight}kg)`, fill: '#10b981', fontSize: 11, position: 'right' }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#3b82f6' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Workout Distribution & Weight Logs History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Category Distribution */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Workout Category Distribution
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Training variety and balance across disciplines
            </p>

            <div className="h-60 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow border border-slate-700 text-xs">
                            <span className="font-bold">{payload[0].name}</span>: {payload[0].value} workouts
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={workoutCategoryData}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {workoutCategoryData.map((entry, index) => (
                      <Cell
                        key={`cat-cell-${index}`}
                        fill={WORKOUT_COLORS[index % WORKOUT_COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {workoutCategoryData.map((item, idx) => (
              <span
                key={item.name}
                className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: WORKOUT_COLORS[idx % WORKOUT_COLORS.length] }}
                />
                {item.name} ({item.value})
              </span>
            ))}
          </div>
        </div>

        {/* Weight Check-in History */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Weigh-In Check-ins
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Log history of body scale measurements
              </p>
            </div>
            <button
              onClick={() => setIsWeightModalOpen(true)}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              + Add Weigh-In
            </button>
          </div>

          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {weightLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {log.weight} kg
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDateDisplay(log.date)}</span>
                  </div>
                  {log.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">
                      "{log.notes}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteWeightLog(log.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  title="Delete weigh-in"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Weight Modal */}
      <Modal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        title="Log Weight Check-in"
        subtitle="Record your latest morning weight reading"
      >
        <form onSubmit={handleWeightSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Body Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notes (Optional)
            </label>
            <textarea
              rows="2"
              value={weightNotes}
              onChange={(e) => setWeightNotes(e.target.value)}
              placeholder="e.g. Weighed upon waking before breakfast"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsWeightModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/25 transition-all"
            >
              Save Weigh-In
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

