import Image from 'next/image';
import MiniSuccessCaseCard from './MiniSuccessCaseCard';

const HeroSection = ({ title = null, subtitle = null, backgroundColor = null }) => {
  // ⚠️ Temporal: dataset de casos. Reemplázalo por fetch o props más adelante
  const cases = [
    {
      id: 'soundcloud',
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
      id: 'ava',
      title: 'Reimaginando Grifos AVA',
      services: 'Brand Awareness | Brand Perception',
      description: 'Evaluamos la experiencia AVA en Lima y Arequipa y medimos la percepción de marca frente a sus competidores',
      imageUrl: '/case_studies/ava.png',
      borderColor: 'border-[#EB8FFE]',
      aspectRatio: 'aspect-[3/4]',
      marginClass: 'mt-10',
      transformClass: 'hover:scale-105 transform -translate-x-2',
      location: 'Lima y Arequipa',
      logo: '/partners/ava.png',
    }
  ];
  return (
    <section
      className="relative w-full min-h-[100vh] bg-cover bg-center flex flex-col items-stretch  pt-24 gap-12 overflow-visible"
      style={{ backgroundColor: backgroundColor || "#006aef" }}
    >
      {/* Main logo and content at the top (columna izquierda) */}
      <div className="relative z-10 w-full flex flex-col space-y-4 mt-16 px-14">
        <div>
          {title ? (
            <h1 className="text-white text-7xl md:text-8xl font-bold leading-tight">{title}</h1>
          ) : (
            <Image
              src="/main_logo.svg"
              alt="Logo de Habla"
              width={800}
              height={200}
              priority
              className="lg:max-w-[80%] sm:max-w-[100%] w-full"
            />
          )}
        </div>
        <div>
          {subtitle ? (
            <p className="text-white text-2xl md:text-3xl mt-4">{subtitle}</p>
          ) : (
            <Image
              src="/basado_en_datos.png"
              alt="Basado en datos. Impulsado por humanos - Filosofía de Habla"
              width={400}
              height={100}
              priority
              className="lg:max-w-[25%] sm:max-w-[20%] md:max-w-[30%] w-full"
            />
          )}
        </div>
      </div>
      {/* Desktop: grid of cases */}
      <div className="relative z-10 w-full flex-wrap justify-center md:justify-end gap-12 pb-8 pr-0 md:pr-16 lg:pr-32 hidden md:flex">
        {cases.map((c) => (
          <div key={c.id} className="w-[150px] sm:w-[200px] md:w-[240px] lg:w-[300px]">
            <MiniSuccessCaseCard {...c} />
          </div>
        ))}
      </div>
      {/* Mobile: horizontal scroll of cases */}
      <div className="relative z-10 w-full flex md:hidden overflow-x-auto whitespace-nowrap gap-4 pb-8 pr-0">
        {cases.map((c) => (
          <div
            key={c.id}
            className="inline-block align-top w-[220px] mx-2"
            style={{ minWidth: 220, maxWidth: 240 }}
          >
            <MiniSuccessCaseCard {...c} />
          </div>
        ))}
      </div>
      {/* —— Corte visual: fondo blanco que cubre la parte baja del Hero —— */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%] bg-white hidden md:block"></div>
    </section>
  );
};

export default HeroSection;
