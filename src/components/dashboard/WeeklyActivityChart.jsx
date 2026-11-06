import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useFitness } from '../../context/FitnessContext';
import { getPastDaysList } from '../../utils/dateUtils';
import { TrendingUp } from 'lucide-react';

export const WeeklyActivityChart = () => {
  const { activityLogs, workouts } = useFitness();
  const pastDays = getPastDaysList(7);

  // Merge activity logs & workouts into 7-day data
  const chartData = pastDays.map((d) => {
    const act = activityLogs.find((a) => a.date === d.dateStr);
    const dayWorkouts = workouts.filter((w) => w.date === d.dateStr);
    const workoutBurn = dayWorkouts.reduce(
      (sum, w) => sum + (Number(w.caloriesBurned) || 0),
      0
    );

    return {
      name: d.dayName,
      date: d.formatted,
      steps: act?.steps || 0,
      calories: (act?.caloriesBurned || 0) + workoutBurn,
    };
  });

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Weekly Activity & Steps
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Daily step count & total active calories burned (past 7 days)
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+8.4% vs last week</span>
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
              yAxisId="left"
              stroke="currentColor"
              className="text-xs text-slate-400 dark:text-slate-500 font-medium"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="currentColor"
              className="text-xs text-slate-400 dark:text-slate-500 font-medium"
              tickLine={false}
              axisLine={false}
              hide
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-3 bg-slate-900/95 text-white dark:bg-slate-800/95 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
                      <p className="font-bold text-slate-300">{payload[0]?.payload?.date || label}</p>
                      <p className="text-emerald-400 font-medium">
                        👟 Steps: {payload[0]?.value?.toLocaleString()}
                      </p>
                      <p className="text-amber-400 font-medium">
                        🔥 Calories: {payload[1]?.value?.toLocaleString()} kcal
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }}
            />
            <Bar
              yAxisId="left"
              dataKey="steps"
              name="Steps"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              yAxisId="right"
              dataKey="calories"
              name="Burned (kcal)"
              fill="#f59e0b"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

