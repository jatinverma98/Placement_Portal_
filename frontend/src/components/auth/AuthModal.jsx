import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  X, Mail, Lock, User, Briefcase, GraduationCap, 
  Building2, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = ({ isOpen, onClose, initialTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(initialTab);
    setError('');
  }, [initialTab, isOpen]);

  // If user is already logged in and modal opens, redirect to dashboard
  useEffect(() => {
    if (user && isOpen) {
      onClose();
      navigate(`/dashboard/${user.role}`);
    }
  }, [user, isOpen, navigate, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        // login() returns the user object directly, throws on failure
        const loggedInUser = await login(formData.email, formData.password);
        if (loggedInUser) {
          onClose();
          navigate(`/dashboard/${loggedInUser.role}`);
        }
      } else {
        // Register validation
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        if (!formData.name.trim()) {
          setError('Please enter your full name');
          setLoading(false);
          return;
        }

        // register() returns true on success, throws on failure
        const registered = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        if (registered) {
          // Auto-login after successful registration
          const loggedInUser = await login(formData.email, formData.password);
          if (loggedInUser) {
            onClose();
            navigate(`/dashboard/${loggedInUser.role}`);
          } else {
            setActiveTab('login');
            setError('Registration successful! Please log in with your credentials.');
          }
        }
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white rounded-[28px] border border-slate-200/90 shadow-2xl shadow-slate-950/20 overflow-hidden z-10 my-auto grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Graphic Illustration & Branding */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-10 flex-col justify-between relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Logo */}
            <div className="relative z-10 flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-600 to-orange-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                Placement<span className="text-blue-400">Portal</span>
                <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              </span>
            </div>

            {/* Central Graphic Box */}
            <div className="relative z-10 my-8 space-y-6">
              <div className="glass-card-dark p-6 rounded-20 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">Verified Placement Ecosystem</h4>
                    <p className="text-[11px] text-slate-400">Direct hiring from top MNCs</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant ATS Resume Score</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Real-time Application Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Direct Campus Interview Calls</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed italic">
                "Join over 10,000+ students and 500+ top recruiters on India's most trusted placement hub."
              </p>
            </div>

            {/* Bottom Footer Note */}
            <div className="relative z-10 text-[11px] text-slate-400">
              🔒 100% Encrypted & Secure Auth Protocol
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white">
            {/* Header Tabs */}
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                  {activeTab === 'login' ? 'Welcome Back!' : 'Create Account'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {activeTab === 'login'
                    ? 'Enter your credentials to access your dashboard'
                    : 'Get started for free in under 60 seconds'}
                </p>
              </div>

              {/* Animated Tab Switcher */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  onClick={() => { setActiveTab('login'); setError(''); }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeTab === 'login'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => { setActiveTab('register'); setError(''); }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeTab === 'register'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Alert Error Box */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'register' && (
                <>
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Jatin Sharma"
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium transition-all"
                      />
                    </div>
                  </div>

                  {/* Role Selection Tabs */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Role</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'student' })}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          formData.role === 'student'
                            ? 'border-blue-600 bg-blue-50/70 text-blue-700 shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>Student</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'company' })}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          formData.role === 'company'
                            ? 'border-blue-600 bg-blue-50/70 text-blue-700 shadow-xs'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Recruiter / HR</span>
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium transition-all"
                  />
                </div>
              </div>

              {/* Confirm Password (Register mode only) */}
              {activeTab === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-medium transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Login Extra Options */}
              {activeTab === 'login' && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span>Remember me</span>
                  </label>

                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Please contact placement support to reset password."); }} className="font-semibold text-blue-600 hover:text-blue-700">
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-ripple w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{activeTab === 'login' ? 'Sign In to Dashboard' : 'Complete Free Registration'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Toggle Footer Text */}
            <div className="mt-6 text-center text-xs text-slate-500 pt-4 border-t border-slate-100">
              {activeTab === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    onClick={() => { setActiveTab('register'); setError(''); }}
                    className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Register now free
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => { setActiveTab('login'); setError(''); }}
                    className="font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    Sign in instead
                  </button>
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
