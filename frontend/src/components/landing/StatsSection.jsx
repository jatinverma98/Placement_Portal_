import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Trophy, CheckCircle, TrendingUp } from 'lucide-react';

const statsData = [
  {
    icon: Building2,
    value: 500,
    suffix: '+',
    label: 'Companies',
    desc: 'From Tech Giants to High-Growth Startups',
    color: 'from-blue-600 to-indigo-600',
    bgColor: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Students',
    desc: 'Active Job Seekers across 50+ Universities',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Trophy,
    value: 3000,
    suffix: '+',
    label: 'Placements',
    desc: 'Offers Secured in Core Tech & Product Roles',
    color: 'from-emerald-600 to-teal-600',
    bgColor: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: CheckCircle,
    value: 95,
    suffix: '%',
    label: 'Placement Success',
    desc: 'Eligible Candidates Placed annually',
    color: 'from-purple-600 to-indigo-600',
    bgColor: 'bg-purple-50 text-purple-600',
  },
];

// Helper Counter Component
const AnimatedCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const frameRate = 1000 / 60;
          const totalFrames = Math.round(duration / frameRate);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));
            setCount(currentCount);

            if (frame === totalFrames) {
              clearInterval(timer);
              setCount(target);
            }
          }, frameRate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="font-heading font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Platform Statistics
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Numbers That Speak <span className="gradient-text-blue">For Our Impact</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Empowering students and hiring teams with reliable, transparent placement statistics year after year.
          </p>
        </div>

        {/* 4 Column Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card-dark rounded-20 p-8 text-center flex flex-col items-center justify-between border border-slate-800 hover:border-blue-500/50 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-20 bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                  <Icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                </div>

                <div className="mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>

                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-200 mb-1 group-hover:text-blue-400 transition-colors">
                    {stat.label}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-normal">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
