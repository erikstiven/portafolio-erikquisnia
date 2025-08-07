// app/admin/layout.tsx
'use client';
import { ReactNode } from 'react';
import AuthGuard from '@/components/ui/AuthGuard';
import Sidebar from '@/components/ui/Sidebar';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 mt-6 p-4">{children}</main>
      </div>
    </AuthGuard>
  );
}
