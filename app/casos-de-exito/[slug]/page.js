import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import EstudioAbiertoDownloadCard from "@/app/components_habla/EstudioAbiertoDownloadCard";
import Footer from "@/app/components_habla/Footer";
import Navbar from "@/app/components_habla/Navbar";
import SuccessCasesCarouselSection from "@/app/components_habla/SuccessCasesCarouselSection";
import {
  getSuccessCaseArticle,
  serviceCtaCards,
  successCaseArticles,
} from "@/app/lib/successCaseArticles";

const ESTUDIO_ABIERTO_SLUG = "universitario-limeno-dinero-estudio-abierto";

const ctaCardClassNames = {
  blue: "bg-[#006aef] text-white",
  black: "bg-black text-white",
  pink: "bg-[#e58adb] text-white",
};

const ArticleImagePlaceholder = ({ label, accent = "blue" }) => (
  <div
    className={`relative min-h-[280px] overflow-hidden rounded-3xl ${
      ctaCardClassNames[accent] || ctaCardClassNames.blue
    }`}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.22),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.16),rgba(0,0,0,0.22))]" />
    <div className="absolute inset-6 rounded-2xl border border-white/35 bg-white/10" />
    <div className="absolute bottom-8 left-8 right-8">
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
        Imagen
      </span>
      <p className="mt-2 text-2xl font-bold leading-tight text-white">
        {label}
      </p>
    </div>
  </div>
);

const ServicesCtaSection = () => (
  <section className="mt-16 border-y border-[#e5e7eb] py-14">
    <div className="mb-10 max-w-4xl">
      <h2 className="mt-3 text-3xl font-bold leading-tight tracking-normal text-[#111827] md:text-5xl">
        Para convertir estos hallazgos en decisiones, en Habla Latam te ayudamos a responder
        preguntas clave:
      </h2>
    </div>

    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {serviceCtaCards.map((card) => (
        <article
          key={card.title}
          className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-white shadow-[0_4px_18px_rgba(15,23,42,0.06)]"
        >
          <div className="h-44 bg-[linear-gradient(135deg,#f4f0ea,#d8d8d8)]" />
          <div
            className={`min-h-[230px] p-6 ${
              ctaCardClassNames[card.color] || ctaCardClassNames.blue
            }`}
          >
            <h3 className="text-2xl font-bold leading-tight">{card.title}</h3>
            <p className="mt-5 text-lg leading-tight text-white/90">
              {card.description}
            </p>
          </div>
        </article>
      ))}
    </div>

  </section>
);

const ArticleContent = ({ blocks }) => (
  <div className="prose prose-lg max-w-none">
    {blocks.map((block, index) => {
      if (block.type === "heading") {
        return (
          <h2
            key={`${block.type}-${index}`}
            className="mb-4 mt-10 text-2xl font-bold leading-tight text-[#111827] md:text-3xl"
          >
            {block.text}
          </h2>
        );
      }

      if (block.type === "quote") {
        return (
          <blockquote
            key={`${block.type}-${index}`}
            className="my-8 rounded-[var(--rounded-btn)] bg-[#006aef] px-6 py-5 text-xl font-semibold leading-relaxed text-white"
          >
            “{block.text}”
          </blockquote>
        );
      }

      return (
        <p
          key={`${block.type}-${index}`}
          className="mb-6 text-lg leading-relaxed text-[#1f2937]"
        >
          {block.text}
        </p>
      );
    })}
  </div>
);

export function generateStaticParams() {
  return successCaseArticles.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }) {
  const article = getSuccessCaseArticle(params.slug);

  if (!article) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://hablalatam.com/casos-de-exito/${article.slug}`,
      type: "article",
    },
    twitter: {
      title: article.title,
      description: article.description,
    },
  };
}

export default function SuccessCaseArticlePage({ params }) {
  const article = getSuccessCaseArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-[#fbf7ef]">
      <Navbar initialTextColor="dark" />

      <article className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
        <header className="max-w-5xl">
          <h1 className="mt-16 max-w-5xl text-[clamp(2.8rem,7vw,5.2rem)] font-normal leading-[0.98] tracking-normal text-black">
            {article.title}
          </h1>
          <p className="mt-6 text-lg font-normal text-gray-500">
            {article.subtitle} · {article.date} · Por {article.author}
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.35fr] lg:items-start">
          {article.imageUrl ? (
            <div className="relative min-h-[280px] overflow-hidden rounded-3xl lg:min-h-[520px]">
              <Image
                src={article.imageUrl}
                alt={`Imagen del artículo: ${article.title}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 430px"
                className="object-cover"
              />
            </div>
          ) : (
            <ArticleImagePlaceholder
              label={article.imageLabel}
              accent={article.accent}
            />
          )}
          <ArticleContent blocks={article.content} />
        </div>

        {article.slug === ESTUDIO_ABIERTO_SLUG && (
          <section className="mt-14 border-t border-black/10 pt-12">
            <h2 className="mb-8 text-3xl font-bold leading-tight text-[#111827] md:text-5xl">
              Descarga el informe con los resultados
            </h2>
            <EstudioAbiertoDownloadCard />
          </section>
        )}
      </article>

      {article.slug !== ESTUDIO_ABIERTO_SLUG && (
        <SuccessCasesCarouselSection
          title="Otros artículos"
          excludeSlug={article.slug}
          className="bg-[#fbf7ef]"
        />
      )}

      <Footer />
    </main>
  );
}
