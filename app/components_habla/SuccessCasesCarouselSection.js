"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { successCaseArticles } from "@/app/lib/successCaseArticles";

const placeholderClassNames = {
  blue: "bg-[#006aef]",
  black: "bg-black",
  pink: "bg-[#e58adb]",
};

const ArticlePlaceholder = ({ article }) => (
  <div
    className={`flex h-full min-h-[280px] items-end overflow-hidden rounded-2xl ${
      placeholderClassNames[article.accent] || "bg-[#006aef]"
    }`}
  >
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.42),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.22),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.16),rgba(0,0,0,0.18))] p-6">
      <div className="absolute inset-x-6 top-6 h-40 rounded-2xl border border-white/35 bg-white/15" />
      <div className="absolute bottom-6 left-6 right-6">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
          Artículo
        </span>
        <p className="mt-2 text-3xl font-bold leading-none text-white">
          {article.subtitle}
        </p>
      </div>
    </div>
  </div>
);

const SuccessCasesCarouselSection = ({
  title = "Conoce nuestros casos de éxito",
  excludeSlug = "",
  className = "bg-white",
}) => {
  const trackRef = useRef(null);
  const caseStudies = successCaseArticles.filter(
    (article) => article.slug !== excludeSlug
  );

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
    <section className={`w-full pt-10 pb-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-[#006aef] text-4xl sm:text-5xl md:text-6xl leading-tight mb-10">
          {title}
        </h2>

        {caseStudies.length > 1 && (
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
        )}

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
                  {study.subtitle} | {study.date}
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
                {study.imageUrl ? (
                  <Image
                    src={study.imageUrl}
                    alt={`Caso de éxito: ${study.title}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <ArticlePlaceholder article={study} />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCasesCarouselSection;
