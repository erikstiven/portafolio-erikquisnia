// components/Footer.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaLink } from 'react-icons/fa';
import { useRedes } from '@/hooks/useRedes';
import type { RedSocialSchema } from '@/types/redSocial';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
};

export default function Footer() {
  const redes = useRedes();

  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
          <nav className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-20">

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Branding */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <Link href="/" className="text-2xl font-bold hover:text-white transition">
            Portafy
          </Link>
          <p className="text-sm mt-1">
            &copy; {new Date().getFullYear()} Portafy. Todos los derechos reservados.
          </p>
        </div>

        {/* Íconos sociales */}
        <div className="flex space-x-4">
          {redes.map((r: RedSocialSchema) => {
            const Icon = iconMap[r.nombre] || FaLink;
            return (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition text-2xl"
                aria-label={r.nombre}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
      </nav>
    </footer>
    
  );
}
