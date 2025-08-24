import './globals.css';
import type { Metadata } from 'next';
import ClientShell from './ClientShell'; // wrapper cliente

export const metadata: Metadata = {
  title: 'Mi aplicación',
  description: 'Descripción de mi app',
  icons: {
    icon: '/logo.png',          // pon tu favicon en /public/favicon.ico
    // apple: '/apple-touch-icon.png',
    // shortcut: '/favicon-32x32.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-slate-900">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
