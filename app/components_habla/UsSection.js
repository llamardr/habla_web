"use client";

import { useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ButtonContacto from "./ButtonContacto";

const UsSection = () => {
  const sectionRef = useRef(null);

  // Scroll progress from 0 → 1 as the section enters/leaves viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  // Fade bursts in/out based on scroll
  useEffect(() => {
    const svg = sectionRef.current?.querySelector("svg");
    if (!svg) {
      console.warn("Compass SVG not found in UsSection");
      return;
    }

    const bursts = Array.from(svg.querySelectorAll('[class*="burst"]'));
    bursts.reverse();
    bursts.forEach((el) => {
      el.style.opacity = 0;
      el.style.transition = "opacity 0.1s ease";
    });

    const unsubscribe = scrollYProgress.on("change", (v) => {
      // Show the first burst almost immediately (as soon as progress > 0)
      let visibleCount = Math.ceil(v * bursts.length);
      visibleCount = Math.min(Math.max(visibleCount, 0), bursts.length);
      bursts.forEach((el, idx) => {
        el.style.opacity = idx < visibleCount ? 1 : 0;
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section
      id="us"
      ref={sectionRef}
      className="w-full bg-white flex flex-col md:flex-row items-stretch md:px-0 mt-10"
    >
      <div className="md:w-2/5 flex items-center justify-center">
        <Image
          src="/CompassBursts.svg"
          width={1920}
          height={1728}
          alt="Imagen de una brújula"
        />
      </div>

      {/* Text block */}
      <div className="lg:pr-32 w-full md:w-3/5 flex px-4 flex-col">
        <h1 className="text-black text-4xl sm:text-5xl md:text-6xl">
          Somos una consultora de estrategia basada en investigación
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-black mt-8 mb-8 max-w-2xl">
          Combinamos la estrategia de negocio, investigación de mercado y
          tecnología para ayudar a las marcas a entrar a mercados, evolucionar
          con propósito, escalar con impacto.
        </p>
        <div className="w-40 mb-20 sm:mb-0 md:mb-20">
          <ButtonContacto backgroundColor="#006aef" color="#ffffff" />
        </div>
      </div>
    </section>
  );
};

export default UsSection;
