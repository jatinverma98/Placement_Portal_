import React from 'react';

const companies = [
  { name: 'Microsoft', logo: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'Google', logo: '🔍', color: 'from-red-500 via-yellow-500 to-green-500' },
  { name: 'Amazon', logo: '📦', color: 'from-orange-500 to-amber-500' },
  { name: 'Infosys', logo: '🌐', color: 'from-blue-600 to-indigo-600' },
  { name: 'TCS', logo: '⚡', color: 'from-purple-600 to-indigo-600' },
  { name: 'IBM', logo: '📊', color: 'from-blue-700 to-slate-900' },
  { name: 'Accenture', logo: '🚀', color: 'from-purple-500 to-pink-500' },
  { name: 'Meta', logo: '♾️', color: 'from-blue-600 to-sky-400' },
  { name: 'Oracle', logo: '🔴', color: 'from-red-600 to-rose-600' },
  { name: 'Adobe', logo: '🎨', color: 'from-red-500 to-orange-500' },
];

const TrustedCompanies = () => {
  return (
    <section id="companies" className="py-16 bg-white border-y border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
          Trusted by Top Global Recruiters & Fortune 500 Companies
        </p>
      </div>

      {/* Marquee Wrapper with Gradient Edges Fade */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left Blur Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right Blur Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Infinite Marquee Ticker */}
        <div className="animate-marquee flex items-center gap-12 sm:gap-16 py-2">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center gap-3 px-6 py-3.5 rounded-20 bg-slate-50 hover:bg-white border border-slate-200/60 hover:border-blue-200 shadow-xs hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 group cursor-pointer flex-shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform">
                {company.logo}
              </div>
              <span className="font-heading font-bold text-slate-800 group-hover:text-blue-600 text-base sm:text-lg transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
