import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Shield, ArrowRight, Loader } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await register(formData);
      navigate('/login'); // Backend might auto login, but safer to redirect to login
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper items-center justify-center">
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '450px', margin: '2rem 1rem' }}>
        <div className="text-center mb-6">
          <h2 className="mb-2">Create Account</h2>
          <p className="text-secondary text-sm">Join the Placement Portal today</p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm rounded bg-danger/10 border border-danger text-danger flex items-center justify-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group flex" style={{ flexDirection: 'row', gap: '1rem', marginBottom: '1rem' }}>
            <label className={`role-card ${formData.role === 'student' ? 'active' : ''}`} style={styles.roleCard}>
              <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} style={{ display: 'none' }} />
              <User size={20} className={formData.role === 'student' ? 'text-primary' : 'text-muted'} />
              <span className={formData.role === 'student' ? 'text-primary' : 'text-secondary'}>Student</span>
            </label>
            <label className={`role-card ${formData.role === 'company' ? 'active' : ''}`} style={styles.roleCard}>
              <input type="radio" name="role" value="company" checked={formData.role === 'company'} onChange={handleChange} style={{ display: 'none' }} />
              <Shield size={20} className={formData.role === 'company' ? 'text-primary' : 'text-muted'} />
              <span className={formData.role === 'company' ? 'text-primary' : 'text-secondary'}>Company</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">{formData.role === 'company' ? 'Company Name' : 'Full Name'}</label>
            <div style={{ position: 'relative' }}>
              <User className="text-muted" size={18} style={styles.inputIcon} />
              <input
                type="text"
                name="name"
                required
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                placeholder={formData.role === 'company' ? "Tech Corp Ltd." : "John Doe"}
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail className="text-muted" size={18} style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                required
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock className="text-muted" size={18} style={styles.inputIcon} />
              <input
                type="password"
                name="password"
                required
                minLength="6"
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mt-4" 
            style={{ width: '100%' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader size={18} className="animate-spin" /> : 'Create Account'}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-secondary">
          Already have an account? <Link to="/login" className="text-primary font-medium">Log in instead</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  inputIcon: {
    position: 'absolute',
    left: '0.8rem',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  roleCard: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '1rem',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    backgroundColor: 'rgba(0,0,0,0.2)',
    transition: 'var(--transition)'
  }
};

// Simple global CSS addition for active role card
const styleNode = document.createElement('style');
styleNode.innerHTML = `
  .role-card:hover { border-color: var(--border-hover); background: rgba(255,255,255,0.05); }
  .role-card.active { border-color: var(--primary); background: var(--primary-light); }
`;
document.head.appendChild(styleNode);

export default Register;
