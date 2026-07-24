import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Briefcase, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };


  return (
    <nav style={styles.navbar} className="glass">
      <div className="container flex justify-between items-center" style={{ height: '100%' }}>
        <Link to={user ? `/dashboard/${user.role}` : "/"} style={{ ...styles.brand, textDecoration: 'none' }}>
          <Briefcase size={24} style={{ color: '#059669' }} />
          <span style={{ color: '#0f172a' }}>Placement<span style={{ color: '#059669' }}>Portal</span></span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              {user.role === 'student' && (
                <Link 
                  to="/profile" 
                  style={{ 
                    color: '#334155', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#059669'}
                  onMouseLeave={(e) => e.target.style.color = '#334155'}
                >
                  <User size={18} />
                  <span>Profile</span>
                </Link>
              )}

              
              <div style={styles.userInfo}>
                <div style={styles.avatar}>
                  {user.profilePicUrl ? (
                    <img src={`http://localhost:5000${user.profilePicUrl}`} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <span className="text-sm">{user.name}</span>
                <span className="badge badge-primary">{user.role}</span>
              </div>

              <button 
                onClick={handleLogout} 
                className="btn btn-outline" 
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-secondary hover:text-primary transition">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    zIndex: 1000,
    borderBottom: '1px solid var(--border)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.4rem',
    fontWeight: 700,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontWeight: 500,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.4rem 1.2rem',
    backgroundColor: 'var(--bg-surface-light)',
    borderRadius: '999px',
    border: '1px solid var(--border)'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Navbar;
