import React from 'react';
import { Routes, Route, Navigate, useOutletContext } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardView } from './components/dashboard/DashboardView';
import { WorkoutsView } from './components/workouts/WorkoutsView';
import { NutritionView } from './components/nutrition/NutritionView';
import { WaterView } from './components/water/WaterView';
import { SleepView } from './components/sleep/SleepView';
import { ActivityView } from './components/activity/ActivityView';
import { HealthCalculatorView } from './components/calculator/HealthCalculatorView';
import { GoalsView } from './components/goals/GoalsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ProfileView } from './components/profile/ProfileView';
import { LoginView } from './components/auth/LoginView';
import { RegisterView } from './components/auth/RegisterView';

// Helper component for dashboard route to access outlet context
const DashboardRoute = () => {
  const { onOpenQuickAdd } = useOutletContext();
  return <DashboardView onOpenQuickAdd={onOpenQuickAdd} />;
};

export const App = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />

      {/* Main app layout routes */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardRoute />} />
        <Route path="workouts" element={<WorkoutsView />} />
        <Route path="nutrition" element={<NutritionView />} />
        <Route path="water" element={<WaterView />} />
        <Route path="sleep" element={<SleepView />} />
        <Route path="activity" element={<ActivityView />} />
        <Route path="calculator" element={<HealthCalculatorView />} />
        <Route path="goals" element={<GoalsView />} />
        <Route path="analytics" element={<AnalyticsView />} />
        <Route path="profile" element={<ProfileView />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

