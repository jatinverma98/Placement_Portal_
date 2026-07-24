import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Sparkles, CheckCircle2, Bell } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden">
          {/* Floating Ambient Blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Floating Decorative Icons */}
          <div className="absolute top-8 left-10 text-blue-400/20 animate-float pointer-events-none hidden sm:block">
            <Bell className="w-12 h-12" />
          </div>
          <div className="absolute bottom-8 right-12 text-orange-400/20 animate-float-delayed pointer-events-none hidden sm:block">
            <Sparkles className="w-14 h-14" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold uppercase tracking-wider">
              <Mail className="w-4 h-4 text-blue-400" />
              Stay Updated Live
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
              Never Miss A <span className="gradient-text-blue">Campus Hiring Drive</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Subscribe to our weekly placement digest to receive instant alerts on new company job openings, salary packages, and placement prep tips.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-20 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold text-base flex items-center justify-center gap-2 max-w-md mx-auto"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Subscribed successfully! Check your inbox soon.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto">
                <div className="relative w-full">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your student email address..."
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-20 bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/20 font-medium text-sm transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-ripple w-full sm:w-auto px-8 py-4 rounded-20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-xs text-slate-400 font-medium pt-2">
              🔒 No spam ever. Unsubscribe at any time with a single click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
