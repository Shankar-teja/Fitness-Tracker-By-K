// Health and fitness formulas and calculations

export const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm || heightCm <= 0 || weightKg <= 0) {
    return { bmi: 0, category: 'Unknown', color: 'gray', description: 'Enter valid measurements.' };
  }
  const heightM = heightCm / 100;
  const bmiValue = Number((weightKg / (heightM * heightM)).toFixed(1));

  let category = 'Normal';
  let color = 'text-emerald-500';
  let bgBadge = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
  let description = 'Healthy body weight range. Maintain regular activity and balanced nutrition.';

  if (bmiValue < 18.5) {
    category = 'Underweight';
    color = 'text-blue-500';
    bgBadge = 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    description = 'Below the recommended weight range. Consider nutrient-dense meals and strength training.';
  } else if (bmiValue >= 18.5 && bmiValue < 25) {
    category = 'Normal';
    color = 'text-emerald-500';
    bgBadge = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    description = 'Great job! Your BMI is within the healthy and ideal weight range.';
  } else if (bmiValue >= 25 && bmiValue < 30) {
    category = 'Overweight';
    color = 'text-amber-500';
    bgBadge = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    description = 'Slightly above the optimal weight range. Increasing daily activity and portion control helps.';
  } else {
    category = 'Obese';
    color = 'text-rose-500';
    bgBadge = 'bg-rose-500/10 text-rose-500 border-rose-500/20';
    description = 'Significantly elevated risk of metabolic conditions. Consult a healthcare professional for a tailored plan.';
  }

  return {
    bmi: bmiValue,
    category,
    color,
    bgBadge,
    description,
    healthyWeightRange: {
      min: Number((18.5 * heightM * heightM).toFixed(1)),
      max: Number((24.9 * heightM * heightM).toFixed(1)),
    },
  };
};

export const calculateBMR = (gender = 'male', weightKg, heightCm, age) => {
  if (!weightKg || !heightCm || !age) return 1800;
  // Mifflin-St Jeor Equation
  if (gender === 'female') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
  }
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
};

export const ACTIVITY_MULTIPLIERS = {
  sedentary: { label: 'Sedentary (Little/no exercise, desk job)', factor: 1.2 },
  light: { label: 'Lightly Active (Exercise 1-3 days/week)', factor: 1.375 },
  moderate: { label: 'Moderately Active (Exercise 3-5 days/week)', factor: 1.55 },
  very_active: { label: 'Very Active (Hard exercise 6-7 days/week)', factor: 1.725 },
  extra_active: { label: 'Extra Active (Intense training / physical job)', factor: 1.9 },
};

export const calculateTDEE = (bmr, activityLevel = 'moderate') => {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel]?.factor || 1.55;
  return Math.round(bmr * multiplier);
};

export const calculateDailyCalorieTarget = (tdee, fitnessGoal = 'maintain') => {
  switch (fitnessGoal) {
    case 'lose_weight':
      return Math.round(tdee - 500);
    case 'mild_loss':
      return Math.round(tdee - 250);
    case 'gain_muscle':
      return Math.round(tdee + 400);
    case 'mild_gain':
      return Math.round(tdee + 250);
    case 'maintain':
    default:
      return Math.round(tdee);
  }
};

export const calculateIdealWeight = (gender = 'male', heightCm) => {
  if (!heightCm) return 70;
  const inches = heightCm / 2.54;
  const inchesOver60 = Math.max(0, inches - 60);

  if (gender === 'female') {
    return Number((45.5 + 2.3 * inchesOver60).toFixed(1));
  }
  return Number((50.0 + 2.3 * inchesOver60).toFixed(1));
};

export const calculateHydrationTarget = (weightKg = 70) => {
  // approx 35ml per kg of body weight
  return Math.round((weightKg * 35) / 100) * 100; // rounded to nearest 100ml
};

export const calculateSleepScore = (durationHours, quality = 'Good') => {
  let score = 70;
  // duration factor (optimal 7-9 hours)
  if (durationHours >= 7 && durationHours <= 9) {
    score += 20;
  } else if (durationHours >= 6 && durationHours < 7) {
    score += 10;
  } else if (durationHours > 9) {
    score += 5;
  } else {
    score -= 15;
  }

  // quality factor
  if (quality === 'Excellent') score += 10;
  else if (quality === 'Good') score += 5;
  else if (quality === 'Poor') score -= 15;

  return Math.max(20, Math.min(100, Math.round(score)));
};

