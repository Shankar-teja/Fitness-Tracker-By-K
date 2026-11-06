import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { getTodayDateString, getCurrentTimeString } from '../../utils/dateUtils';

export const WorkoutFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const isEditing = !!initialData;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Strength');
  const [duration, setDuration] = useState('45');
  const [caloriesBurned, setCaloriesBurned] = useState('320');
  const [intensity, setIntensity] = useState('Medium');
  const [setsReps, setSetsReps] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(getTodayDateString());
  const [time, setTime] = useState(getCurrentTimeString());

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || 'Strength');
      setDuration(initialData.duration?.toString() || '45');
      setCaloriesBurned(initialData.caloriesBurned?.toString() || '320');
      setIntensity(initialData.intensity || 'Medium');
      setSetsReps(initialData.setsReps || '');
      setNotes(initialData.notes || '');
      setDate(initialData.date || getTodayDateString());
      setTime(initialData.time || getCurrentTimeString());
    } else {
      setTitle('');
      setCategory('Strength');
      setDuration('45');
      setCaloriesBurned('320');
      setIntensity('Medium');
      setSetsReps('');
      setNotes('');
      setDate(getTodayDateString());
      setTime(getCurrentTimeString());
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      category,
      duration: Number(duration) || 30,
      caloriesBurned: Number(caloriesBurned) || 200,
      intensity,
      setsReps,
      notes,
      date,
      time,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Workout Session' : 'Log New Workout'}
      subtitle={isEditing ? 'Update workout metrics and details' : 'Record your workout to update your daily stats'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Workout Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Workout Title / Exercise
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Barbell Squats & Leg Press / Morning 5k"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {/* Category & Intensity */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="Strength">Strength Training</option>
              <option value="Cardio">Cardio</option>
              <option value="HIIT">HIIT</option>
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Yoga">Yoga & Mobility</option>
              <option value="Walking">Walking</option>
              <option value="Swimming">Swimming</option>
              <option value="Other">Other Sports</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Intensity
            </label>
            <select
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="Low">Low (Zone 1-2)</option>
              <option value="Medium">Medium (Zone 3)</option>
              <option value="High">High (Zone 4-5)</option>
            </select>
          </div>
        </div>

        {/* Duration & Calories */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Calories Burned (kcal)
            </label>
            <input
              type="number"
              min="0"
              required
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
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

        {/* Sets, Reps or Distance */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Sets, Reps, Weights, or Distance (Optional)
          </label>
          <input
            type="text"
            value={setsReps}
            onChange={(e) => setSetsReps(e.target.value)}
            placeholder="e.g. 4 sets x 10 reps @ 80kg or 5.2 km distance"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Workout Notes & Observations
          </label>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did you feel? Any personal records?"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
          />
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
            {isEditing ? 'Save Changes' : 'Log Workout'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

