'use client'

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const toolkitData = [
  {
    key: 'investigacion',
    label: 'Investigación',
    color: 'text-black',
    tools: [
      { name: 'Entrevistas', img: '/toolkit/entrevistas.png' },
      { name: 'Dinámicas grupales', img: '/toolkit/dinamicas.png' },
      { name: 'Focus groups', img: '/toolkit/focus.png' },
      { name: 'Ventas (Físicas/Digitales)', img: '/toolkit/ventas.png' },
      { name: 'Interacción Redes Sociales', img: '/toolkit/redes.png' },
      { name: 'Optimización de Conversion Funnel', img: '/toolkit/funnel.png' },
      { name: 'SEO', img: '/toolkit/seo.png' },
      { name: 'Encuestas', img: '/toolkit/encuestas.png' },
    ],
  },
  {
    key: 'analitica',
    label: 'Experimentación',
    color: 'text-gray-400',
    tools: [
      { name: 'Briefing y supervisión de agencias', img: '/toolkit/agencias.png' },
      { name: 'Benchmark de soluciones', img: '/toolkit/benchmark.png' },
      { name: 'Card Sorting', img: '/toolkit/cardsorting.png' },
      { name: 'Testeo de usabilidad', img: '/toolkit/testeousabilidad.png' },
      { name: 'Diseño de experimentos', img: '/toolkit/copywriting.png' },
    ],
  },
  {
    key: 'tecnica',
    label: 'Implementación',
    color: 'text-gray-400',
    tools: [
      { name: 'Desarrollo web/app', img: '/toolkit/desarrolloweb.png' },
    ],
  },
];

export default function ToolkitSection() {
  const [selected, setSelected] = useState('investigacion');
  const [ratios, setRatios] = useState({});
  const current = toolkitData.find((cat) => cat.key === selected);
  const getRatio = (tool) =>
    tool.aspectRatio ??
    ratios[tool.img] ??
    '1 / 1';

  // --- Mantener altura uniforme en todas las categorías ---
  const maxTools = Math.max(...toolkitData.map((cat) => cat.tools.length)); // 8 por ahora
  const COLS_DESKTOP = 3; // columnas definidas en lg
  const CARD_EST = 200;   // px — alto aproximado (imagen + caption + gap)
  const minHeight = Math.ceil(maxTools / COLS_DESKTOP) * CARD_EST;

  return (
    <section className="bg-white py-5">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Menú lateral */}
        <div className="flex flex-col w-full md:w-2/5 items-start gap-4 mb-8 md:mb-0">
          <span className="text-base sm:text-lg md:text-xl text-[#006aef] max-w-full block">
            Nuestras herramientas
          </span>
          {toolkitData.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelected(cat.key)}
              className={`transition-all text-left text-black text-3xl sm:text-4xl md:text-5xl leading-tight ${
                selected === cat.key ? '' : 'opacity-40'
              } hover:text-[#006aef]`}
              style={{ lineHeight: 1.1 }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grilla de herramientas */}
        <div className="md:w-3/5 w-full flex items-start justify-center md:ml-8 md:mt-8">
          <div className="columns-2 sm:columns-3 lg:columns-3 gap-8 w-full px-4" style={{ minHeight }}>
            {/* —— helper to fetch ratio —— */}
            {/*
              Utilidad pequeña para decidir qué aspect‑ratio usar:
              1) primero `tool.aspectRatio` del dataset
              2) luego ratio medido y guardado en estado
              3) finalmente ratio cuadrado '1 / 1'
            */}

            <AnimatePresence mode="sync">
              {current.tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-[#e5e5e5ff] rounded-2xl shadow overflow-hidden flex flex-col mb-8 break-inside-avoid"
                >
                  {/* Imagen con aspect‑ratio adaptable */}
                  <div
                    className="relative w-full"
                    /* Asigna ratio 1/1 si no lo conoces aún,
                       después podrás reemplazar `1 / 1` por el valor real */
                    style={{ aspectRatio: getRatio(tool) }}
                  >
                    <Image
                      src={tool.img}
                      alt={tool.name}
                      fill
                      sizes="(max-width: 768px) 50vw,
                             (max-width: 1200px) 25vw,
                             200px"
                      style={{ padding: '12px' }}
                      className="object-contain"
                      onLoadingComplete={(img) => {
                        if (!tool.aspectRatio && !ratios[tool.img]) {
                          const r = `${img.naturalWidth} / ${img.naturalHeight}`;
                          setRatios((prev) => ({ ...prev, [tool.img]: r }));
                        }
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}