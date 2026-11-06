import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Dumbbell, UtensilsCrossed, Droplets, Plus, MoreHorizontal } from 'lucide-react';

export const MobileNav = ({ onOpenQuickAdd, onToggleMore }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-colors ${
            isActive
              ? 'text-brand-600 dark:text-brand-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px]">Home</span>
      </NavLink>

      <NavLink
        to="/workouts"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-colors ${
            isActive
              ? 'text-brand-600 dark:text-brand-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`
        }
      >
        <Dumbbell className="w-5 h-5" />
        <span className="text-[10px]">Workouts</span>
      </NavLink>

      {/* Floating Center Action Button */}
      <button
        onClick={onOpenQuickAdd}
        className="-mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-brand-600 to-emerald-400 text-white flex items-center justify-center shadow-lg shadow-brand-500/40 hover:scale-105 active:scale-95 transition-transform"
        aria-label="Quick Add"
      >
        <Plus className="w-6 h-6 stroke-[3]" />
      </button>

      <NavLink
        to="/nutrition"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-colors ${
            isActive
              ? 'text-brand-600 dark:text-brand-400 font-semibold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`
        }
      >
        <UtensilsCrossed className="w-5 h-5" />
        <span className="text-[10px]">Nutrition</span>
      </NavLink>

      <button
        onClick={onToggleMore}
        className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <MoreHorizontal className="w-5 h-5" />
        <span className="text-[10px]">Menu</span>
      </button>
    </nav>
  );
};

