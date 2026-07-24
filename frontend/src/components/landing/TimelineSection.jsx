import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, UserCheck, FileUp, Send, Users, Award, Sparkles } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Register',
    desc: 'Create your free account using student or recruiter credentials.',
    icon: UserPlus,
  },
  {
    step: '02',
    title: 'Create Profile',
    desc: 'Fill in your academic marks, CGPA, roll number, and skills matrix.',
    icon: UserCheck,
  },
  {
    step: '03',
    title: 'Upload Resume',
    desc: 'Upload your latest PDF resume for instant ATS analysis.',
    icon: FileUp,
  },
  {
    step: '04',
    title: 'Apply',
    desc: 'Browse eligible campus drives and submit applications in 1 click.',
    icon: Send,
  },
  {
    step: '05',
    title: 'Interview',
    desc: 'Attend technical and HR interview rounds with scheduled slots.',
    icon: Users,
  },
  {
    step: '06',
    title: 'Get Placed',
    desc: 'Receive official appointment offer letters directly on the portal.',
    icon: Award,
  },
];

const TimelineSection = () => {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Seamless Recruitment Journey
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            The <span className="gradient-text-blue">Placement Process</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            From initial registration to holding your official appointment offer letter in hand.
          </p>
        </div>

        {/* Timeline Desktop Horizontal Steps */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-[6%] right-[6%] h-1 bg-slate-800 -z-0">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-blue-600 via-orange-500 to-emerald-500 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  {/* Icon Circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-20 bg-slate-800 border-2 border-slate-700 group-hover:border-blue-500 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                      <Icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    {/* Number Badge */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-orange-500 text-white font-heading font-extrabold text-xs flex items-center justify-center shadow-md">
                      {item.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-base text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
