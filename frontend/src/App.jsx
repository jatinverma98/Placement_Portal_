import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Pages
import LandingPage from './pages/LandingPage';
import StudentProfile from './pages/StudentProfile';
import PostJob from './pages/PostJob';
import JobApplicants from './pages/JobApplicants';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import CompanyDashboard from './pages/dashboards/CompanyDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

const AppContent = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-xl border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
          <span className="font-heading font-bold text-lg text-slate-800">
            Placement<span className="text-blue-600">Portal</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* PUBLIC: Landing Page — auth modal opens via ?auth=login or ?auth=register */}
      <Route path="/" element={<LandingPage />} />

      {/* Redirect /login and /register back to landing with modal open */}
      <Route path="/login" element={user ? <Navigate to={`/dashboard/${user.role}`} replace /> : <Navigate to="/?auth=login" replace />} />
      <Route path="/register" element={user ? <Navigate to={`/dashboard/${user.role}`} replace /> : <Navigate to="/?auth=register" replace />} />

      {/* PROTECTED: Student Routes */}
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentProfile />
        </ProtectedRoute>
      } />

      {/* PROTECTED: Company Routes */}
      <Route path="/post-job" element={
        <ProtectedRoute allowedRoles={['company']}>
          <PostJob />
        </ProtectedRoute>
      } />
      <Route path="/job-applicants/:jobId" element={
        <ProtectedRoute allowedRoles={['company']}>
          <JobApplicants />
        </ProtectedRoute>
      } />

      {/* PROTECTED: Dashboards (each includes DashboardLayout with its own Navbar) */}
      <Route path="/dashboard/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/company" element={
        <ProtectedRoute allowedRoles={['company']}>
          <CompanyDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Catch-all → Landing Page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
