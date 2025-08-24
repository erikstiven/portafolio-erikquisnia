'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Toaster } from 'sonner';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOn = ['/admin', '/login'];
  const showNavbar = !hideOn.some((p) => pathname.startsWith(p));

  return (
    <>
      <Toaster position="top-right" richColors />
      {showNavbar && <Navbar />}
      <main className={showNavbar ? 'pt-20' : ''}>
        {children}
      </main>
    </>
  );
}
