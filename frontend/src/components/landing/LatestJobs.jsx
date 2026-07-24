import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Briefcase, Building2, Clock, ArrowRight, Sparkles } from 'lucide-react';
import api from '../../utils/api';

const fallbackJobs = [
  {
    _id: '1',
    title: 'Backend Developer (Node.js)',
    company: { name: 'TCS Digital' },
    location: 'Pune / Remote',
    salary: '7.5 - 9.0 LPA',
    jobType: 'Full-time',
    eligibility: { minCGPA: 7.0 },
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Frontend Engineer (React & Next.js)',
    company: { name: 'Accenture Technology' },
    location: 'Bengaluru, KA',
    salary: '8.0 - 10.5 LPA',
    jobType: 'Full-time',
    eligibility: { minCGPA: 7.5 },
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Software Development Engineer I (SDE-1)',
    company: { name: 'Amazon Web Services' },
    location: 'Hyderabad, TS',
    salary: '18.0 - 24.0 LPA',
    jobType: 'Full-time',
    eligibility: { minCGPA: 8.0 },
    createdAt: new Date().toISOString(),
  },
  {
    _id: '4',
    title: 'Cloud Systems Associate',
    company: { name: 'IBM India' },
    location: 'Gurugram / Noida',
    salary: '6.5 - 8.5 LPA',
    jobType: 'Full-time',
    eligibility: { minCGPA: 6.5 },
    createdAt: new Date().toISOString(),
  },
  {
    _id: '5',
    title: 'Data Analyst & BI Engineer',
    company: { name: 'Infosys BPM' },
    location: 'Chennai, TN',
    salary: '7.0 - 9.2 LPA',
    jobType: 'Full-time',
    eligibility: { minCGPA: 7.0 },
    createdAt: new Date().toISOString(),
  },
  {
    _id: '6',
    title: 'DevOps & Reliability Engineer',
    company: { name: 'Oracle India' },
    location: 'Bengaluru, KA',
    salary: '12.0 - 15.0 LPA',
    jobType: 'Full-time',
    eligibility: { minCGPA: 7.5 },
    createdAt: new Date().toISOString(),
  },
];

const LatestJobs = ({ onOpenAuth }) => {
  const [jobs, setJobs] = useState(fallbackJobs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLiveJobs = async () => {
      try {
        const res = await api.get('/jobs?limit=6');
        if (res.data.success && res.data.data.length > 0) {
          setJobs(res.data.data);
        }
      } catch (err) {
        console.log('Using fallback landing page jobs data');
      } finally {
        setLoading(false);
      }
    };
    fetchLiveJobs();
  }, []);

  return (
    <section id="jobs" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Live Hiring Opportunities
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Featured <span className="gradient-text">Job Openings</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Explore active campus recruitment drives with competitive salary packages and verified eligibility requirements.
            </p>
          </div>

          <button
            onClick={() => onOpenAuth && onOpenAuth('login')}
            className="self-start md:self-auto flex items-center gap-2 px-6 py-3 rounded-20 bg-slate-900 hover:bg-blue-600 text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-slate-900/10 hover:shadow-blue-500/25 hover:-translate-y-0.5 group cursor-pointer"
          >
            <span>View All Opportunities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-20 border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Company & Min CGPA Pill */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-20 bg-slate-100 text-slate-800 flex items-center justify-center font-heading font-extrabold text-lg border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {job.company?.name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {job.company?.name || 'Top Hiring Partner'}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                    Min CGPA: {job.eligibility?.minCGPA || '7.0'}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="font-heading font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors pt-2">
                  {job.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                    <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                    {job.salary}
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    {job.jobType || 'Full-time'}
                  </span>
                </div>
              </div>

              {/* Action Apply Button */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Updated today</span>
                <button
                  onClick={() => onOpenAuth && onOpenAuth('login')}
                  className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Apply Now</span>
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

export default LatestJobs;
