import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Briefcase, MapPin, DollarSign, Calendar, FileText, Send, Loader, ArrowLeft } from 'lucide-react';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        salary: '',
        jobType: 'Full-time',
        deadline: '',
        eligibility: {
            minCGPA: ''
        },
        requirements: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'minCGPA') {
            setFormData({
                ...formData,
                eligibility: { ...formData.eligibility, minCGPA: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await api.post('/jobs/create', {
                ...formData,
                requirements: formData.requirements.split(',').map(r => r.trim())
            });
            if (res.data.success) {
                navigate('/dashboard/company');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper container animate-fade-in" style={{ paddingBottom: '3rem' }}>
            <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm mb-6">
                <ArrowLeft size={16} /> Back
            </button>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2>Post a New <span className="text-primary">Job Opening</span></h2>
                    <p className="text-secondary mt-1">Hire the best talent for your organization.</p>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded border badge-danger" style={{ display: 'block', width: '100%', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
                <div className="card glass">
                    <h3 className="mb-6 flex items-center gap-2"><Briefcase size={20} className="text-primary" /> Job Information</h3>
                    
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
                        <div className="form-group">
                            <label className="form-label">Job Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleChange} 
                                className="form-control" 
                                placeholder="e.g. Senior Frontend Developer"
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Job Type</label>
                            <select 
                                name="jobType" 
                                value={formData.jobType} 
                                onChange={handleChange} 
                                className="form-control"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin className="text-muted" size={18} style={styles.inputIcon} />
                                <input 
                                    type="text" 
                                    name="location" 
                                    value={formData.location} 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    style={{ paddingLeft: '2.5rem' }}
                                    placeholder="e.g. Remote or City, Country"
                                    required 
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Salary Range</label>
                            <div style={{ position: 'relative' }}>
                                <DollarSign className="text-muted" size={18} style={styles.inputIcon} />
                                <input 
                                    type="text" 
                                    name="salary" 
                                    value={formData.salary} 
                                    onChange={handleChange} 
                                    className="form-control" 
                                    style={{ paddingLeft: '2.5rem' }}
                                    placeholder="e.g. $80k - $120k"
                                    required 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card glass">
                    <h3 className="mb-6 flex items-center gap-2"><Calendar size={20} className="text-primary" /> Eligibility & Deadline</h3>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-1">
                        <div className="form-group">
                            <label className="form-label">Minimum CGPA Required</label>
                            <input 
                                type="number" 
                                step="0.1" 
                                name="minCGPA" 
                                value={formData.eligibility.minCGPA} 
                                onChange={handleChange} 
                                className="form-control" 
                                placeholder="e.g. 7.5"
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Application Deadline</label>
                            <input 
                                type="date" 
                                name="deadline" 
                                value={formData.deadline} 
                                onChange={handleChange} 
                                className="form-control" 
                                required 
                            />
                        </div>
                    </div>
                </div>

                <div className="card glass">
                    <h3 className="mb-6 flex items-center gap-2"><FileText size={20} className="text-primary" /> Detailed Description</h3>
                    <div className="form-group">
                        <label className="form-label">Job Description</label>
                        <textarea 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            className="form-control" 
                            style={{ minHeight: '150px' }}
                            placeholder="Describe the role, responsibilities, and expectations..."
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Requirements (comma separated)</label>
                        <input 
                            type="text" 
                            name="requirements" 
                            value={formData.requirements} 
                            onChange={handleChange} 
                            className="form-control" 
                            placeholder="e.g. React, Node.js, AWS, 3+ years experience"
                            required 
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => navigate(-1)} className="btn btn-outline">Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? <Loader size={18} className="animate-spin" /> : <Send size={18} />}
                        {loading ? 'Posting...' : 'Post Job'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    inputIcon: {
        position: 'absolute',
        left: '0.8rem',
        top: '50%',
        transform: 'translateY(-50%)'
    }
};

export default PostJob;
