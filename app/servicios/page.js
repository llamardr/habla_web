import HeroSectionServicios from "../components_habla/HeroSectionServicios";
import ProcessSectionServicios from "../components_habla/ProcessSectionServicios";
import Navbar from "../components_habla/Navbar";
import Footer from "../components_habla/Footer";
import ToolkitSection from "../components_habla/ToolkitSection";

const servicios = [
  {
    title: "Strategic innovation",
    description: "Impulsamos la innovación estratégica para transformar tu negocio y anticipar tendencias del mercado.",
  },
  {
    title: "Service design",
    description: "Diseñamos servicios centrados en el usuario, alineando experiencia y valor para tus clientes.",
  },
  {
    title: "Operational excellence",
    description: "Optimizamos procesos y operaciones para maximizar eficiencia y resultados sostenibles.",
  },
  {
    title: "Revamp value prop",
    description: "Redefinimos y potenciamos tu propuesta de valor para diferenciarte y crecer.",
  },
  {
    title: "GTM strategy",
    description: "Desarrollamos estrategias de go-to-market efectivas para lanzar productos y servicios exitosos.",
  },
  {
    title: "New product developments",
    description: "Aceleramos el desarrollo de nuevos productos desde la idea hasta el lanzamiento.",
  },
  {
    title: "GenZification of your value prop",
    description: "Adaptamos tu propuesta de valor para conectar auténticamente con nuevas generaciones.",
  },
  {
    title: "Build MVPs",
    description: "Construimos MVPs funcionales para validar ideas y acelerar el aprendizaje en el mercado.",
  },
];

const toolkit = [
  {
    category: "Analítica",
    tools: [
      { name: "Briefing y supervisión de agencias", placeholder: true },
      { name: "Benchmark de soluciones", placeholder: true },
      { name: "Card Sorting", placeholder: true },
      { name: "Testeo de usabilidad", placeholder: true },
      { name: "Diseño de experimentos", placeholder: true },
    ],
  },
  {
    category: "Técnica",
    tools: [
      { name: "Desarrollo web/app", placeholder: true },
    ],
  },
  {
    category: "Creativa",
    tools: [
      { name: "Diseño y prototipado", placeholder: true },
      { name: "Copywriting / arquitectura de información", placeholder: true },
    ],
  },
];

export default function ServiciosPage() {
  return (
    <main>
      <Navbar />
      <HeroSectionServicios />
      <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <ProcessSectionServicios />
          <ToolkitSection />
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 