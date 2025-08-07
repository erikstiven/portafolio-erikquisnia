'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#sobremi', label: 'Sobre mí' },
  { href: '#tecnologias', label: 'Tecnologías' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`
      w-full z-50 top-0 sticky transition-all duration-300
      ${scrolled ? 'backdrop-blur-xl bg-white/70 shadow-md border-b border-gray-200' : 'bg-transparent'}
    `}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="#inicio" className="font-bold text-2xl text-blue-900 tracking-wide select-none">
          <span className="bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">EQdev</span>
        </Link>

        {/* Menu */}
        <div className="flex gap-10 items-center">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200 text-lg"
            >
              {link.label}
            </a>
          ))}
          {/* Redes */}
          <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl text-gray-700 hover:text-blue-700 transition" />
          </a>
          <a href="https://github.com/tuusuario" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl text-gray-700 hover:text-blue-700 transition" />
          </a>
        </div>
      </nav>
    </header>
  );
}
