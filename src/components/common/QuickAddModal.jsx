import React, { useState } from 'react';
import { Modal } from './Modal';
import { useFitness } from '../../context/FitnessContext';
import { Dumbbell, UtensilsCrossed, Droplets, MoonStar, Footprints } from 'lucide-react';
import { getTodayDateString, getCurrentTimeString } from '../../utils/dateUtils';

export const QuickAddModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('workout'); // 'workout', 'meal', 'water', 'sleep', 'steps'
  const { addWorkout, addMeal, addWater, addSleepLog, updateTodaySteps, todayActivity } = useFitness();

  // Workout state
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [workoutCategory, setWorkoutCategory] = useState('Strength');
  const [workoutDuration, setWorkoutDuration] = useState('30');
  const [workoutCalories, setWorkoutCalories] = useState('220');
  const [workoutIntensity, setWorkoutIntensity] = useState('Medium');

  // Meal state
  const [mealName, setMealName] = useState('');
  const [mealCategory, setMealCategory] = useState('Lunch');
  const [mealCalories, setMealCalories] = useState('450');
  const [mealProtein, setMealProtein] = useState('30');
  const [mealCarbs, setMealCarbs] = useState('45');
  const [mealFat, setMealFat] = useState('12');

  // Water state
  const [waterCustom, setWaterCustom] = useState('250');

  // Sleep state
  const [sleepBedtime, setSleepBedtime] = useState('23:00');
  const [sleepWakeTime, setSleepWakeTime] = useState('07:00');
  const [sleepDuration, setSleepDuration] = useState('8.0');
  const [sleepQuality, setSleepQuality] = useState('Good');

  // Steps state
  const [stepInput, setStepInput] = useState(todayActivity?.steps?.toString() || '8000');

  const handleWorkoutSubmit = (e) => {
    e.preventDefault();
    if (!workoutTitle.trim()) return;
    addWorkout({
      title: workoutTitle,
      category: workoutCategory,
      duration: Number(workoutDuration) || 30,
      caloriesBurned: Number(workoutCalories) || 200,
      intensity: workoutIntensity,
      date: getTodayDateString(),
      time: getCurrentTimeString(),
    });
    setWorkoutTitle('');
    onClose();
  };

  const handleMealSubmit = (e) => {
    e.preventDefault();
    if (!mealName.trim()) return;
    addMeal({
      name: mealName,
      category: mealCategory,
      calories: Number(mealCalories) || 300,
      protein: Number(mealProtein) || 0,
      carbs: Number(mealCarbs) || 0,
      fat: Number(mealFat) || 0,
      date: getTodayDateString(),
      time: getCurrentTimeString(),
    });
    setMealName('');
    onClose();
  };

  const handleWaterSubmit = (amount) => {
    addWater(Number(amount) || 250);
    onClose();
  };

  const handleSleepSubmit = (e) => {
    e.preventDefault();
    addSleepLog({
      date: getTodayDateString(),
      bedtime: sleepBedtime,
      wakeTime: sleepWakeTime,
      durationHours: Number(sleepDuration) || 7.5,
      quality: sleepQuality,
    });
    onClose();
  };

  const handleStepSubmit = (e) => {
    e.preventDefault();
    const count = Number(stepInput) || 0;
    updateTodaySteps(count);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Log Entry" subtitle="Quickly record your daily fitness activities">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('workout')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'workout'
              ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Dumbbell className="w-3.5 h-3.5" />
          Workout
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('meal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'meal'
              ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          Meal
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('water')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'water'
              ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Droplets className="w-3.5 h-3.5" />
          Water
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sleep')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'sleep'
              ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MoonStar className="w-3.5 h-3.5" />
          Sleep
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('steps')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'steps'
              ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Footprints className="w-3.5 h-3.5" />
          Steps
        </button>
      </div>

      {/* Tab: Workout */}
      {activeTab === 'workout' && (
        <form onSubmit={handleWorkoutSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Workout Name
            </label>
            <input
              type="text"
              required
              value={workoutTitle}
              onChange={(e) => setWorkoutTitle(e.target.value)}
              placeholder="e.g. Chest & Triceps / 5km Run"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={workoutCategory}
                onChange={(e) => setWorkoutCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="HIIT">HIIT</option>
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Yoga">Yoga</option>
                <option value="Walking">Walking</option>
                <option value="Swimming">Swimming</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Intensity
              </label>
              <select
                value={workoutIntensity}
                onChange={(e) => setWorkoutIntensity(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                required
                value={workoutDuration}
                onChange={(e) => setWorkoutDuration(e.target.value)}
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
                value={workoutCalories}
                onChange={(e) => setWorkoutCalories(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-brand-600/25 transition-all mt-2"
          >
            Save Workout
          </button>
        </form>
      )}

      {/* Tab: Meal */}
      {activeTab === 'meal' && (
        <form onSubmit={handleMealSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Food / Meal Name
            </label>
            <input
              type="text"
              required
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="e.g. Grilled Chicken Salad"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Meal Category
              </label>
              <select
                value={mealCategory}
                onChange={(e) => setMealCategory(e.target.value)}
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
                Calories (kcal)
              </label>
              <input
                type="number"
                min="0"
                required
                value={mealCalories}
                onChange={(e) => setMealCalories(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Protein (g)
              </label>
              <input
                type="number"
                min="0"
                value={mealProtein}
                onChange={(e) => setMealProtein(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Carbs (g)
              </label>
              <input
                type="number"
                min="0"
                value={mealCarbs}
                onChange={(e) => setMealCarbs(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Fat (g)
              </label>
              <input
                type="number"
                min="0"
                value={mealFat}
                onChange={(e) => setMealFat(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-brand-600/25 transition-all mt-2"
          >
            Log Meal
          </button>
        </form>
      )}

      {/* Tab: Water */}
      {activeTab === 'water' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select a quick portion to log instant hydration, or enter a custom amount:
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleWaterSubmit(250)}
              className="p-3 rounded-xl border border-cyan-500/30 hover:border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
            >
              <Droplets className="w-5 h-5 text-cyan-500" />
              <span>+250 ml</span>
              <span className="text-[10px] font-normal text-slate-500">Cup</span>
            </button>
            <button
              type="button"
              onClick={() => handleWaterSubmit(500)}
              className="p-3 rounded-xl border border-cyan-500/30 hover:border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
            >
              <Droplets className="w-5 h-5 text-cyan-500" />
              <span>+500 ml</span>
              <span className="text-[10px] font-normal text-slate-500">Bottle</span>
            </button>
            <button
              type="button"
              onClick={() => handleWaterSubmit(750)}
              className="p-3 rounded-xl border border-cyan-500/30 hover:border-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
            >
              <Droplets className="w-5 h-5 text-cyan-500" />
              <span>+750 ml</span>
              <span className="text-[10px] font-normal text-slate-500">Flask</span>
            </button>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Custom Amount (ml)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="50"
                step="50"
                value={waterCustom}
                onChange={(e) => setWaterCustom(e.target.value)}
                className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleWaterSubmit(waterCustom)}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Sleep */}
      {activeTab === 'sleep' && (
        <form onSubmit={handleSleepSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Bedtime
              </label>
              <input
                type="time"
                value={sleepBedtime}
                onChange={(e) => setSleepBedtime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Wake Time
              </label>
              <input
                type="time"
                value={sleepWakeTime}
                onChange={(e) => setSleepWakeTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Duration (hours)
              </label>
              <input
                type="number"
                step="0.25"
                min="1"
                max="24"
                value={sleepDuration}
                onChange={(e) => setSleepDuration(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sleep Quality
              </label>
              <select
                value={sleepQuality}
                onChange={(e) => setSleepQuality(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:outline-none"
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-violet-600/25 transition-all mt-2"
          >
            Record Sleep
          </button>
        </form>
      )}

      {/* Tab: Steps */}
      {activeTab === 'steps' && (
        <form onSubmit={handleStepSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Today's Step Count
            </label>
            <input
              type="number"
              min="0"
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">
            Estimated distance: <strong>{(Number(stepInput) * 0.00075).toFixed(2)} km</strong> • Burned: <strong>{Math.round(Number(stepInput) * 0.045)} kcal</strong>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-amber-600/25 transition-all mt-2"
          >
            Update Steps
          </button>
        </form>
      )}
    </Modal>
  );
};

