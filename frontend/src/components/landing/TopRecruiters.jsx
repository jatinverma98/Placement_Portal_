import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, ExternalLink, ArrowRight, Award, Sparkles } from 'lucide-react';

const recruiters = [
  {
    name: 'Microsoft India',
    logo: '💻',
    category: 'Tier 1 Tech Giant',
    hires: '450+ Hires',
    avgPackage: '₹42.0 LPA',
    desc: 'Hiring Software Engineers, Cloud Architects, and AI Researchers across campus drives.',
    color: 'from-blue-600 to-cyan-600',
    lightBg: 'bg-blue-50 text-blue-700',
  },
  {
    name: 'Amazon Development',
    logo: '📦',
    category: 'E-Commerce & AWS',
    hires: '620+ Hires',
    avgPackage: '₹38.5 LPA',
    desc: 'Recruiting for SDE-1, Systems Operations, and Distributed Data Infrastructure roles.',
    color: 'from-orange-500 to-amber-600',
    lightBg: 'bg-orange-50 text-orange-700',
  },
  {
    name: 'Google Operations',
    logo: '🔍',
    category: 'Cloud & AI Innovation',
    hires: '280+ Hires',
    avgPackage: '₹45.0 LPA',
    desc: 'Conducting specialized technical interviews for Core Search and ML Application teams.',
    color: 'from-emerald-600 to-teal-600',
    lightBg: 'bg-emerald-50 text-emerald-700',
  },
  {
    name: 'TCS Digital',
    logo: '⚡',
    category: 'IT & Digital Transformation',
    hires: '1,500+ Hires',
    avgPackage: '₹9.0 LPA',
    desc: 'Mass campus recruitment for Digital Software Developers and Cloud Systems Analysts.',
    color: 'from-purple-600 to-indigo-600',
    lightBg: 'bg-purple-50 text-purple-700',
  },
];

const TopRecruiters = ({ onOpenAuth }) => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-blue-600" />
            Featured Corporate Partners
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Top Recruiting <span className="gradient-text">Corporations</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Leading tech conglomerates actively hiring from our registered university placement drives.
          </p>
        </div>

        {/* Recruiter Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recruiters.map((rec, index) => (
            <motion.div
              key={rec.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-20 border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Logo & Category */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-20 bg-slate-100 flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform">
                    {rec.logo}
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${rec.lightBg}`}>
                    {rec.category}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                  {rec.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-xs leading-relaxed font-normal">
                  {rec.desc}
                </p>

                {/* Stats Bar inside Recruiter Card */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">Annual Hires</div>
                    <div className="font-heading font-extrabold text-sm text-slate-900">{rec.hires}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">Avg Package</div>
                    <div className="font-heading font-extrabold text-sm text-blue-600">{rec.avgPackage}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Openings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRecruiters;
