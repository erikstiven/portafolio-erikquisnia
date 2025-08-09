'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#sobremi', label: 'Sobre mí' },
  { href: '#tecnologias', label: 'Tecnologías' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('#inicio');
  const [progress, setProgress] = useState(0);

  // sombra/blur + progreso lectura
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // scrollspy
  useEffect(() => {
    const sections = navLinks
      .map(l => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive('#' + e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // scroll con offset para anchors internos
  const smoothScroll = (hash: string) => (ev: React.MouseEvent) => {
    // solo intercepta anchors internos (#...)
    if (!hash.startsWith('#')) return;
    ev.preventDefault();
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;

    const header = document.querySelector('header') as HTMLElement | null;
    const offset = (header?.offsetHeight ?? 0) + 8; // acolchonado extra
    const y = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: 'smooth' });
    setOpen(false);
  };

  const headerBase =
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
  const glass =
    'bg-white/70 backdrop-blur-xl border-b border-white/60 supports-[backdrop-filter]:bg-white/55';
  const elevated = scrolled ? 'shadow-lg' : 'shadow-none';

  return (
    <header className={`${headerBase} ${glass} ${elevated}`}>
      {/* barra de progreso lectura */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500"
        style={{ width: `${progress}%` }}
      />

      <nav className="max-w-7xl mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="#inicio" onClick={smoothScroll('#inicio')} className="font-extrabold text-2xl md:text-3xl tracking-tight">
          <span className="bg-gradient-to-r from-blue-700 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            EQdev
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(link => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={smoothScroll(link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative font-semibold transition-colors text-[15px] ${
                  isActive ? 'text-violet-700' : 'text-slate-800 hover:text-violet-700'
                }`}
              >
                {link.label}
                {/* subrayado animado */}
                <span
                  className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full
                              bg-gradient-to-r from-fuchsia-500 to-violet-500 transition-all duration-300
                              ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </a>
            );
          })}

          {/* CTA */}
          <a
            href="#contacto"
            onClick={smoothScroll('#contacto')}
            className="ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold
                       bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg
                       transition-transform active:scale-95"
          >
            Contáctame
          </a>

          {/* Social */}
          <div className="ml-2 flex items-center gap-4">
            <a
              href="https://linkedin.com/in/erikquisnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-blue-700 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://github.com/erikquisnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 transition"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
          </div>
        </div>

        {/* Toggle móvil */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        className={`md:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-xl border-b border-slate-200
                    transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-[120%]'} `}
      >
        <ul className="flex flex-col px-6 py-4 space-y-2">
          {navLinks.map(link => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={smoothScroll(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block rounded-md px-3 py-3 text-base font-semibold transition ${
                    isActive
                      ? 'bg-violet-50 text-violet-700'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between">
          <a
            href="#contacto"
            onClick={smoothScroll('#contacto')}
            className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold
                       bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
          >
            Contáctame
          </a>
          <div className="flex items-center gap-5">
            <a
              href="https://linkedin.com/in/erikquisnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-blue-700 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/erikquisnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 transition"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
