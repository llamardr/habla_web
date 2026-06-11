import Link from "next/link";

const getBannerMessage = () => {
  const message =
    "Participa del cierre de Estudio Abierto este jueves 18 de junio. Una colaboración de HABLA LATAM y UTEC. Conoce más aquí.";
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
      aria-label="Invitación al cierre de Estudio Abierto"
    >
      <Link
        href="/estudio-abierto"
        className="announcement-marquee flex h-full min-w-0 flex-1 items-center overflow-hidden"
        aria-label="Conocer más sobre Estudio Abierto"
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
