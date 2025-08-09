'use client';
import './globals.css';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Toaster } from 'sonner';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOn = ['/admin', '/login'];
  const showNavbar = !hideOn.some((p) => pathname.startsWith(p));

  return (
    <html lang="es">
      <body className="bg-white text-slate-900">
        <Toaster position="top-right" richColors />

        {showNavbar && <Navbar />}

        {/* El padding-top por el navbar déjalo aquí, no en <body> */}
        <main className={showNavbar ? 'pt-20' : ''}>
          {children}
        </main>
      </body>
    </html>
  );
}
