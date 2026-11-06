import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  UtensilsCrossed,
  Droplets,
  MoonStar,
  Footprints,
  Calculator,
  Target,
  TrendingUp,
  User,
  HeartPulse,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/workouts', label: 'Workouts', icon: Dumbbell },
  { path: '/nutrition', label: 'Diet & Nutrition', icon: UtensilsCrossed },
  { path: '/water', label: 'Water Intake', icon: Droplets },
  { path: '/sleep', label: 'Sleep Monitoring', icon: MoonStar },
  { path: '/activity', label: 'Daily Activity', icon: Footprints },
  { path: '/calculator', label: 'BMI & Health Calc', icon: Calculator },
  { path: '/goals', label: 'Fitness Goals', icon: Target },
  { path: '/analytics', label: 'Progress Analytics', icon: TrendingUp },
  { path: '/profile', label: 'Profile & Settings', icon: User },
];

export const Sidebar = ({ mobileOpen, onCloseMobile }) => {
  const { todayWorkoutStats, todayWaterTotal } = useFitness();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between py-5 px-4 transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Mobile brand header (shown only when mobile sidebar is open) */}
          <div className="md:hidden flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">PulseFit</span>
            </div>
            <button
              onClick={onCloseMobile}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-medium px-2 py-1"
            >
              Close
            </button>
          </div>

          <div className="px-3 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Core Navigation
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => {
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? 'text-brand-600 dark:text-brand-400'
                            : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                        }`}
                      />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Mini Today Status Card */}
          <div className="mt-auto pt-6 px-1">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 shadow-inner">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <span>Today's Vitals</span>
                <span className="text-emerald-500 font-bold">Active</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Workouts:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {todayWorkoutStats.count} ({todayWorkoutStats.caloriesBurned} kcal)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hydration:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {todayWaterTotal} ml
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

