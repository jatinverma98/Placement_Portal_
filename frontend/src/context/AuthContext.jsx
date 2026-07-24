import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

// Normalize user object so it always has consistent { id, name, email, role }
const normalizeUser = (userData) => {
  if (!userData) return null;
  return {
    id: userData.id || userData._id,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    profilePicUrl: userData.profilePicUrl || '',
    isVerified: userData.isVerified || false,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On app load, validate token from localStorage
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/auth/me');
        if (res.data.success) {
          setUser(normalizeUser(res.data.user));
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (err) {
        // Token invalid or expired — clear it silently
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        const normalizedUser = normalizeUser(res.data.user);
        setUser(normalizedUser);
        return normalizedUser;
      }
      throw new Error('Login failed. Please try again.');
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      if (res.data.success) {
        return true;
      }
      throw new Error('Registration failed. Please try again.');
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
    } catch (err) {
      // Ignore logout errors — clear state regardless
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, login, register, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Keep useAuth as a named export from this file
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
