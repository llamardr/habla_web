import Link from "next/link";

const getBannerMessage = () => {
  // We'll split by "Regístrate aquí" and wrap it
  const message =
    "Participa de Estudio Abierto este 16 de abril. Una colaboración de HABLA LATAM y UTEC. Regístrate aquí.";
  const underline = "Regístrate aquí";
  const parts = message.split(underline);
  return (
    <>
      {parts[0]}
      <u className="underline">{underline}</u>
      {parts[1]}
    </>
  );
};

export default function AnnouncementBanner() {
  return (
    <Link
      href="/estudio-abierto"
      className="fixed inset-x-0 top-0 z-[110] block h-[50px] overflow-hidden bg-[#e295e0] text-black"
      aria-label="Ir a la página de Estudio Abierto"
    >
      <div className="announcement-marquee flex h-full items-center">
        <div className="announcement-marquee__track">
          <span>{getBannerMessage()}</span>
          <span aria-hidden="true">{getBannerMessage()}</span>
          <span aria-hidden="true">{getBannerMessage()}</span>
        </div>
      </div>
    </Link>
  );
}
