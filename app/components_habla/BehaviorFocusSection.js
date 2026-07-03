import Image from "next/image";

export default function BehaviorFocusSection() {
  return (
    <section className="bg-[#fdf6ea] py-16 md:py-24">
      <div className="w-full overflow-hidden bg-[#fdf6ea]">
        <div className="relative z-10 rounded-[2rem] bg-[#006aef] px-4 pb-10 pt-8 text-[#fdf6ea] shadow-[0_20px_60px_rgba(0,106,239,0.22)] sm:px-6 sm:pb-12 sm:pt-10 md:rounded-[2.35rem] md:pb-14 md:pt-10 lg:px-8 lg:pb-16 lg:pt-12">
          <div className="mx-auto w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <h2 className="type-section-statement type-beige max-w-5xl">
              En Habla, nos enfocamos en lo que las personas {" "}
              <span className="inline-flex rounded-full bg-[#fdf6ea] px-[0.3em] py-[0.06em] text-[#006aef]">
                hacen
              </span>
              , no solo en lo que{" "}
              <span className="inline-flex rounded-full border border-current px-[0.3em] py-[0.06em]">
                dicen.
              </span>
            </h2>

            <p className="type-body mt-6 max-w-4xl text-[#fdf6ea]/90 md:mt-8">
              La investigación de mercado tradicional, si bien genera insights
              suele tener menor trazabilidad directa a las decisiones del día a
              día.
            </p>
          </div>
        </div>

        <div className="relative z-0 -mt-7 overflow-hidden bg-[#fdf6ea] md:-mt-9">
          <div className="relative aspect-[16/5.5] w-full md:aspect-[16/4.35]">
            <Image
              src="/objects/EquipoEnfoque.png"
              alt="Equipo uniendo manos, representando foco en comportamientos reales de clientes y no clientes"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
