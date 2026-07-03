import Image from "next/image";
import Link from "next/link";

const LINKS = {
  investigacionesActivas: "https://chat.whatsapp.com/IECQLcG7PSdKmQ5H3SYJv3",
  postulaReclutamiento:
    "https://wa.me/51962811192?text=Hola%20Lady%2C%20estoy%20interesado%20en%20formar%20parte%20del%20equipo%20de%20reclutamiento%20de%20Habla.",
  grupoWhatsapp: "https://chat.whatsapp.com/IECQLcG7PSdKmQ5H3SYJv3",
};

const CARDS = [
  {
    title: "Investigaciones Activas",
    body: "Conoce las encuestas, focus groups y otras opciones que tenemos activas.",
    image: "/comunidad/investigaciones-activas-v2.webp",
    alt: "Mano sosteniendo una lupa",
    href: LINKS.investigacionesActivas,
    cta: "PARTICIPAR AHORA",
    cardClass: "bg-[#006aef] text-[#fdf6ea]",
    buttonColors: { backgroundColor: "#006aef", color: "#fdf6ea" },
  },
  {
    title: "Postula al equipo de Reclutamiento",
    body: (
      <>
        Se parte del equipo de Habla Latam{" "}
        <span className="type-strong">#EnCampo</span>
      </>
    ),
    image: "/comunidad/postula-reclutamiento-v2.webp",
    alt: "Megáfono en blanco y negro",
    href: LINKS.postulaReclutamiento,
    cta: "POSTULAR AL EQUIPO",
    cardClass: "bg-black text-[#fdf6ea]",
    buttonColors: { backgroundColor: "#000000", color: "#fdf6ea" },
  },
  {
    title: "Únete al grupo de WhatsApp y entérate de lo nuevo primero.",
    body: null,
    image: "/comunidad/grupo-whatsapp-v2.webp",
    alt: "Fichas de juego agrupadas",
    href: LINKS.grupoWhatsapp,
    cta: "ENTRAR AL GRUPO",
    cardClass: "bg-[#EB8FFE] text-black",
    buttonColors: { backgroundColor: "#EB8FFE", color: "#000000" },
  },
];

function CommunityCard({ card }) {
  const titleColorClass = card.cardClass.includes("text-[#fdf6ea]")
    ? "type-white"
    : "type-black";

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex flex-1 flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7 ${card.cardClass}`}
      >
        <h3 className={`type-h3 ${titleColorClass}`}>
          {card.title}
        </h3>
        {card.body && (
          <p className="type-body mt-3 opacity-90">
            {card.body}
          </p>
        )}
        <div className="relative mt-6 min-h-[17rem] flex-1 sm:min-h-[19rem]">
          <Image
            src={card.image}
            alt={card.alt}
            fill
            sizes="(max-width: 767px) 88vw, 24rem"
            className="object-contain object-bottom"
          />
        </div>
      </div>
      <Link
        href={card.href}
        target={card.href.startsWith("http") ? "_blank" : undefined}
        rel={card.href.startsWith("http") ? "noreferrer" : undefined}
        className="btn w-full transition-transform duration-200 ease-in-out hover:scale-105"
        style={{
          backgroundColor: card.buttonColors.backgroundColor,
          color: card.buttonColors.color,
          border: `2px solid ${card.buttonColors.backgroundColor}`,
        }}
      >
        {card.cta}
      </Link>
    </div>
  );
}

export default function CommunityCTASection() {
  return (
    <section
      id="se-parte-de-la-comunidad"
      className="w-full bg-[#fdf6ea] py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="type-h2 max-w-2xl">
          Se parte de nuestra comunidad
        </h2>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-3">
          {CARDS.map((card) => (
            <CommunityCard key={card.cta} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
