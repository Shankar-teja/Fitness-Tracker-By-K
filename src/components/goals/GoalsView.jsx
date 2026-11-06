import React, { useState } from 'react';
import { useFitness } from '../../context/FitnessContext';
import {
  Target,
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  Edit2,
  Trash2,
  Award,
  Zap,
} from 'lucide-react';
import { GoalFormModal } from './GoalFormModal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const GoalsView = () => {
  const { goals, addGoal, updateGoal, deleteGoal, toggleGoalCompleted } = useFitness();

  const [filterCategory, setFilterCategory] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const completedCount = goals.filter((g) => g.isCompleted).length;
  const totalCount = goals.length;
  const overallRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredGoals = goals.filter(
    (g) => filterCategory === 'All' || g.category === filterCategory
  );

  const handleOpenAdd = () => {
    setEditingGoal(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (goal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingGoal) {
      updateGoal(editingGoal.id, data);
    } else {
      addGoal(data);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Target className="w-7 h-7 text-brand-500" />
            Fitness Goals & Milestones
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Set ambitious targets, track your ongoing momentum, and achieve your peak physique.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold text-sm shadow-md shadow-brand-500/20 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Create New Goal
        </button>
      </div>

      {/* Progress Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-wider text-brand-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Goal Completion Rate
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              {completedCount} of {totalCount} Goals Achieved
            </h2>
            <p className="text-xs text-slate-300">
              Stay persistent. Consistent execution turns ambitious goals into standard reality.
            </p>
          </div>

          <div className="w-full md:w-64 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Progress</span>
              <span className="text-brand-400 font-bold">{overallRate}%</span>
            </div>
            <div className="w-full bg-slate-700/60 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-700"
                style={{ width: `${overallRate}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Weight', 'Activity', 'Workout', 'Water', 'Sleep'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterCategory === cat
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat} Goals
          </button>
        ))}
      </div>

      {/* Goals Grid */}
      {filteredGoals.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
          <Target className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
            No goals found
          </h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
            Create a fitness goal to begin tracking your achievements.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl shadow transition-all"
          >
            Add Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGoals.map((g) => {
            const rawPct =
              g.targetValue !== 0
                ? Math.round((g.currentValue / g.targetValue) * 100)
                : 0;
            const pct = Math.min(100, Math.max(0, rawPct));

            return (
              <div
                key={g.id}
                className={`p-5 rounded-2xl border shadow-sm transition-all flex flex-col justify-between ${
                  g.isCompleted
                    ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {g.category}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEdit(g)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        title="Edit goal"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(g.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-500 transition-colors"
                        title="Delete goal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleGoalCompleted(g.id)}
                      className="text-emerald-500 mt-0.5 shrink-0"
                      title={g.isCompleted ? 'Mark as In Progress' : 'Mark as Completed'}
                    >
                      {g.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white dark:text-slate-900" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-emerald-500 transition-colors" />
                      )}
                    </button>

                    <div>
                      <h3
                        className={`text-base font-bold ${
                          g.isCompleted
                            ? 'line-through text-slate-400 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {g.title}
                      </h3>
                      {g.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {g.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {g.currentValue} / {g.targetValue} {g.unit}
                    </span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">
                      {pct}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        g.isCompleted ? 'bg-emerald-500' : 'bg-brand-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Deadline: {g.deadline}
                    </span>
                    {g.isCompleted && (
                      <span className="text-emerald-500 font-bold">Completed 🎉</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Goal Form Modal */}
      <GoalFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingGoal}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          if (deleteConfirmId) deleteGoal(deleteConfirmId);
        }}
        title="Delete Fitness Goal"
        message="Are you sure you want to permanently remove this fitness goal?"
      />
    </div>
  );
};

