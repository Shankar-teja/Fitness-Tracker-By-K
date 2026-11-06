import React from 'react';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';
import {
  Footprints,
  Flame,
  UtensilsCrossed,
  Droplets,
  MoonStar,
  Timer,
  Zap,
} from 'lucide-react';
import { StatCard } from './StatCard';
import { QuoteBanner } from './QuoteBanner';
import { WeeklyActivityChart } from './WeeklyActivityChart';
import { CalorieBalanceChart } from './CalorieBalanceChart';
import { MacroDonutChart } from './MacroDonutChart';
import { WaterSleepWidget } from './WaterSleepWidget';
import { RecentWorkoutsWidget } from './RecentWorkoutsWidget';
import { TodayGoalsWidget } from './TodayGoalsWidget';

export const DashboardView = ({ onOpenQuickAdd }) => {
  const {
    todayActivity,
    todayWorkoutStats,
    todayNutrition,
    todayWaterTotal,
    todaySleep,
  } = useFitness();
  const { currentUser } = useAuth();

  const stepGoal = currentUser?.stepGoal || 10000;
  const calorieBudget = currentUser?.calorieBudget || 2150;
  const waterGoal = currentUser?.waterGoal || 2800;
  const sleepGoal = currentUser?.sleepGoal || 8.0;

  // Calculations
  const currentSteps = todayActivity?.steps || 8640;
  const stepPercent = (currentSteps / stepGoal) * 100;

  const totalCaloriesBurned = (todayActivity?.caloriesBurned || 460) + todayWorkoutStats.caloriesBurned;
  const burnTarget = 650;
  const burnPercent = (totalCaloriesBurned / burnTarget) * 100;

  const caloriesConsumed = todayNutrition.calories || 1730;
  const caloriesRemaining = calorieBudget - caloriesConsumed;
  const nutritionPercent = (caloriesConsumed / calorieBudget) * 100;

  const waterPercent = (todayWaterTotal / waterGoal) * 100;

  const sleepHours = todaySleep?.durationHours || 7.75;
  const sleepPercent = (sleepHours / sleepGoal) * 100;

  const activeMinutes = (todayActivity?.activeMinutes || 48) + todayWorkoutStats.durationMinutes;
  const activeMinutesGoal = 60;
  const activePercent = (activeMinutes / activeMinutesGoal) * 100;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Welcome back, {currentUser?.name?.split(' ')[0] || 'Athlete'}!
            <span className="inline-block animate-bounce">⚡</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Here's a comprehensive breakdown of your daily fitness and wellness vitals.
          </p>
        </div>

        {/* Streak & Consistency Pill */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs shadow-sm">
            <Zap className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span>14 Day Streak!</span>
          </div>
          <button
            onClick={onOpenQuickAdd}
            className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-brand-500/20 transition-all active:scale-95"
          >
            + Quick Log
          </button>
        </div>
      </div>

      {/* Motivational Banner */}
      <QuoteBanner />

      {/* Stat Cards Grid (6 core vitals) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        <StatCard
          title="Daily Steps"
          value={currentSteps.toLocaleString()}
          unit="steps"
          target={stepGoal.toLocaleString()}
          icon={Footprints}
          iconBg="bg-emerald-500/10 text-emerald-500"
          progressPercent={stepPercent}
          progressBarColor="bg-emerald-500"
          changeText="86%"
          changePositive={true}
        />

        <StatCard
          title="Active Burn"
          value={totalCaloriesBurned}
          unit="kcal"
          target={burnTarget}
          icon={Flame}
          iconBg="bg-amber-500/10 text-amber-500"
          progressPercent={burnPercent}
          progressBarColor="bg-amber-500"
          changeText="+12%"
          changePositive={true}
        />

        <StatCard
          title="Calories Budget"
          value={caloriesRemaining > 0 ? caloriesRemaining : 0}
          unit="left"
          target={`${caloriesConsumed}/${calorieBudget}`}
          targetLabel="Used"
          icon={UtensilsCrossed}
          iconBg="bg-sky-500/10 text-sky-500"
          progressPercent={nutritionPercent}
          progressBarColor={caloriesRemaining < 0 ? 'bg-rose-500' : 'bg-sky-500'}
          changeText={caloriesRemaining < 0 ? 'Exceeded' : 'On Track'}
          changePositive={caloriesRemaining >= 0}
        />

        <StatCard
          title="Water Intake"
          value={todayWaterTotal}
          unit="ml"
          target={waterGoal}
          icon={Droplets}
          iconBg="bg-cyan-500/10 text-cyan-500"
          progressPercent={waterPercent}
          progressBarColor="bg-cyan-500"
          changeText={`${Math.round(waterPercent)}%`}
          changePositive={true}
        />

        <StatCard
          title="Sleep Recovery"
          value={sleepHours}
          unit="hrs"
          target={sleepGoal}
          icon={MoonStar}
          iconBg="bg-violet-500/10 text-violet-500"
          progressPercent={sleepPercent}
          progressBarColor="bg-violet-500"
          changeText={todaySleep?.quality || 'Good'}
          changePositive={true}
        />

        <StatCard
          title="Active Minutes"
          value={activeMinutes}
          unit="mins"
          target={activeMinutesGoal}
          icon={Timer}
          iconBg="bg-rose-500/10 text-rose-500"
          progressPercent={activePercent}
          progressBarColor="bg-rose-500"
          changeText={`${Math.round(activePercent)}%`}
          changePositive={true}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyActivityChart />
        <CalorieBalanceChart />
      </div>

      {/* Nutrition Breakdown & Hydration/Sleep Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MacroDonutChart />
        <WaterSleepWidget />
      </div>

      {/* Recent Workouts & Goals Checklist Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentWorkoutsWidget />
        <TodayGoalsWidget />
      </div>
    </div>
  );
};

