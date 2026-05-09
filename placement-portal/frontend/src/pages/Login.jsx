import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const user = await login(formData.email, formData.password);
      navigate(`/dashboard/${user.role}`);
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper items-center justify-center">
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-6">
          <h2 className="mb-2">Welcome Back</h2>
          <p className="text-secondary text-sm">Enter your credentials to access your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm rounded bg-danger/10 border border-danger text-danger flex items-center justify-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="••••••••"
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
            {isSubmitting ? <Loader size={18} className="animate-spin" /> : 'Log In'}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-secondary">
          Don't have an account? <Link to="/register" className="text-primary font-medium">Create one now</Link>
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
  }
};

export default Login;
