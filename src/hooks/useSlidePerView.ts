'use client';
import { useEffect, useState } from 'react';

export default function useSlidesPerView() {
  const getSlides = () => {
    if (typeof window === 'undefined') return 3; // Fallback SSR

    const w = window.innerWidth;

    if (w < 640) return 1; // < sm   => 1 cột
    if (w < 1024) return 2; // sm–lg => 2 cột
    return 3; // lg trở lên => 3 cột
  };

  const [slides, setSlides] = useState(getSlides);

  useEffect(() => {
    const onResize = () => setSlides(getSlides());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return slides;
}
