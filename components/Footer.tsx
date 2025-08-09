// components/Footer.tsx
'use client';

import Link from 'next/link';
import { useRedes } from '@/hooks/useRedes';      // <- ajusta si tu ruta es distinta
import type { RedSocial } from '@/types/redSocial';

import {
  FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook, FaYoutube,
  FaWhatsapp, FaBehance, FaDribbble, FaMedium, FaLink,
} from 'react-icons/fa';
import { FaTiktok, FaThreads, FaTelegram, FaDiscord } from 'react-icons/fa6';

function pickIconByKey(key: string) {
  const k = key.toLowerCase();
  const map: Record<string, any> = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    x: FaTwitter,
    instagram: FaInstagram,
    youtube: FaYoutube,
    facebook: FaFacebook,
    whatsapp: FaWhatsapp,
    tiktok: FaTiktok,
    threads: FaThreads,
    behance: FaBehance,
    dribbble: FaDribbble,
    medium: FaMedium,
    telegram: FaTelegram,
    discord: FaDiscord,
    web: FaLink,
    website: FaLink,
    portfolio: FaLink,
    link: FaLink,
  };
  return map[k] ?? FaLink;
}

function pickIconFrom(r: RedSocial) {
  // 1) si tu API envía `icono`, se respeta
  if (r.icono) return pickIconByKey(r.icono);

  // 2) fallback por nombre / url
  const n = (r.nombre ?? '').toLowerCase();
  const u = (r.url ?? '').toLowerCase();
  const has = (...keys: string[]) => keys.some(k => n.includes(k) || u.includes(k));

  if (has('github')) return FaGithub;
  if (has('linkedin')) return FaLinkedin;
  if (has('twitter', 'x.com')) return FaTwitter;
  if (has('instagram')) return FaInstagram;
  if (has('youtube', 'youtu.be')) return FaYoutube;
  if (has('facebook')) return FaFacebook;
  if (has('whatsapp', 'wa.me', 'api.whatsapp')) return FaWhatsapp;
  if (has('tiktok')) return FaTiktok;
  if (has('threads')) return FaThreads;
  if (has('behance')) return FaBehance;
  if (has('dribbble')) return FaDribbble;
  if (has('medium')) return FaMedium;
  if (has('telegram')) return FaTelegram;
  if (has('discord')) return FaDiscord;
  return FaLink;
}

export default function Footer() {
  const { redes, loading } = useRedes(); // ← ahora sí dentro del componente
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-950 text-gray-300">
      {/* línea superior con gradiente */}
      <div className="h-[3px] w-full" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* copy */}
          <div className="text-sm leading-relaxed">
            <p className="text-gray-400">© {year} — Erik Quisnia. Todos los derechos reservados.</p>

            {/* Enlaces internos (opcional) */}
             <nav className="mt-2 flex flex-wrap gap-4 text-gray-400">
              <Link href="#proyectos" className="hover:text-white transition">Proyectos</Link>
              <Link href="#experiencia" className="hover:text-white transition">Experiencia</Link>
              <Link href="#sobremi" className="hover:text-white transition">Sobre mí</Link>
              <Link href="#tecnologias" className="hover:text-white transition">Tecnologías</Link>
            </nav> 
          </div>

          {/* redes del módulo */}
          <div className="flex items-center gap-3 md:gap-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-10 w-10 rounded-full bg-white/5 animate-pulse border border-white/10"
                  />
                ))
              : redes.map((r) => {
                  const Icon = pickIconFrom(r);
                  return (
                    <a
                      key={r.id}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={r.nombre ?? 'red social'}
                      title={r.nombre ?? 'red social'}
                      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:text-white transition"
                    >
                      <Icon className="text-[18px]" />
                    </a>
                  );
                })}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-xs text-gray-500">
          <span>Construido con Next.js, TypeScript y TailwindCSS.</span>
        </div>
      </div>
    </footer>
  );
}
