import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';
import {
  MoonStar,
  Plus,
  Clock,
  Trash2,
  Sparkles,
  Bed,
  Sun,
  ShieldCheck,
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
import { SleepFormModal } from './SleepFormModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { getPastDaysList, formatDateDisplay, getRelativeDateLabel } from '../../utils/dateUtils';

export const SleepView = () => {
  const { sleepLogs, addSleepLog, deleteSleepLog, todaySleep } = useFitness();
  const { currentUser } = useAuth();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const sleepGoal = currentUser?.sleepGoal || 8.0;

  // 7-day chart data
  const pastDays = getPastDaysList(7);
  const chartData = pastDays.map((d) => {
    const log = sleepLogs.find((s) => s.date === d.dateStr);
    return {
      name: d.dayName,
      date: d.formatted,
      hours: log ? log.durationHours : 7.2,
      score: log ? log.score : 80,
      quality: log ? log.quality : 'Good',
    };
  });

  const totalWeeklyHours = chartData.reduce((sum, item) => sum + item.hours, 0);
  const avgWeeklySleep = (totalWeeklyHours / chartData.length).toFixed(1);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <MoonStar className="w-7 h-7 text-violet-500" />
            Sleep & Recovery Monitoring
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track resting duration, nocturnal recovery, and circadian consistency.
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-sm shadow-md shadow-violet-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Record Sleep
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Last Night's Sleep</span>
            <MoonStar className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {todaySleep?.durationHours || 7.75} <span className="text-xs font-normal text-slate-400">hrs</span>
          </p>
          <span className="text-[11px] text-emerald-500 font-medium">Optimal target achieved</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Sleep Quality Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {todaySleep?.score || 92} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </p>
          <span className="text-[11px] text-emerald-500 font-medium">
            Rating: {todaySleep?.quality || 'Excellent'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>7-Day Average</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {avgWeeklySleep} <span className="text-xs font-normal text-slate-400">hrs/night</span>
          </p>
          <span className="text-[11px] text-sky-500 font-medium">Within healthy 7-9h window</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>Sleep Routine</span>
            <Bed className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-base font-extrabold text-slate-900 dark:text-white truncate">
            {todaySleep?.bedtime || '23:15'} → {todaySleep?.wakeTime || '07:00'}
          </p>
          <span className="text-[11px] text-amber-500 font-medium">Regular circadian rhythm</span>
        </div>
      </div>

      {/* 7-Day Sleep Trends Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-violet-500" />
              7-Day Sleep Duration Trends
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hours slept per night with target line ({sleepGoal} hrs)
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
                domain={[0, 12]}
                stroke="currentColor"
                className="text-xs text-slate-400 dark:text-slate-500 font-medium"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}h`}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700 text-xs space-y-1">
                        <p className="font-bold text-slate-300">{item.date || label}</p>
                        <p className="text-violet-400 font-medium">🌙 Duration: {item.hours} hours</p>
                        <p className="text-emerald-400 font-medium">✨ Recovery Score: {item.score}/100 ({item.quality})</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={sleepGoal} stroke="#8b5cf6" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: `Goal (${sleepGoal}h)`, fill: '#8b5cf6', fontSize: 10, position: 'right' }} />
              <Bar dataKey="hours" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sleep History & Sleep Hygiene Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sleep History */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Recent Sleep Logs
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {sleepLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {getRelativeDateLabel(log.date)}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        log.quality === 'Excellent'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : log.quality === 'Good'
                          ? 'bg-sky-500/10 text-sky-500 border border-sky-500/20'
                          : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      }`}
                    >
                      {log.quality} (Score: {log.score})
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                    <span>
                      Bed: <strong>{log.bedtime}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Wake: <strong>{log.wakeTime}</strong>
                    </span>
                  </p>

                  {log.notes && (
                    <p className="text-[11px] text-slate-400 italic mt-1">
                      "{log.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {log.durationHours}
                    </span>
                    <span className="text-xs text-slate-400 block font-normal">hours</span>
                  </div>

                  <button
                    onClick={() => setDeleteConfirmId(log.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Science-backed sleep hygiene tips */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Recovery & Sleep Hygiene Protocols
            </h3>

            <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Morning Sunlight:</strong> Get 10–15 minutes of natural sunlight within 30 minutes of waking to anchor your circadian clock.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Bed className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Cool Bedroom Temperature:</strong> Optimal deep slow-wave sleep occurs in a cool bedroom (approx 18–20°C / 65–68°F).
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Caffeine Cutoff:</strong> Stop caffeine 8–10 hours before bed to ensure adenosine receptors are free for deep sleep onset.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p>
                  <strong>Muscle Recovery:</strong> Human Growth Hormone (HGH) peaks during Stage 3 deep sleep, repairing muscular microtears from strength workouts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Sleep Modal */}
      <SleepFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={addSleepLog}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          if (deleteConfirmId) deleteSleepLog(deleteConfirmId);
        }}
        title="Delete Sleep Record"
        message="Are you sure you want to remove this sleep session record?"
      />
    </div>
  );
};

