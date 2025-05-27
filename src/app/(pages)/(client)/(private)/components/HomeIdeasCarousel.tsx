'use client';
import useEmblaCarousel from 'embla-carousel-react';
import useSlidesPerView from '@/hooks/useSlidePerView';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { IdeaType } from '@/types/IdeaTypes';
import HomeIdeaCard from './HomeIdeaCard';
import clsx from 'clsx';

type Props = {
  ideas: IdeaType[];
  title: string;
  rows?: number;
};

export default function HomeIdeasCarousel({ ideas, title, rows = 2 }: Props) {
  const slidesPerView = useSlidesPerView();
  const pageSize = slidesPerView * rows;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
  });

  const pages = useMemo(
    () =>
      Array.from({ length: Math.ceil(ideas.length / pageSize) }).map((_, i) =>
        ideas.slice(i * pageSize, (i + 1) * pageSize)
      ),
    [ideas, pageSize]
  );

  const [idx, setIdx] = useState(0);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIdx(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  /* Nếu slidesPerView thay đổi → reset về trang đầu */
  useEffect(() => {
    scrollTo(0);
  }, [slidesPerView, scrollTo]);

  return (
    <section className="mb-10">
      {/* header */}
      <div className="rounded-lg border border-indigo-400 bg-gradient-to-r from-indigo-600 to-pink-300 text-white p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      {/* carousel */}
      <div className="overflow-hidden mt-4" ref={emblaRef}>
        <div className="flex">
          {pages.map((pageIdeas, p) => (
            <div key={p} className="flex-none w-full px-2">
              <div
                className={clsx(
                  'grid gap-6',
                  slidesPerView === 1 && 'grid-cols-1',
                  slidesPerView === 2 && 'grid-cols-2',
                  slidesPerView === 3 && 'grid-cols-3'
                )}
              >
                {pageIdeas.map(idea => (
                  <HomeIdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-6">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={clsx(
              'h-3 w-3 rounded-full transition-colors',
              i === idx ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-indigo-400'
            )}
            aria-label={`Trang ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
