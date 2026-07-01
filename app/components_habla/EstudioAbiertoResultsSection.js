import Image from "next/image";
import Link from "next/link";
import EstudioAbiertoDownloadCard from "./EstudioAbiertoDownloadCard";

export default function EstudioAbiertoResultsSection({ article }) {
  return (
    <section
      id="resultados-estudio-abierto"
      className="scroll-mt-28 bg-[#F4EEDF] pb-14 pt-28 sm:pb-20 sm:pt-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <h2 className="mt-3 text-[clamp(2.4rem,7vw,5rem)] leading-[0.95]">
            Resultados de Estudio Abierto
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-black/75 sm:text-lg">
            Explora los principales hallazgos en formato artículo o descarga el
            informe final completo dejando tus datos.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="relative min-h-[280px] bg-[#006aef] sm:min-h-[340px]">
              <Image
                src={article.imageUrl}
                alt={`Artículo: ${article.title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                {article.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-black/75">
                {article.description}
              </p>
              <Link
                href={`/casos-de-exito/${article.slug}`}
                className="mt-6 inline-flex items-center rounded-[var(--rounded-btn)] border-2 border-[#006aef] bg-[#006aef] px-5 py-3 text-sm font-semibold text-white no-underline transition-transform duration-200 ease-in-out hover:scale-105"
              >
                LEER ARTÍCULO
              </Link>
            </div>
          </article>

          <EstudioAbiertoDownloadCard />
        </div>
      </div>
    </section>
  );
}
