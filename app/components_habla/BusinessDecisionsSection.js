import Image from "next/image";
import ButtonContacto from "./ButtonContacto";

export default function BusinessDecisionsSection() {
  return (
    <section className="bg-white py-5 sm:py-10 lg:py-12">
      <div className="relative w-full overflow-hidden bg-black">
        <div className="absolute inset-x-0 top-0 h-10 bg-white sm:h-12 md:h-14 lg:h-16" />

        <div className="relative rounded-[2rem] bg-[#006AEF] px-4 pb-16 pt-8 text-white sm:px-6 sm:pb-20 sm:pt-10 md:rounded-[2.35rem] md:pb-24 md:pt-10 lg:px-8 lg:pb-28 lg:pt-10">
          <div className="mx-auto w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <h2 className="max-w-5xl text-[clamp(2.7rem,7vw,5.8rem)] leading-[0.92] tracking-[-0.04em] font-normal">
              El{" "}
              <span className="inline-flex rounded-full bg-white px-4 py-1 text-[#006aef] font-normal">
                amor
              </span>{" "}
              puede ser a primera vista; las decisiones de negocio,{" "}
              <span className="inline-flex rounded-full bg-white px-4 py-1 text-[#006aef] font-normal">
                no.
              </span>
            </h2>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-8 pt-2 sm:px-6 sm:gap-12 sm:pb-10 sm:pt-4 md:grid-cols-[minmax(0,30rem)_1fr] md:items-center md:gap-12 md:pb-12 md:pt-6 lg:px-8 lg:gap-14 lg:pb-14 lg:pt-8">
          <div className="relative aspect-[1/1.02] overflow-hidden rounded-[2rem] bg-white md:-mt-20 lg:-mt-24">
            <Image
              src="/estudio-abierto/calendar-photo-3.svg"
              alt="Equipo revisando información alrededor de una laptop"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1024px) 45vw, 560px"
              className="object-cover"
            />
          </div>

          <div className="max-w-2xl pb-2 text-white md:pt-4">
            <p className="text-base leading-7 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
                Habla Latam es un estudio de investigación aplicada a la toma de
                decisiones de negocio. Traducimos la complejidad del mercado en decisiones claras y
                viables, acompañando a los equipos hasta que la evidencia se convierte en
                ruta de éxito.
            </p>

            <div className="mt-7 sm:mt-8">
              <div className="w-fit min-w-[11rem]">
                <ButtonContacto backgroundColor="#F6ECD9" color="#000000" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
