import Image from "next/image";
import { notFound } from "next/navigation";
import ArticleBackButton from "@/app/components_habla/ArticleBackButton";
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
  blue: "bg-[#006aef] text-[#fdf6ea]",
  black: "bg-black text-[#fdf6ea]",
  pink: "bg-[#e58adb] text-[#fdf6ea]",
};

const ArticleImagePlaceholder = ({ label, accent = "blue" }) => (
  <div
    className={`relative min-h-[280px] overflow-hidden rounded-3xl ${
      ctaCardClassNames[accent] || ctaCardClassNames.blue
    }`}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(253,246,234,0.4),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(253,246,234,0.22),transparent_28%),linear-gradient(135deg,rgba(253,246,234,0.16),rgba(0,0,0,0.22))]" />
    <div className="absolute inset-6 rounded-2xl border border-[#fdf6ea]/35 bg-[#fdf6ea]/10" />
    <div className="absolute bottom-8 left-8 right-8">
      <span className="type-body-small text-[#fdf6ea]/75">
        Imagen
      </span>
      <p className="type-h3 type-white mt-2">
        {label}
      </p>
    </div>
  </div>
);

const ServicesCtaSection = () => (
  <section className="mt-16 border-y border-[#e5e7eb] py-14">
    <div className="mb-10 max-w-4xl">
      <h2 className="type-h2 type-black mt-3">
        Para convertir estos hallazgos en decisiones, en Habla Latam te ayudamos a responder
        preguntas clave:
      </h2>
    </div>

    <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
      {serviceCtaCards.map((card) => (
        <article
          key={card.title}
          className="overflow-hidden rounded-3xl border border-[#e5e7eb] bg-[#fdf6ea] shadow-[0_4px_18px_rgba(15,23,42,0.06)]"
        >
          <div className="h-44 bg-[linear-gradient(135deg,#fdf6ea,#d8d8d8)]" />
          <div
            className={`min-h-[230px] p-6 ${
              ctaCardClassNames[card.color] || ctaCardClassNames.blue
            }`}
          >
            <h3 className="type-h3 type-white">{card.title}</h3>
            <p className="type-body mt-5 text-[#fdf6ea]/90">
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
            className="type-h3 mb-4 mt-10 text-[#111827]"
          >
            {block.text}
          </h2>
        );
      }

      if (block.type === "quote") {
        return (
          <blockquote
            key={`${block.type}-${index}`}
            className="type-subheading type-beige my-8 rounded-[var(--rounded-btn)] bg-[#006aef] px-6 py-5"
          >
            “{block.text}”
          </blockquote>
        );
      }

      return (
        <p
          key={`${block.type}-${index}`}
          className="type-body mb-6 text-[#1f2937]"
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
    <main className="bg-[#fdf6ea]">
      <Navbar initialTextColor="dark" />

      <article className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
        <header className="max-w-5xl">
          <div className="mt-16">
            <ArticleBackButton />
          </div>
          <h1 className="type-display type-black mt-8 max-w-5xl">
            {article.title}
          </h1>
          <p className="type-overline mt-6">
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
            <h2 className="type-h2 type-black mb-8">
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
          className="bg-[#fdf6ea]"
        />
      )}

      <Footer />
    </main>
  );
}
