"use client";

import { useEffect, useState } from "react";
import SuccessCaseCard from "./SuccessCaseCard";

const cases = [
  {
    id: 1,
    title: "Identificamos nuevas líneas de negocio para Nicolle Chang",
    services: "Investigación: Propuesta de valor",
    description:
      "Ayudamos a Nicolle a explorar oportunidades en el mercado de salud y belleza, evaluando qué negocios podían alinearse con su marca personal y potenciando su crecimiento más allá del contenido digital.",
    imageUrl: "/case_studies/Nicolle C. .png",
    borderColor: "border-[#eaff7e]",
    aspectRatio: "aspect-square",
    marginClass: "mt-10",
    transformClass: "hover:scale-105 transform -translate-x-2",
    location: "Lima",
    logo: '/partners/nicolle_chang.png',
  },
  {
    id: 2,
    title: "Reimaginando Grifos AVA",
    services: "Investigación: Brand Awareness y Brand Perception",
    description:
      "Evaluamos la experiencia AVA en Lima y Arequipa y medimos la percepción de la marca frente a sus competidores.",
    imageUrl: "/case_studies/AVA.MARCO.1.png",
    borderColor: "border-[#EB8FFE]",
    aspectRatio: "aspect-[3/4]",
    marginClass: "mt-5",
    transformClass: "hover:scale-105 transform translate-x-2",
    location: "Lima y Arequipa",
    logo: "/partners/ava.png",
  },
  {
    id: 3,
    title: "Ciencia en Beauty",
    services: "Investigación: Brand Awareness y Brand Perception",
    description:
      "Determinamos la estrategia más efectiva para aumentar la participación de mercado de los productos propios de Fission Lab.",
    imageUrl: "/case_studies/Fission.Web.png",
    borderColor: "border-[#eaff7e]",
    aspectRatio: "aspect-square",
    marginClass: "mt-8",
    transformClass: "hover:scale-105 transform translate-x-1",
    location: "Perú",
    logo: "/partners/fission.png",
  },
  {
    id: 4,
    title: "Lanzando SoundCloud México",
    services: "Investigación: Go to Market",
    description:
      "Ayudamos a SoundCloud a entrar al mercado mexicano, definiendo la estrategia de lanzamiento y adaptando su servicio al mercado.",
    imageUrl: "/case_studies/SC.MARCO.1.png",
    borderColor: "border-[#eaff7e]",
    aspectRatio: "aspect-[3/4]",
    marginClass: "mt-24",
    transformClass: "hover:scale-105 transform -translate-x-1",
    location: "México",
    logo: "/partners/soundcloud.png",
  },
  {
    id: 5,
    title: "Ayudando a Alicorp a lanzar nuevas salsas",
    services: "Investigación: Go to Market",
    description:
      "Recorrimos el Perú ayudando a Alicorp a definir sus nuevas salsas. Tenían product-market-fit y alistamos el lanzamiento al mercado.",
    imageUrl: "/case_studies/ALI.MARCO.1.png",
    borderColor: "border-[#eaff7e]",
    aspectRatio: "aspect-square",
    marginClass: "mt-10",
    transformClass: "hover:scale-105 transform translate-x-2",
    location: "Lima, Arequipa, Trujillo",
    logo: "/partners/alicorp.png",
  },
  {
    id: 6,
    title:
      "Ayudando a Silvestre a evaluar el mercado y encontrar los drivers de sus consumidores",
    services: "Investigación: Product Market Fit",
    description:
      "Analizamos posicionamiento y propuesta de valor para el mercado ideal de la marca.",
    imageUrl: "/case_studies/SILV.MARCO.1.png",
    borderColor: "border-[#EB8FFE]",
    aspectRatio: "aspect-[3/4]",
    marginClass: "mt-8",
    transformClass: "hover:scale-105 transform -translate-x-2",
    location: "Lima",
    logo: '/partners/silvestre.png',
  },
  {
    id: 7,
    title: "Skincare Sessions by Fisserum",
    services: "Activación: Eventos",
    description:
      "Realizamos eventos que elevaron la propuesta de valor, el posicionamiento de la marca y la fidelización de clientas de la marca.",
    imageUrl: "/case_studies/FISS.E.MARCO.1.png",
    borderColor: "border-[#EB8FFE]",
    aspectRatio: "aspect-square",
    marginClass: "mt-12",
    transformClass: "hover:scale-105 transform translate-x-1",
    location: "Lima",
    // logo: '/partners/fisserum.png',
  },
  {
    id: 8,
    title: "Redes sociales y programa UGC",
    services: "Activación: Social Media + PR",
    description:
      "Desarrollamos estrategias de contenido para optimizar el crecimiento orgánico y la conexión con dermolíderes. Experimentamos con pauta y con un plan de para redes sociales, aumentamos el contenido UGC de la marca.",
    imageUrl: "/case_studies/FISS.MARCO.1.png",
    borderColor: "border-[#EB8FFE]",
    aspectRatio: "aspect-[3/4]",
    marginClass: "mt-6",
    transformClass: "hover:scale-105 transform -translate-x-1",
    location: "Lima",
    // logo: '/partners/fisserum.png',
  },
  {
    id: 9,
    title: "+50 participantes en sala en un taller del BCRP",
    services: "Activación: Talleres y Capacitaciones",
    description: "Para desarrollar capacidades y la escucha con propósito.",
    imageUrl: "/case_studies/BCRP.MARCO.1.png",
    borderColor: "border-[#eaff7e]",
    aspectRatio: "aspect-square",
    marginClass: "mt-15",
    transformClass: "hover:scale-105 transform translate-x-2",
    location: "Lima",
    logo: '/partners/bcrp.png',
  },
  {
    id: 10,
    title: "Mejoramos la presencia digital del COA con una página web",
    services: "Activación: Diseño e implementación Web",
    description: "Para desarrollar capacidades y la escucha con propósito.",
    imageUrl: "/case_studies/COA.MARCO.1.png",
    borderColor: "border-[#eaff7e]",
    aspectRatio: "aspect-[3/4]",
    marginClass: "mt-9",
    transformClass: "hover:scale-105 transform -translate-x-1",
    location: "Perú",
    logo: "/partners/coa.png",
  },
];

const SuccessCases = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMediumOrBelow, setIsMediumOrBelow] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMediumOrBelow(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const visibleCases = isMediumOrBelow && !showAll ? cases.slice(0, 3) : cases;

  return (
    <section id="successcases" className="pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl mt-8 mb-10 px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start pb-4 mb-12">
          <div className="md:w-1/2">
            <h2 className="text-black text-5xl md:text-6xl leading-tight">
              Casos de estudio
            </h2>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {visibleCases.map((caseItem) => (
            <SuccessCaseCard
              key={caseItem.id}
              id={caseItem.id}
              imageUrl={caseItem.imageUrl}
              title={caseItem.title}
              services={caseItem.services}
              description={caseItem.description}
              aspectRatio={caseItem.aspectRatio}
              marginClass={caseItem.marginClass}
              transformClass={caseItem.transformClass}
              borderColor={caseItem.borderColor}
              location={caseItem.location}
              logo={caseItem.logo}
            />
          ))}
        </div>
        {/* Show button on mobile and medium, hide on large screens */}
        <div className="flex justify-center mt-6 lg:hidden">
          {cases.length > 3 && (
            <button
              className="text-[#006aef] text-sm mb-4 inline-block opacity-80 relative group px-6 py-2 rounded-full bg-white transition-colors"
              onClick={() => setShowAll((prev) => !prev)}
            >
              <span className="relative z-10">
                {showAll ? "Ver menos" : "Ver todos los casos"}
              </span>
              <span
                className="absolute left-0 bottom-0 w-full h-[2px] bg-[#006aef] opacity-80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;
