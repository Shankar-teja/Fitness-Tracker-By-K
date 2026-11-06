import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';

export const GoalFormModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const isEditing = !!initialData;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Weight');
  const [currentValue, setCurrentValue] = useState('74');
  const [targetValue, setTargetValue] = useState('70');
  const [unit, setUnit] = useState('kg');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || 'Weight');
      setCurrentValue(initialData.currentValue?.toString() || '0');
      setTargetValue(initialData.targetValue?.toString() || '100');
      setUnit(initialData.unit || 'kg');
      setDeadline(initialData.deadline || 'Daily');
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setCategory('Weight');
      setCurrentValue('74');
      setTargetValue('70');
      setUnit('kg');
      setDeadline('2026-12-31');
      setDescription('');
    }
  }, [initialData, isOpen]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    if (newCat === 'Weight') setUnit('kg');
    else if (newCat === 'Activity') setUnit('steps');
    else if (newCat === 'Workout') setUnit('workouts');
    else if (newCat === 'Water') setUnit('ml');
    else if (newCat === 'Sleep') setUnit('hours');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      category,
      currentValue: Number(currentValue) || 0,
      targetValue: Number(targetValue) || 100,
      unit,
      deadline,
      description,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Fitness Goal' : 'Create New Goal'}
      subtitle={isEditing ? 'Update milestone metrics' : 'Set a target milestone to stay accountable'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Goal Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Reach 70.0 kg Body Weight"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="Weight">Body Weight</option>
              <option value="Activity">Daily Activity / Steps</option>
              <option value="Workout">Workout Frequency</option>
              <option value="Water">Hydration Intake</option>
              <option value="Sleep">Sleep Duration</option>
              <option value="Custom">Custom Milestone</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Measurement Unit
            </label>
            <input
              type="text"
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. kg, steps, workouts"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Value
            </label>
            <input
              type="number"
              step="any"
              required
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Value
            </label>
            <input
              type="number"
              step="any"
              required
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Deadline / Frequency
          </label>
          <input
            type="text"
            required
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="e.g. 2026-12-31, Daily, Weekly"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Action Plan / Description
          </label>
          <textarea
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Strategy to achieve this goal..."
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-600/25 transition-all"
          >
            {isEditing ? 'Save Changes' : 'Create Goal'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

