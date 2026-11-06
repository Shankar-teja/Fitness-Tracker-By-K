import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';
import { getPastDaysList } from '../../utils/dateUtils';
import { Scale } from 'lucide-react';

export const CalorieBalanceChart = () => {
  const { meals, workouts, activityLogs } = useFitness();
  const { currentUser } = useAuth();
  const pastDays = getPastDaysList(7);

  const budget = currentUser?.calorieBudget || 2150;

  const chartData = pastDays.map((d) => {
    // Calories In (Meals)
    const dayMeals = meals.filter((m) => m.date === d.dateStr);
    const caloriesIn = dayMeals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);

    // Calories Out (Workouts + Active step calories)
    const dayWorkouts = workouts.filter((w) => w.date === d.dateStr);
    const workoutBurn = dayWorkouts.reduce(
      (sum, w) => sum + (Number(w.caloriesBurned) || 0),
      0
    );
    const act = activityLogs.find((a) => a.date === d.dateStr);
    const stepBurn = act?.caloriesBurned || 400;
    const baseMetabolic = 1750; // approximate resting BMR

    const totalBurned = baseMetabolic + workoutBurn + stepBurn;

    return {
      name: d.dayName,
      date: d.formatted,
      caloriesIn: caloriesIn || (d.dayName === 'Today' ? 1730 : 2050),
      caloriesOut: totalBurned,
      budget,
    };
  });

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Energy Balance (Calories In vs Out)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Nutrition intake compared to total daily expenditure
          </p>
        </div>
        <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
          <Scale className="w-5 h-5" />
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
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
                  const cin = payload.find((p) => p.dataKey === 'caloriesIn')?.value || 0;
                  const cout = payload.find((p) => p.dataKey === 'caloriesOut')?.value || 0;
                  const diff = cin - cout;

                  return (
                    <div className="p-3 bg-slate-900/95 text-white dark:bg-slate-800/95 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
                      <p className="font-bold text-slate-300">{payload[0]?.payload?.date || label}</p>
                      <p className="text-cyan-400 font-medium">🥗 Intake: {cin} kcal</p>
                      <p className="text-violet-400 font-medium">⚡ Burned: {cout} kcal</p>
                      <div className="pt-1 border-t border-slate-700 text-[11px]">
                        Net Balance:{' '}
                        <span className={`font-bold ${diff <= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {diff > 0 ? `+${diff}` : diff} kcal ({diff <= 0 ? 'Deficit' : 'Surplus'})
                        </span>
                      </div>
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
            <Area
              type="monotone"
              dataKey="caloriesIn"
              name="Calories Consumed"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorIn)"
            />
            <Area
              type="monotone"
              dataKey="caloriesOut"
              name="Total Burned"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorOut)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

