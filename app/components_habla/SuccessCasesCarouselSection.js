"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const caseStudies = [
  {
    id: 1,
    slug: "educar-hoy-es-acompanar-lo-que-cambia",
    title: "Educar hoy en día es acompañar lo que cambia",
    subtitle: "Educación | Noviembre 2025",
    description:
      "En HABLA LATAM hemos realizado más de cinco proyectos con instituciones educativas. Aquí compartimos hallazgos y aprendizajes clave sobre los desafíos y oportunidades que enfrenta hoy el sector.",
    imageUrl: "/case_studies/AVA.MARCO.1.png",
  },
  {
    id: 2,
    slug: "equipo-alineado-alto-impacto",
    title: "Un equipo alineado es un equipo de alto impacto",
    subtitle: "Educación | Diciembre 2025",
    description:
      "Cuando realizamos una investigación, es clave hacer una bajada con el equipo que accionará la información. Estos talleres alinean áreas involucradas y convierten hallazgos en decisiones concretas.",
    imageUrl: "/case_studies/alicorp.jpg",
  },
  {
    id: 3,
    slug: "disenar-con-evidencia-para-escalar",
    title: "Diseñar con evidencia para escalar",
    subtitle: "Energía | Enero 2026",
    description:
      "Acompañamos a equipos en la validación de hipótesis de producto y experiencia, priorizando oportunidades con alto potencial de impacto en clientes y negocio.",
    imageUrl: "/case_studies/qaira.jpg",
  },
];

const SuccessCasesCarouselSection = () => {
  const trackRef = useRef(null);

  const scrollByCard = (direction) => {
    if (!trackRef.current) return;
    const card = trackRef.current.querySelector("[data-case-card]");
    if (!card) return;
    const offset = card.clientWidth + 24;
    trackRef.current.scrollBy({
      left: direction === "next" ? offset : -offset,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-[#006aef] text-4xl sm:text-5xl md:text-6xl leading-tight mb-10">
          Conoce nuestros casos de éxito
        </h2>

        <div className="flex items-center justify-end gap-3 mb-6">
          <button
            type="button"
            onClick={() => scrollByCard("prev")}
            className="h-11 w-11 rounded-full border border-[#006aef] text-[#006aef] text-xl leading-none hover:bg-[#006aef] hover:text-white transition-colors"
            aria-label="Ver casos anteriores"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("next")}
            className="h-11 w-11 rounded-full border border-[#006aef] text-[#006aef] text-xl leading-none hover:bg-[#006aef] hover:text-white transition-colors"
            aria-label="Ver más casos"
          >
            ›
          </button>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto overflow-y-visible snap-x snap-mandatory py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {caseStudies.map((study) => (
            <article
              key={study.id}
              data-case-card
              className="snap-start shrink-0 w-[92%] md:w-[82%] lg:w-[74%] bg-white border border-[#d7dce3] rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
            >
              <div className="order-2 md:order-1">
                <h3 className="text-[#111827] text-2xl md:text-4xl font-bold leading-tight mb-2">
                  {study.title}
                </h3>
                <p className="text-[#b3b8c2] text-md md:text-l leading-tight mb-4">
                  {study.subtitle}
                </p>
                <p className="text-[#1f2937] text-base md:text-l leading-relaxed mb-5">
                  {study.description}
                </p>
                <Link
                  href={`/casos-de-exito/${study.slug}`}
                  className="inline-flex items-center rounded-[var(--rounded-btn)] border border-[#006aef] bg-white px-4 py-2 text-base md:text-sm text-[#006aef] hover:bg-[#006aef] hover:text-white duration-200 ease-in-out hover:scale-105"
                >
                  LEER MÁS
                </Link>
              </div>

              <div className="order-1 md:order-2 relative min-h-[280px] md:min-h-[380px] overflow-hidden rounded-2xl">
                <Image
                  src={study.imageUrl}
                  alt={`Caso de éxito: ${study.title}`}
                  fill
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCasesCarouselSection;
