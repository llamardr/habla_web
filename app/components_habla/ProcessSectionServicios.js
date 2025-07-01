'use client'

import { useState } from 'react';
import Image from 'next/image';

const milestoneImages = [
  '/objects/Mano1-1.png',
  '/objects/Mano2-1.png',
  '/objects/Ojo-2.png',
];

const ProcessSectionServicios = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const milestones = [
    {
      number: "2 meses",
      title: "Investigación",
      description: "Entendemos del problema desde el punto de vista de la empresa y de la persona. Generamos hipótesis a validar a través de distintas metodologías. Recopilamos y procesamiento de información tanto cualitativa como cuantitativa y generamos hallazgos, conclusiones y recomendaciones basados en data.",
    },
    {
      number: "1 mes",
      title: "Experimentación",
      description: "A partir de las conclusiones de la investigación diseñamos experimentos de corto tiempo para validar las conclusiones y que tu dinero invertido vea retorno.",
    },
    {
      number: "> 6 meses",
      title: "Implementación (opcional)",
      description: "Lideramos la ejecución de proyectos y el trabajo técnico en: Analítica técnica y creativa, briefing y supervisión de agencias, benchmark de soluciones, card sorting, testeos de usabilidad, definición y diseño de experimentos, desarrollo web/app, diseño y prototipado, y copywriting.",
    }
  ];

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section id="process" className="py-10">
      <div className="mx-auto max-w-6xl mt-8 mb-10 px-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-10 md:mb-12">
        <div className="md:w-1/2 mb-2 md:mb-0">
          <h2 className="text-black text-5xl md:text-6xl mb-2 md:mb-6 leading-tight pb-2 md:pb-4">
             ¿Cómo trabajamos?
          </h2>
        </div>
        <div className="md:w-1/2 md:pl-12 flex items-center">
          <p className="text-black text-base opacity-80">
            Durante los primeros dos meses nos encargamos de levantar toda la información posible del mercado y tus clientes para definir que problemas solucionar y como. Durante el tercer mes ejecutamos experimentos que ayuden a validar que es el camino correcto. Si deseas, podemos trabajar juntos por más tiempo liderando las actividades que queden por hacer. 
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-96">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="bg-[#fcf8f3] rounded-lg transition-all duration-500 ease-in-out flex flex-col justify-between items-start relative overflow-hidden"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{ position: 'relative' }}
            >
              <div className="p-6 flex flex-col items-start relative min-h-[220px] w-full">
                <span className="text-[#9c8c79] text-lg">{milestone.number}</span>
                <h4 className="text-xl font-bold mt-4 mb-2 min-h-[56px] text-left">{milestone.title}</h4>
                {/* Imagen y texto superpuestos para transición suave */}
                <div className="w-full flex flex-col items-end relative min-h-[192px]">
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`}
                  >
                    <Image
                      src={milestoneImages[index]}
                      alt={milestone.title}
                      width={192}
                      height={192}
                      className="w-48 h-48 object-contain mt-4"
                      priority
                      unoptimized
                    />
                    <span className="mt-2 text-xs text-gray-500 italic">Leer más</span>
                  </div>
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <div className="p-6 pt-0">
                      <p className="text-black text-sm text-left">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSectionServicios; 