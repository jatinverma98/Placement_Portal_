import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { User, Camera, BookOpen, GraduationCap, Briefcase, FileText, Save, Loader } from 'lucide-react';

const StudentProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [departments, setDepartments] = useState([]);
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
                // 1. Fetch profile
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
                // 2. Fetch departments (optional implementation in backend check)
                // const deptRes = await api.get('/admin/departments'); // Assuming this exists or will be added
                // setDepartments(deptRes.data.data);
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
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
            }
        } catch (err) {
            setMessage({ type: 'danger', text: err.response?.data?.message || 'Update failed' });
        } finally {
            setSaving(false);
            window.scrollTo(0, 0);
        }
    };

    if (loading) return <div className="page-wrapper items-center justify-center text-primary">Loading Profile...</div>;

    return (
        <div className="page-wrapper container animate-fade-in" style={{ paddingBottom: '3rem' }}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2>Complete Your <span className="text-primary">Profile</span></h2>
                    <p className="text-secondary mt-1">Provide your academic and personal details to apply for jobs.</p>
                </div>
            </div>

            {message.text && (
                <div className={`mb-6 p-4 rounded border badge-${message.type}`} style={{ display: 'block', width: '100%', textAlign: 'center' }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
                {/* 1. Basic & Profile Photo */}
                <div className="card glass">
                    <h3 className="mb-6 flex items-center gap-2"><User size={20} className="text-primary" /> Personal Information</h3>
                    <div className="flex gap-8 items-start md:flex-col">
                        <div className="text-center">
                            <div style={styles.photoUpload}>
                                {preview ? (
                                    <img src={preview} alt="Profile" style={styles.photoPreview} />
                                ) : (
                                    <div style={styles.photoPlaceholder}><User size={40} /></div>
                                )}
                                <label style={styles.cameraIcon}>
                                    <Camera size={16} />
                                    <input type="file" name="profilePic" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                </label>
                            </div>
                            <p className="text-xs text-muted mt-2">Upload Photo</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 flex-1">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Bio</label>
                                <input type="text" name="bio" value={formData.bio} onChange={handleChange} className="form-control" placeholder="Brief about yourself" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">College / University</label>
                                <input type="text" name="college" value={formData.college} onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Academic Details */}
                <div className="card glass">
                    <h3 className="mb-6 flex items-center gap-2"><GraduationCap size={20} className="text-primary" /> Academic Details</h3>
                    <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
                        <div className="form-group">
                            <label className="form-label">Roll Number</label>
                            <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Batch (Year)</label>
                            <input type="number" name="batch" value={formData.batch} onChange={handleChange} className="form-control" placeholder="e.g. 2026" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Current Semester</label>
                            <input type="number" name="currentSemester" value={formData.currentSemester} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Current CGPA</label>
                            <input type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Department ID</label>
                            <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" placeholder="Paste Dept ID" />
                        </div>
                    </div>
                    <div className="form-group mt-4">
                        <label className="form-label">Previous Semester Marks (comma separated Pointers)</label>
                        <input type="text" name="previousSemesterMarks" value={formData.previousSemesterMarks} onChange={handleChange} className="form-control" placeholder="e.g. 8.5, 9.1, 7.8" />
                    </div>
                </div>

                {/* 3. Skills & Resume */}
                <div className="card glass">
                    <h3 className="mb-6 flex items-center gap-2"><Briefcase size={20} className="text-primary" /> Professional Info</h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="form-group">
                            <label className="form-label">Skills (comma separated)</label>
                            <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="form-control" placeholder="React, Node.js, ML, SQL" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Resume (PDF only)</label>
                            <div className="card" style={{ border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                                <FileText className="text-primary" size={24} />
                                <div className="flex-1">
                                    <input type="file" name="resume" accept=".pdf" onChange={handleFileChange} />
                                    <p className="text-xs text-muted mt-1">Upload your latest professional resume in PDF format (Max 2MB).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" className="btn btn-outline">Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? <Loader size={18} className="animate-spin" /> : <Save size={18} />}
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    photoUpload: {
        position: 'relative',
        width: '120px',
        height: '120px',
        margin: '0 auto',
    },
    photoPreview: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '3px solid var(--primary)',
    },
    photoPlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-surface-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed var(--border)',
        color: 'var(--text-muted)'
    },
    cameraIcon: {
        position: 'absolute',
        bottom: '5px',
        right: '5px',
        backgroundColor: 'var(--primary)',
        color: 'white',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-md)',
        border: '2px solid var(--bg-surface)'
    }
};

export default StudentProfile;
