import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { User, FileText, CheckCircle, XCircle, ArrowLeft, ExternalLink, Calendar, Mail, RotateCcw, Briefcase, MapPin, Users } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const JobApplicants = () => {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [job, setJob] = useState(null);
    const { showNotification } = useNotification();
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
            setError('Failed to fetch applicant data. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [jobId]);

    const handleUpdateStatus = async (appId, status) => {
        try {
            const res = await api.put(`/applications/${appId}/status`, { status });
            if (res.data.success) {
                showNotification(`Application ${status} successfully!`, 'success');
                fetchData();
            }
        } catch (err) {
            showNotification('Failed to update applicant status', 'error');
        }
    };

    const statusCounts = {
        total: applicants.length,
        shortlisted: applicants.filter(a => a.status === 'shortlisted').length,
        rejected: applicants.filter(a => a.status === 'rejected').length,
        applied: applicants.filter(a => a.status === 'applied').length,
    };

    if (loading) return (
        <DashboardLayout activeTab="my-jobs">
            <div className="bg-white rounded-20 p-12 text-center text-slate-500 border border-slate-200/80 space-y-3">
                <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin mx-auto" />
                <p className="text-xs font-medium">Loading applicant profiles...</p>
            </div>
        </DashboardLayout>
    );

    if (error) return (
        <DashboardLayout activeTab="my-jobs">
            <div className="bg-white rounded-20 p-12 text-center border border-slate-200/80 space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                    <XCircle className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">{error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs cursor-pointer"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Dashboard
                </button>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout activeTab="my-jobs">
            <div className="space-y-8 pb-12">
                {/* Page Header */}
                <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Recruiter Dashboard
                    </button>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="font-heading font-extrabold text-2xl text-slate-900">
                                Applicants for <span className="gradient-text">{job?.title}</span>
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                                {job?.location && (
                                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                                )}
                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />
                                    Posted {new Date(job?.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 self-start md:self-auto">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100">
                                <Users className="w-4 h-4 text-blue-600" />
                                <span className="font-heading font-extrabold text-sm text-blue-700">{statusCounts.total}</span>
                                <span className="text-xs text-blue-600 font-medium">Total Applicants</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-20 p-4 border border-slate-200/80 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="font-heading font-extrabold text-xl text-slate-900">{statusCounts.applied}</div>
                            <div className="text-xs text-slate-500 font-medium">Pending Review</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-20 p-4 border border-slate-200/80 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="font-heading font-extrabold text-xl text-slate-900">{statusCounts.shortlisted}</div>
                            <div className="text-xs text-slate-500 font-medium">Shortlisted</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-20 p-4 border border-slate-200/80 shadow-sm flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                            <XCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="font-heading font-extrabold text-xl text-slate-900">{statusCounts.rejected}</div>
                            <div className="text-xs text-slate-500 font-medium">Rejected</div>
                        </div>
                    </div>
                </div>

                {/* Applicants List */}
                <div className="space-y-4">
                    <h3 className="font-heading font-bold text-base text-slate-900">Candidate Profiles</h3>

                    {applicants.length === 0 ? (
                        <div className="bg-white rounded-20 p-12 text-center border border-slate-200/80 space-y-3">
                            <User className="w-12 h-12 mx-auto text-slate-300" />
                            <h4 className="font-heading font-bold text-sm text-slate-800">No applicants yet</h4>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                No students have applied for this position yet. Share your listing to attract more qualified candidates.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {applicants.map((app) => (
                                <motion.div
                                    key={app._id}
                                    whileHover={{ y: -1 }}
                                    className="bg-white rounded-20 p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center font-heading font-extrabold text-base flex-shrink-0 overflow-hidden">
                                            {app.student?.profilePicUrl ? (
                                                <img
                                                    src={`http://localhost:5000${app.student.profilePicUrl}`}
                                                    alt={app.student?.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span>{app.student?.name?.charAt(0) || 'S'}</span>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-heading font-bold text-sm text-slate-900">
                                                    {app.student?.name}
                                                </h4>
                                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                                                    app.status === 'shortlisted' ? 'bg-emerald-100 text-emerald-800'
                                                    : app.status === 'rejected' ? 'bg-red-100 text-red-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {app.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                    {app.student?.email}
                                                </span>
                                                {app.studentProfile?.rollNumber && (
                                                    <span className="font-semibold text-slate-700">
                                                        Roll: {app.studentProfile.rollNumber}
                                                    </span>
                                                )}
                                                {app.studentProfile?.cgpa && (
                                                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                                                        CGPA: {app.studentProfile.cgpa}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-2 self-end md:self-auto flex-wrap justify-end">
                                        {app.studentProfile?.resumeUrl && (
                                            <a
                                                href={`http://localhost:5000${app.studentProfile.resumeUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                                            >
                                                <FileText className="w-3.5 h-3.5" />
                                                <span>Resume</span>
                                                <ExternalLink className="w-3 h-3 text-slate-400" />
                                            </a>
                                        )}

                                        {app.status === 'applied' && (
                                            <>
                                                <button
                                                    onClick={() => handleUpdateStatus(app._id, 'shortlisted')}
                                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                    <span>Shortlist</span>
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(app._id, 'rejected')}
                                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition-colors cursor-pointer border border-red-100"
                                                >
                                                    <XCircle className="w-3.5 h-3.5" />
                                                    <span>Reject</span>
                                                </button>
                                            </>
                                        )}

                                        {app.status !== 'applied' && (
                                            <button
                                                onClick={() => handleUpdateStatus(app._id, 'applied')}
                                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 font-semibold text-xs transition-colors cursor-pointer"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" />
                                                <span>Reset</span>
                                            </button>
                                        )}
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

export default JobApplicants;
