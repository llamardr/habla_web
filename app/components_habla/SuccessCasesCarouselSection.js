"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { trackGAEvent } from "@/app/lib/googleAnalytics";
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
    <div className="relative h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(253,246,234,0.42),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(253,246,234,0.22),transparent_28%),linear-gradient(135deg,rgba(253,246,234,0.16),rgba(0,0,0,0.18))] p-6">
      <div className="absolute inset-x-6 top-6 h-40 rounded-2xl border border-[#fdf6ea]/35 bg-[#fdf6ea]/15" />
      <div className="absolute bottom-6 left-6 right-6">
        <span className="type-body-small text-[#fdf6ea]/70">
          Artículo
        </span>
        <p className="type-h3 type-white mt-2">
          {article.subtitle}
        </p>
      </div>
    </div>
  </div>
);

const SuccessCasesCarouselSection = ({
  title = "Conoce nuestros casos de éxito",
  excludeSlug = "",
  className = "bg-[#fdf6ea]",
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
    <section
      id="successcases"
      className={`w-full py-16 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="type-h2 type-black mb-5">
          {title}
        </h2>

        {caseStudies.length > 1 && (
          <div className="flex items-center justify-end gap-3 mb-6">
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              className="type-button h-11 w-11 rounded-full border border-[#006aef] text-[#006aef] hover:bg-[#006aef] hover:text-[#fdf6ea] transition-colors"
              aria-label="Ver casos anteriores"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              className="type-button h-11 w-11 rounded-full border border-[#006aef] text-[#006aef] hover:bg-[#006aef] hover:text-[#fdf6ea] transition-colors"
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
              className="snap-start shrink-0 w-[92%] md:w-[82%] lg:w-[74%] bg-[#fdf6ea] border border-[#d7dce3] rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
            >
              <div className="order-2 flex h-full flex-col items-start md:order-1">
                <div>
                  <h3 className="type-card-title mb-2 text-[#111827]">
                    {study.title}
                  </h3>
                  <p className="type-overline mb-4 text-[#b3b8c2]">
                    {study.subtitle} | {study.date}
                  </p>
                  <p className="type-body mb-5 text-[#1f2937]">
                    {study.description}
                  </p>
                </div>
                <Link
                  href={`/casos-de-exito/${study.slug}`}
                  className="type-button mt-auto inline-flex items-center rounded-[var(--rounded-btn)] border border-[#006aef] bg-[#006aef] px-4 py-2 text-[#fdf6ea] duration-200 ease-in-out hover:scale-105 hover:bg-[#006aef]"
                  onClick={() =>
                    trackGAEvent("select_content", {
                      source: "success_cases_carousel",
                      content_type: "success_case",
                      item_name: study.title,
                      item_id: study.slug,
                      link_url: `/casos-de-exito/${study.slug}`,
                    })
                  }
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
