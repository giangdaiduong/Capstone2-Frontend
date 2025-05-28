'use client';

import useSlidesPerView from '@/hooks/useSlidePerView';
import { PHILOSOPHIES } from '@/utils/constants';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

type Philosopher = {
  avatar: string;
  quote: string;
  name: string;
  position: string;
};

function HomePhilosophySection() {
  const slidesPerView = useSlidesPerView();
  const pageSize = slidesPerView;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' });

  const pages = useMemo(
    () =>
      Array.from({ length: Math.ceil(PHILOSOPHIES.length / pageSize) }).map((_, i) =>
        PHILOSOPHIES.slice(i * pageSize, (i + 1) * pageSize)
      ),
    [pageSize]
  );

  const [idx, setIdx] = useState(0);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIdx(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  useEffect(() => scrollTo(0), [slidesPerView, scrollTo]);

  const Card = ({ p }: { p: Philosopher }) => (
    <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow-md max-w-sm w-full mx-auto">
      <div className="relative w-20 h-20 mb-4">
        <Image src={p.avatar} alt={p.name} fill className="rounded-full object-cover" />
      </div>
      <p className="italic text-center mb-6">{p.quote}</p>
      <h4 className="font-bold">{p.name}</h4>
      <span className="text-gray-600 text-sm">{p.position}</span>
    </div>
  );

  return (
    <section className="bg-[#F5F7FA] py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-blue-900 inline-block border-b-4 border-blue-700 pb-1">
            TRIẾT LÝ NHÀ SÁNG NGHIỆP
          </h2>
          <p className="mt-4 text-gray-700">
            Những câu nói “để đời” của các tỷ phú hàng đầu thế giới luôn là kim chỉ nam và là nguồn cảm hứng
            <br />
            bất tận cho hàng triệu người trên con đường tìm đến thành công của chính mình.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {pages.map((page, p) => (
              <div key={p} className="flex-none w-full px-4">
                <div
                  className={clsx(
                    'grid gap-8',
                    slidesPerView === 1 && 'grid-cols-1',
                    slidesPerView === 2 && 'grid-cols-2',
                    slidesPerView >= 3 && 'grid-cols-3'
                  )}
                >
                  {page.map(item => (
                    <Card key={item.name} p={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Trang ${i + 1}`}
              className={clsx(
                'h-3 w-3 rounded-full transition-colors',
                i === idx ? 'bg-blue-900' : 'bg-gray-300 hover:bg-blue-500'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePhilosophySection;
