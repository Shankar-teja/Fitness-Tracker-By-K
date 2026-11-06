import React, { useState, useMemo } from 'react';
import { useFitness } from '../../context/FitnessContext';
import { useAuth } from '../../context/AuthContext';
import {
  UtensilsCrossed,
  Plus,
  BookOpen,
  Edit2,
  Trash2,
  Flame,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
  Sun,
  Moon,
  Apple,
  Zap,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import { MealFormModal } from './MealFormModal';
import { QuickFoodModal } from './QuickFoodModal';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { getTodayDateString, formatDateDisplay } from '../../utils/dateUtils';

const MEAL_CATEGORIES = [
  { name: 'Breakfast', icon: Coffee, desc: 'Morning fuel & kickstart' },
  { name: 'Lunch', icon: Sun, desc: 'Midday sustained energy' },
  { name: 'Dinner', icon: Moon, desc: 'Evening recovery & protein' },
  { name: 'Snack', icon: Apple, desc: 'Pre/post workout boosts' },
];

export const NutritionView = () => {
  const { meals, addMeal, updateMeal, deleteMeal } = useFitness();
  const { currentUser } = useAuth();

  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [defaultCategory, setDefaultCategory] = useState('Lunch');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Targets from user profile
  const calorieBudget = currentUser?.calorieBudget || 2150;
  const proteinGoal = currentUser?.proteinGoal || 140;
  const carbsGoal = currentUser?.carbsGoal || 210;
  const fatGoal = currentUser?.fatGoal || 65;

  // Filter meals for the selected date
  const dayMeals = useMemo(() => {
    return meals.filter((m) => m.date === selectedDate);
  }, [meals, selectedDate]);

  // Macro totals for this day
  const dayTotals = useMemo(() => {
    return dayMeals.reduce(
      (acc, m) => ({
        calories: acc.calories + (Number(m.calories) || 0),
        protein: acc.protein + (Number(m.protein) || 0),
        carbs: acc.carbs + (Number(m.carbs) || 0),
        fat: acc.fat + (Number(m.fat) || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [dayMeals]);

  const caloriesRemaining = calorieBudget - dayTotals.calories;

  // Macro percentages calculation
  const totalMacroGrams = dayTotals.protein + dayTotals.carbs + dayTotals.fat;
  const proteinPct = totalMacroGrams > 0 ? Math.round((dayTotals.protein / totalMacroGrams) * 100) : 30;
  const carbsPct = totalMacroGrams > 0 ? Math.round((dayTotals.carbs / totalMacroGrams) * 100) : 45;
  const fatPct = totalMacroGrams > 0 ? Math.max(0, 100 - proteinPct - carbsPct) : 25;

  // Date Navigation handlers
  const handlePrevDay = () => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    setSelectedDate(getTodayDateString());
  };

  // Add / Edit actions
  const handleOpenAddForCategory = (cat) => {
    setEditingMeal(null);
    setDefaultCategory(cat);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (meal) => {
    setEditingMeal(meal);
    setDefaultCategory(meal.category);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingMeal) {
      updateMeal(editingMeal.id, formData);
    } else {
      addMeal(formData);
    }
  };

  const handleSelectPreset = (food) => {
    addMeal({
      name: food.name,
      category: food.category,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      serving: food.serving,
      date: selectedDate,
    });
  };

  const isToday = selectedDate === getTodayDateString();

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
              <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
            </div>
            Diet & Nutrition Journal
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track daily calories, macronutrient balance, and scheduled meals.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setIsPresetsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-brand-500" />
            Food Presets
          </button>
          <button
            onClick={() => handleOpenAddForCategory('Breakfast')}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Log Meal
          </button>
        </div>
      </div>

      {/* Date Navigation Bar (Balanced 3-part layout) */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <button
          onClick={handlePrevDay}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors"
          aria-label="Previous day"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-2.5">
          <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
            {formatDateDisplay(selectedDate)}
          </span>
          {!isToday ? (
            <button
              onClick={handleToday}
              className="text-xs px-2.5 py-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold hover:bg-brand-500/20 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Today
            </button>
          ) : (
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Today
            </span>
          )}
        </div>

        <button
          onClick={handleNextDay}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors"
          aria-label="Next day"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Daily Macro Dashboard (4 Equal & Aligned Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Calories Budget
              </span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Flame className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {dayTotals.calories}
              </span>
              <span className="text-xs font-medium text-slate-400">/ {calorieBudget} kcal</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  caloriesRemaining < 0 ? 'bg-rose-500' : 'bg-brand-500'
                }`}
                style={{
                  width: `${Math.min(100, Math.round((dayTotals.calories / calorieBudget) * 100))}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-500">
                {caloriesRemaining >= 0
                  ? `${caloriesRemaining} kcal left`
                  : `${Math.abs(caloriesRemaining)} kcal over`}
              </span>
              <span className={`font-bold ${caloriesRemaining >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {Math.round((dayTotals.calories / calorieBudget) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Protein Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Protein Intake
              </span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Zap className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {dayTotals.protein}
              </span>
              <span className="text-xs font-medium text-slate-400">/ {proteinGoal}g</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((dayTotals.protein / proteinGoal) * 100))}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-500">
                {Math.max(0, proteinGoal - dayTotals.protein)}g remaining
              </span>
              <span className="font-bold text-emerald-500">
                {Math.round((dayTotals.protein / proteinGoal) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Carbs Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Carbohydrates
              </span>
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {dayTotals.carbs}
              </span>
              <span className="text-xs font-medium text-slate-400">/ {carbsGoal}g</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((dayTotals.carbs / carbsGoal) * 100))}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-500">
                {Math.max(0, carbsGoal - dayTotals.carbs)}g remaining
              </span>
              <span className="font-bold text-cyan-500">
                {Math.round((dayTotals.carbs / carbsGoal) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Fats Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Healthy Fats
              </span>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Apple className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {dayTotals.fat}
              </span>
              <span className="text-xs font-medium text-slate-400">/ {fatGoal}g</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((dayTotals.fat / fatGoal) * 100))}%`,
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-500">
                {Math.max(0, fatGoal - dayTotals.fat)}g remaining
              </span>
              <span className="font-bold text-amber-500">
                {Math.round((dayTotals.fat / fatGoal) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Macronutrient Distribution Ratio Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Daily Macro Ratio:
          </span>
          <span className="text-xs text-slate-400">
            ({totalMacroGrams}g total consumed)
          </span>
        </div>

        <div className="flex-1 max-w-md mx-auto sm:mx-0 w-full space-y-1.5">
          <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
            <div
              style={{ width: `${proteinPct}%` }}
              className="bg-emerald-500 h-full transition-all duration-500"
              title={`Protein: ${proteinPct}%`}
            />
            <div
              style={{ width: `${carbsPct}%` }}
              className="bg-cyan-500 h-full transition-all duration-500"
              title={`Carbs: ${carbsPct}%`}
            />
            <div
              style={{ width: `${fatPct}%` }}
              className="bg-amber-500 h-full transition-all duration-500"
              title={`Fats: ${fatPct}%`}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Protein ({proteinPct}%)
            </span>
            <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              Carbs ({carbsPct}%)
            </span>
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Fats ({fatPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Meal Category Sections (Organized in a balanced 2x2 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MEAL_CATEGORIES.map((catObj) => {
          const category = catObj.name;
          const CatIcon = catObj.icon;
          const catMeals = dayMeals.filter((m) => m.category === category);
          const catCalories = catMeals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);
          const catProtein = catMeals.reduce((sum, m) => sum + (Number(m.protein) || 0), 0);
          const catCarbs = catMeals.reduce((sum, m) => sum + (Number(m.carbs) || 0), 0);
          const catFat = catMeals.reduce((sum, m) => sum + (Number(m.fat) || 0), 0);

          return (
            <div
              key={category}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                      <CatIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {category}
                      </h3>
                      <p className="text-[11px] text-slate-400">{catObj.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 tabular-nums">
                      {catCalories} kcal
                    </span>
                    <button
                      onClick={() => handleOpenAddForCategory(category)}
                      className="p-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors"
                      title={`Add item to ${category}`}
                      aria-label={`Add item to ${category}`}
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>

                {/* Items in this category */}
                {catMeals.length === 0 ? (
                  <div className="py-8 text-center flex flex-col items-center justify-center">
                    <p className="text-xs text-slate-400 mb-2">
                      No foods logged for {category.toLowerCase()} yet.
                    </p>
                    <button
                      onClick={() => handleOpenAddForCategory(category)}
                      className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Log {category}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {catMeals.map((meal) => (
                      <div
                        key={meal.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/80 border border-slate-100 dark:border-slate-800 transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                              {meal.name}
                            </p>
                            {meal.serving && (
                              <span className="text-[11px] text-slate-400 truncate">
                                ({meal.serving})
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                            {meal.time && (
                              <span className="flex items-center gap-0.5 text-slate-400">
                                <Clock className="w-3 h-3" /> {meal.time}
                              </span>
                            )}
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                              {meal.protein}g P
                            </span>
                            <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                              {meal.carbs}g C
                            </span>
                            <span className="text-amber-600 dark:text-amber-400 font-medium">
                              {meal.fat}g F
                            </span>
                          </div>
                        </div>

                        {/* Right: Calories + Edit/Delete actions */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                            {meal.calories}{' '}
                            <span className="text-[10px] font-normal text-slate-400">kcal</span>
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEdit(meal)}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                              title="Edit food"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(meal.id)}
                              className="p-1 rounded-md text-slate-400 hover:text-rose-500 transition-colors"
                              title="Delete food"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Subtotal Footer */}
              {catMeals.length > 0 && (
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                  <span>
                    Subtotal: <strong className="text-slate-800 dark:text-slate-200">{catProtein}g</strong> P •{' '}
                    <strong className="text-slate-800 dark:text-slate-200">{catCarbs}g</strong> C •{' '}
                    <strong className="text-slate-800 dark:text-slate-200">{catFat}g</strong> F
                  </span>
                  <span className="font-semibold text-brand-600 dark:text-brand-400">
                    {Math.round((catCalories / calorieBudget) * 100)}% of daily budget
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add / Edit Meal Modal */}
      <MealFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingMeal}
        defaultCategory={defaultCategory}
      />

      {/* Food Presets Library Modal */}
      <QuickFoodModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectFood={handleSelectPreset}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          if (deleteConfirmId) deleteMeal(deleteConfirmId);
        }}
        title="Remove Meal Item"
        message="Are you sure you want to remove this food item from your daily nutrition journal?"
        confirmText="Remove"
      />
    </div>
  );
};
