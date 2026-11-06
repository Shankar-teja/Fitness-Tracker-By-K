import React, { useState, useMemo } from 'react';
import { useFitness } from '../../context/FitnessContext';
import {
  Dumbbell,
  Plus,
  Search,
  Filter,
  Flame,
  Clock,
  Calendar,
  Edit2,
  Trash2,
  Trophy,
  Activity,
  Layers,
} from 'lucide-react';
import { WorkoutFormModal } from './WorkoutFormModal';
import { WorkoutPresets } from './WorkoutPresets';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatDateDisplay, getRelativeDateLabel } from '../../utils/dateUtils';

const CATEGORIES = [
  'All',
  'Strength',
  'Cardio',
  'HIIT',
  'Running',
  'Cycling',
  'Yoga',
  'Walking',
  'Swimming',
  'Other',
];

export const WorkoutsView = () => {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useFitness();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIntensity, setSelectedIntensity] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Summary statistics
  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, w) => sum + (Number(w.caloriesBurned) || 0), 0);
  const totalMinutes = workouts.reduce((sum, w) => sum + (Number(w.duration) || 0), 0);
  const avgDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0;

  // Filtered & sorted workouts
  const filteredWorkouts = useMemo(() => {
    return workouts
      .filter((w) => {
        const matchesSearch =
          w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          w.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (w.notes && w.notes.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCat =
          selectedCategory === 'All' || w.category === selectedCategory;

        const matchesIntensity =
          selectedIntensity === 'All' || w.intensity === selectedIntensity;

        return matchesSearch && matchesCat && matchesIntensity;
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'calories-desc') return b.caloriesBurned - a.caloriesBurned;
        if (sortBy === 'duration-desc') return b.duration - a.duration;
        return 0;
      });
  }, [workouts, searchQuery, selectedCategory, selectedIntensity, sortBy]);

  const handleOpenAdd = () => {
    setEditingWorkout(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (workout) => {
    setEditingWorkout(workout);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingWorkout) {
      updateWorkout(editingWorkout.id, formData);
    } else {
      addWorkout(formData);
    }
  };

  const handleSelectPreset = (preset) => {
    addWorkout({
      title: preset.title,
      category: preset.category,
      duration: preset.duration,
      caloriesBurned: preset.caloriesBurned,
      intensity: preset.intensity,
      notes: preset.description,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Dumbbell className="w-7 h-7 text-brand-500" />
            Workout Tracker & History
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Log exercises, track progressive overload, and monitor your personal records.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm shadow-md shadow-brand-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Log Workout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">
            <span>Total Sessions</span>
            <Activity className="w-4 h-4 text-brand-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalWorkouts}
          </p>
          <span className="text-[11px] text-emerald-500 font-medium">Logged in database</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">
            <span>Calories Burned</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalCalories.toLocaleString()} <span className="text-xs font-normal text-slate-400">kcal</span>
          </p>
          <span className="text-[11px] text-amber-500 font-medium">Total active energy</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">
            <span>Time Exercised</span>
            <Clock className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
          </p>
          <span className="text-[11px] text-sky-500 font-medium">{totalMinutes} total minutes</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold mb-2">
            <span>Avg Session</span>
            <Trophy className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {avgDuration} <span className="text-xs font-normal text-slate-400">mins</span>
          </p>
          <span className="text-[11px] text-violet-500 font-medium">Consistent pacing</span>
        </div>
      </div>

      {/* Preset Workout Templates */}
      <WorkoutPresets onSelectPreset={handleSelectPreset} />

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search workouts, exercises, or notes..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          {/* Intensity & Sort */}
          <div className="flex items-center gap-2">
            <select
              value={selectedIntensity}
              onChange={(e) => setSelectedIntensity(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="All">All Intensities</option>
              <option value="Low">Low Intensity</option>
              <option value="Medium">Medium Intensity</option>
              <option value="High">High Intensity</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="calories-desc">Highest Calories</option>
              <option value="duration-desc">Longest Duration</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Workout History List */}
      {filteredWorkouts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <Dumbbell className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
            No workouts found
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search criteria or log a new workout session.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl shadow transition-all"
          >
            Log Workout
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
                      {workout.category}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        workout.intensity === 'High'
                          ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                          : workout.intensity === 'Medium'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}
                    >
                      {workout.intensity} Intensity
                    </span>
                  </div>

                  {/* Actions (Edit / Delete) */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(workout)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit Workout"
                      aria-label="Edit Workout"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(workout.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                      title="Delete Workout"
                      aria-label="Delete Workout"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {workout.title}
                </h3>

                {workout.setsReps && (
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-brand-500" />
                    {workout.setsReps}
                  </p>
                )}

                {workout.notes && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-2 line-clamp-2">
                    "{workout.notes}"
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {workout.duration} mins
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <Flame className="w-3.5 h-3.5" />
                    {workout.caloriesBurned} kcal
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{getRelativeDateLabel(workout.date)}</span>
                  {workout.time && <span>• {workout.time}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Workout Modal */}
      <WorkoutFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingWorkout}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          if (deleteConfirmId) deleteWorkout(deleteConfirmId);
        }}
        title="Delete Workout"
        message="Are you sure you want to permanently delete this workout session? It will be removed from your activity records."
        confirmText="Delete Workout"
      />
    </div>
  );
};

