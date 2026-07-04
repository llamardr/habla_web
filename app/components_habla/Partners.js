"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackMetaEvent } from "../lib/metaPixel";

const logos = [
  {
    name: "alicorp",
    src: "/partners/alicorp.png",
    link: "https://www.alicorp.com.pe/pe/es",
  },
  {
    name: "granja azul",
    src: "/partners/granja_azul.png",
    link: "https://www.granjaazul.com.pe/",
  },
  {
    name: "silvestre",
    src: "/partners/silvestre.png",
    link: "https://www.soysilvestre.pe/",
  },
  {
    name: "maria almenara",
    src: "/partners/maria_almenara.png",
    link: "https://www.mariaalmenara.pe/",
  },
  {
    name: "tortas gaby",
    src: "/partners/tortas_gaby.png",
    link: "https://www.tortasgaby.com.pe/",
  },
  {
    name: "fisserum",
    src: "/partners/fisserum.png",
    link: "https://fissionlab.com.pe/",
  },
  {
    name: "moosh",
    src: "/partners/moosh.png",
    link: "https://moosh.pe/",
  },
  {
    name: "amaras",
    src: "/partners/amaras.png",
    link: "https://amaras.pe/",
  },
  {
    name: "nicolle chang",
    src: "/partners/nicolle_chang.png",
    link: "https://www.instagram.com/nicollechangc/",
  },
  {
    name: "fissionlab",
    src: "/partners/fission.png",
    link: "https://fissionlab.com.pe/",
  },
  {
    name: "D&O",
    src: "/partners/dyo.png",
    link: "https://dyo.com.pe/",
  },
  {
    name: "delascar",
    src: "/partners/delascar.png",
    link: "https://www.delascar.com/",
  },
  {
    name: "anntarah",
    src: "/partners/anntarah.png",
    link: "https://anntarah.com/",
  },
  {
    name: "BCRP",
    src: "/partners/bcrp.png",
    link: "https://www.bcrp.gob.pe/",
  },
  {
    name: "smartfit",
    src: "/partners/smartfit.png",
    link: "https://www.smartfit.com.pe/",
  },
  {
    name: "coa",
    src: "/partners/coa.png",
    link: "https://www.coa.pe/",
  },
  {
    name: "honda",
    src: "/partners/honda.png",
    link: "https://autos.honda.com.pe/",
  },
  {
    name: "ava",
    src: "/partners/ava.png",
    link: "https://www.ava.pe/",
  },
  {
    name: "qaira",
    src: "/partners/qaira.png",
    link: "https://www.qairadrones.com/",
  },
  {
    name: "grintek",
    src: "/partners/grintek.png",
    link: "https://grintek.pe/",
  },
  {
    name: "soundcloud",
    src: "/partners/soundcloud.png",
    link: "https://soundcloud.com/",
  },
  {
    name: "cien pies",
    src: "/partners/cienpies.png",
    link: "https://cienpies.com.pe/",
  },
  {
    name: "tmgi",
    src: "/partners/tmgi.png",
    link: "https://tmgi.com.pe/",
  },
  {
    name: "maple bear",
    src: "/partners/maple_bear.png",
    link: "https://lima.maplebearlatam.com/",
  },
  {
    name: "reims",
    src: "/partners/reims.png",
    link: "https://www.colegioreims.edu.mx/",
  },
  {
    name: "cabify",
    src: "/partners/cabify.svg",
    link: "https://cabify.com/pe",
  },
  {
    name: "xertica",
    src: "/partners/xertica.png",
    link: "https://www.xertica.ai/",
  },
  {
    name: "elha novias",
    src: "/partners/elha_novias.png",
    link: "https://www.elhanovias.com/",
  },
  {
    name: "enerlite",
    src: "/partners/enerlite.png",
    link: "https://enerliteperu.com/",
  },
  {
    name: "donna cattiva",
    src: "/partners/donna_cattiva.png",
    link: "https://donnacattiva.com/",
  },
  {
    name: "smart hydro",
    src: "/partners/smart_hydro.png",
    link: "https://smarthydro.cl/",
  },
  {
    name: "cyber plaza",
    src: "/partners/cyberplaza.png",
    link: "https://cyberplaza.com.pe/",
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
    <section id="partners" className="w-full bg-[#fdf6ea] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          <div className="md:w-2/5 mb-6 md:mb-0">
            <h2 className="type-h2 mb-6">Clientes</h2>
            <Link
              href="#successcases"
              className="type-ui mb-4 inline-block opacity-80 relative group"
              onClick={() =>
                trackMetaEvent("ViewContent", {
                  source: "partners_section",
                  content_name: "casos_de_exito",
                })
              }
            >
              <span className="relative z-10">Ver casos de éxito &rarr;</span>
              <span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-black opacity-80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="md:w-3/5 md:pl-8 flex items-center">
            <p className="type-subheading text-[var(--color-brand-blue)] opacity-90">
            Trabajamos con organizaciones de distintos segmentos, rubros y tamaños de empresas, desde educación, salud y sector público hasta retail, consumo masivo, tecnología, moda y sostenibilidad — en modelos B2B y B2C.
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
                unoptimized
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
