import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Building2, CheckCircle2, Award, TrendingUp, Users, Sparkles, UserPlus } from 'lucide-react';

const HeroSection = ({ onOpenAuth }) => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50"
    >
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-orange-400/15 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
      <div className="absolute top-10 right-1/3 w-72 h-72 bg-indigo-400/15 rounded-full blur-3xl animate-float pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-blue-200/80 shadow-xs shadow-blue-500/10 text-xs sm:text-sm font-medium text-slate-800"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <span className="font-semibold text-blue-600">#1 Placement Platform</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">Connecting Talent with Dream Companies</span>
            </motion.div>

            {/* Main Headlines */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.15]">
              Find Your Dream <br className="hidden sm:inline" />
              <span className="relative">
                <span className="gradient-text">Campus Placement</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-orange-500/80"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,10 Q50,0 100,10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Bridge the gap between campus recruitment and high-growth technology companies. Build AI resumes, apply with one click, and secure your dream offer.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollToSection('jobs')}
                className="btn-ripple w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 group cursor-pointer"
              >
                <Search className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
                <span>Explore Jobs</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenAuth && onOpenAuth('register')}
                className="btn-ripple w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-20 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base transition-all duration-300 shadow-md shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-1 group cursor-pointer"
              >
                <UserPlus className="w-5 h-5 text-orange-400 group-hover:rotate-12 transition-transform" />
                <span>Register Now</span>
              </button>
            </div>

            {/* Highlighted Trust Points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified Recruiters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>AI Matching Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Free for Students</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Graphic Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Main Card Graphic Container */}
              <div className="relative z-10 glass-panel rounded-[28px] p-6 sm:p-8 shadow-2xl shadow-blue-900/10 border border-slate-200/90 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Hero Card Visual Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-20 bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-900 text-base">Campus Drive 2026</h3>
                      <p className="text-xs text-slate-500">Live Hiring Portal</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 animate-pulse">
                    Active Hiring
                  </span>
                </div>

                {/* Simulated Student Candidate Card */}
                <div className="py-6 space-y-4">
                  <div className="bg-slate-50 p-4 rounded-20 border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                      JS
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-sm">Jatin Sharma</h4>
                      <p className="text-xs text-slate-500">Computer Science • CGPA 8.9</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">React</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">Node.js</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">Python</span>
                      </div>
                    </div>
                  </div>

                  {/* Hiring Offer Celebration Badge */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-20 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-300">Offer Received!</div>
                        <div className="font-heading font-bold text-sm text-white">Software Engineer</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-orange-400 font-semibold">CTC Package</div>
                      <div className="font-heading font-bold text-base text-white">₹18 LPA</div>
                    </div>
                  </div>
                </div>

                {/* Progress Stats Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                    <span>Batch Placement Progress</span>
                    <span className="text-blue-600">92% Completed</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-orange-500 rounded-full w-[92%]" />
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge 1 - Top Left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 z-20 glass-panel p-3.5 rounded-20 shadow-xl border border-white flex items-center gap-3 bg-white/90"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Highest Package</div>
                  <div className="text-xs font-semibold text-blue-600">₹45.0 LPA</div>
                </div>
              </motion.div>

              {/* Floating Stat Badge 2 - Bottom Right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -right-6 z-20 glass-panel p-3.5 rounded-20 shadow-xl border border-white flex items-center gap-3 bg-white/90"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">3,000+ Offers</div>
                  <div className="text-xs font-medium text-slate-500">Issued this season</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex flex-col items-center justify-center">
          <button
            onClick={() => scrollToSection('companies')}
            className="flex flex-col items-center gap-2 text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors group cursor-pointer"
          >
            <span>Scroll to Explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-slate-300 group-hover:border-blue-500 flex justify-center p-1 transition-colors">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-2.5 rounded-full bg-slate-400 group-hover:bg-blue-600"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
