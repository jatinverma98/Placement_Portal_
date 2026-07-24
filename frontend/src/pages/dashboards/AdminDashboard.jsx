import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { 
  BarChart2, Users, Briefcase, FileText, CheckCircle, 
  Trash2, ShieldCheck, Mail, ShieldAlert, 
  Search, Activity, Sparkles, Building2, UserCheck
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats'); // stats, users, jobs
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, jobsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users'),
        api.get('/admin/jobs')
      ]);
      setStats(statsRes.data.data);
      setUsers(usersRes.data.data);
      setJobs(jobsRes.data.data);
    } catch (err) {
      console.error('Failed to fetch admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await api.delete(`/admin/user/${userId}`);
        showNotification('User deleted successfully', 'success');
        fetchData();
      } catch (err) {
        showNotification('Failed to delete user', 'error');
      }
    }
  };

  const handleVerifyCompany = async (userId) => {
    try {
      await api.put(`/admin/verify-company/${userId}`);
      showNotification('Company verification status updated', 'success');
      fetchData();
    } catch (err) {
      showNotification('Failed to update verification status', 'error');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      try {
        await api.delete(`/jobs/${jobId}`);
        showNotification('Job listing deleted successfully', 'success');
        fetchData();
      } catch (err) {
        showNotification('Failed to delete job', 'error');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter(j => 
    j.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-8 pb-12">
        {/* 1. ADMIN WELCOME HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              Administrator Control Center
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              Admin <span className="gradient-text">Overview & Controls</span> 🛡️
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Supervise student accounts, verify corporate recruiters, and monitor campus placement analytics.
            </p>
          </div>

          {/* Sub-tab Navigation */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto relative z-10">
            <button
              onClick={() => { setActiveTab('stats'); setSearchTerm(''); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'stats' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => { setActiveTab('users'); setSearchTerm(''); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'users' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Users ({users.length})
            </button>
            <button
              onClick={() => { setActiveTab('jobs'); setSearchTerm(''); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'jobs' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jobs ({jobs.length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-20 p-12 text-center text-slate-500 border border-slate-200/80 space-y-3">
            <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin mx-auto" />
            <p className="text-xs font-medium">Loading system telemetry and directory...</p>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === 'stats' && stats && (
              <div className="space-y-8">
                {/* Metric Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Registered Students</span>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-2xl text-slate-900">{stats.counts?.students || 0}</div>
                      <p className="text-[11px] text-blue-600 font-medium mt-1">Student candidates</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Recruiter Companies</span>
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Building2 className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-2xl text-slate-900">{stats.counts?.companies || 0}</div>
                      <p className="text-[11px] text-indigo-600 font-medium mt-1">Corporate partners</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Total Job Drives</span>
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Briefcase className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-2xl text-slate-900">{stats.counts?.jobs || 0}</div>
                      <p className="text-[11px] text-emerald-600 font-medium mt-1">Active & past listings</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Total Applications</span>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-2xl text-slate-900">{stats.counts?.applications || 0}</div>
                      <p className="text-[11px] text-amber-600 font-medium mt-1">Total candidate submissions</p>
                    </div>
                  </div>
                </div>

                {/* Application Breakdown */}
                <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-5">
                  <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-blue-600" />
                    Application Pipeline Breakdown
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-blue-50/50 border-l-4 border-blue-600 space-y-1">
                      <span className="text-xs text-slate-500 font-medium">Applied</span>
                      <div className="font-heading font-extrabold text-xl text-blue-600">{stats.breakdown?.applied || 0}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-indigo-50/50 border-l-4 border-indigo-600 space-y-1">
                      <span className="text-xs text-slate-500 font-medium">Shortlisted</span>
                      <div className="font-heading font-extrabold text-xl text-indigo-600">{stats.breakdown?.shortlisted || 0}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50/50 border-l-4 border-emerald-600 space-y-1">
                      <span className="text-xs text-slate-500 font-medium">Accepted Offers</span>
                      <div className="font-heading font-extrabold text-xl text-emerald-600">{stats.breakdown?.accepted || 0}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50/50 border-l-4 border-red-500 space-y-1">
                      <span className="text-xs text-slate-500 font-medium">Rejected</span>
                      <div className="font-heading font-extrabold text-xl text-red-600">{stats.breakdown?.rejected || 0}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* USERS / JOBS TAB WITH SEARCH FILTER */}
            {(activeTab === 'users' || activeTab === 'jobs') && (
              <div className="space-y-6">
                <div className="bg-white rounded-20 p-4 border border-slate-200/80 shadow-sm">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab} by name, email or company...`}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {activeTab === 'users' ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredUsers.map((u) => (
                      <div
                        key={u._id}
                        className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-heading font-extrabold text-base border border-blue-100 flex-shrink-0">
                            {u.name?.charAt(0) || 'U'}
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-2">
                              {u.name}
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                                u.role === 'admin' ? 'bg-amber-100 text-amber-800' : u.role === 'company' ? 'bg-indigo-100 text-indigo-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {u.role}
                              </span>
                            </h4>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5 text-slate-400" /> {u.email}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          {u.role === 'company' && (
                            <button
                              onClick={() => handleVerifyCompany(u._id)}
                              className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                                u.isVerified ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-600 text-white shadow-xs'
                              }`}
                            >
                              {u.isVerified ? (
                                <>
                                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                  <span>Verified</span>
                                </>
                              ) : (
                                <>
                                  <ShieldAlert className="w-4 h-4" />
                                  <span>Verify Company</span>
                                </>
                              )}
                            </button>
                          )}
                          {u.role !== 'admin' && (
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Delete user"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredJobs.map((j) => (
                      <div
                        key={j._id}
                        className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-heading font-extrabold text-base border border-slate-200 flex-shrink-0">
                            <Briefcase className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-sm text-slate-900">{j.title}</h4>
                            <span className="text-xs text-slate-500">
                              Company: <strong className="text-slate-800">{j.company?.name || 'Unknown'}</strong>
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteJob(j._id)}
                          className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer self-end sm:self-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Listing</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
