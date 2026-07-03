import Image from "next/image";

const enfoqueCards = [
  {
    id: "product-market-fit",
    title: "Product–Market Fit",
    questions: [
      "¿Existe un segmento claro que realmente necesite lo que se ofrece?",
      "¿Están resolviendo un problema relevante o asumiendo que lo es?",
      "¿Hay evidencia real de que la propuesta de negocio encaja con el mercado?",
    ],
    image: "/enfoque/product-market-fit.png",
    backgroundColor: "#006aef",
  },
  {
    id: "propuesta-valor",
    title: "Propuesta de Valor / Modelo de Negocio",
    questions: [
      "¿Qué los hace verdaderamente relevantes frente a la competencia?",
      "¿La propuesta está claramente diferenciada o compite por precio?",
      "¿El modelo actual es sostenible en el tiempo?",
    ],
    image: "/enfoque/propuesta-valor.png",
    backgroundColor: "#0B0B0B",
  },
  {
    id: "adquisicion-growth",
    title: "Adquisición / Growth / Brand Awareness",
    questions: [
      "¿Cómo los descubren y por qué los eligen?",
      "¿Qué mensajes, canales y momentos influyen realmente en la decisión?",
      "¿Se está invirtiendo en crecimiento con claridad estratégica o por inercia?",
    ],
    image: "/enfoque/adquisicion-growth.png",
    backgroundColor: "#EB8FFE",
  },
  {
    id: "retencion",
    title: "Retención",
    questions: [
      "¿Por qué los clientes se quedan... y por qué se van?",
      "¿Qué momentos del journey fortalecen la relación y cuáles la debilitan?",
      "¿Se está construyendo lealtad o solo transacciones no relacionadas?",
    ],
    image: "/enfoque/retencion.png",
    backgroundColor: "#006aef",
  },
  {
    id: "go-to-market",
    title: "Go-To-Market Strategy",
    questions: [
      "¿Cómo lanzamos nuevas propuestas con menor riesgo y mayor claridad?",
      "¿La promesa de marca está alineada con la experiencia real del cliente?",
      "¿Existe una estrategia clara para pasar del diseño a la adopción?",
    ],
    image: "/enfoque/go-to-market.png",
    backgroundColor: "#0B0B0B",
  },
  {
    id: "diagnostico-equipos",
    title: "Diagnóstico de Equipos",
    questions: [
      "¿El equipo tiene la capacidad real para ejecutar la estrategia?",
      "¿Existe alineamiento entre liderazgo y operación?",
      "¿Las prioridades están claras o se diluyen en la ejecución?",
      "¿Los roles están definidos o generan fricción?",
    ],
    image: "/enfoque/diagnostico-equipos.png",
    backgroundColor: "#EB8FFE",
  },
];

export default function EnfoqueSection() {
  return (
    <section id="enfoque" className="w-full bg-[#fdf6ea] py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:gap-14">
          <h2 className="type-h2 mb-8 shrink-0 md:mb-0">
            Enfoque
          </h2>
          <p className="type-subheading flex-1 md:pt-2">
            Identificamos un reto concreto a resolver con la investigación.
            Dependiendo del momento y contexto en el que se encuentre tu
            negocio, te presentamos un proyecto personalizado que abarque
            las siguientes rutas.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-14 lg:grid-cols-3 lg:gap-8">
          {enfoqueCards.map((card) => (
            <article key={card.id} className="flex flex-col overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={card.image}
                  alt={`Ruta de investigación: ${card.title}`}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 360px"
                  className="object-cover"
                />
              </div>
              <div
                className="flex flex-1 flex-col px-6 pb-9 pt-7 text-[#fdf6ea]"
                style={{ backgroundColor: card.backgroundColor }}
              >
                <h3 className="type-h3 type-white">
                  {card.title}
                </h3>
                <ul className="mt-5 divide-y divide-[#fdf6ea]/15">
                  {card.questions.map((question) => (
                    <li key={question} className="type-body-small py-3 first:pt-0 last:pb-0 opacity-85">
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
