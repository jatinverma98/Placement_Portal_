import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Calendar, Send, Clock, Bell, ArrowRight } from 'lucide-react';

const checklistItems = [
  {
    title: 'AI Resume Analysis',
    desc: 'Instant ATS feedback score, keyword optimization, and real-time formatting improvements.',
    icon: Sparkles,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    title: 'Verified Companies',
    desc: 'Every recruiter profile is manually verified to ensure legitimate campus hiring drives.',
    icon: ShieldCheck,
    color: 'text-emerald-500 bg-emerald-50',
  },
  {
    title: 'Placement Drives',
    desc: 'Exclusive access to pooled campus and off-campus recruitment events.',
    icon: Calendar,
    color: 'text-orange-500 bg-orange-50',
  },
  {
    title: 'Easy Applications',
    desc: 'Apply to eligible jobs in a single click with pre-filled profile credentials.',
    icon: Send,
    color: 'text-purple-500 bg-purple-50',
  },
  {
    title: 'Interview Tracking',
    desc: 'Live tracking for interview schedules, technical rounds, and offer status updates.',
    icon: Clock,
    color: 'text-cyan-500 bg-cyan-50',
  },
  {
    title: 'Live Notifications',
    desc: 'Instant email and mobile notifications whenever a new job matches your criteria.',
    icon: Bell,
    color: 'text-rose-500 bg-rose-50',
  },
];

const WhyChooseUs = ({ onOpenAuth }) => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-blue-50/30 via-white to-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Graphic Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative glass-panel rounded-[28px] p-8 border border-slate-200 shadow-2xl shadow-blue-900/10 space-y-6">
              <div className="w-14 h-14 rounded-20 bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <h3 className="font-heading font-extrabold text-2xl text-slate-900 leading-tight">
                Why Choose Our Placement Portal?
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                Trusted by placement cells, training heads, and corporate talent heads to manage end-to-end recruitment seamlessly.
              </p>

              {/* System Uptime Badge */}
              <div className="p-4 rounded-20 bg-slate-900 text-white space-y-3 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">System Availability</span>
                  <span className="text-emerald-400 font-bold">99.9% Uptime</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Avg Hiring Time</span>
                  <span className="text-orange-400 font-bold">14 Days</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Student Cost</span>
                  <span className="text-blue-400 font-bold">100% Free</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero registration fees for candidates</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 6 Feature Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wider">
                Built For Students & Recruiters
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
                Designed For Speed, <span className="gradient-text">Trust & Excellence</span>
              </h2>
            </div>

            {/* 6 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checklistItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="p-5 rounded-20 bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <div className={`w-11 h-11 rounded-16 ${item.color} flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenAuth && onOpenAuth('register')}
                className="btn-ripple inline-flex items-center gap-3 px-8 py-4 rounded-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 group cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
