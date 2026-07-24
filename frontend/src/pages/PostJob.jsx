import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Briefcase, MapPin, Calendar, FileText, Send, Loader, ArrowLeft, DollarSign, ListChecks } from 'lucide-react';

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
            setError(err.response?.data?.message || 'Failed to post job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout activeTab="post-job">
            <div className="space-y-8 pb-12">
                {/* Page Header */}
                <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2 cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back to Dashboard
                        </button>
                        <h2 className="font-heading font-extrabold text-2xl text-slate-900">
                            Post a New <span className="gradient-text">Hiring Drive</span>
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            Create a campus placement drive to attract and screen top student candidates.
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Job Basic Info */}
                    <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-5">
                        <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                            Job Overview & Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Job Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                                    placeholder="e.g. Senior Frontend Developer"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Job Type *</label>
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white transition-all"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Location *</label>
                                <div className="relative">
                                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                                        placeholder="e.g. Pune, Maharashtra / Remote"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">CTC / Salary Range *</label>
                                <div className="relative">
                                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                                        placeholder="e.g. 8 - 12 LPA"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Eligibility & Deadline */}
                    <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-5">
                        <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            Eligibility Criteria & Deadline
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Minimum CGPA Required *</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="minCGPA"
                                    value={formData.eligibility.minCGPA}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                                    placeholder="e.g. 7.5"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Application Deadline *</label>
                                <div className="relative">
                                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description & Requirements */}
                    <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-5">
                        <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <FileText className="w-4 h-4 text-blue-600" />
                            Job Description & Requirements
                        </h3>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Detailed Job Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                                rows={5}
                                placeholder="Describe the role, responsibilities, company culture, and what success looks like in this position..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Requirements (comma separated) *</label>
                            <div className="relative">
                                <ListChecks className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                <input
                                    type="text"
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
                                    placeholder="e.g. React.js, Node.js, REST APIs, 3+ years experience"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            <span>{loading ? 'Publishing Drive...' : 'Publish Hiring Drive'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default PostJob;
