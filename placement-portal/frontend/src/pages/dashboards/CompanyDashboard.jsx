import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { PlusCircle, Users, BarChart, Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';

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
    <div className="page-wrapper container animate-fade-in" style={{ paddingBottom: '3rem' }}>
      <div className="flex justify-between items-center mb-8 sm:flex-col sm:items-start gap-4">
        <div>
          <h2>Company Portal, <span className="text-primary">{user?.name}</span> 🏢</h2>
          <p className="text-secondary mt-1">Manage your job postings and track incoming talent.</p>
        </div>
        <Link to="/post-job" className="btn btn-primary">
          <PlusCircle size={18} />
          Post New Job
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8 md:grid-cols-1">
        <div className="card glass">
          <div className="text-muted mb-2 flex items-center gap-2"><BarChart size={18} /> Active Listings</div>
          <h3>{stats.totalJobs}</h3>
        </div>
        <div className="card glass">
          <div className="text-muted mb-2 flex items-center gap-2"><Users size={18} /> Total Applicants</div>
          <h3>{stats.totalApplicants}</h3>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3>My Job Listings</h3>
      </div>
      
      {loading ? (
        <div className="text-center p-12 text-secondary">Loading your jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="card glass text-center p-12 text-secondary">
           <Briefcase size={40} className="mx-auto mb-4 opacity-20" />
           <p>You haven't posted any jobs yet.</p>
           <Link to="/post-job" className="text-primary mt-2 inline-block">Post your first job now</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job._id} className="card glass flex justify-between items-center md:flex-col md:items-start gap-4">
              <div className="flex gap-4 items-center">
                <div style={styles.jobIcon}>
                  <Briefcase className="text-primary" size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem' }}>{job.title}</h4>
                  <div className="text-secondary text-sm flex gap-4 mt-1 md:flex-col md:gap-1">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    <span className="badge badge-primary">{job.applicantsCount || 0} Applicants</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 md:w-full md:justify-end">
                <button 
                  onClick={() => navigate(`/job-applicants/${job._id}`)} 
                  className="btn btn-outline btn-sm"
                >
                  View Applicants <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  jobIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'var(--bg-surface-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border)'
  }
};

export default CompanyDashboard;

