'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

interface LoginResponse {
  token: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warning('Debes ingresar tu usuario y contraseña.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { email, password }
      );
      const token = res.data.token;
      setToken(token);
      localStorage.setItem('token', token);
      toast.success('¡Login exitoso!');
      router.push('/admin');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Credenciales incorrectas o error de servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-10 w-full max-w-md">
        {/* Logo + nombre Portafy centrados */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <img src="/logo.png" alt="Portafy logo" className="w-16 h-16 drop-shadow" />
          <span className="text-3xl font-extrabold text-white tracking-tight">Portafy</span>
        </div>
        {/* Campos login */}
        <div className="mb-4">
          <label className="block text-white text-sm font-semibold mb-1">Usuario</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@portafolio.com"
            className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-semibold mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-4 py-3 rounded-md bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black/80 text-white py-3 rounded-md hover:bg-black transition-colors font-semibold disabled:opacity-50"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
        {/* <p className="text-center text-white text-sm mt-4">
          ¿Olvidaste tu contraseña?{' '}
          <a href="#" className="font-semibold underline hover:text-white/80">
            Haz clic aquí
          </a>
        </p> */}
      </div>
    </div>
  );
}
