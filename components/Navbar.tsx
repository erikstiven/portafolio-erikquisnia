'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const phone = '0979018689';
const waPhone = '593' + phone.replace(/^0/, ''); // 593979018689
const waMsg = encodeURIComponent('Hola, vi tu portafolio y me gustaría conversar contigo.');

const navLinks = [
  { href: '#hero', label: 'Inicio' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#sobremi', label: 'Sobre mí' },
  { href: '#tecnologias', label: 'Tecnologías' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('#hero');
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const smoothScroll = (hash: string) => (ev: React.MouseEvent) => {
    if (!hash.startsWith('#')) return;
    ev.preventDefault();
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    const header = document.getElementById('site-header');
    const offset = (header?.offsetHeight ?? 0) + 10;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setOpen(false);
  };

  const headerBase = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
  const glass =
    'bg-white/75 backdrop-blur-xl border-b border-white/60 supports-[backdrop-filter]:bg-white/60';
  const elevated = scrolled ? 'shadow-md' : 'shadow-none';

  return (
    <header id="site-header" className={`${headerBase} ${glass} ${elevated}`}>
      <div
        className="absolute bottom-0 left-0 h-[2px] md:h-[2px] bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500"
        style={{ width: `${progress}%` }}
      />

      {/* ↓ Altura reducida */}
      <nav className="max-w-7xl mx-auto px-6 md:px-8 h-[60px] md:h-[70px] flex items-center justify-between">
        <Link
          href="#hero"
          onClick={smoothScroll('#hero')}
          className="font-extrabold text-2xl md:text-3xl tracking-tight leading-none"
        >
          <span className="bg-gradient-to-r from-blue-700 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
            EQdev
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={smoothScroll(link.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative font-semibold text-[16px] lg:text-[17px] tracking-wide transition-colors ${
                  isActive ? 'text-violet-700' : 'text-slate-800 hover:text-violet-700'
                }`}
              >
                {link.label}
            
              </a>
            );
          })}

          <a
            href={`https://wa.me/${waPhone}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold
                       bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl
                       ring-1 ring-black/5 hover:scale-[1.02] active:scale-95 transition"
          >
            <FaWhatsapp size={18} />
            Contáctame
          </a>

          <div className="ml-1 flex items-center gap-4">
            <a
              href="https://linkedin.com/in/erikquisnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-blue-700 transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/erikquisnia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-slate-900 transition"
              aria-label="GitHub"
              title="GitHub"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>

        <button
          className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 active:scale-95 transition"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </nav>

      {/* Menú móvil — top ajustado a 64px */}
      <div
        className={`md:hidden fixed inset-x-0 top-[64px] bg-white/95 backdrop-blur-xl border-b border-slate-200
                    transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-[120%]'} `}
      >
        <ul className="flex flex-col px-6 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={smoothScroll(link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block rounded-lg px-4 py-3 text-[17px] font-semibold transition ${
                    isActive ? 'bg-violet-50 text-violet-700' : 'text-slate-800 hover:bg-slate-100'
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
            href={`https://wa.me/${waPhone}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold
                       bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
          >
            <FaWhatsapp size={18} />
            Contáctame
          </a>
          <div className="flex items-center gap-6">
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
      </div>
    </header>
  );
}
