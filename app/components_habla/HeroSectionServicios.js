'use client';

import { useState, useEffect } from 'react';
import HandsHero from '@/public/objects/HandsHero.svg'; // SVGR

const PHRASES = [
  'escuchando a',
  'hablando con',
  'de la mano de',
  'conectando con',
  'acompañando a',
  'transformando a',
  'colaborando con',
];

const HeroSectionServicios = () => {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    let timeout;
    const current = PHRASES[idx];

    if (char < current.length) {
      // sigue “escribiendo”
      timeout = setTimeout(() => setChar((c) => c + 1), 80);
    } else {
      // cuando termina, espera 2 s y pasa a la siguiente frase
      timeout = setTimeout(() => {
        setChar(0);
        setIdx((i) => (i + 1) % PHRASES.length);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [char, idx]);

  return (
    <>
      <section className="relative isolate flex items-end min-h-screen w-full bg-[#EB8FFE] overflow-hidden px-10">
        {/* —— Texto principal —— */}
        <h1 className="font-bold text-black leading-[89%] max-w-[20ch] text-[clamp(3rem,10vw,6rem)] z-10 pb-16 pt-8">
          Para los que<br />
          quieren crecer<br />
          <span className="font-normal italic">
            {PHRASES[idx].substring(0, char)}
            <span className="animate-pulse">|</span>
          </span><br />
          sus clientes
        </h1>

        {/* —— Ilustración decorativa —— */}
        <HandsHero
          className="hands-hero-svg absolute top-0 right-0 w-auto max-w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] pointer-events-none select-none"
          aria-label="Ilustración de dos manos y destello"
        />
      </section>
    </>
  );
};

export default HeroSectionServicios;
