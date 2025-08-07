'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token && pathname !== '/login') {
      router.replace('/login');
    }
  }, [token, pathname, router]);

  if (!token && pathname !== '/login') {
    return null; // o spinner
  }

  return <>{children}</>;
}
