import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Matches backend server
  withCredentials: true, // Necessary if backend sets HTTP-only cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optionally, if JWT is stored in localStorage instead of purely cookies
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
