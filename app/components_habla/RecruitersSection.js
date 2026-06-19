"use client";

import Image from "next/image";
import { useRef } from "react";

const RECRUITERS = [
  { name: "Angela Tafur", image: "/comunidad/reclutadores/angela-tafur.png" },
  {
    name: "Cynthia Torres",
    image: "/comunidad/reclutadores/cynthia-torres.png",
  },
  {
    name: "Medhaly Mercedes",
    image: "/comunidad/reclutadores/medhaly-mercedes.png",
  },
  {
    name: "Alejandro Del Aguila",
    image: "/comunidad/reclutadores/alejandro-del-aguila.png",
  },
  {
    name: "Angely Huamán",
    image: "/comunidad/reclutadores/angely-huaman.png",
  },
  { name: "Abraham Muñoz", image: "/comunidad/reclutadores/abraham-munoz.png" },
  { name: "Brayan Milla", image: "/comunidad/reclutadores/brayan-milla.png" },
  {
    name: "Jessenia Fuentes",
    image: "/comunidad/reclutadores/jessenia-fuentes.png",
  },
  { name: "Maggie Angulo", image: "/comunidad/reclutadores/maggie-angulo.png" },
];

function ArrowButton({ direction, onClick }) {
  const isNext = direction === "next";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={
        isNext ? "Ver más reclutadores" : "Ver reclutadores anteriores"
      }
      className="hidden h-11 w-11 shrink-0 rounded-full border border-[#006aef] text-xl leading-none text-[#006aef] transition-colors hover:bg-[#006aef] hover:text-white md:inline-block"
    >
      {isNext ? "›" : "‹"}
    </button>
  );
}

export default function RecruitersSection() {
  const trackRef = useRef(null);

  const scrollByDirection = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.round(track.clientWidth * 0.8);
    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="reclutadores"
      className="w-full scroll-mt-36 bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="max-w-3xl text-5xl leading-tight text-[#006AEF] md:text-6xl">
              ¿Quiénes están detrás de cada reclutamiento?
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-black/75 sm:text-xl">
              Más de 10 personas activando perfiles bajo un brief específico
              para cada proyecto.
            </p>
          </div>
          <div className="hidden items-center gap-3 pb-1 md:flex">
            <ArrowButton
              direction="prev"
              onClick={() => scrollByDirection("prev")}
            />
            <ArrowButton
              direction="next"
              onClick={() => scrollByDirection("next")}
            />
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-12 md:gap-8"
        >
          {RECRUITERS.map((recruiter) => (
            <figure
              key={recruiter.name}
              className="flex w-36 shrink-0 snap-start flex-col items-center gap-4 sm:w-40 md:w-44"
            >
              <div className="relative aspect-square w-full transition-transform duration-300 hover:scale-105">
                <Image
                  src={recruiter.image}
                  alt={`Foto de ${recruiter.name}`}
                  fill
                  sizes="(max-width: 767px) 9rem, 11rem"
                  className="object-contain"
                />
              </div>
              <figcaption className="text-center text-sm font-semibold leading-tight text-black sm:text-base">
                {recruiter.name}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-2 text-sm text-black/50 md:hidden">
          Desliza para conocer al equipo &rarr;
        </p>
      </div>
    </section>
  );
}
