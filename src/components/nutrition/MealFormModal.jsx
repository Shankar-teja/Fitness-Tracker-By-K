import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { getTodayDateString, getCurrentTimeString } from '../../utils/dateUtils';

export const MealFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  defaultCategory = 'Lunch',
}) => {
  const isEditing = !!initialData;

  const [name, setName] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [calories, setCalories] = useState('450');
  const [protein, setProtein] = useState('32');
  const [carbs, setCarbs] = useState('45');
  const [fat, setFat] = useState('12');
  const [serving, setServing] = useState('1 serving (250g)');
  const [date, setDate] = useState(getTodayDateString());
  const [time, setTime] = useState(getCurrentTimeString());

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setCategory(initialData.category || defaultCategory);
      setCalories(initialData.calories?.toString() || '0');
      setProtein(initialData.protein?.toString() || '0');
      setCarbs(initialData.carbs?.toString() || '0');
      setFat(initialData.fat?.toString() || '0');
      setServing(initialData.serving || '');
      setDate(initialData.date || getTodayDateString());
      setTime(initialData.time || getCurrentTimeString());
    } else {
      setName('');
      setCategory(defaultCategory);
      setCalories('450');
      setProtein('30');
      setCarbs('45');
      setFat('12');
      setServing('1 serving');
      setDate(getTodayDateString());
      setTime(getCurrentTimeString());
    }
  }, [initialData, isOpen, defaultCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSubmit({
      name,
      category,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      serving,
      date,
      time,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Meal Entry' : 'Log Food & Nutrition'}
      subtitle={isEditing ? 'Update nutritional values and portion' : 'Track your calories and macros accurately'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Food Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Food / Dish Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Grilled Chicken Breast with Brown Rice"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {/* Category & Serving */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Meal Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Portion / Serving Size
            </label>
            <input
              type="text"
              value={serving}
              onChange={(e) => setServing(e.target.value)}
              placeholder="e.g. 1 bowl, 200g, 1 scoop"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Calories & Macros */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Calories (kcal)
          </label>
          <input
            type="number"
            min="0"
            required
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none font-bold text-slate-900 dark:text-emerald-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
              Protein (g)
            </label>
            <input
              type="number"
              min="0"
              required
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1">
              Carbs (g)
            </label>
            <input
              type="number"
              min="0"
              required
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
              Fats (g)
            </label>
            <input
              type="number"
              min="0"
              required
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/25 transition-all"
          >
            {isEditing ? 'Save Changes' : 'Log Food'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

