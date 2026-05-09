import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StudentProfile from './pages/StudentProfile';
import PostJob from './pages/PostJob';
import JobApplicants from './pages/JobApplicants';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import CompanyDashboard from './pages/dashboards/CompanyDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

const AppContent = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="page-wrapper items-center justify-center text-primary">Loading App...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={user ? `/dashboard/${user.role}` : "/login"} replace />} />
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />
        
        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentProfile />
          </ProtectedRoute>
        } />

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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
