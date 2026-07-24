import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Building } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ananya Deshmukh',
    company: 'Infosys Specialist Programmer',
    rating: 5,
    review:
      'The placement portal transformed our campus drive season completely. Applying for shortlisted companies took literally one click, and receiving automated interview alerts on mobile kept us ahead.',
    initials: 'AD',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 2,
    name: 'Vikramaditya Singh',
    company: 'TCS Digital Engineer',
    rating: 5,
    review:
      'As a student coordinator, managing applicant lists was always messy. PlacementPortal made company verification and student CGPA eligibility filters crystal clear.',
    initials: 'VS',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 3,
    name: 'Sneha Kapoor',
    company: 'Accenture Advanced App Developer',
    rating: 5,
    review:
      'The ATS Resume Builder alone is worth gold! It helped me format my project experience according to industry standards. Got selected in the very first interview round.',
    initials: 'SK',
    color: 'from-purple-600 to-indigo-600',
  },
  {
    id: 4,
    name: 'Karan Patel',
    company: 'Oracle Associate Software Engineer',
    rating: 5,
    review:
      'Fast, modern, and reliable. Never crashed even during peak registration hours when 3000 students logged in simultaneously.',
    initials: 'KP',
    color: 'from-emerald-600 to-teal-600',
  },
];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Blur Background Elements */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
            Verified Feedback
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Loved By <span className="gradient-text-blue">Students & Coordinators</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Read real feedback from students placed in top MNCs and tech startups across the nation.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative glass-card-dark rounded-[28px] p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-slate-800 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[index].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonials[index].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-heading font-medium text-slate-200 text-lg sm:text-xl leading-relaxed">
                  "{testimonials[index].review}"
                </p>

                {/* Profile Footer */}
                <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
                  <div
                    className={`w-14 h-14 rounded-20 bg-gradient-to-tr ${testimonials[index].color} text-white font-heading font-extrabold text-xl flex items-center justify-center shadow-lg border border-white/10`}
                  >
                    {testimonials[index].initials}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      {testimonials[index].name}
                    </h3>
                    <p className="text-xs text-blue-400 font-semibold flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5" />
                      {testimonials[index].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <div className="mt-8 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === idx ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
