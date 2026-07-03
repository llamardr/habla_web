"use client";

import CompassSVG from "@/public/CompassBursts.svg"; // SVGR inline SVG
import { useRef } from "react";
import ButtonContacto from "./ButtonContacto";
import useCompassBurstReveal from "./useCompassBurstReveal";

const UsSection = () => {
  const sectionRef = useRef(null);

  useCompassBurstReveal(sectionRef);

  return (
    <section
      id="us"
      ref={sectionRef}
      className="w-full bg-[#fdf6ea] flex flex-col md:flex-row items-stretch md:px-0 -mt-16 pt-24 md:-mt-48 md:pt-52"
    >
      <div className="md:w-2/5 flex items-center justify-center order-1 md:order-none">
        <CompassSVG className="w-full h-full pointer-events-none" />
      </div>

      {/* Text block */}
      <div className="lg:pr-32 w-full md:w-3/5 flex px-4 flex-col">
        <h1 className="type-display type-black">
          HABLA Latam es un estudio especializado en el lanzamiento de nuevos
          productos en Latinoamérica
        </h1>
        <p className="type-body mt-8 mb-8 max-w-2xl text-black">
          Nuestro objetivo es construir oportunidades reales en el contexto en
          el que se encuentra tu negocio.
        </p>
        <div className="w-40 mb-20 sm:mb-0 md:mb-20">
          <ButtonContacto backgroundColor="#006aef" color="#fdf6ea" />
        </div>
      </div>
    </section>
  );
};

export default UsSection;
