import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { User, FileText, CheckCircle, XCircle, ArrowLeft, ExternalLink, Calendar, Mail } from 'lucide-react';

const JobApplicants = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [job, setJob] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const [jobRes, appRes] = await Promise.all([
                api.get(`/jobs/${jobId}`),
                api.get(`/applications/job/${jobId}`)
            ]);
            setJob(jobRes.data.data);
            setApplicants(appRes.data.data);
        } catch (err) {
            setError('Failed to fetch applicant data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jobId]);

    const handleUpdateStatus = async (appId, status) => {
        try {
            const res = await api.put(`/applications/${appId}/status`, { status });
            if (res.data.success) {
                // Refresh data
                fetchData();
            }
        } catch (err) {
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="page-wrapper items-center justify-center text-primary">Loading Applicants...</div>;

    if (error) return (
        <div className="page-wrapper items-center justify-center">
            <div className="badge badge-danger p-4">{error}</div>
            <button onClick={() => navigate(-1)} className="btn btn-primary mt-4">Back to Dashboard</button>
        </div>
    );

    return (
        <div className="page-wrapper container animate-fade-in" style={{ paddingBottom: '3rem' }}>
            <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm mb-6">
                <ArrowLeft size={16} /> Dashboard
            </button>

            <div className="flex justify-between items-center mb-8 sm:flex-col sm:items-start gap-4">
                <div>
                    <h2>Applications for <span className="text-primary">{job?.title}</span></h2>
                    <p className="text-secondary mt-1 flex items-center gap-4">
                        <span className="flex items-center gap-1"><Calendar size={14} /> Posted {new Date(job?.createdAt).toLocaleDateString()}</span>
                        <span className="badge badge-primary">{applicants.length} Applicants</span>
                    </p>
                </div>
            </div>

            <div className="grid gap-4">
                {applicants.length === 0 ? (
                    <div className="card glass text-center p-12 text-secondary">
                        <User size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No students have applied for this position yet.</p>
                    </div>
                ) : (
                    applicants.map((app) => (
                        <div key={app._id} className="card glass flex justify-between items-center md:flex-col md:items-start gap-6">
                            <div className="flex gap-4 items-center">
                                <div style={styles.avatar}>
                                    {app.student?.profilePicUrl ? (
                                        <img src={`http://localhost:5000${app.student.profilePicUrl}`} alt="" style={styles.avatarImg} />
                                    ) : (
                                        <User size={24} />
                                    )}
                                </div>
                                <div>
                                    <h4 className="flex items-center gap-2">
                                        {app.student?.name}
                                        <span className={`badge badge-${app.status === 'shortlisted' ? 'success' : app.status === 'rejected' ? 'danger' : 'primary'} text-xs`}>
                                            {app.status}
                                        </span>
                                    </h4>
                                    <div className="text-secondary text-sm flex gap-4 mt-1 md:flex-col md:gap-1">
                                        <span className="flex items-center gap-1"><Mail size={14} /> {app.student?.email}</span>
                                        <span className="flex items-center gap-1">Roll: <strong>{app.studentProfile?.rollNumber || 'N/A'}</strong></span>
                                        <span className="flex items-center gap-1">CGPA: <strong className="text-primary">{app.studentProfile?.cgpa || 'N/A'}</strong></span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 md:w-full md:justify-end">
                                {app.studentProfile?.resumeUrl && (
                                    <a 
                                        href={`http://localhost:5000${app.studentProfile.resumeUrl}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="btn btn-outline btn-sm"
                                    >
                                        <FileText size={16} /> Resume <ExternalLink size={12} />
                                    </a>
                                )}
                                
                                {app.status === 'applied' && (
                                    <>
                                        <button 
                                            onClick={() => handleUpdateStatus(app._id, 'shortlisted')} 
                                            className="btn btn-primary btn-sm"
                                        >
                                            <CheckCircle size={16} /> Shortlist
                                        </button>
                                        <button 
                                            onClick={() => handleUpdateStatus(app._id, 'rejected')} 
                                            className="btn btn-danger btn-sm"
                                        >
                                            <XCircle size={16} /> Reject
                                        </button>
                                    </>
                                )}
                                
                                {app.status !== 'applied' && (
                                    <button 
                                        onClick={() => handleUpdateStatus(app._id, 'applied')} 
                                        className="btn btn-outline btn-sm text-muted"
                                    >
                                        Reset Status
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    avatar: {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-surface-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        border: '2px solid var(--border)'
    },
    avatarImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
};

export default JobApplicants;
