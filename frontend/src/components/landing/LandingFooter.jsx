import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Sparkles, Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react';

const LandingFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-12 border-t border-slate-900 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-slate-900">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-2.5 group inline-flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-600 to-orange-500 p-0.5 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                Placement<span className="text-blue-500">Portal</span>
                <Sparkles className="w-4 h-4 text-orange-500" />
              </span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The premier placement management system connecting ambitious students with Fortune 500 corporations and fast-scaling tech companies.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Tech Park Tower, Placement Cell HQ, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@placementportal.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+91 (020) 2450-8800</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#jobs" className="hover:text-blue-400 transition-colors">
                  Explore Jobs
                </a>
              </li>
              <li>
                <a href="#companies" className="hover:text-blue-400 transition-colors">
                  Hiring Partners
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#students" className="hover:text-blue-400 transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: For Students */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              For Students
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400 transition-colors">
                  Register Account
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  AI Resume Checker
                </a>
              </li>
              <li>
                <a href="#jobs" className="hover:text-blue-400 transition-colors">
                  Job Matcher
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: For Companies */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase">
              For Employers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-blue-400 transition-colors">
                  Recruiter Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400 transition-colors">
                  Post New Job Drive
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">
                  Candidate Analytics
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1 text-slate-400">
            <span>© {new Date().getFullYear()} PlacementPortal. Built with precision for excellence.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
