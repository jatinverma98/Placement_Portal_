import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { 
  Briefcase, Building2, Clock, MapPin, CheckCircle2, Search, Filter, 
  Sparkles, ArrowRight, UserCheck, AlertCircle, Calendar, ChevronRight,
  GraduationCap, Award, TrendingUp, FileText, CheckCircle, XCircle
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({ totalJobs: 0, appliedCount: 0, shortlistedCount: 0 });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { showNotification } = useNotification();

  // Filters state
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    minCGPA: ''
  });

  const fetchProfile = async () => {
    try {
      const res = await api.get('/students/profile');
      if (res.data.success) {
        setProfile(res.data.data);
      }
    } catch (err) {
      console.log("Profile not created yet");
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.keyword) params.append('keyword', filters.keyword);
      if (filters.location) params.append('location', filters.location);
      if (filters.jobType) params.append('jobType', filters.jobType);
      if (filters.minCGPA) params.append('minCGPA', filters.minCGPA);

      const res = await api.get(`/jobs?${params.toString()}`);
      if (res.data.success) {
        setJobs(res.data.data);
        setStats(prev => ({ ...prev, totalJobs: res.data.totalJobs || res.data.data.length }));
      }
    } catch (err) {
      setError('Failed to fetch jobs. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await api.get('/students/my-applications');
      if (res.data.success) {
        const apps = res.data.data || [];
        setApplications(apps);
        const shortlisted = apps.filter(a => a.status === 'shortlisted' || a.status === 'accepted').length;
        setStats(prev => ({ 
          ...prev, 
          appliedCount: apps.length,
          shortlistedCount: shortlisted
        }));
      }
    } catch (err) {
      console.error('Failed to fetch application stats', err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchJobs();
    fetchApplications();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleApply = async (jobId) => {
    try {
      const res = await api.post(`/applications/apply/${jobId}`);
      if (res.data.success) {
        showNotification('Successfully applied to the job!', 'success');
        fetchApplications();
      }
    } catch (err) {
      showNotification(err.response?.data?.message || 'Failed to apply to the job.', 'error');
    }
  };

  const isProfileIncomplete = !profile || !profile.rollNumber || !profile.cgpa;

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-8 pb-12">
        {/* 1. PROFILE INCOMPLETE ALERT BANNER */}
        {isProfileIncomplete && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-20 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-300/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-amber-500/20">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                  Academic Profile Incomplete
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">Action Needed</span>
                </h4>
                <p className="text-slate-600 text-xs mt-0.5">
                  Complete your Roll Number, CGPA, and Resume upload to qualify for company placement drives.
                </p>
              </div>
            </div>
            <Link
              to="/profile"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
            >
              <span>Complete Profile Now</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* 2. WELCOME BANNER HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Student Career Dashboard
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              Welcome back, <span className="gradient-text">{user?.name}</span> 👋
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Track your active job applications, check upcoming campus drives, and land your dream offer.
            </p>
          </div>

          <Link
            to="/profile"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer relative z-10"
          >
            <UserCheck className="w-4 h-4" />
            <span>View Academic Profile</span>
          </Link>
        </div>

        {/* 3. METRIC STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Live Opportunities</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">{stats.totalJobs}</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Active hiring drives</p>
            </div>
          </div>

          <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Jobs Applied</span>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">{stats.appliedCount}</div>
              <p className="text-[11px] text-indigo-600 font-medium mt-1">Submitted applications</p>
            </div>
          </div>

          <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Shortlisted / Offers</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">{stats.shortlistedCount}</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">Interview invitations</p>
            </div>
          </div>

          <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">CGPA Qualification</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">{profile?.cgpa || 'N/A'}</div>
              <p className="text-[11px] text-slate-500 font-medium mt-1">Batch {profile?.batch || '2026'}</p>
            </div>
          </div>
        </div>

        {/* 4. SEARCH & FILTER CARD */}
        <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              Filter Job Opportunities
            </h3>
            <span className="text-xs text-slate-400 font-medium">Real-time drive search</span>
          </div>

          <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="keyword"
                placeholder="Search job title or keyword..."
                value={filters.keyword}
                onChange={handleFilterChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <input
                type="text"
                name="location"
                placeholder="Location (e.g. Pune, Remote)"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
              >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                name="minCGPA"
                placeholder="Min CGPA"
                value={filters.minCGPA}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer flex-shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* 5. RECOMMENDED JOBS LISTING */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-slate-900">Recommended Jobs</h3>
            <span className="text-xs text-slate-500 font-medium">Showing {jobs.length} drives</span>
          </div>

          {loading ? (
            <div className="bg-white rounded-20 p-12 text-center text-slate-500 border border-slate-200/80 space-y-3">
              <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin mx-auto" />
              <p className="text-xs font-medium">Fetching verified campus hiring drives...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-20 p-12 text-center text-slate-500 border border-slate-200/80 space-y-2">
              <Briefcase className="w-10 h-10 mx-auto text-slate-300" />
              <p className="font-heading font-bold text-sm text-slate-800">No jobs found matching your criteria</p>
              <p className="text-xs text-slate-500">Try adjusting your filters or searching for different keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-xs hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-300 transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-heading font-extrabold text-base border border-slate-200 group-hover:bg-blue-600 group-hover:text-white transition-colors flex-shrink-0">
                      {job.company?.name?.charAt(0) || 'C'}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heading font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {job.company?.name || 'Top Hiring Partner'}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        {job.eligibility?.minCGPA && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                            Min CGPA: {job.eligibility.minCGPA}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <div className="font-heading font-extrabold text-sm text-slate-900">{job.salary || 'Competitive'}</div>
                      <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{job.jobType || 'Full-time'}</div>
                    </div>

                    <button
                      onClick={() => handleApply(job._id)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* 6. RECENT APPLICATIONS TABLE */}
        {applications.length > 0 && (
          <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              My Application History
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 px-2">Job Role</th>
                    <th className="pb-3 px-2">Company</th>
                    <th className="pb-3 px-2">Status</th>
                    <th className="pb-3 px-2 text-right">Applied Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 px-2 font-bold text-slate-900">{app.job?.title || 'Job Opening'}</td>
                      <td className="py-3 px-2 text-slate-600">{app.job?.company?.name || 'Company'}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          app.status === 'shortlisted' || app.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {app.status === 'shortlisted' || app.status === 'accepted' ? (
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                          ) : app.status === 'rejected' ? (
                            <XCircle className="w-3 h-3 text-red-600" />
                          ) : (
                            <Clock className="w-3 h-3 text-blue-600" />
                          )}
                          <span className="capitalize">{app.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right text-slate-400 font-medium">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
