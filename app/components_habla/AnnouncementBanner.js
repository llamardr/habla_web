import Link from "next/link";

const getBannerMessage = () => {
  const message =
    "Mira los resultados del primer Estudio Abierto de Habla LATAM aquí.";
  return (
    <>
      {message}
    </>
  );
};

export default function AnnouncementBanner() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[110] flex h-[50px] overflow-hidden bg-[#e295e0] text-black"
      role="region"
      aria-label="Resultados del primer Estudio Abierto"
    >
      <Link
        href="/estudio-abierto"
        className="announcement-marquee flex h-full min-w-0 flex-1 items-center overflow-hidden"
        aria-label="Ver resultados del primer Estudio Abierto"
      >
        <div className="announcement-marquee__track">
          <span>{getBannerMessage()}</span>
          <span aria-hidden="true">{getBannerMessage()}</span>
          <span aria-hidden="true">{getBannerMessage()}</span>
        </div>
      </Link>
    </div>
  );
}
