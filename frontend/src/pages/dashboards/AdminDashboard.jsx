import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { 
  BarChart, Users, Briefcase, FileText, CheckCircle, 
  XCircle, Trash2, ShieldCheck, Mail, ShieldAlert, 
  ArrowRight, Search, Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
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
        fetchData();
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const handleVerifyCompany = async (userId) => {
    try {
      await api.put(`/admin/verify-company/${userId}`);
      fetchData();
    } catch (err) {
      alert('Failed to update verification status');
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      try {
        await api.delete(`/jobs/${jobId}`);
        fetchData();
      } catch (err) {
        alert('Failed to delete job');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.company?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-wrapper container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div className="flex justify-between items-center mb-8 sm:flex-col sm:items-start gap-4">
        <div>
          <h2>Admin <span className="text-primary">Control Center</span> 🛡️</h2>
          <p className="text-secondary mt-1">Supervise users, oversee jobs, and monitor system performance.</p>
        </div>
        <div className="flex gap-2 bg-glass p-1 rounded-lg border border-white/5">
          <button 
            onClick={() => { setActiveTab('stats'); setSearchTerm(''); }}
            className={`btn btn-sm ${activeTab === 'stats' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => { setActiveTab('users'); setSearchTerm(''); }}
            className={`btn btn-sm ${activeTab === 'users' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Users
          </button>
          <button 
            onClick={() => { setActiveTab('jobs'); setSearchTerm(''); }}
            className={`btn btn-sm ${activeTab === 'jobs' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Jobs
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-20 text-primary">Loading system data...</div>
      ) : (
        <>
          {activeTab === 'stats' && stats && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-4 gap-6 mb-8 md:grid-cols-2">
                <div className="card glass">
                  <div className="text-muted mb-2 flex items-center gap-2"><Users size={18} /> Students</div>
                  <h3>{stats.counts.students}</h3>
                </div>
                <div className="card glass">
                  <div className="text-muted mb-2 flex items-center gap-2"><Activity size={18} /> Companies</div>
                  <h3>{stats.counts.companies}</h3>
                </div>
                <div className="card glass">
                  <div className="text-muted mb-2 flex items-center gap-2"><Briefcase size={18} /> Total Jobs</div>
                  <h3>{stats.counts.jobs}</h3>
                </div>
                <div className="card glass">
                  <div className="text-muted mb-2 flex items-center gap-2"><FileText size={18} /> Applications</div>
                  <h3>{stats.counts.applications}</h3>
                </div>
              </div>

              <h3 className="mb-6 flex items-center gap-2"><BarChart size={20} className="text-primary" /> Application Breakdown</h3>
              <div className="grid grid-cols-4 gap-6 md:grid-cols-2">
                <div className="card glass b-l-primary" style={{ borderLeft: '4px solid var(--primary)' }}>
                  <div className="text-muted mb-1 text-sm">Applied</div>
                  <h4 className="text-primary">{stats.breakdown.applied}</h4>
                </div>
                <div className="card glass b-l-success" style={{ borderLeft: '4px solid var(--success)' }}>
                  <div className="text-muted mb-1 text-sm">Shortlisted</div>
                  <h4 className="text-success">{stats.breakdown.shortlisted}</h4>
                </div>
                <div className="card glass b-l-warning" style={{ borderLeft: '4px solid #f59e0b' }}>
                  <div className="text-muted mb-1 text-sm">Accepted</div>
                  <h4 style={{ color: '#f59e0b' }}>{stats.breakdown.accepted}</h4>
                </div>
                <div className="card glass b-l-danger" style={{ borderLeft: '4px solid var(--danger)' }}>
                  <div className="text-muted mb-1 text-sm">Rejected</div>
                  <h4 className="text-danger">{stats.breakdown.rejected}</h4>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'users' || activeTab === 'jobs') && (
            <div className="animate-fade-in">
              <div className="card glass mb-6 p-4">
                <div style={{ position: 'relative' }}>
                  <Search className="text-muted" size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    placeholder={`Search ${activeTab}...`} 
                    className="form-control"
                    style={{ paddingLeft: '3rem' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {activeTab === 'users' ? (
                <div className="grid gap-4">
                  {filteredUsers.map(u => (
                    <div key={u._id} className="card glass flex justify-between items-center sm:flex-col sm:items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div style={styles.avatar}>
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="flex items-center gap-2">
                            {u.name}
                            <span className={`badge badge-${u.role === 'admin' ? 'warning' : u.role === 'company' ? 'success' : 'primary'} text-xs`}>
                              {u.role}
                            </span>
                          </h4>
                          <span className="text-sm text-secondary flex items-center gap-1"><Mail size={12} /> {u.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {u.role === 'company' && (
                          <button 
                            onClick={() => handleVerifyCompany(u._id)}
                            className={`btn btn-sm ${u.isVerified ? 'btn-outline text-success' : 'btn-primary'}`}
                          >
                            {u.isVerified ? <><ShieldCheck size={16} /> Verified</> : <><ShieldAlert size={16} /> Verify Company</>}
                          </button>
                        )}
                        {u.role !== 'admin' && (
                          <button onClick={() => handleDeleteUser(u._id)} className="btn btn-danger btn-sm">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredJobs.map(j => (
                    <div key={j._id} className="card glass flex justify-between items-center sm:flex-col sm:items-start gap-4">
                      <div className="flex items-center gap-4">
                        <div style={styles.jobIcon}>
                          <Briefcase size={20} className="text-primary" />
                        </div>
                        <div>
                          <h4>{j.title}</h4>
                          <span className="text-sm text-secondary">Posted by: <strong>{j.company?.name || 'Unknown'}</strong></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleDeleteJob(j._id)} className="btn btn-danger btn-sm">
                          <Trash2 size={16} /> Delete Listing
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--primary-light)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  },
  jobIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    backgroundColor: 'var(--bg-surface-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)'
  }
};

export default AdminDashboard;
