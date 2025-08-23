// lib/api.ts
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const base = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/,'')
  : 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: base,
});

console.log('[api] baseURL =', api.defaults.baseURL);

// isFormData helper...
const isFormData = (data: any) => {
  if (!data) return false;
  if (typeof FormData !== 'undefined' && data instanceof FormData) return true;
  const name = data?.constructor?.name;
  if (name === 'FormData') return true;
  if (typeof data.append === 'function' && typeof data.get === 'function') return true;
  return false;
};

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? useAuthStore.getState().token : null;
  if (!config.headers) config.headers = {};
  if (token) (config.headers as any).Authorization = `Bearer ${token}`;

  if (isFormData(config.data)) {
    delete (config.headers as any)['Content-Type'];
    delete (config.headers as any)['content-type'];
  } else {
    if (!(config.headers as any)['Content-Type'] && !(config.headers as any)['content-type']) {
      (config.headers as any)['Content-Type'] = 'application/json';
    }
  }

  return config;
});

export default api;
