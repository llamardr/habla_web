'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SuccessCaseCard from './SuccessCaseCard';

const cases = [
  {
    id: 1,
    title: 'Reimaginando Grifos AVA',
    services: 'Brand Awareness | Brand Perception',
    description: 'Evaluamos la experiencia AVA en Lima y Arequipa y medimos la percepción de marca frente a sus competidores',
    imageUrl: '/case_studies/ava.png',
    borderColor: 'border-[#EB8FFE]',
    aspectRatio: 'aspect-square',
    marginClass: 'mt-10',
    transformClass: 'hover:scale-105 transform -translate-x-2',
    location: 'Lima y Arequipa',
    logo: '/partners/ava.png',
  },
  {
    id: 2,
    title: 'Lanzando SoundCloud México',
    services: 'GTM Analysis',
    description: 'Ayudamos a SoundCloud a entrar al mercado mexicano, definiendo la estrategia de lanzamiento y adaptando su servicio al mercado.',
    imageUrl: '/case_studies/soundcloud.png',
    borderColor: 'border-[#eaff7e]',
    aspectRatio: 'aspect-[3/4]',
    marginClass: 'mt-5',
    transformClass: 'hover:scale-105 transform translate-x-2',
    location: 'México',
    logo: '/partners/soundcloud.png',
  },
  {
    id: 3,
    title: 'Ayudando a Alicorp a lanzar nuevas salsas',
    services: 'GTM Analysis',
    description: 'Recorrimos el Perú ayudando a Alicorp a definir si sus nuevas salsas tenian product-market-fit y alistamos el lanzamiento al mercado.',
    imageUrl: '/case_studies/alicorp.png',
    borderColor: 'border-[#eaff7e]',
    aspectRatio: 'aspect-[3/4]',
    marginClass: 'mt-8',
    transformClass: 'hover:scale-105 transform translate-x-1',
    location: 'Lima, Arequipa, Trujillo',
    logo: '/partners/alicorp.png',
  },
  {
    id: 4,
    title: 'Caso de Éxito 4',
    services: 'Product Management',
    description: 'Optimizamos el ciclo de vida del producto, resultando en un lanzamiento 30% más rápido y eficiente.',
    imageUrl: '/case_studies/alicorp.jpg',
    borderColor: 'border-[#eaff7e]',
    aspectRatio: 'aspect-square',
    marginClass: 'mt-24',
    transformClass: 'hover:scale-105 transform -translate-x-1',
    location: '',
    logo: '',
  },
  {
    id: 5,
    title: 'Caso de Éxito 5',
    services: 'Data Analysis',
    description: 'A través del análisis de datos, identificamos nuevas oportunidades de mercado que aumentaron los ingresos en un 20%.',
    imageUrl: '/case_studies/ava.jpg',
    borderColor: 'border-[#EB8FFE]',
    aspectRatio: 'aspect-[3/4]',
    marginClass: 'mt-10',
    transformClass: 'hover:scale-105 transform translate-x-2',
    location: '',
    logo: '',
  },
  {
    id: 6,
    title: 'Caso de Éxito 6',
    services: 'Service Design',
    description: 'Mejoramos la experiencia de servicio al cliente, lo que llevó a un aumento del 40% en la satisfacción del cliente.',
    imageUrl: '/case_studies/qaira.jpg',
    borderColor: 'border-[#EB8FFE]',
    aspectRatio: 'aspect-square',
    marginClass: 'mt-8',
    transformClass: 'hover:scale-105 transform -translate-x-2',
    location: '',
    logo: '',
  },
];

const SuccessCases = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMediumOrBelow, setIsMediumOrBelow] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMediumOrBelow(window.innerWidth < 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const visibleCases = isMediumOrBelow && !showAll ? cases.slice(0, 3) : cases;

  return (
    <section id="successcases" className="py-10 px-4 sm:px-6 lg:px-8">
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
              <span className="relative z-10">{showAll ? 'Ver menos' : 'Ver todos los casos'}</span>
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#006aef] opacity-80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true"/>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuccessCases; 