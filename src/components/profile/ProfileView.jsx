import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFitness } from '../../context/FitnessContext';
import {
  User,
  Settings,
  RotateCcw,
  Download,
  Trash2,
  CheckCircle2,
  Shield,
  Activity,
  Award,
  Sparkles,
} from 'lucide-react';
import { ConfirmDialog } from '../common/ConfirmDialog';

const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
];

export const ProfileView = () => {
  const { currentUser, updateProfile } = useAuth();
  const { resetToSampleData, clearAllData, addToast } = useFitness();

  const [name, setName] = useState(currentUser?.name || 'Alex Rivera');
  const [email, setEmail] = useState(currentUser?.email || 'alex.rivera@pulsefit.app');
  const [gender, setGender] = useState(currentUser?.gender || 'male');
  const [age, setAge] = useState(currentUser?.age?.toString() || '28');
  const [height, setHeight] = useState(currentUser?.height?.toString() || '178');
  const [weight, setWeight] = useState(currentUser?.weight?.toString() || '74.2');
  const [targetWeight, setTargetWeight] = useState(currentUser?.targetWeight?.toString() || '70.0');
  const [stepGoal, setStepGoal] = useState(currentUser?.stepGoal?.toString() || '10000');
  const [waterGoal, setWaterGoal] = useState(currentUser?.waterGoal?.toString() || '2800');
  const [calorieBudget, setCalorieBudget] = useState(currentUser?.calorieBudget?.toString() || '2150');
  const [proteinGoal, setProteinGoal] = useState(currentUser?.proteinGoal?.toString() || '140');
  const [avatar, setAvatar] = useState(currentUser?.avatar || AVATAR_OPTIONS[0]);

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      gender,
      age: Number(age) || 25,
      height: Number(height) || 175,
      weight: Number(weight) || 70,
      targetWeight: Number(targetWeight) || 68,
      stepGoal: Number(stepGoal) || 10000,
      waterGoal: Number(waterGoal) || 2800,
      calorieBudget: Number(calorieBudget) || 2000,
      proteinGoal: Number(proteinGoal) || 130,
      avatar,
    });
    addToast('Profile preferences updated!');
  };

  const handleExportData = () => {
    try {
      const data = {
        exportedAt: new Date().toISOString(),
        user: currentUser,
        workouts: JSON.parse(localStorage.getItem('pulsefit_workouts') || '[]'),
        meals: JSON.parse(localStorage.getItem('pulsefit_meals') || '[]'),
        waterLogs: JSON.parse(localStorage.getItem('pulsefit_water') || '[]'),
        sleepLogs: JSON.parse(localStorage.getItem('pulsefit_sleep') || '[]'),
        activityLogs: JSON.parse(localStorage.getItem('pulsefit_activity') || '[]'),
        weightLogs: JSON.parse(localStorage.getItem('pulsefit_weight') || '[]'),
        goals: JSON.parse(localStorage.getItem('pulsefit_goals') || '[]'),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pulsefit_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      addToast('Tracker data exported to JSON file!');
    } catch {
      addToast('Failed to export data.', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-brand-500" />
          Profile & Account Preferences
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal biometrics, daily fitness targets, and local data storage.
        </p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-brand-500" />
            Personal Information & Avatar
          </h3>

          {/* Avatar Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Choose Avatar
            </label>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {AVATAR_OPTIONS.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Avatar option ${idx + 1}`}
                  onClick={() => setAvatar(imgUrl)}
                  className={`w-14 h-14 rounded-2xl object-cover cursor-pointer ring-offset-2 dark:ring-offset-slate-900 transition-all ${
                    avatar === imgUrl
                      ? 'ring-4 ring-brand-500 scale-105'
                      : 'opacity-70 hover:opacity-100 ring-1 ring-slate-300 dark:ring-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Age
              </label>
              <input
                type="number"
                min="12"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                min="100"
                max="250"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="30"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="30"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Daily Targets Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Daily Targets & Budgets
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Steps Goal
              </label>
              <input
                type="number"
                min="1000"
                step="500"
                value={stepGoal}
                onChange={(e) => setStepGoal(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Daily Water (ml)
              </label>
              <input
                type="number"
                min="500"
                step="100"
                value={waterGoal}
                onChange={(e) => setWaterGoal(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Calorie Budget (kcal)
              </label>
              <input
                type="number"
                min="1000"
                step="50"
                value={calorieBudget}
                onChange={(e) => setCalorieBudget(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Protein Goal (g)
              </label>
              <input
                type="number"
                min="30"
                step="5"
                value={proteinGoal}
                onChange={(e) => setProteinGoal(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/25 transition-all"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      </form>

      {/* Data Management & Storage Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-500" />
            Data Storage & Backup (LocalStorage)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Your fitness data is stored locally and securely in your browser's localStorage. No external database or network calls are needed.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4 text-sky-500" />
            Export Data as JSON
          </button>

          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restore Demo Sample Data
          </button>

          <button
            type="button"
            onClick={() => setConfirmClearOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors ml-auto"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </button>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmDialog
        isOpen={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        onConfirm={resetToSampleData}
        title="Restore Demo Sample Data"
        message="This will reload the initial rich demo datasets for workouts, meals, water, sleep, and activity. Continue?"
        confirmText="Reset to Sample"
        confirmVariant="primary"
      />

      <ConfirmDialog
        isOpen={confirmClearOpen}
        onClose={() => setConfirmClearOpen(false)}
        onConfirm={clearAllData}
        title="Clear All Fitness Data"
        message="Are you sure you want to delete all logged workouts, meals, hydration, and sleep logs? This cannot be undone unless you have an exported JSON backup."
        confirmText="Clear Everything"
        confirmVariant="danger"
      />
    </div>
  );
};

