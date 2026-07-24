import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, LayoutDashboard, User, PlusCircle, Users, 
  FileText, LogOut, ChevronLeft, ChevronRight, Bell, 
  Search, ShieldCheck, Sparkles, Building2, Calendar, 
  TrendingUp, Settings, Activity, Filter, CheckCircle2,
  Clock, HelpCircle
} from 'lucide-react';

const DashboardLayout = ({ children, activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  // Define sidebar menu items based on role
  const getMenuItems = () => {
    if (user?.role === 'student') {
      return [
        { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, path: '/dashboard/student' },
        { id: 'jobs', label: 'Browse Job Drives', icon: Briefcase, path: '/dashboard/student' },
        { id: 'applications', label: 'My Applications', icon: FileText, path: '/dashboard/student' },
        { id: 'profile', label: 'My Academic Profile', icon: User, path: '/profile' },
      ];
    } else if (user?.role === 'company') {
      return [
        { id: 'overview', label: 'Company Overview', icon: LayoutDashboard, path: '/dashboard/company' },
        { id: 'post-job', label: 'Post New Job', icon: PlusCircle, path: '/post-job' },
        { id: 'my-jobs', label: 'My Job Listings', icon: Briefcase, path: '/dashboard/company' },
        { id: 'analytics', label: 'Hiring Analytics', icon: TrendingUp, path: '/dashboard/company' },
      ];
    } else if (user?.role === 'admin') {
      return [
        { id: 'stats', label: 'Platform Overview', icon: LayoutDashboard, path: '/dashboard/admin' },
        { id: 'users', label: 'Manage Users', icon: Users, path: '/dashboard/admin' },
        { id: 'jobs', label: 'Job Listings Directory', icon: Briefcase, path: '/dashboard/admin' },
        { id: 'reports', label: 'System Analytics', icon: Activity, path: '/dashboard/admin' },
      ];
    }
    return [];
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. TOP GLASS NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        {/* Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-600 to-orange-500 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-blue-400" />
              </div>
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight text-slate-900 hidden sm:inline">
              Placement<span className="gradient-text">Portal</span>
            </span>
          </Link>
        </div>

        {/* Middle: Search Bar (Desktop) */}
        <div className="hidden md:flex items-center max-w-md w-full mx-8">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Quick search jobs, drives, applications..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
            />
          </div>
        </div>

        {/* Right: User Profile & Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white animate-pulse" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-20 border border-slate-200 shadow-xl p-4 z-50"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="font-heading font-bold text-xs text-slate-900">Notifications</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">3 New</span>
                  </div>
                  <div className="space-y-3 py-3">
                    <div className="flex items-start gap-2.5 text-xs">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">New Placement Drive Live</p>
                        <p className="text-[11px] text-slate-500">TCS Digital hired for SDE roles starting next week.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs">
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Application Status Update</p>
                        <p className="text-[11px] text-slate-500">Your profile was shortlisted by Accenture Tech.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="font-heading font-bold text-xs text-slate-900 line-clamp-1">{user?.name || 'User'}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">{user?.role || 'Guest'}</div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-semibold text-xs transition-all duration-200 border border-slate-200/80 hover:border-red-200 cursor-pointer ml-1"
            title="Logout & return to homepage"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN LAYOUT BODY (SIDEBAR + CONTENT) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Animated Modern Sidebar */}
        <aside
          className={`bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-300 z-30 ${
            collapsed ? 'w-16' : 'w-64'
          }`}
        >
          {/* Menu Links */}
          <div className="p-3 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab ? activeTab === item.id : location.pathname === item.path;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (setActiveTab) {
                      setActiveTab(item.id);
                    }
                    if (item.path && location.pathname !== item.path) {
                      navigate(item.path);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 cursor-pointer group relative ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Bottom Sidebar Footer */}
          <div className="p-3 border-t border-slate-100 space-y-2">
            {!collapsed && (
              <div className="p-3 rounded-20 bg-gradient-to-br from-slate-900 to-blue-950 text-white text-xs space-y-2 relative overflow-hidden">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Pro Career Support</span>
                </div>
                <p className="text-[11px] text-slate-300">Need help preparing for interview rounds?</p>
                <a
                  href="#support"
                  onClick={(e) => { e.preventDefault(); alert("Campus Placement Cell Hotline: placement@university.edu"); }}
                  className="inline-block px-3 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-500 transition-colors"
                >
                  Contact Officer
                </a>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
