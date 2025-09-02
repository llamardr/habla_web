'use client';

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const logos = [
  { name: "alicorp", src: "/partners/alicorp.png" },
  { name: "ava", src: "/partners/ava.png" },
  { name: "honda", src: "/partners/honda.png" },
  { name: "coa", src: "/partners/coa.png" },
  { name: "soundcloud", src: "/partners/soundcloud.png" },
  { name: "maria almenara", src: "/partners/maria_almenara.png" },
  { name: "smartfit", src: "/partners/smartfit.png" },
  { name: "dermotienda", src: "/partners/dermotienda.png" },
  { name: "tortas gaby", src: "/partners/tortas_gaby.png" },
  { name: "dyo", src: "/partners/dyo.png" },
  { name: "maple bear", src: "/partners/maple_bear.png" },
  { name: "cienpies", src: "/partners/cienpies.png" },
  { name: "fissionlab", src: "/partners/fissionlab.png" },
  { name: "granja azul", src: "/partners/granja_azul.png" },
  { name: "qaira", src: "/partners/qaira.png" },
];

const Partners = () => {
  const logoRefs = useRef([]);
  const [visible, setVisible] = useState(Array(logos.length).fill(false));

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setVisible((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    logoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="partners" className="bg-black py-28 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-white text-5xl md:text-6xl mb-6 leading-tight pb-4">
              Nuestros clientes se convierten <br /> en partners
            </h2>
            <Link href="#successcases" className="text-white text-sm mb-4 inline-block opacity-80 relative group">
              <span className="relative z-10">Ver casos de estudio &rarr;</span>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white opacity-80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true"/>
            </Link>
          </div>
          <div className="md:w-1/2 md:pl-12 flex items-center">
            <p className="text-white text-base opacity-80">
              Con oficinas en Lima y Ciudad de México, hemos trabajado con +20 empresas ayudándoles a definir la propuesta de valor de sus servicios y/o productos y a escalar sus negocios. Nos juntamos contigo, definimos el problema a resolver y a través de la investigación planteamos una estrategia que lo resuelva.
            </p>
          </div>
        </div>
        <div className="pt-10 grid grid-cols-3 grid-rows-5 md:grid-cols-5 md:grid-rows-3 gap-4 sm:gap-8 items-center justify-items-center">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              ref={el => (logoRefs.current[idx] = el)}
              data-idx={idx}
              className="flex items-center justify-center h-12 w-20 sm:h-20 sm:w-32"
            >
              <Image
                src={logo.src}
                alt={`Partner: ${logo.name} - Cliente de Habla`}
                width={128}
                height={80}
                className={`object-contain grayscale transition-opacity duration-700 ${visible[idx] ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
