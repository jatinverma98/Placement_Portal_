import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, UserPlus, ShieldCheck } from 'lucide-react';

const CallToAction = ({ onOpenAuth }) => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden border border-slate-800">
          {/* Ambient Glow Blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-orange-400" />
              Take The Next Step Today
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
              Ready to Start Your <span className="gradient-text-blue">Dream Career?</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Create your free verified account now to build ATS-formatted resumes, access exclusive campus recruitment drives, and connect with top technology recruiters.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenAuth('register')}
                className="btn-ripple w-full sm:w-auto px-9 py-4 rounded-20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <UserPlus className="w-5 h-5 text-blue-200" />
                <span>Register Now Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onOpenAuth('login')}
                className="btn-ripple w-full sm:w-auto px-8 py-4 rounded-20 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Existing User? Login</span>
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Free for Students</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>No Credit Card Needed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
