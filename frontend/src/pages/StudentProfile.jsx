import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { User, Camera, GraduationCap, Briefcase, FileText, Save, Loader, AlertCircle, CheckCircle2 } from 'lucide-react';

const StudentProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        rollNumber: '',
        age: '',
        currentSemester: '',
        department: '',
        batch: '',
        cgpa: '',
        bio: '',
        college: '',
        skills: '',
        previousSemesterMarks: ''
    });

    const [files, setFiles] = useState({
        profilePic: null,
        resume: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await api.get('/students/profile');
                if (profileRes.data.success) {
                    const data = profileRes.data.data;
                    setFormData({
                        name: data.user?.name || '',
                        rollNumber: data.rollNumber || '',
                        age: data.age || '',
                        currentSemester: data.currentSemester || '',
                        department: data.department?._id || data.department || '',
                        batch: data.batch || '',
                        cgpa: data.cgpa || '',
                        bio: data.bio || '',
                        college: data.college || '',
                        skills: data.skills?.join(', ') || '',
                        previousSemesterMarks: data.previousSemesterMarks?.join(', ') || ''
                    });
                    if (data.profilePicUrl) {
                        setPreview(`http://localhost:5000${data.profilePicUrl}`);
                    }
                }
            } catch (err) {
                console.log("No profile found yet or error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFiles({ ...files, [e.target.name]: file });

        if (e.target.name === 'profilePic' && file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (files.profilePic) data.append('profilePic', files.profilePic);
        if (files.resume) data.append('resume', files.resume);

        try {
            const res = await api.put('/students/profile', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.success) {
                setMessage({ type: 'success', text: 'Academic Profile updated successfully!' });
            }
        } catch (err) {
            setMessage({ type: 'danger', text: err.response?.data?.message || 'Update failed' });
        } finally {
            setSaving(false);
            window.scrollTo(0, 0);
        }
    };

    if (loading) return (
        <DashboardLayout activeTab="profile">
            <div className="bg-white rounded-20 p-12 text-center text-slate-500 border border-slate-200/80 space-y-3">
                <div className="w-8 h-8 rounded-full border-3 border-blue-600 border-t-transparent animate-spin mx-auto" />
                <p className="text-xs font-medium">Loading academic profile...</p>
            </div>
        </DashboardLayout>
    );

    return (
        <DashboardLayout activeTab="profile">
            <div className="space-y-8 pb-12">
                <div className="flex justify-between items-center bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm">
                    <div>
                        <h2 className="font-heading font-extrabold text-2xl text-slate-900">
                            Academic & <span className="gradient-text">Student Profile</span>
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1">
                            Provide your academic transcript details, skills, and PDF resume to qualify for campus hiring.
                        </p>
                    </div>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                        message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
                    }`}>
                        {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
                        <span>{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal & Photo */}
                    <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-6">
                        <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <User className="w-4 h-4 text-blue-600" />
                            Personal Details & Avatar
                        </h3>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                            <div className="text-center">
                                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 flex items-center justify-center">
                                    {preview ? (
                                        <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-12 h-12 text-slate-400" />
                                    )}
                                    <label className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-sm transition-colors">
                                        <Camera className="w-3.5 h-3.5" />
                                        <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    </label>
                                </div>
                                <p className="text-[11px] font-medium text-slate-400 mt-2">Upload Profile Photo</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Bio / Headline</label>
                                    <input type="text" name="bio" value={formData.bio} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900" placeholder="e.g. Aspiring Full Stack Engineer passionate about Cloud & AI" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Details */}
                    <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-6">
                        <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                            Academic Qualification
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number</label>
                                <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900" required />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Year</label>
                                <input type="number" name="batch" value={formData.batch} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900" placeholder="2026" required />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Semester</label>
                                <input type="number" name="currentSemester" value={formData.currentSemester} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Current CGPA</label>
                                <input type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900" required />
                            </div>
                        </div>
                    </div>

                    {/* Professional Info */}
                    <div className="bg-white rounded-20 p-6 border border-slate-200/80 shadow-sm space-y-6">
                        <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                            Skills & PDF Resume
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Skills (comma separated)</label>
                                <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900" placeholder="React, Node.js, Python, SQL" />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Upload Resume (PDF)</label>
                                <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 flex items-center gap-4">
                                    <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
                                    <div className="flex-1">
                                        <input type="file" name="resume" accept=".pdf" onChange={handleFileChange} className="text-xs text-slate-600" />
                                        <p className="text-[11px] text-slate-400 mt-1">PDF format under 2MB recommended for ATS scanning.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-70"
                        >
                            {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            <span>{saving ? 'Saving Profile...' : 'Save Profile Details'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default StudentProfile;
