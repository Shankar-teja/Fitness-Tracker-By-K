import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { getTodayDateString, getCurrentTimeString } from '../utils/dateUtils';
import {
  generateSampleWorkouts,
  generateSampleMeals,
  generateSampleWaterLogs,
  generateSampleSleepLogs,
  generateSampleActivityLogs,
  generateSampleWeightLogs,
  INITIAL_GOALS,
} from '../utils/sampleData';

const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  const todayStr = getTodayDateString();

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1. Workouts State
  const [workouts, setWorkouts] = useState(() => {
    const saved = getStorageItem('pulsefit_workouts', null);
    if (saved && Array.isArray(saved)) return saved;
    const initial = generateSampleWorkouts(todayStr);
    setStorageItem('pulsefit_workouts', initial);
    return initial;
  });

  // 2. Meals State
  const [meals, setMeals] = useState(() => {
    const saved = getStorageItem('pulsefit_meals', null);
    if (saved && Array.isArray(saved)) return saved;
    const initial = generateSampleMeals(todayStr);
    setStorageItem('pulsefit_meals', initial);
    return initial;
  });

  // 3. Water Logs State
  const [waterLogs, setWaterLogs] = useState(() => {
    const saved = getStorageItem('pulsefit_water', null);
    if (saved && Array.isArray(saved)) return saved;
    const initial = generateSampleWaterLogs(todayStr);
    setStorageItem('pulsefit_water', initial);
    return initial;
  });

  // 4. Sleep Logs State
  const [sleepLogs, setSleepLogs] = useState(() => {
    const saved = getStorageItem('pulsefit_sleep', null);
    if (saved && Array.isArray(saved)) return saved;
    const initial = generateSampleSleepLogs(todayStr);
    setStorageItem('pulsefit_sleep', initial);
    return initial;
  });

  // 5. Activity Logs State (Steps, Distance, Active Minutes)
  const [activityLogs, setActivityLogs] = useState(() => {
    const saved = getStorageItem('pulsefit_activity', null);
    if (saved && Array.isArray(saved)) return saved;
    const initial = generateSampleActivityLogs(todayStr);
    setStorageItem('pulsefit_activity', initial);
    return initial;
  });

  // 6. Weight Logs State
  const [weightLogs, setWeightLogs] = useState(() => {
    const saved = getStorageItem('pulsefit_weight', null);
    if (saved && Array.isArray(saved)) return saved;
    const initial = generateSampleWeightLogs(todayStr);
    setStorageItem('pulsefit_weight', initial);
    return initial;
  });

  // 7. Goals State
  const [goals, setGoals] = useState(() => {
    const saved = getStorageItem('pulsefit_goals', null);
    if (saved && Array.isArray(saved)) return saved;
    setStorageItem('pulsefit_goals', INITIAL_GOALS);
    return INITIAL_GOALS;
  });

  // Save changes to localStorage whenever state changes
  useEffect(() => {
    setStorageItem('pulsefit_workouts', workouts);
  }, [workouts]);

  useEffect(() => {
    setStorageItem('pulsefit_meals', meals);
  }, [meals]);

  useEffect(() => {
    setStorageItem('pulsefit_water', waterLogs);
  }, [waterLogs]);

  useEffect(() => {
    setStorageItem('pulsefit_sleep', sleepLogs);
  }, [sleepLogs]);

  useEffect(() => {
    setStorageItem('pulsefit_activity', activityLogs);
  }, [activityLogs]);

  useEffect(() => {
    setStorageItem('pulsefit_weight', weightLogs);
  }, [weightLogs]);

  useEffect(() => {
    setStorageItem('pulsefit_goals', goals);
  }, [goals]);

  // WORKOUT CRUD
  const addWorkout = (workoutData) => {
    const newWorkout = {
      ...workoutData,
      id: 'w_' + Date.now(),
      date: workoutData.date || todayStr,
      time: workoutData.time || getCurrentTimeString(),
      duration: Number(workoutData.duration) || 30,
      caloriesBurned: Number(workoutData.caloriesBurned) || 200,
    };
    setWorkouts((prev) => [newWorkout, ...prev]);
    addToast(`Workout "${newWorkout.title}" added successfully!`);
    return newWorkout;
  };

  const updateWorkout = (id, updatedData) => {
    setWorkouts((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              ...updatedData,
              duration: Number(updatedData.duration ?? w.duration),
              caloriesBurned: Number(updatedData.caloriesBurned ?? w.caloriesBurned),
            }
          : w
      )
    );
    addToast('Workout updated successfully!');
  };

  const deleteWorkout = (id) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
    addToast('Workout removed.', 'info');
  };

  // NUTRITION / MEAL CRUD
  const addMeal = (mealData) => {
    const newMeal = {
      ...mealData,
      id: 'm_' + Date.now(),
      date: mealData.date || todayStr,
      time: mealData.time || getCurrentTimeString(),
      calories: Number(mealData.calories) || 0,
      protein: Number(mealData.protein) || 0,
      carbs: Number(mealData.carbs) || 0,
      fat: Number(mealData.fat) || 0,
    };
    setMeals((prev) => [newMeal, ...prev]);
    addToast(`Meal "${newMeal.name}" logged!`);
    return newMeal;
  };

  const updateMeal = (id, updatedData) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              ...updatedData,
              calories: Number(updatedData.calories ?? m.calories),
              protein: Number(updatedData.protein ?? m.protein),
              carbs: Number(updatedData.carbs ?? m.carbs),
              fat: Number(updatedData.fat ?? m.fat),
            }
          : m
      )
    );
    addToast('Meal updated successfully!');
  };

  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
    addToast('Meal removed from log.', 'info');
  };

  // WATER CRUD
  const addWater = (amountMl, container = 'cup') => {
    const newEntry = {
      id: 'wtr_' + Date.now(),
      date: todayStr,
      amount: Number(amountMl),
      time: getCurrentTimeString(),
      container,
    };
    setWaterLogs((prev) => [newEntry, ...prev]);
    addToast(`Logged +${amountMl} ml of water!`);
  };

  const removeWaterLog = (id) => {
    setWaterLogs((prev) => prev.filter((item) => item.id !== id));
    addToast('Water entry removed.', 'info');
  };

  const resetTodayWater = () => {
    setWaterLogs((prev) => prev.filter((w) => w.date !== todayStr));
    addToast('Today\'s water tracker reset.', 'info');
  };

  // SLEEP CRUD
  const addSleepLog = (sleepData) => {
    const duration = Number(sleepData.durationHours) || 7.5;
    const newSleep = {
      ...sleepData,
      id: 'slp_' + Date.now(),
      date: sleepData.date || todayStr,
      durationHours: duration,
      quality: sleepData.quality || 'Good',
      score: sleepData.score || Math.round(duration * 10 + (sleepData.quality === 'Excellent' ? 15 : 5)),
    };
    // Replace if an entry for the date already exists or prepend
    setSleepLogs((prev) => {
      const filtered = prev.filter((s) => s.date !== newSleep.date);
      return [newSleep, ...filtered];
    });
    addToast('Sleep session recorded!');
    return newSleep;
  };

  const deleteSleepLog = (id) => {
    setSleepLogs((prev) => prev.filter((s) => s.id !== id));
    addToast('Sleep entry deleted.', 'info');
  };

  // ACTIVITY / STEPS
  const updateTodaySteps = (stepsCount, customDistance, customCalories, customMinutes) => {
    const steps = Math.max(0, Number(stepsCount));
    const distanceKm = customDistance !== undefined ? Number(customDistance) : Number((steps * 0.00075).toFixed(2));
    const calories = customCalories !== undefined ? Number(customCalories) : Math.round(steps * 0.045);
    const activeMinutes = customMinutes !== undefined ? Number(customMinutes) : Math.round(steps / 115);

    setActivityLogs((prev) => {
      const existingIndex = prev.findIndex((a) => a.date === todayStr);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          steps,
          distanceKm,
          caloriesBurned: calories,
          activeMinutes,
        };
        return updated;
      } else {
        return [
          {
            date: todayStr,
            steps,
            distanceKm,
            caloriesBurned: calories,
            activeMinutes,
          },
          ...prev,
        ];
      }
    });
    addToast('Daily activity updated!');
  };

  // WEIGHT LOG CRUD
  const addWeightLog = (weightVal, notes = '') => {
    const newLog = {
      id: 'wt_' + Date.now(),
      date: todayStr,
      weight: Number(weightVal),
      notes,
    };
    setWeightLogs((prev) => {
      const filtered = prev.filter((l) => l.date !== todayStr);
      return [newLog, ...filtered];
    });
    addToast(`Logged weight: ${weightVal} kg`);
  };

  const deleteWeightLog = (id) => {
    setWeightLogs((prev) => prev.filter((l) => l.id !== id));
    addToast('Weight log deleted.', 'info');
  };

  // GOALS CRUD
  const addGoal = (goalData) => {
    const newGoal = {
      ...goalData,
      id: 'g_' + Date.now(),
      currentValue: Number(goalData.currentValue) || 0,
      targetValue: Number(goalData.targetValue) || 100,
      isCompleted: false,
    };
    setGoals((prev) => [newGoal, ...prev]);
    addToast(`Goal "${newGoal.title}" created!`);
  };

  const updateGoal = (id, updatedData) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updatedData } : g))
    );
    addToast('Goal updated!');
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    addToast('Goal deleted.', 'info');
  };

  const toggleGoalCompleted = (id) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isCompleted: !g.isCompleted } : g))
    );
  };

  // Reset to initial sample data
  const resetToSampleData = () => {
    const newWorkouts = generateSampleWorkouts(todayStr);
    const newMeals = generateSampleMeals(todayStr);
    const newWater = generateSampleWaterLogs(todayStr);
    const newSleep = generateSampleSleepLogs(todayStr);
    const newActivity = generateSampleActivityLogs(todayStr);
    const newWeight = generateSampleWeightLogs(todayStr);

    setWorkouts(newWorkouts);
    setMeals(newMeals);
    setWaterLogs(newWater);
    setSleepLogs(newSleep);
    setActivityLogs(newActivity);
    setWeightLogs(newWeight);
    setGoals(INITIAL_GOALS);

    setStorageItem('pulsefit_workouts', newWorkouts);
    setStorageItem('pulsefit_meals', newMeals);
    setStorageItem('pulsefit_water', newWater);
    setStorageItem('pulsefit_sleep', newSleep);
    setStorageItem('pulsefit_activity', newActivity);
    setStorageItem('pulsefit_weight', newWeight);
    setStorageItem('pulsefit_goals', INITIAL_GOALS);

    addToast('Reset to demo sample data completed!');
  };

  const clearAllData = () => {
    setWorkouts([]);
    setMeals([]);
    setWaterLogs([]);
    setSleepLogs([]);
    setActivityLogs([]);
    setWeightLogs([]);
    setGoals([]);

    setStorageItem('pulsefit_workouts', []);
    setStorageItem('pulsefit_meals', []);
    setStorageItem('pulsefit_water', []);
    setStorageItem('pulsefit_sleep', []);
    setStorageItem('pulsefit_activity', []);
    setStorageItem('pulsefit_weight', []);
    setStorageItem('pulsefit_goals', []);

    addToast('All tracker data cleared.', 'info');
  };

  // Derived values for Today
  const todayWaterTotal = useMemo(() => {
    return waterLogs
      .filter((w) => w.date === todayStr)
      .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [waterLogs, todayStr]);

  const todayMeals = useMemo(() => {
    return meals.filter((m) => m.date === todayStr);
  }, [meals, todayStr]);

  const todayNutrition = useMemo(() => {
    return todayMeals.reduce(
      (acc, item) => ({
        calories: acc.calories + (Number(item.calories) || 0),
        protein: acc.protein + (Number(item.protein) || 0),
        carbs: acc.carbs + (Number(item.carbs) || 0),
        fat: acc.fat + (Number(item.fat) || 0),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [todayMeals]);

  const todayWorkouts = useMemo(() => {
    return workouts.filter((w) => w.date === todayStr);
  }, [workouts, todayStr]);

  const todayWorkoutStats = useMemo(() => {
    return todayWorkouts.reduce(
      (acc, w) => ({
        caloriesBurned: acc.caloriesBurned + (Number(w.caloriesBurned) || 0),
        durationMinutes: acc.durationMinutes + (Number(w.duration) || 0),
        count: acc.count + 1,
      }),
      { caloriesBurned: 0, durationMinutes: 0, count: 0 }
    );
  }, [todayWorkouts]);

  const todayActivity = useMemo(() => {
    const act = activityLogs.find((a) => a.date === todayStr);
    return (
      act || {
        date: todayStr,
        steps: 8640,
        distanceKm: 6.4,
        activeMinutes: 48,
        caloriesBurned: 460,
      }
    );
  }, [activityLogs, todayStr]);

  const todaySleep = useMemo(() => {
    return sleepLogs.find((s) => s.date === todayStr) || sleepLogs[0] || null;
  }, [sleepLogs, todayStr]);

  return (
    <FitnessContext.Provider
      value={{
        workouts,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        meals,
        addMeal,
        updateMeal,
        deleteMeal,
        waterLogs,
        addWater,
        removeWaterLog,
        resetTodayWater,
        todayWaterTotal,
        sleepLogs,
        addSleepLog,
        deleteSleepLog,
        todaySleep,
        activityLogs,
        updateTodaySteps,
        todayActivity,
        weightLogs,
        addWeightLog,
        deleteWeightLog,
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        toggleGoalCompleted,
        todayMeals,
        todayNutrition,
        todayWorkouts,
        todayWorkoutStats,
        resetToSampleData,
        clearAllData,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};

