import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, LayoutDashboard, BarChart3, FileText, CalendarCheck2, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Resume Checker',
    description: 'Instant ATS score evaluation, keyword optimization, and real-time formatting feedback to beat recruitment filters.',
    badge: 'AI Powered',
    color: 'from-blue-600 to-indigo-600',
    lightBg: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Target,
    title: 'Smart Job Matching',
    description: 'Algorithmic matching matching student CGPA, skills, and department preferences directly to company job requirements.',
    badge: '98% Accuracy',
    color: 'from-orange-500 to-amber-500',
    lightBg: 'bg-orange-50 text-orange-600',
  },
  {
    icon: LayoutDashboard,
    title: 'Company Dashboard',
    description: 'Comprehensive portal for HRs to post jobs, track applicants, filter top candidates, and schedule interview rounds.',
    badge: 'Recruiter Hub',
    color: 'from-emerald-600 to-teal-600',
    lightBg: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: BarChart3,
    title: 'Placement Analytics',
    description: 'Live performance metrics, branch-wise placement percentages, salary distribution charts, and historical hiring trends.',
    badge: 'Real-time Insights',
    color: 'from-purple-600 to-indigo-600',
    lightBg: 'bg-purple-50 text-purple-600',
  },
  {
    icon: FileText,
    title: 'Resume Builder',
    description: 'Create professional, university-approved resume templates in minutes with instant PDF download capabilities.',
    badge: 'Free Templates',
    color: 'from-cyan-600 to-blue-600',
    lightBg: 'bg-cyan-50 text-cyan-600',
  },
  {
    icon: CalendarCheck2,
    title: 'Interview Scheduler',
    description: 'Automated interview slot booking, calendar syncing, meeting notifications, and feedback status updates.',
    badge: 'Automated',
    color: 'from-rose-600 to-pink-600',
    lightBg: 'bg-rose-50 text-rose-600',
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-700 font-semibold text-xs uppercase tracking-wider">
            Enterprise Features
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Engineered for <span className="gradient-text">Seamless Placement</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Everything students, universities, and recruiters need for a streamlined placement ecosystem in one single unified platform.
          </p>
        </div>

        {/* 3x2 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-20 p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Glow Highlight on Hover */}
                <div className="absolute inset-0 rounded-20 bg-gradient-to-r from-blue-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Top Badge & Icon Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-20 ${feat.lightBg} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                      {feat.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    <span>{feat.title}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200 text-blue-600" />
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Explore module details</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
