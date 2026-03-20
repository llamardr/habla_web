"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function EstudioAbiertoIntroCarousel({ cards }) {
  const carouselRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return undefined;
    }

    const carousel = carouselRef.current;

    if (!carousel) {
      return undefined;
    }

    const getStep = () => {
      const firstCard = carousel.querySelector("[data-carousel-card]");

      if (!firstCard) {
        return 0;
      }

      const styles = window.getComputedStyle(carousel);
      const gap = parseFloat(styles.columnGap || styles.gap || "0");

      return firstCard.getBoundingClientRect().width + gap;
    };

    const advance = () => {
      const step = getStep();

      if (!step) {
        return;
      }

      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      const nextScrollLeft = carousel.scrollLeft + step;
      const targetScrollLeft =
        nextScrollLeft >= maxScrollLeft - step * 0.2 ? 0 : nextScrollLeft;

      carousel.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    };

    if (isPaused) {
      return undefined;
    }

    const intervalId = window.setInterval(advance, 2000);

    return () => window.clearInterval(intervalId);
  }, [cards.length, isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const pause = () => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    setIsPaused(true);
  };

  const resume = (delay = 0) => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    if (!delay) {
      setIsPaused(false);
      return;
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
      resumeTimeoutRef.current = null;
    }, delay);
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <div
        ref={carouselRef}
        onMouseEnter={pause}
        onMouseLeave={() => resume()}
        onTouchStart={pause}
        onTouchEnd={() => resume(450)}
        onFocusCapture={pause}
        onBlurCapture={() => resume(450)}
        className="flex w-full max-w-full snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden pb-5 pt-5 scroll-smooth touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 lg:pb-0"
        aria-label="Carrusel de atributos de Estudio Abierto"
      >
        {cards.map((card) => (
          <article
            key={card.title}
            data-carousel-card
            className="max-w-[21rem] flex-[0_0_82vw] snap-center rounded-[2rem] sm:w-[24rem] sm:max-w-none sm:flex-none sm:snap-start lg:w-[calc(1.65*(100%-2rem)/3)]"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 62vw, 39vw"
                className="object-cover"
              />
            </div>
            <p className="px-1 pb-2 pt-4 text-center text-sm leading-tight tracking-[-0.03em]">
              {card.title}
            </p>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-8 bg-gradient-to-r from-[#006AEF] to-transparent sm:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-8 bg-gradient-to-l from-[#006AEF] to-transparent sm:block" />
    </div>
  );
}
