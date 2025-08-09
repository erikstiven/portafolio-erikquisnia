'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import LogoutButton from './LogoutButton';

import {
  FaTachometerAlt,
  FaShareAlt,
  FaProjectDiagram,
  FaServicestack,
  FaThList,
  FaBriefcase,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const links = [
  { href: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { href: '/admin/proyectos', label: 'Proyectos', icon: <FaProjectDiagram /> },
  { href: '/admin/servicios', label: 'Servicios', icon: <FaServicestack /> },
  { href: '/admin/redes', label: 'Redes Sociales', icon: <FaShareAlt /> },
  { href: '/admin/categorias', label: 'Categorías', icon: <FaThList /> },
  { href: '/admin/experiencia', label: 'Experiencia', icon: <FaBriefcase /> },
  // { href: '/admin/config', label: 'Ajustes', icon: <FaCog /> }, // Opcional
];


export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Bloquea el scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Enfoca el drawer para accesibilidad
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Cierra con ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (open && e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // --- Sidebar principal (desktop) ---
  const sidebarContent = (
    <div className="flex flex-col h-full justify-between">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          <span className="text-2xl font-bold">Portafy</span>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 group relative focus:outline-none focus:ring-2 focus:ring-white',
                  isActive
                    ? 'bg-white text-blue-900 font-semibold shadow'
                    : 'hover:bg-white/10 hover:pl-5'
                )}
                tabIndex={0}
                onClick={() => setOpen(false)} // Cierra el menú en móvil al navegar
              >
                <span className="text-lg">{link.icon}</span>
                <span className="truncate">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4">
        <LogoutButton />
      </div>
    </div>
  );

  return (
    <>
      {/* --- Botón Hamburguesa (solo móvil) --- */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-700 text-white p-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        type="button"
      >
        <FaBars size={22} />
      </button>

      {/* --- Sidebar fijo en desktop --- */}
      <aside className="hidden md:flex flex-col w-64 bg-gradient-to-b from-purple-900 via-indigo-800 to-purple-700 text-white h-screen sticky top-0 shadow-lg z-30">
        {sidebarContent}
      </aside>

      {/* --- Drawer + overlay para móvil --- */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-all duration-300",
          open ? "visible" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        {/* Overlay oscuro */}
        <div
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />
        {/* Drawer lateral animado */}
        <aside
          className={cn(
            "fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-purple-900 via-indigo-800 to-purple-700 text-white flex flex-col justify-between shadow-2xl transform transition-transform duration-300 h-full",
            open ? "translate-x-0" : "-translate-x-full"
          )}
          tabIndex={0}
        >
          <button
            className="self-end m-4 p-2 text-white rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            type="button"
          >
            <FaTimes size={24} />
          </button>
          {sidebarContent}
        </aside>
      </div>
    </>
  );
}
