"use client";

import Image from 'next/image';
import { useRef } from "react";
import CompassSVG from "@/public/CompassBursts.svg";
import useCompassBurstReveal from "./useCompassBurstReveal";

const heroCaseImages = [
  {
    id: "soundcloud",
    src: "/case_studies/soundcloud.png",
    alt: "Equipo de SoundCloud Mexico durante trabajo de campo",
    className: "w-[19vw] min-w-[210px] max-w-[280px] 2xl:max-w-[320px]",
  },
  {
    id: "ava",
    src: "/case_studies/ava.png",
    alt: "Equipo revisando prototipos durante el estudio de AVA",
    className:
      "w-[21vw] min-w-[230px] max-w-[310px] -translate-y-6 2xl:max-w-[350px] 2xl:-translate-y-12",
  },
];

const HeroSection = ({ title = null, subtitle = null, backgroundColor = null }) => {
  const sectionRef = useRef(null);

  useCompassBurstReveal(sectionRef, {
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] md:min-h-[108vh] lg:min-h-[112vh] bg-cover bg-center flex flex-col items-stretch pt-24 gap-12 overflow-x-clip overflow-y-visible"
      style={{ backgroundColor: backgroundColor || "#006aef" }}
    >
      <div className="pointer-events-none absolute right-0 bottom-0 z-[3] aspect-square w-[120vw] translate-x-[8%] translate-y-[19%] sm:w-[90vw] md:bottom-[34%] md:w-auto md:h-[72vh] md:translate-y-1/2 lg:h-[82vh]">
        <CompassSVG
          aria-hidden="true"
          focusable="false"
          className="h-full w-full scale-x-[-1]"
        />
      </div>

      {/* Main logo and content at the top (columna izquierda) */}
      <div className="relative z-10 w-full flex flex-col space-y-3 mt-12 px-8 sm:px-12 md:mt-14 md:px-14">
        <div>
          {title ? (
            <h1 className="type-display type-beige">{title}</h1>
          ) : (
            <Image
              src="/main_logo.svg"
              alt="Logo de Habla"
              width={800}
              height={200}
              priority
              unoptimized
              className="w-full max-w-[18rem] sm:max-w-[34rem] md:max-w-[48rem] lg:max-w-[58rem] xl:max-w-[62rem]"
            />
          )}
        </div>
        <div>
          {subtitle ? (
            <p className="type-subheading type-beige mt-2 max-w-[34rem]">{subtitle}</p>
          ) : (
            <Image
              src="/basado_en_datos.png"
              alt="Basado en datos. Impulsado por humanos"
              width={400}
              height={100}
              priority
              unoptimized
              className="lg:max-w-[25%] sm:max-w-[20%] md:max-w-[30%] w-full"
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-4 left-[13vw] z-[4] hidden items-end gap-8 md:flex lg:bottom-6 lg:gap-10 2xl:bottom-24 2xl:left-[12vw]">
        {heroCaseImages.map((item) => (
          <div key={item.id} className={`relative aspect-[3/4] overflow-hidden rounded-xl ${item.className}`}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 1023px) 28vw, 360px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* —— Corte visual: fondo blanco que cubre la parte baja del Hero —— */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] hidden h-[34%] bg-[#fdf6ea] md:block"></div>
    </section>
  );
};

export default HeroSection;
