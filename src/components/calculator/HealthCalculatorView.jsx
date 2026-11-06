import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFitness } from '../../context/FitnessContext';
import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
  calculateDailyCalorieTarget,
  calculateIdealWeight,
  calculateHydrationTarget,
  ACTIVITY_MULTIPLIERS,
} from '../../utils/calculations';
import {
  Calculator,
  Scale,
  Activity,
  HeartPulse,
  Flame,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export const HealthCalculatorView = () => {
  const { currentUser, updateProfile } = useAuth();
  const { addToast } = useFitness();

  // Form states initialized with current profile
  const [gender, setGender] = useState(currentUser?.gender || 'male');
  const [age, setAge] = useState(currentUser?.age?.toString() || '28');
  const [height, setHeight] = useState(currentUser?.height?.toString() || '178');
  const [weight, setWeight] = useState(currentUser?.weight?.toString() || '74.2');
  const [activityLevel, setActivityLevel] = useState(currentUser?.activityLevel || 'moderate');
  const [fitnessGoal, setFitnessGoal] = useState(currentUser?.fitnessGoal || 'lose_weight');

  // Calculated values
  const weightNum = Number(weight) || 70;
  const heightNum = Number(height) || 175;
  const ageNum = Number(age) || 28;

  const bmiResult = calculateBMI(weightNum, heightNum);
  const bmrResult = calculateBMR(gender, weightNum, heightNum, ageNum);
  const tdeeResult = calculateTDEE(bmrResult, activityLevel);
  const targetCalories = calculateDailyCalorieTarget(tdeeResult, fitnessGoal);
  const idealWeightResult = calculateIdealWeight(gender, heightNum);
  const recommendedWater = calculateHydrationTarget(weightNum);

  // Sync to profile handler
  const handleApplyToProfile = () => {
    updateProfile({
      gender,
      age: ageNum,
      height: heightNum,
      weight: weightNum,
      activityLevel,
      fitnessGoal,
      calorieBudget: targetCalories,
      waterGoal: recommendedWater,
    });
    addToast('Updated profile metrics & calorie targets successfully!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Calculator className="w-7 h-7 text-brand-500" />
          Health & BMI Calculator Suite
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Calculate your Body Mass Index (BMI), Basal Metabolic Rate (BMR), TDEE, and optimal daily nutritional targets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Form */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Body Measurements
            </h3>
            <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
              Live Calculation
            </span>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Biological Sex
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  gender === 'male'
                    ? 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  gender === 'female'
                    ? 'bg-brand-500/10 border-brand-500 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Female
              </button>
            </div>
          </div>

          {/* Age & Height */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Age (years)
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
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
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Current Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="30"
              max="250"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none font-bold"
            />
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Physical Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            >
              {Object.entries(ACTIVITY_MULTIPLIERS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Goal */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Fitness Goal
            </label>
            <select
              value={fitnessGoal}
              onChange={(e) => setFitnessGoal(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="lose_weight">Fat Loss (-500 kcal/day)</option>
              <option value="mild_loss">Mild Deficit (-250 kcal/day)</option>
              <option value="maintain">Maintain Body Weight</option>
              <option value="mild_gain">Lean Muscle Gain (+250 kcal/day)</option>
              <option value="gain_muscle">Muscle Mass Bulk (+400 kcal/day)</option>
            </select>
          </div>

          {/* Apply to Profile Button */}
          <button
            onClick={handleApplyToProfile}
            className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-600/25 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <CheckCircle2 className="w-4 h-4" />
            Apply Targets to My Profile
          </button>
        </div>

        {/* Right: Results & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* BMI Gauge Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Body Mass Index Result
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                    {bmiResult.bmi}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${bmiResult.bgBadge}`}>
                    {bmiResult.category}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-medium">
                  Ideal Weight for {heightNum} cm
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {bmiResult.healthyWeightRange?.min} – {bmiResult.healthyWeightRange?.max} kg
                </span>
              </div>
            </div>

            {/* Visual Spectrum Bar */}
            <div className="space-y-1.5 my-4">
              <div className="relative w-full h-3.5 rounded-full overflow-hidden flex shadow-inner">
                <div className="w-[18.5%] bg-blue-400" title="Underweight (< 18.5)" />
                <div className="w-[28.5%] bg-emerald-500" title="Normal (18.5 - 24.9)" />
                <div className="w-[23%] bg-amber-400" title="Overweight (25.0 - 29.9)" />
                <div className="w-[30%] bg-rose-500" title="Obese (>= 30.0)" />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-1">
                <span>Underweight (&lt;18.5)</span>
                <span>Normal (18.5–24.9)</span>
                <span>Overweight (25–29.9)</span>
                <span>Obese (30+)</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
              💡 {bmiResult.description}
            </p>
          </div>

          {/* Metabolic & Energy Needs Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                <span>Basal Metabolic (BMR)</span>
                <HeartPulse className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {bmrResult} <span className="text-xs font-normal text-slate-400">kcal</span>
              </p>
              <span className="text-[11px] text-slate-400">Resting calorie burn</span>
            </div>

            <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                <span>Daily Expenditure (TDEE)</span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {tdeeResult} <span className="text-xs font-normal text-slate-400">kcal</span>
              </p>
              <span className="text-[11px] text-slate-400">Maintenance energy</span>
            </div>

            <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
                <span>Target Daily Calorie</span>
                <Sparkles className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {targetCalories} <span className="text-xs font-normal text-slate-400">kcal</span>
              </p>
              <span className="text-[11px] text-emerald-500 font-medium">Based on your goal</span>
            </div>
          </div>

          {/* Recommended Targets Card */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Personalized Health Recommendations
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                  Optimal Hydration Target
                </span>
                <span>{recommendedWater} ml per day based on 35ml per kg of body mass.</span>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                  Ideal Body Weight (Devine)
                </span>
                <span>{idealWeightResult} kg (standard physiological benchmark).</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

