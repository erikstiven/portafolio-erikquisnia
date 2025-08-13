'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { loadParallaxMover } from '@tsparticles/move-parallax';

interface HeroParticlesProps {
  color?: string;
  density?: number;
  linkOpacity?: number;
  parallaxForce?: number;
  size?: { min: number; max: number };
}

export default function HeroParticles({
  color = '#a78bfa',
  density = 90,
  linkOpacity = 0.32,
  parallaxForce = 60,
  size = { min: 1, max: 3 }
}: HeroParticlesProps) {
  const [ready, setReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mql.matches);
    const cb = (e: MediaQueryListEvent) => setReduce(e.matches);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadParallaxMover(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: 'transparent' },
    detectRetina: true,
    fpsLimit: 60,
    pauseOnOutsideViewport: true,

    interactivity: {
      events: { resize: { enable: true, delay: 0 } },
    },

    particles: {
      number: { value: density },
      color: { value: color },
      links: {
        enable: true,
        distance: 150,
        opacity: linkOpacity,
        width: 1,
        color: color,
      },
      move: {
        enable: true,
        speed: 0.7,
        outModes: { default: 'out' },
        parallax: { enable: true, force: parallaxForce, smooth: 10 },
      },
      opacity: { value: 0.45 },
      size: { value: size },
    },

    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: { value: density / 2 },
            move: { parallax: { enable: true, force: parallaxForce / 1.5, smooth: 12 } },
          },
        },
      },
    ],
  }), [color, density, linkOpacity, parallaxForce, size]);

  if (!ready || reduce) return null;

  return (
    <Particles
      className="absolute inset-0 -z-10 pointer-events-none"
      options={options as any}
    />
  );
}
