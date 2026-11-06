# PulseFit — Modern Fitness & Health Tracker

PulseFit is a modern, responsive, and feature-packed Fitness & Health Tracker web application built with **React.js**, **Vite**, **Tailwind CSS**, **React Router**, **Lucide React**, and **Recharts**.

It operates completely client-side using browser **`localStorage`** for fast, reliable data persistence with zero external backend or database dependencies.

---

## ✨ Key Features

### 1. 📊 Interactive Dashboard
- **Daily Vitals Overview**: Real-time metrics for Daily Steps, Active Burn (kcal), Calorie Budget Remaining, Water Intake, Sleep Recovery, and Active Minutes.
- **Weekly Activity Chart**: Dual-axis Recharts visualization of steps and total calories burned over the past 7 days.
- **Energy Balance Chart**: Calories consumed (meals) versus total calories expended (BMR + workouts + steps).
- **Macro Distribution Donut**: Protein, Carbohydrates, and Fats breakdown for today.
- **Quick Logging Hub**: Fast access to record workouts, meals, water, sleep, and steps in 1 click from anywhere in the app.
- **Motivational Quote Banner**: Daily rotating fitness quotes to stay inspired.

### 2. 🏋️‍♂️ Workout Tracker & History
- **Full CRUD**: Log, edit, and delete workout sessions.
- **Comprehensive Details**: Exercise title, Category (Strength, Cardio, HIIT, Running, Cycling, Yoga, Walking, Swimming, Other), Intensity level (Low, Medium, High), Duration (mins), Calories burned, Sets/Reps/Distance, Notes, Date & Time.
- **1-Click Workout Presets**: Instant templates for HIIT Blast, 5K Outdoor Run, Upper Body Hypertrophy, Leg Day Power, and Vinyasa Yoga.
- **Search & Filter**: Search by workout name/notes, filter by category or intensity, and sort by date, duration, or calories.

### 3. 🥗 Diet & Nutrition Journal
- **Macronutrient Tracking**: Monitors daily Calories, Protein (g), Carbohydrates (g), and Healthy Fats (g) against personalized targets.
- **Categorized Meals**: Breakfast, Lunch, Dinner, and Snacks sections with subtotal metrics.
- **Healthy Food Library Presets**: Searchable database of common nutritious foods (Oatmeal, Grilled Chicken, Salmon, Quinoa, Whey Protein, Eggs & Avocado, Greek Yogurt) for instant 1-tap logging.
- **Date Navigation**: Seamlessly navigate back and forth to inspect past days' nutrition logs.

### 4. 💧 Water Intake & Hydration
- **Visual Animated Fluid Gauge**: Real-time fluid level cylinder reflecting today's hydration percentage.
- **1-Tap Quick Portions**: Small Glass (200ml), Standard Glass (250ml), Bottle (500ml), Sport Flask (750ml), Large Jug (1000ml), or Custom ml.
- **7-Day Hydration Trend**: Interactive Recharts bar chart comparing daily water intake with the recommended goal.
- **Drink History Timeline**: Timestamped record of every drink logged throughout the day.

### 5. 🌙 Sleep & Recovery Monitoring
- **Sleep Quality & Duration**: Log bedtime, wake time, duration (hours), and quality (Excellent, Good, Fair, Poor).
- **Sleep Recovery Score**: Automatic algorithm calculating a 1–100 restorative sleep score.
- **7-Day Sleep Trends Chart**: Visual bar chart with optimal 7–9 hour target reference guide.
- **Evidence-Based Sleep Hygiene Tips**: Science-backed guidance on circadian rhythms, morning sunlight, room temperature, and caffeine cutoffs.

### 6. 👟 Daily Activity & Steps
- **Circular Step Progress Ring**: Visual SVG radial gauge comparing steps to the 10,000-step benchmark.
- **Automatic Distance & Burn Estimation**: Converts steps into approximate kilometers/miles and calories burned.
- **Quick Increments**: Fast-add buttons (+500, +1,000, +2,500, +5,000 steps) or custom entry.
- **7-Day Step History**: Weekly bar chart with reference threshold.

### 7. ⚖️ Health & BMI Calculator Suite
- **Interactive BMI Calculator**: Calculates Body Mass Index with a visual color spectrum gauge (Underweight, Normal, Overweight, Obese).
- **Metabolic Analysis**: BMR (Mifflin-St Jeor formula) and TDEE (Total Daily Energy Expenditure) based on biological sex, age, height, weight, and activity multiplier.
- **Ideal Weight Estimator**: Standard Devine formula benchmark.
- **1-Click Profile Sync**: Automatically saves calculated calorie and hydration targets directly to your user profile.

### 8. 🎯 Fitness Goals & Milestones
- **Multi-Category Goals**: Track weight loss/gain, daily step streaks, weekly workout frequency, hydration, and sleep consistency.
- **Progress Tracking**: Visual progress bars and percentage completion for each goal.
- **Full CRUD & Toggle**: Add, edit, delete goals, and toggle completion with celebratory indicators.

### 9. 📈 Progress Analytics
- **Weight Trend Chart**: Line chart illustrating weight change over time against the target weight reference line.
- **Workout Category Distribution**: Recharts pie chart showing training variety across cardio, strength, HIIT, and mobility.
- **Weigh-In History**: Timestamped scale check-in logs with personal notes.

### 10. 👤 Authentication, Profile & Theme
- **Authentication**: Sign In, User Registration with biometric onboarding, and 1-Click Demo Login.
- **Dark Mode & Light Mode**: Smooth transition between light and dark themes, persisted in localStorage.
- **User Profile Management**: Edit personal stats, goals, and customize avatar.
- **Data Backup & Reset**: Export entire database to a downloadable JSON file, restore rich demo data, or clear all data.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1. Clone or navigate to the project directory:
   ```bash
   cd "Fitness Tracker By K"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open the displayed local URL (typically `http://localhost:5173`) in your web browser.

---

## 🛠️ Tech Stack
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State & Storage**: React Context API + LocalStorage

