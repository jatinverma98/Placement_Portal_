import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Award, Building2, Sparkles, Star } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: 'Aarav Mehta',
    role: 'Software Engineer',
    company: 'Microsoft',
    package: '₹42.5 LPA',
    branch: 'B.Tech CS (2025)',
    avatarBg: 'from-blue-600 to-cyan-600',
    initials: 'AM',
    quote:
      'PlacementPortal gave me instant access to top tier campus drives. The AI Resume Checker highlighted missing technical keywords that helped me pass the initial screening seamlessly.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Sundaram',
    role: 'Backend Developer',
    company: 'Amazon',
    package: '₹38.0 LPA',
    branch: 'B.Tech IT (2025)',
    avatarBg: 'from-orange-500 to-amber-600',
    initials: 'PS',
    quote:
      'The Smart Job Matching filter recommended roles tailored exactly to my CGPA and coding stack. I got interviewed and hired by Amazon within two weeks of applying!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Rohan Verma',
    role: 'Full Stack Engineer',
    company: 'Google',
    package: '₹45.0 LPA',
    branch: 'M.Tech CSE (2025)',
    avatarBg: 'from-emerald-600 to-teal-600',
    initials: 'RV',
    quote:
      'Being able to track every application status live without calling placement coordinators saved me huge stress during finals. Best placement portal experience.',
    rating: 5,
  },
];

const SuccessStories = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const current = stories[activeTab];

  return (
    <section id="students" className="py-24 bg-gradient-to-b from-slate-50 to-blue-50/40 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-orange-500" />
            Inspiring Journeys
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Student <span className="gradient-text-orange">Success Stories</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hear directly from graduates who landed their dream offers through our placement portal.
          </p>
        </div>

        {/* Large Split Layout Card */}
        <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Avatar/Visual Badge */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  {/* Outer Pulsing Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-orange-500 blur-md opacity-40 animate-pulse" />

                  {/* Initials Avatar Box */}
                  <div
                    className={`relative w-full h-full rounded-full bg-gradient-to-tr ${current.avatarBg} text-white flex items-center justify-center shadow-xl border-4 border-white`}
                  >
                    <span className="font-heading font-extrabold text-5xl sm:text-6xl tracking-wider">
                      {current.initials}
                    </span>
                  </div>

                  {/* Company Badge Floating */}
                  <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white px-4 py-2 rounded-20 shadow-lg border border-slate-700 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-xs">{current.company}</span>
                  </div>
                </div>

                {/* Star Ratings */}
                <div className="mt-6 flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Right Column: Quote & Details */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2">
                  <Quote className="w-10 h-10 text-blue-500/30" />
                </div>

                <blockquote className="font-heading font-medium text-slate-800 text-lg sm:text-xl leading-relaxed italic">
                  "{current.quote}"
                </blockquote>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-between gap-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-xl text-slate-900">
                      {current.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">
                      {current.role} • {current.branch}
                    </p>
                  </div>

                  {/* Package Pill */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-20 shadow-md shadow-emerald-500/20 flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-200" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-100">Offered Package</div>
                      <div className="font-heading font-extrabold text-base">{current.package}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows & Indicators */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {stories.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeTab === idx ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
