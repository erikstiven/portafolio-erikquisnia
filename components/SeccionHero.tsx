'use client';
import { useEffect, useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import HeroParticles from '@/components/HeroParticles';
import api from '@/lib/api';

type Perfil = {
  fotoHeroUrl?: string | null;
  tituloHero?: string | null;
  perfilTecnicoHero?: string | null;
  descripcionHero?: string | null;
  telefono?: string | null;
};

type Red = {
  id: number;
  nombre?: string | null;
  plataforma?: string | null;
  url?: string | null;
  activo?: boolean | null;
};

// Helpers
const onlyDigits = (v?: string | null) => (v ?? '').replace(/\D+/g, '');
const toWhatsappPhone = (ecPhoneRaw?: string | null) => {
  const d = onlyDigits(ecPhoneRaw);
  if (!d) return '';
  if (d.startsWith('593')) return d;
  if (d.startsWith('0')) return '593' + d.slice(1);
  if (d.length === 9) return '593' + d;
  return d;
};

const withProtocol = (u?: string | null) =>
  !u ? '' : /^https?:\/\//i.test(u) ? String(u) : `https://${u}`;

function splitPrimarioSecundario(text?: string | null): [string, string] {
  const t = (text ?? '').trim();
  if (!t) return ['', ''];
  for (const sep of [' / ', ' | ', ' - ']) {
    if (t.includes(sep)) {
      const [a, b] = t.split(sep);
      return [a.trim(), b.trim()];
    }
  }
  const parts = t.split(/\s+/);
  if (parts.length === 1) return [parts[0], ''];
  return [parts[0], parts.slice(1).join(' ')];
}

export default function SeccionHero() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [links, setLinks] = useState<{ github?: string; linkedin?: string }>({});
  const [loading, setLoading] = useState(true);

  // Cargar Perfil
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const { data } = await api.get<Perfil | Perfil[]>('/perfil');
        const p = Array.isArray(data) ? data[0] : data;
        if (alive) setPerfil(p ?? null);
      } catch {
        if (alive) setPerfil(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Cargar Redes
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await api.get<Red[] | { items?: Red[] }>('/redes');
        const arr: Red[] = Array.isArray(data) ? data : (data?.items ?? []);
        const found: { github?: string; linkedin?: string } = {};
        for (const r of arr) {
          const rawName = (r.nombre ?? r.plataforma ?? '').toLowerCase().replace(/\s+/g, '');
          const rawUrl = (r.url ?? '').trim();
          if (!rawUrl) continue;
          const urlLc = rawUrl.toLowerCase();
          const isLinkedIn = rawName.includes('linkedin') || urlLc.includes('linkedin.com');
          const isGitHub = rawName.includes('github') || urlLc.includes('github.com');
          if (isLinkedIn) found.linkedin = withProtocol(rawUrl);
          if (isGitHub) found.github = withProtocol(rawUrl);
        }
        if (alive) setLinks(found);
      } catch {
        if (alive) setLinks({});
      }
    })();
    return () => { alive = false; };
  }, []);

  if (loading) {
    return (
      <section id="hero" className="relative w-full overflow-hidden pt-10 md:pt-14 scroll-mt-28">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex justify-center items-center h-96">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-48 w-48"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Datos normalizados
  const imgSrc = perfil?.fotoHeroUrl?.trim() || '/placeholder/avatar.png';
  const titulo = (perfil?.tituloHero ?? '').trim();
  const [primario, secundario] = splitPrimarioSecundario(perfil?.perfilTecnicoHero);
  const descripcion = (perfil?.descripcionHero ?? '').trim();
  const waPhone = toWhatsappPhone(perfil?.telefono);
  const waMsg = encodeURIComponent('Hola, vi tu portafolio y me gustaría conversar contigo.');
  const showWhatsapp = Boolean(waPhone);
  const linkedinHref = links.linkedin;
  const githubHref = links.github;

  return (
    <section id="hero" className="relative w-full overflow-hidden pt-10 md:pt-14 scroll-mt-28">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-violet-50/60 to-white" />
      <HeroParticles />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="relative z-10 rounded-3xl md:rounded-[1rem] mb-12 shadow-none">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 py-14 md:py-20">

            <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
              <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-white">
                <img
                  src={imgSrc}
                  alt={titulo || 'Foto de perfil'}
                  className="w-full h-full object-cover object-top" // Cambio aquí: agregué object-top
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder/avatar.png';
                  }}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
              {titulo && (
                <h1 className="text-5xl md:text-6xl font-extrabold mb-2 leading-tight font-sans">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    {titulo}
                  </span>
                </h1>
              )}

              {(primario || secundario) && (
                <div className="flex flex-col md:flex-row items-center md:items-end gap-2 mb-2">
                  {primario && (
                    <span className="text-blue-700 font-bold text-2xl">{primario}</span>
                  )}
                  {secundario && (
                    <span className="font-semibold text-2xl text-black ml-1">{secundario}</span>
                  )}
                </div>
              )}

              {descripcion && (
                <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-xl font-normal">
                  {descripcion}
                </p>
              )}

              {(linkedinHref || githubHref || showWhatsapp) && (
                <div className="flex gap-3 items-center mt-2">
                  {linkedinHref && (
                    <a
                      href={linkedinHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-200 shadow transition"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin className="text-xl text-blue-700" />
                    </a>
                  )}

                  {githubHref && (
                    <a
                      href={githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition"
                      aria-label="GitHub"
                    >
                      <FaGithub className="text-xl text-gray-700" />
                    </a>
                  )}

                  {showWhatsapp && (
                    <a
                      href={`https://wa.me/${waPhone}?text=${waMsg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base font-semibold shadow transition"
                    >
                      Contáctame
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}