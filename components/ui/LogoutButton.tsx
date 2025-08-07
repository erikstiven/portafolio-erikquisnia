'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { FiLogOut } from 'react-icons/fi';

export default function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="
        w-full mt-4 flex items-center justify-center gap-2
        px-4 py-2
        bg-gradient-to-r from-rose-600 via-red-500 to-orange-600
        text-white font-semibold rounded-xl
        shadow-md
        transition-all duration-200
        hover:from-rose-600 hover:via-red-600 hover:to-orange-500
        hover:scale-105
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-red-300
      "
    >
      <FiLogOut className="text-lg" />
      <span>Cerrar Sesión</span>
    </button>
  );
}
