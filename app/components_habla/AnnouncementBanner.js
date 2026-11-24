"use client";

import Link from "next/link";
import { trackGAEvent } from "../lib/googleAnalytics";

const getBannerMessage = () => {
  const message =
    "¿Cómo usan la IA los limeños? Descubre los resultados de nuestro nuevo Estudio Abierto.";
  return (
    <>
      {message}
    </>
  );
};

const MarqueeGroup = ({ hidden = false }) => (
  <div className="announcement-marquee__group" aria-hidden={hidden}>
    <span>{getBannerMessage()}</span>
    <span>{getBannerMessage()}</span>
    <span>{getBannerMessage()}</span>
    <span>{getBannerMessage()}</span>
  </div>
);

export default function AnnouncementBanner() {
  return (
    <div
      data-announcement-banner
      className="fixed inset-x-0 top-0 z-[110] flex h-[50px] overflow-hidden bg-[#e295e0] text-black"
      role="region"
      aria-label="Nuevo Estudio Abierto sobre el uso de IA de los limeños"
    >
      <Link
        href="/casos-de-exito/uso-ia-limenos-estudio-abierto"
        className="announcement-marquee flex h-full min-w-0 flex-1 items-center overflow-hidden"
        aria-label="Ver resultados sobre el uso de IA de los limeños"
        onClick={() =>
          trackGAEvent("select_content", {
            source: "announcement_banner",
            content_type: "promotion",
            item_name: "resultados_estudio_abierto_ia",
            link_url: "/casos-de-exito/uso-ia-limenos-estudio-abierto",
          })
        }
      >
        <div className="announcement-marquee__track">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </Link>
    </div>
  );
}
