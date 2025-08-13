// components/Footer.tsx
'use client';

import Link from 'next/link';
import { useRedes } from '@/hooks/useRedes';
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
  if (r.icono) return pickIconByKey(r.icono);

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
  const { redes, loading } = useRedes();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-white/10">
      {/* línea superior gradiente (visible) */}
      <div className="h-[6px] w-full bg-gradient-to-r " />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12 sm:py-14 lg:py-16">
        {/* TOP: 3 columnas responsivas con más respiro */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {/* Col 1: copy */}
          <div className="space-y-3">
            <h3 className="text-white text-lg sm:text-xl font-semibold">Erik Quisnia</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              © {year}. Todos los derechos reservados.
            </p>
          </div>

          {/* Col 2: enlaces internos — centrado en móvil */}
          <nav className="order-3 md:order-none">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 md:gap-y-4">
              <li>
                <Link href="#proyectos" className="hover:text-white transition text-base">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="#experiencia" className="hover:text-white transition text-base">
                  Experiencia
                </Link>
              </li>
              <li>
                <Link href="#sobremi" className="hover:text-white transition text-base">
                  Sobre mí
                </Link>
              </li>
              <li>
                <Link href="#tecnologias" className="hover:text-white transition text-base">
                  Tecnologías
                </Link>
              </li>
              <li>
                <Link href="#inicio" className="hover:text-white transition text-base">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="hover:text-white transition text-base">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 3: redes — más grandes y con wrap */}
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-4 sm:gap-5">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-white/5 animate-pulse border border-white/10"
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
                      className="group inline-flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 hover:text-white transition"
                    >
                      <Icon className="text-[20px] lg:text-[24px]" />
                    </a>
                  );
                })}
          </div>
        </div>

        {/* BOTTOM: línea y meta — stack en móvil, separados en desktop */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col lg:items-center items-start  justify-between gap-4">
            <p className="text-sm sm:text-base text-gray-400">
              Construido con Next.js, TypeScript y TailwindCSS.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
