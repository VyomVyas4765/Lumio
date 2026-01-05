import { Routes, Route } from 'react-router-dom';
import "./student-dashboard.css";

import { MainLayout } from './components/layout/MainLayout';

import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import LessonPlayer from './pages/LessonPlayer';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function StudentDashboard() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/learn/:lessonId" element={<LessonPlayer />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}
