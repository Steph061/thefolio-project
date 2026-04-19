// frontend/src/api/axios.js
import axios from 'axios';

// Use environment variable first, then fallback to the known Render URL for production.
const baseURL = process.env.REACT_APP_API_URL
  || (process.env.NODE_ENV === 'production'
    ? 'https://thefolio-backend-81uo.onrender.com/api'
    : 'http://localhost:5000/api');

const instance = axios.create({
  baseURL,
});

// This interceptor runs before EVERY request.
// It reads the token from localStorage and adds it to the Authorization header.
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;