import axios from 'axios';

// JWT is stored in localStorage — withCredentials is NOT needed and causes
// unnecessary credentialed CORS preflights that browsers block.
// baseURL is relative so Vite's dev server proxy forwards /api/* to localhost:5000
// — the browser sees same-origin requests, so no CORS preflight is triggered.
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT from localStorage to every request as Bearer token
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
