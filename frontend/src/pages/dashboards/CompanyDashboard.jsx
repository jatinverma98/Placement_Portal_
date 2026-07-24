import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { 
  PlusCircle, Users, BarChart2, Briefcase, MapPin, Calendar, 
  ArrowRight, Sparkles, Building2, CheckCircle2, TrendingUp,
  Clock, ShieldCheck
} from 'lucide-react';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalJobs: 0, totalApplicants: 0 });
  const navigate = useNavigate();

  const fetchCompanyData = async () => {
    try {
      const res = await api.get('/jobs/my-jobs');
      if (res.data.success) {
        setJobs(res.data.data);
        const totalApps = res.data.data.reduce((acc, job) => acc + (job.applicantsCount || 0), 0);
        setStats({
          totalJobs: res.data.count,
          totalApplicants: totalApps
        });
      }
    } catch (err) {
      console.error('Error fetching company jobs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <DashboardLayout activeTab="overview">
      <div className="space-y-8 pb-12">
        {/* 1. RECRUITER WELCOME HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              Recruiter & HR Portal
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              Welcome, <span className="gradient-text">{user?.name}</span> 🏢
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Manage your active recruitment drives, review applicants, and shortlist top campus talent.
            </p>
          </div>

          <Link
            to="/post-job"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer relative z-10"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job Drive</span>
          </Link>
        </div>

        {/* 2. RECRUITER STAT METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Active Job Postings</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">{stats.totalJobs}</div>
              <p className="text-[11px] text-blue-600 font-medium mt-1">Active hiring drives</p>
            </div>
          </div>

          <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Applicants</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">{stats.totalApplicants}</div>
              <p className="text-[11px] text-indigo-600 font-medium mt-1">Submitted resumes</p>
            </div>
          </div>

          <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Hiring Velocity</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">94%</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Shortlist response rate</p>
            </div>
          </div>

          <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Verification Status</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-lg text-emerald-600">Verified Recruiter</div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Enterprise Campus Account</p>
            </div>
          </div>
        </div>

        {/* 3. MY JOB LISTINGS SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-slate-900">My Posted Job Drives</h3>
            <span className="text-xs text-slate-500 font-medium">Showing {jobs.length} listings</span>
          </div>

          {loading ? (
            <div className="bg-white rounded-20 p-12 text-center text-slate-500 border border-slate-200/80 space-y-3">
              <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs font-medium">Loading your posted job listings...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-20 p-12 text-center text-slate-500 border border-slate-200/80 space-y-3">
              <Briefcase className="w-12 h-12 mx-auto text-slate-300" />
              <h4 className="font-heading font-bold text-base text-slate-800">You haven't posted any jobs yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Create your first campus recruitment drive to start receiving applications from qualified candidates.
              </p>
              <Link
                to="/post-job"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post Your First Job</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-xs hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-300 transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-heading font-extrabold text-base border border-blue-100 flex-shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Open'}
                        </span>
                        <span className="px-3 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-extrabold">
                          {job.applicantsCount || 0} Applicants
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => navigate(`/job-applicants/${job._id}`)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white font-semibold text-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Applicants ({job.applicantsCount || 0})</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;
