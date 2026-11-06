import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';
import { Utensils } from 'lucide-react';

const COLORS = ['#10b981', '#06b6d4', '#f59e0b']; // Protein (emerald), Carbs (cyan), Fat (amber)

export const MacroDonutChart = () => {
  const { todayNutrition } = useFitness();
  const { currentUser } = useAuth();

  const proteinGoal = currentUser?.proteinGoal || 140;
  const carbsGoal = currentUser?.carbsGoal || 210;
  const fatGoal = currentUser?.fatGoal || 65;

  const data = [
    { name: 'Protein', value: todayNutrition.protein || 85, unit: 'g', goal: proteinGoal, color: '#10b981' },
    { name: 'Carbs', value: todayNutrition.carbs || 170, unit: 'g', goal: carbsGoal, color: '#06b6d4' },
    { name: 'Fats', value: todayNutrition.fat || 45, unit: 'g', goal: fatGoal, color: '#f59e0b' },
  ];

  const totalGrams = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Macronutrient Breakdown
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Today's Protein, Carbs, and Fats intake
          </p>
        </div>
        <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
          <Utensils className="w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4 py-2">
        {/* Pie Chart */}
        <div className="h-44 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    const pct = totalGrams > 0 ? Math.round((item.value / totalGrams) * 100) : 0;
                    return (
                      <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700 text-xs">
                        <p className="font-bold" style={{ color: item.color }}>{item.name}</p>
                        <p>{item.value}g ({pct}% of total)</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={data}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {todayNutrition.calories || 1730}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              kcal
            </span>
          </div>
        </div>

        {/* Legend & Progress Bars */}
        <div className="space-y-3">
          {data.map((macro) => {
            const pct = Math.min(100, Math.round((macro.value / macro.goal) * 100));
            return (
              <div key={macro.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: macro.color }} />
                    <span>{macro.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    <strong className="text-slate-900 dark:text-white">{macro.value}g</strong> / {macro.goal}g
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: macro.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

