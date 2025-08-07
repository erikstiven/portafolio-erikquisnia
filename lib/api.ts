import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL + '/api'
    : 'http://localhost:3001/api',
});

// ✅ Interceptor para agregar token y content-type automáticamente
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Solo para JSON, no para FormData
  if (
    !config.headers['Content-Type'] &&
    !(config.data instanceof FormData)
  ) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

export default api;
