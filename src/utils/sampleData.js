// Initial seed and sample demo data

export const DEFAULT_USER = {
  id: 'usr_demo_01',
  name: 'Alex Rivera',
  email: 'alex.rivera@pulsefit.app',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  gender: 'male',
  age: 28,
  height: 178, // in cm
  weight: 74.2, // in kg
  targetWeight: 70.0,
  fitnessGoal: 'lose_weight', // 'lose_weight', 'maintain', 'gain_muscle'
  activityLevel: 'moderate',
  unitSystem: 'metric', // 'metric' (kg, cm) or 'imperial' (lbs, in)
  memberSince: '2026-01-15',
  stepGoal: 10000,
  waterGoal: 2800, // in ml
  sleepGoal: 8.0, // in hours
  calorieBudget: 2150,
  proteinGoal: 140, // in g
  carbsGoal: 210, // in g
  fatGoal: 65, // in g
};

export const INITIAL_PRESET_WORKOUTS = [
  {
    id: 'pw-1',
    title: 'High Intensity Interval Blast',
    category: 'HIIT',
    duration: 30,
    caloriesBurned: 340,
    intensity: 'High',
    description: '30s burpees, kettlebell swings, box jumps, mountain climbers with 15s rest.',
  },
  {
    id: 'pw-2',
    title: '5K Outdoor Tempo Run',
    category: 'Running',
    duration: 28,
    caloriesBurned: 310,
    intensity: 'High',
    description: 'Paced run at 5:36/km average tempo on paved trail.',
  },
  {
    id: 'pw-3',
    title: 'Upper Body Push & Pull',
    category: 'Strength',
    duration: 50,
    caloriesBurned: 380,
    intensity: 'Medium',
    description: 'Bench press, bent-over rows, overhead press, lat pull-downs, bicep curls.',
  },
  {
    id: 'pw-4',
    title: 'Lower Body Strength & Core',
    category: 'Strength',
    duration: 55,
    caloriesBurned: 420,
    intensity: 'High',
    description: 'Barbell squats, Romanian deadlifts, walking lunges, hanging leg raises.',
  },
  {
    id: 'pw-5',
    title: 'Vinyasa Flow Yoga',
    category: 'Yoga',
    duration: 40,
    caloriesBurned: 160,
    intensity: 'Low',
    description: 'Sun salutations, hip openers, warrior sequences, deep relaxation savasana.',
  },
  {
    id: 'pw-6',
    title: 'Hill Climber Cycling Session',
    category: 'Cycling',
    duration: 45,
    caloriesBurned: 410,
    intensity: 'High',
    description: 'Indoor spin bike intervals with high resistance hill climbs.',
  },
  {
    id: 'pw-7',
    title: 'Brisk Evening Walk',
    category: 'Walking',
    duration: 35,
    caloriesBurned: 145,
    intensity: 'Low',
    description: 'Low-impact zone 2 walking around the park.',
  },
  {
    id: 'pw-8',
    title: 'Freestyle Lap Swimming',
    category: 'Swimming',
    duration: 40,
    caloriesBurned: 390,
    intensity: 'Medium',
    description: '1,500m mixed freestyle and breaststroke laps with kickboard intervals.',
  }
];

export const INITIAL_FOOD_PRESETS = [
  { name: 'Rolled Oats with Berries & Honey', category: 'Breakfast', calories: 340, protein: 11, carbs: 62, fat: 5, serving: '1 bowl (80g)' },
  { name: 'Scrambled Eggs with Avocado & Sourdough', category: 'Breakfast', calories: 420, protein: 22, carbs: 32, fat: 22, serving: '2 eggs + 1 slice' },
  { name: 'Greek Yogurt with Granola & Chia Seeds', category: 'Breakfast', calories: 290, protein: 20, carbs: 35, fat: 7, serving: '200g yogurt' },
  { name: 'Grilled Chicken Breast with Brown Rice & Broccoli', category: 'Lunch', calories: 520, protein: 48, carbs: 54, fat: 9, serving: '200g chicken + 1 cup rice' },
  { name: 'Quinoa Bowl with Roasted Veggies & Chickpeas', category: 'Lunch', calories: 460, protein: 16, carbs: 68, fat: 12, serving: '1 large bowl' },
  { name: 'Tuna & Mixed Green Salad with Olive Oil', category: 'Lunch', calories: 380, protein: 34, carbs: 12, fat: 21, serving: '1 can tuna + dressing' },
  { name: 'Pan-Seared Atlantic Salmon with Sweet Potato', category: 'Dinner', calories: 580, protein: 42, carbs: 46, fat: 24, serving: '180g salmon fillet' },
  { name: 'Lean Beef Stir-Fry with Bell Peppers & Jasmine Rice', category: 'Dinner', calories: 610, protein: 44, carbs: 58, fat: 18, serving: '1 plate' },
  { name: 'Tofu & Vegetable Green Curry', category: 'Dinner', calories: 430, protein: 18, carbs: 36, fat: 23, serving: '1 bowl' },
  { name: 'Whey Protein Shake with Almond Milk', category: 'Snack', calories: 180, protein: 26, carbs: 5, fat: 3, serving: '1 scoop + 300ml milk' },
  { name: 'Apple Slices with Natural Peanut Butter', category: 'Snack', calories: 210, protein: 6, carbs: 24, fat: 12, serving: '1 medium apple + 2 tbsp' },
  { name: 'Handful of Raw Almonds & Walnuts', category: 'Snack', calories: 190, protein: 6, carbs: 7, fat: 17, serving: '30g' },
  { name: 'Cottage Cheese with Pineapple Chunks', category: 'Snack', calories: 170, protein: 18, carbs: 16, fat: 3, serving: '150g' }
];

export const generateSampleWorkouts = (todayStr) => {
  const d = new Date(todayStr + 'T00:00:00');
  
  const formatDateOffset = (daysAgo) => {
    const target = new Date(d);
    target.setDate(target.getDate() - daysAgo);
    return target.toISOString().split('T')[0];
  };

  return [
    {
      id: 'w-101',
      title: 'Morning HIIT & Core Ignition',
      category: 'HIIT',
      duration: 35,
      caloriesBurned: 380,
      intensity: 'High',
      date: formatDateOffset(0),
      time: '07:15',
      setsReps: '4 rounds, 45s work / 15s rest',
      notes: 'Crushed the burpees and kettlebell snatches. Great energy today!',
    },
    {
      id: 'w-102',
      title: 'Upper Body Hypertrophy (Chest & Arms)',
      category: 'Strength',
      duration: 55,
      caloriesBurned: 410,
      intensity: 'High',
      date: formatDateOffset(1),
      time: '18:00',
      setsReps: 'Bench 4x8 (80kg), Incline DB 3x10, Dips 3x12',
      notes: 'Pushed for progressive overload on the bench press. Solid form.',
    },
    {
      id: 'w-103',
      title: 'Evening Sunset 5K Run',
      category: 'Running',
      duration: 27,
      caloriesBurned: 320,
      intensity: 'Medium',
      date: formatDateOffset(2),
      time: '19:10',
      setsReps: '5.1 km @ 5:18 min/km pace',
      notes: 'Felt very smooth, breathing in sync, relaxed cadence.',
    },
    {
      id: 'w-104',
      title: 'Restorative Vinyasa Yoga Flow',
      category: 'Yoga',
      duration: 45,
      caloriesBurned: 180,
      intensity: 'Low',
      date: formatDateOffset(3),
      time: '08:00',
      setsReps: 'Full body mobility & spine decompression',
      notes: 'Focused on deep diaphragmatic breathing and hamstring flexibility.',
    },
    {
      id: 'w-105',
      title: 'Lower Body Leg Power Session',
      category: 'Strength',
      duration: 60,
      caloriesBurned: 460,
      intensity: 'High',
      date: formatDateOffset(4),
      time: '17:30',
      setsReps: 'Squats 5x5 (100kg), RDLs 4x10, Bulgarian Split Squats 3x10',
      notes: 'Heavy compound lifts. Quads and glutes are toasted.',
    },
    {
      id: 'w-106',
      title: 'Scenic Hill Climb Road Cycling',
      category: 'Cycling',
      duration: 50,
      caloriesBurned: 480,
      intensity: 'High',
      date: formatDateOffset(5),
      time: '09:30',
      setsReps: '18.4 km total distance, 210m elevation gain',
      notes: 'Good climbing effort. Heart rate peaked at 168 bpm.',
    },
    {
      id: 'w-107',
      title: 'Outdoor Park Walk & Mobility',
      category: 'Walking',
      duration: 40,
      caloriesBurned: 165,
      intensity: 'Low',
      date: formatDateOffset(6),
      time: '12:30',
      setsReps: '3.8 km brisk walk',
      notes: 'Active recovery day. Cleared mind and relaxed.',
    },
  ];
};

export const generateSampleMeals = (todayStr) => {
  const d = new Date(todayStr + 'T00:00:00');
  const formatDateOffset = (daysAgo) => {
    const target = new Date(d);
    target.setDate(target.getDate() - daysAgo);
    return target.toISOString().split('T')[0];
  };

  return [
    // Today's meals
    {
      id: 'm-1',
      name: 'Steel Cut Oats with Blueberries & Chia',
      category: 'Breakfast',
      calories: 360,
      protein: 12,
      carbs: 64,
      fat: 6,
      serving: '1 large bowl',
      date: formatDateOffset(0),
      time: '08:30',
    },
    {
      id: 'm-2',
      name: 'Grilled Herb Chicken Bowl with Quinoa',
      category: 'Lunch',
      calories: 550,
      protein: 48,
      carbs: 52,
      fat: 12,
      serving: '1 healthy bowl',
      date: formatDateOffset(0),
      time: '13:00',
    },
    {
      id: 'm-3',
      name: 'Whey Isolate Protein Shake & Banana',
      category: 'Snack',
      calories: 230,
      protein: 27,
      carbs: 28,
      fat: 2,
      serving: '1 shake + 1 fruit',
      date: formatDateOffset(0),
      time: '16:15',
    },
    {
      id: 'm-4',
      name: 'Baked Salmon with Steamed Asparagus & Sweet Potato',
      category: 'Dinner',
      calories: 590,
      protein: 44,
      carbs: 45,
      fat: 22,
      serving: '1 plate',
      date: formatDateOffset(0),
      time: '19:45',
    },
    // Yesterday's meals
    {
      id: 'm-5',
      name: 'Avocado Toast with 2 Poached Eggs',
      category: 'Breakfast',
      calories: 420,
      protein: 21,
      carbs: 34,
      fat: 22,
      serving: '2 slices',
      date: formatDateOffset(1),
      time: '08:15',
    },
    {
      id: 'm-6',
      name: 'Turkey Breast Wrap with Spinach & Hummus',
      category: 'Lunch',
      calories: 490,
      protein: 38,
      carbs: 48,
      fat: 14,
      serving: '1 whole wrap',
      date: formatDateOffset(1),
      time: '12:45',
    },
    {
      id: 'm-7',
      name: 'Almonds & Greek Yogurt',
      category: 'Snack',
      calories: 260,
      protein: 19,
      carbs: 18,
      fat: 11,
      serving: '1 cup',
      date: formatDateOffset(1),
      time: '16:30',
    },
    {
      id: 'm-8',
      name: 'Grass-Fed Sirloin Steak with Roasted Broccoli',
      category: 'Dinner',
      calories: 630,
      protein: 52,
      carbs: 22,
      fat: 28,
      serving: '220g steak',
      date: formatDateOffset(1),
      time: '20:00',
    },
  ];
};

export const generateSampleWaterLogs = (todayStr) => {
  const d = new Date(todayStr + 'T00:00:00');
  const formatDateOffset = (daysAgo) => {
    const target = new Date(d);
    target.setDate(target.getDate() - daysAgo);
    return target.toISOString().split('T')[0];
  };

  return [
    { id: 'wtr-today-1', date: formatDateOffset(0), amount: 500, time: '07:30', container: 'glass' },
    { id: 'wtr-today-2', date: formatDateOffset(0), amount: 750, time: '10:15', container: 'bottle' },
    { id: 'wtr-today-3', date: formatDateOffset(0), amount: 500, time: '13:20', container: 'glass' },
    { id: 'wtr-today-4', date: formatDateOffset(0), amount: 500, time: '16:45', container: 'bottle' },
    // Past days daily summaries for charts
    { id: 'wtr-hist-1', date: formatDateOffset(1), amount: 2800, time: '21:00', container: 'summary' },
    { id: 'wtr-hist-2', date: formatDateOffset(2), amount: 2500, time: '21:00', container: 'summary' },
    { id: 'wtr-hist-3', date: formatDateOffset(3), amount: 3100, time: '21:00', container: 'summary' },
    { id: 'wtr-hist-4', date: formatDateOffset(4), amount: 2750, time: '21:00', container: 'summary' },
    { id: 'wtr-hist-5', date: formatDateOffset(5), amount: 2900, time: '21:00', container: 'summary' },
    { id: 'wtr-hist-6', date: formatDateOffset(6), amount: 2600, time: '21:00', container: 'summary' },
  ];
};

export const generateSampleSleepLogs = (todayStr) => {
  const d = new Date(todayStr + 'T00:00:00');
  const formatDateOffset = (daysAgo) => {
    const target = new Date(d);
    target.setDate(target.getDate() - daysAgo);
    return target.toISOString().split('T')[0];
  };

  return [
    {
      id: 'slp-1',
      date: formatDateOffset(0),
      bedtime: '23:15',
      wakeTime: '07:00',
      durationHours: 7.75,
      quality: 'Excellent',
      score: 92,
      notes: 'Fell asleep quickly. Woke up feeling energized and clear-headed.',
    },
    {
      id: 'slp-2',
      date: formatDateOffset(1),
      bedtime: '23:45',
      wakeTime: '06:45',
      durationHours: 7.0,
      quality: 'Good',
      score: 84,
      notes: 'Slight restlessness around 4 AM, but overall solid rest.',
    },
    {
      id: 'slp-3',
      date: formatDateOffset(2),
      bedtime: '00:10',
      wakeTime: '07:15',
      durationHours: 7.1,
      quality: 'Good',
      score: 82,
      notes: 'Late night reading. Decent recovery according to resting HR.',
    },
    {
      id: 'slp-4',
      date: formatDateOffset(3),
      bedtime: '22:50',
      wakeTime: '06:50',
      durationHours: 8.0,
      quality: 'Excellent',
      score: 96,
      notes: 'Deep, uninterrupted sleep after a hard leg workout day.',
    },
    {
      id: 'slp-5',
      date: formatDateOffset(4),
      bedtime: '23:30',
      wakeTime: '06:30',
      durationHours: 7.0,
      quality: 'Fair',
      score: 75,
      notes: 'Room felt slightly warm. Woke up thirsty.',
    },
    {
      id: 'slp-6',
      date: formatDateOffset(5),
      bedtime: '23:00',
      wakeTime: '07:30',
      durationHours: 8.5,
      quality: 'Excellent',
      score: 95,
      notes: 'Weekend sleep in. Felt thoroughly recharged.',
    },
    {
      id: 'slp-7',
      date: formatDateOffset(6),
      bedtime: '23:40',
      wakeTime: '07:00',
      durationHours: 7.3,
      quality: 'Good',
      score: 86,
      notes: 'Consistent routine maintained.',
    },
  ];
};

export const generateSampleActivityLogs = (todayStr) => {
  const d = new Date(todayStr + 'T00:00:00');
  const formatDateOffset = (daysAgo) => {
    const target = new Date(d);
    target.setDate(target.getDate() - daysAgo);
    return target.toISOString().split('T')[0];
  };

  return [
    { date: formatDateOffset(0), steps: 8640, distanceKm: 6.4, activeMinutes: 48, caloriesBurned: 460 },
    { date: formatDateOffset(1), steps: 11250, distanceKm: 8.3, activeMinutes: 72, caloriesBurned: 580 },
    { date: formatDateOffset(2), steps: 10400, distanceKm: 7.8, activeMinutes: 65, caloriesBurned: 530 },
    { date: formatDateOffset(3), steps: 9100, distanceKm: 6.7, activeMinutes: 52, caloriesBurned: 440 },
    { date: formatDateOffset(4), steps: 12450, distanceKm: 9.2, activeMinutes: 80, caloriesBurned: 640 },
    { date: formatDateOffset(5), steps: 10800, distanceKm: 8.1, activeMinutes: 68, caloriesBurned: 550 },
    { date: formatDateOffset(6), steps: 7850, distanceKm: 5.8, activeMinutes: 40, caloriesBurned: 380 },
  ];
};

export const generateSampleWeightLogs = (todayStr) => {
  const d = new Date(todayStr + 'T00:00:00');
  const formatDateOffset = (daysAgo) => {
    const target = new Date(d);
    target.setDate(target.getDate() - daysAgo);
    return target.toISOString().split('T')[0];
  };

  return [
    { id: 'wt-1', date: formatDateOffset(28), weight: 76.5, notes: 'Starting fitness program' },
    { id: 'wt-2', date: formatDateOffset(21), weight: 75.8, notes: 'Down 0.7kg, consistent deficit' },
    { id: 'wt-3', date: formatDateOffset(14), weight: 75.2, notes: 'Feeling leaner and more energetic' },
    { id: 'wt-4', date: formatDateOffset(7), weight: 74.6, notes: 'Pleased with steady progress' },
    { id: 'wt-5', date: formatDateOffset(0), weight: 74.2, notes: 'Current check-in' },
  ];
};

export const INITIAL_GOALS = [
  {
    id: 'g-1',
    title: 'Reach 70.0 kg Body Weight',
    category: 'Weight',
    currentValue: 74.2,
    targetValue: 70.0,
    unit: 'kg',
    deadline: '2026-12-15',
    startDate: '2026-09-01',
    initialValue: 76.5,
    isCompleted: false,
    description: 'Target steady 0.4kg / week healthy fat loss while preserving muscle.',
  },
  {
    id: 'g-2',
    title: 'Maintain 10,000 Daily Steps',
    category: 'Activity',
    currentValue: 8640,
    targetValue: 10000,
    unit: 'steps',
    deadline: 'Daily',
    startDate: '2026-10-01',
    initialValue: 5000,
    isCompleted: false,
    description: 'Brisk walking after meals and taking active breaks during desk hours.',
  },
  {
    id: 'g-3',
    title: 'Complete 5 Workouts per Week',
    category: 'Workout',
    currentValue: 4,
    targetValue: 5,
    unit: 'workouts',
    deadline: 'Weekly',
    startDate: '2026-10-01',
    initialValue: 0,
    isCompleted: false,
    description: '3 strength days + 1 HIIT session + 1 active cardio / run.',
  },
  {
    id: 'g-4',
    title: 'Daily Hydration Target',
    category: 'Water',
    currentValue: 2250,
    targetValue: 2800,
    unit: 'ml',
    deadline: 'Daily',
    startDate: '2026-10-01',
    initialValue: 1500,
    isCompleted: false,
    description: 'Drink a minimum of 2.8L water to support muscle protein synthesis & energy.',
  },
  {
    id: 'g-5',
    title: 'Consistent 8 Hours Sleep',
    category: 'Sleep',
    currentValue: 7.75,
    targetValue: 8.0,
    unit: 'hours',
    deadline: 'Daily',
    startDate: '2026-10-01',
    initialValue: 6.5,
    isCompleted: false,
    description: 'Wind down by 10:30 PM and minimize blue light screens.',
  }
];

export const MOTIVATIONAL_QUOTES = [
  { quote: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { quote: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { quote: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { quote: "You don't have to be extreme, just consistent.", author: "Anonymous" },
  { quote: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { quote: "Energy flows where attention goes.", author: "Tony Robbins" },
  { quote: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" }
];

