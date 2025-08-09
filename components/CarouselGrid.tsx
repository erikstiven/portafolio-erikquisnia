'use client';

import useEmblaCarousel from 'embla-carousel-react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

type CarouselGridProps = { slides: ReactNode[][] };

export default function CarouselGrid({ slides }: CarouselGridProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const prev = () => emblaApi?.scrollPrev();
  const next = () => emblaApi?.scrollNext();

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%] px-1">
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {slide}
              </div>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute -left-3 md:-left-10 top-1/2 -translate-y-1/2 rounded-full p-2
                       bg-purple-pink text-white shadow hover:bg-white hover:text-purple-pink
                       active:bg-purple-700 active:scale-95 transition"
          >
            <HiChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute -right-3 md:-right-10 top-1/2 -translate-y-1/2 rounded-full p-2
                       bg-purple-pink text-white shadow hover:bg-white hover:text-purple-pink
                       active:bg-purple-700 active:scale-95 transition"
          >
            <HiChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {slides.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir a slide ${i + 1}`}
              className={`h-2.5 rounded-full transition ${
                i === selected ? 'bg-violet-600 w-6' : 'bg-slate-300 w-2.5 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
