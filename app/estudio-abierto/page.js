import Image from "next/image";
import EstudioAbiertoIntroCarousel from "../components_habla/EstudioAbiertoIntroCarousel";
import EstudioAbiertoResultsSection from "../components_habla/EstudioAbiertoResultsSection";
import Footer from "../components_habla/Footer";
import Navbar from "../components_habla/Navbar";
import { getSuccessCaseArticle } from "../lib/successCaseArticles";

export const metadata = {
  title: "Estudio Abierto",
  description:
    "Conoce los resultados de la primera edición de Estudio Abierto de Habla y UTEC sobre las brechas invisibles en la educación financiera universitaria.",
  openGraph: {
    title: "Estudio Abierto | Habla",
    description:
      "Lee los hallazgos y descarga el informe final del primer Estudio Abierto.",
    url: "https://hablalatam.com/estudio-abierto",
  },
  twitter: {
    title: "Estudio Abierto | Habla",
    description:
      "Resultados del primer Estudio Abierto sobre educación financiera universitaria.",
  },
};

const introCards = [
  {
    title: "Abierto por diseño",
    image: "/estudio-abierto/card-abierto-por-diseno.png",
    alt: "Sala de clases durante una sesión de trabajo colaborativo",
  },
  {
    title: "Colaborativo",
    image: "/estudio-abierto/card-colaborativo.png",
    alt: "Computadora con el logo de Habla en un entorno formativo",
  },
  {
    title: "Basado en datos",
    image: "/estudio-abierto/card-basado-en-datos.png",
    alt: "Sesión remota de investigación con participantes",
  },
  {
    title: "Accionable",
    image: "/estudio-abierto/card-accionable.png",
    alt: "Mesa de trabajo con profesionales revisando un documento",
  },
  {
    title: "Contextualizado a Latinoamérica",
    image: "/estudio-abierto/card-contextualizado-latam.png",
    alt: "Mapa y contexto visual enfocado en Latinoamérica",
  },
  {
    title: "Orientado al futuro",
    image: "/estudio-abierto/card-orientado-futuro.png", 
    alt: "Equipo colaborando con enfoque prospectivo",
  },
];

const benefits = [
  {
    title: "Insights accionables sobre jóvenes en edad universitaria",
    body:
      "Acceso gratuito a hallazgos profundos sobre los comportamientos financieros de jóvenes en edad universitaria, explorando cómo se relacionan con el dinero y cuáles son los momentos críticos que influyen en sus decisiones financieras y de consumo.",
    image: "/estudio-abierto/benefit-insights.png",
    alt: "Megáfono sobre fondo azul",
  },
  {
    title: "Evidencia para diseñar mejores soluciones",
    body:
      "Resultados basados en investigación cualitativa y cuantitativa que pueden fortalecer el diseño de productos, programas, políticas o intervenciones dirigidas al segmento joven.",
    image: "/estudio-abierto/benefit-evidencia.png",
    alt: "Brújula sobre fondo azul",
    reverse: true,
  },
  {
    title: "Un espacio de co-creación reúne a todo el ecosistema",
    body:
      "Estudio Abierto une a un grupo diverso de profesionales que influyen, directa o indirectamente, en la relación de los jóvenes con el dinero: colegios, banca, fintechs, retail, ONGs, agencias de marketing, psicólogos, coaches financieros, creativos e instituciones.",
    image: "/estudio-abierto/benefit-cocreacion.png",
    alt: "Mano dibujando una idea sobre fondo azul",
  },
];

const schedule = [
  {
    date: "Jueves 16 de abril",
    title: "Kick-Off & Taller de Hipótesis",
    mode: "Presencial",
    time: "4:30PM - 7:00PM",
  },
  // {
  //   date: "XX de mayo",
  //   title: "Webinar: XXXX",
  //   mode: "Virtual",
  //   time: "3:00PM - 4:00PM",
  // },
  // {
  //   date: "XX de mayo",
  //   title: "Webinar: XXXX",
  //   mode: "Virtual",
  //   time: "7:00PM - 8:00PM",
  // },
  {
    date: "Junio 2026",
    title: "Evento de cierre",
    mode: "Presencial",
    time: "4:30PM - 7:00PM",
  },
];

const faqItems = [
  {
    number: "01",
    accent: "bg-[#006aef] text-[#fdf6ea]",
    question: "¿Tiene un costo?",
    answer:
      "No. La participación y acceso a resultados del estudio y en los eventos es completamente gratuita. Es un espacio de aprendizaje compartido y construcción colaborativa.",
  },
  {
    number: "02",
    accent: "bg-black text-[#fdf6ea]",
    question: "¿Quiénes pueden participar?",
    answer:
      "Actores del ecosistema financiero y educativo: banca tradicional, fintechs, sector público, instituciones educativas, ONGs, fundaciones, empresas con esquemas de financiamiento y pasarelas de pago interesadas en comprender mejor el segmento universitario.",
  },
  {
    number: "03",
    accent: "bg-[#e295e0] text-[#fdf6ea]",
    question: "¿Qué es el Estudio Abierto?",
    answer:
      "Es una iniciativa colaborativa impulsada por la Universidad de Ingeniería y Tecnología - UTEC y Habla Latam para entender cómo la gestión financiera impacta la vida universitaria. Antes de diseñar soluciones, buscamos validar el problema con evidencia real y múltiples miradas del ecosistema.",
  },
  {
    number: "04",
    accent: "bg-[#E8FF66] text-black",
    question: "¿Es un espacio comercial?",
    answer:
      "No. El objetivo no es vender productos ni promover soluciones específicas, sino comprender el problema con evidencia antes de diseñar posibles intervenciones. Es un espacio colaborativo de aprendizaje y networking, orientado a compartir conocimiento, contrastar miradas y construir una comprensión común del desafío.",
  },
  {
    number: "05",
    accent: "bg-black text-[#fdf6ea]",
    question: "¿Cómo se compartirán los resultados del estudio?",
    answer:
      "Los principales hallazgos se presentarán en el evento de cierre, donde se expondrá el análisis completo y se realizará un espacio de conversación e ideación basado en la evidencia recopilada. Adicionalmente, las personas y empresas que participen en los eventos presenciales recibirán el reporte consolidado del estudio con los hallazgos cualitativos y cuantitativos.",
  },
];

export default function EstudioAbiertoPage() {
  const estudioAbiertoArticle = getSuccessCaseArticle(
    "universitario-limeno-dinero-estudio-abierto"
  );

  return (
    <main className="bg-[#fdf6ea] text-black">
      <Navbar initialTextColor="dark" />

      <EstudioAbiertoResultsSection article={estudioAbiertoArticle} />

      <section className="bg-[#000000] py-10 text-[#fdf6ea] sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-right">
            <h2 className="type-h2 type-beige">
              Más allá del acceso
            </h2>
            <div className="flex justify-end">
              <p className="type-subheading type-beige w-3/4 mt-4 text-right">
                Las brechas invisibles en la educación financiera de los jóvenes en edad
                universitaria
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-x-hidden bg-[#006aef] py-10 text-[#fdf6ea] sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="min-w-0">
              <EstudioAbiertoIntroCarousel cards={introCards} />
            </div>
            <div className="flex items-center lg:pl-6">
              <p className="type-body whitespace-pre-line text-center w-full text-[#fdf6ea]/90">
                {"Estudio Abierto, como su nombre lo dice, es un proceso de investigación diseñado especialmente para ser abierto al público relevante. Tomamos un caso importante para la sociedad y abrimos la metodología perfeccionada durante 4 años para poder colaborar juntos en un reto."}
              </p>
            </div>
          </div>
        </div>
      </section>




      {false && (
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="type-h2 max-w-3xl">
              ¿Qué te llevas de participar en Estudio Abierto?
            </h2>

            <div className="mt-8 sm:mt-10">
              {benefits.map((benefit, idx) => (
                <article
                  key={benefit.title}
                  className={`grid gap-6 py-8 md:items-center ${
                    idx < 2 ? "border-b border-black/15 " : ""
                  }${
                    benefit.reverse
                      ? "md:grid-cols-[1fr_16.5rem] lg:grid-cols-[1fr_21rem]"
                      : "md:grid-cols-[11rem_1fr] lg:grid-cols-[14rem_1fr]"
                  }`}
                >
                  <div
                    className={`relative aspect-square overflow-hidden rounded-[2rem] ${
                      benefit.reverse ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={benefit.image}
                      alt={benefit.alt}
                      fill
                      sizes={
                        benefit.reverse
                          ? "(max-width: 768px) 45vw, 21rem"
                          : "(max-width: 768px) 45vw, 14rem"
                      }
                      className="object-cover"
                    />
                  </div>
                  <div className={benefit.reverse ? "md:order-1" : ""}>
                    <h3 className="type-h3">
                      {benefit.title}
                    </h3>
                    <p className="type-body mt-4 max-w-3xl text-black/80">
                      {benefit.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="type-h2">
            Calendario de Fases
          </h2>

          <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="order-2 lg:order-1">
              <div className="border-t border-black/20">
                {schedule.map((item) => (
                  <article
                    key={`${item.date}-${item.title}-${item.time}`}
                    className="grid gap-2 border-b border-black/20 py-4 sm:grid-cols-[7.5rem_1fr_auto]"
                  >
                    <p className="type-body-small text-black/65">
                      {item.date}
                    </p>
                    <h3 className="type-h3">
                      {item.title}
                    </h3>
                    <div className="type-body-small text-black/70 sm:text-right">
                      <p>{item.mode}</p>
                      <p>{item.time}</p>
                    </div>
                  </article>
                ))}
              </div>

              <RegistrationButton className="mt-8" />
            </div>

            <div className="order-1 grid grid-cols-[1.2fr_0.8fr] gap-4 lg:order-2">
              <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-black">
                <Image
                  src="/estudio-abierto/calendar-photo-3.svg"
                  alt="Equipo revisando documentos en una reunión"
                  fill
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-black">
                <Image
                  src="/estudio-abierto/calendar-photo-2.svg"
                  alt="Fachada de UTEC"
                  fill
                  sizes="(max-width: 1024px) 40vw, 18vw"
                  className="object-cover"
                  style={{ objectPosition: "right top" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="pb-0 pt-6 sm:pt-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="type-h2">
            FAQ
          </h2>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-black/10 bg-[#fdf6ea]/40">
            {faqItems.map((item, index) => (
              <article
                key={item.number}
                className={`grid grid-cols-[4.5rem_1fr] gap-4 border-black/10 p-4 sm:grid-cols-[6rem_1fr] sm:gap-6 sm:p-6 ${
                  index !== faqItems.length - 1 ? "border-b" : ""
                }`}
              >
                <div
                  className={`type-h3 flex min-h-16 items-center justify-center rounded-2xl ${item.accent}`}
                >
                  {item.number}
                </div>
                <div>
                  <h3 className="type-h3">
                    {item.question}
                  </h3>
                  <p className="type-body-small mt-2 text-black/80">
                    {item.answer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      <section className="bg-[#006aef] pb-0 pt-10 text-[#fdf6ea] sm:pt-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="type-section-statement type-beige max-w-5xl">
            Antes de crear {" "}
            <span className="inline-flex rounded-full bg-[#fdf6ea] px-4 py-1 text-[#006aef]">
              soluciones, 
            </span>
             queremos entender el{" "}
            <span className="inline-flex rounded-full border border-[#fdf6ea] px-4 py-1 text-[#fdf6ea]">
              problema
            </span>{" "}
            y hacerlo juntos.
          </h2>
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="relative h-40 sm:h-52 md:h-64 lg:h-72">
            <Image
              src="/estudio-abierto/footer-collage.jpeg"
              alt="Manos uniendo piezas de rompecabezas"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
