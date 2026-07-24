import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { Briefcase, Building, Clock, MapPin, CheckCircle, Search, Filter } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({ totalJobs: 0, appliedCount: 0 });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      // Build query string from filters
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
      setError('Failed to fetch jobs. Make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationStats = async () => {
    try {
      const res = await api.get('/students/my-applications');
      if (res.data.success) {
        setStats(prev => ({ ...prev, appliedCount: res.data.data.length }));
      }
    } catch (err) {
      console.error('Failed to fetch application stats', err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchJobs();
    fetchApplicationStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        alert('Successfully applied to the job!');
        fetchApplicationStats(); // Update stats
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply to the job.');
    }
  };

  const isProfileIncomplete = !profile || !profile.rollNumber || !profile.cgpa;

  return (
    <div className="page-wrapper container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      
      {isProfileIncomplete && (
        <div className="card glass mb-6" style={{ borderLeft: '4px solid var(--warning)', backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
          <div className="flex justify-between items-center sm:flex-col sm:items-start gap-4">
            <div>
              <h4 className="flex items-center gap-2 text-warning"><Filter size={18} /> Profile Incomplete</h4>
              <p className="text-sm text-secondary mt-1">Please complete your profile details (Roll No, CGPA, Resume) to start applying for jobs.</p>
            </div>
            <Link to="/profile" className="btn btn-primary btn-sm">Complete Profile</Link>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h2>Welcome back, <span className="text-primary">{user?.name}</span> 👋</h2>
          <p className="text-secondary mt-1">Explore job opportunities and manage your future.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8 md:grid-cols-1">
        <div className="card glass">
          <div className="text-muted mb-2 flex items-center gap-2"><Briefcase size={18} /> Available Jobs</div>
          <h3>{stats.totalJobs}</h3>
        </div>
        <div className="card glass">
          <div className="text-muted mb-2 flex items-center gap-2"><CheckCircle size={18} /> Jobs Applied</div>
          <h3>{stats.appliedCount}</h3>
        </div>
      </div>

      <div className="card glass mb-8">
        <h3 className="mb-4 flex items-center gap-2">
          <Filter size={18} className="text-primary" /> Filter Jobs
        </h3>
        <form onSubmit={handleFilterSubmit} className="grid grid-cols-4 gap-4 md:grid-cols-2">
          <div>
            <div style={{ position: 'relative' }}>
              <Search className="text-muted" size={16} style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                name="keyword"
                placeholder="Search by title..."
                value={filters.keyword}
                onChange={handleFilterChange}
                className="form-control"
                style={{ paddingLeft: '2.2rem' }}
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              name="location"
              placeholder="Location..."
              value={filters.location}
              onChange={handleFilterChange}
              className="form-control"
            />
          </div>
          <div>
            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="form-control"
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
              placeholder="Your CGPA..."
              value={filters.minCGPA}
              onChange={handleFilterChange}
              className="form-control"
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 1rem' }}>
              Search
            </button>
          </div>
        </form>
      </div>
      
      {error && <div className="p-4 bg-danger/10 text-danger border border-danger mb-4 rounded">{error}</div>}

      <h3 className="mb-4">Recommended Jobs</h3>
      
      {loading ? (
        <div className="text-center p-8 text-secondary flex items-center justify-center gap-2">
          <div className="animate-spin text-primary">⏳</div> Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="card glass text-center p-8 text-secondary">
          No jobs found matching your criteria. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <div key={job._id} className="card glass flex justify-between items-center" style={{ padding: '1.25rem' }}>
              <div className="flex gap-4 items-center">
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: 'var(--bg-surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building className="text-primary" size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem' }}>{job.title}</h4>
                  <div className="text-secondary text-sm flex gap-4 mt-1">
                    <span className="flex items-center gap-1"><Building size={14} /> {job.company?.name || 'Company'}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    {job.eligibility?.minCGPA && (
                       <span className="badge badge-warning text-xs">Min CGPA: {job.eligibility.minCGPA}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right" style={{ display: window.innerWidth > 768 ? 'block' : 'none' }}>
                  <div className="font-medium text-success">{job.salary ? `$${job.salary}` : 'Not Specified'}</div>
                  <div className="text-sm text-secondary">{job.jobType || 'Full-time'}</div>
                </div>
                <button 
                  onClick={() => handleApply(job._id)} 
                  className="btn btn-primary btn-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
