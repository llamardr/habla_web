"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const logos = [
  {
    name: "alicorp",
    src: "/partners/1-alicorp.png",
    link: "https://www.alicorp.com.pe/pe/es",
  },
  {
    name: "granja azul",
    src: "/partners/2-granja-azul.png",
    link: "https://www.granjaazul.com.pe/",
  },
  {
    name: "silvestre",
    src: "/partners/4-silvestre.png",
    link: "https://www.soysilvestre.pe/",
  },
  {
    name: "maria almenara",
    src: "/partners/3-maria.png",
    link: "https://www.mariaalmenara.pe/",
  },
  {
    name: "tortas gaby",
    src: "/partners/5-tortas-gaby.png",
    link: "https://www.tortasgaby.com.pe/",
  },
  {
    name: "fisserum",
    src: "/partners/8-fisserum.png",
    link: "https://fissionlab.com.pe/",
  },
  {
    name: "moosh",
    src: "/partners/moosh.png",
    link: "https://moosh.pe/",
  },
  {
    name: "amaras",
    src: "/partners/6-amaras-2.svg",
    link: "https://amaras.pe/",
  },
  {
    name: "nicole chang",
    src: "/partners/7-nicole-chang.png",
    link: "https://www.instagram.com/nicollechangc/",
  },
  {
    name: "fissionlab",
    src: "/partners/18-fission-lab.png",
    link: "https://fissionlab.com.pe/",
  },
  {
    name: "D&O",
    src: "/partners/11-d-o.png",
    link: "https://dyo.com.pe/",
  },
  {
    name: "delascar",
    src: "/partners/12-delascar.png",
    link: "https://www.delascar.com/",
  },
  {
    name: "anntarah",
    src: "/partners/anntarah.png",
    link: "https://anntarah.com/",
  },
  {
    name: "BCRP",
    src: "/partners/15-bcrp.png",
    link: "https://www.bcrp.gob.pe/",
  },
  {
    name: "smartfit",
    src: "/partners/13-smartfit.png",
    link: "https://www.smartfit.com.pe/",
  },
  {
    name: "coa",
    src: "/partners/19-coa.png",
    link: "https://www.coa.pe/",
  },
  {
    name: "honda",
    src: "/partners/20-honda.png",
    link: "https://autos.honda.com.pe/",
  },
  {
    name: "ava",
    src: "/partners/14-ava.png",
    link: "https://www.ava.pe/",
  },
  {
    name: "qaira",
    src: "/partners/qaira2.png",
    link: "https://www.qairadrones.com/",
  },
  {
    name: "grintek",
    src: "/partners/grintek.png",
    link: "https://grintek.pe/",
  },
  {
    name: "soundcloud",
    src: "/partners/soundcloud2.png",
    link: "https://soundcloud.com/",
  },
  {
    name: "cien pies",
    src: "/partners/16-cien-pies.png",
    link: "https://cienpies.com.pe/",
  },
  {
    name: "tmgi",
    src: "/partners/17-tmgi.png",
    link: "https://tmgi.com.pe/",
  },
  {
    name: "maple bear",
    src: "/partners/22-maple-bear.png",
    link: "https://lima.maplebearlatam.com/",
  },
  {
    name: "reims",
    src: "/partners/21-reims.png",
    link: "https://www.colegioreims.edu.mx/",
  },
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
    <section id="partners" className="pt-32 pb-28 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-5xl md:text-6xl mb-6 leading-tight pb-4">
              Nuestros clientes se convierten <br /> en partners
            </h2>
            <Link
              href="#successcases"
              className="text-sm mb-4 inline-block opacity-80 relative group"
            >
              <span className="relative z-10 text-lg">Ver casos de éxito &rarr;</span>
              <span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-black opacity-80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="md:w-1/2 md:pl-12 flex items-center">
            <p className="text-xl opacity-80">
              Con oficinas en Lima y Ciudad de México, hemos trabajado con +20
              empresas ayudándoles a definir la propuesta de valor de sus
              servicios y/o productos y a escalar sus negocios. Nos juntamos
              contigo, definimos el problema a resolver y a través de la
              investigación planteamos una estrategia que lo resuelva.
            </p>
          </div>
        </div>
        <div className="pt-10 grid grid-cols-3  md:grid-cols-5 gap-4 sm:gap-8 items-center justify-items-center">
          {logos.map((logo, idx) => (
            <a
              key={idx}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (logoRefs.current[idx] = el)}
              data-idx={idx}
              className="flex items-center justify-center h-12 w-20 sm:h-20 sm:w-32 cursor-pointer hover:opacity-70 transition-opacity duration-300"
            >
              <Image
                src={logo.src}
                alt={`Partner: ${logo.name} - Cliente de Habla`}
                width={128}
                height={128}
                className={`max-w-full max-h-full object-contain transition-opacity duration-700 ${
                  visible[idx] ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
