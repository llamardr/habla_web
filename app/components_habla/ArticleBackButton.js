"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";
import { trackGAEvent } from "../lib/googleAnalytics";

export default function ArticleBackButton() {
  const router = useRouter();

  const handleClick = () => {
    trackGAEvent("select_content", {
      source: "article_back_button",
      content_type: "navigation_button",
      item_name: "atras",
    });

    const referrer = document.referrer ? new URL(document.referrer) : null;
    const cameFromHabla = referrer?.origin === window.location.origin;
    const hasClientNavigation = Number(window.history.state?.idx) > 0;

    if (cameFromHabla || hasClientNavigation) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="type-button inline-flex items-center gap-2 rounded-full border border-[#006aef] px-4 py-2 text-[#006aef] transition-colors duration-200 hover:bg-[#006aef] hover:text-[#fdf6ea] focus:outline-none focus:ring-2 focus:ring-[#006aef] focus:ring-offset-2 focus:ring-offset-[#fdf6ea]"
      aria-label="Volver a la página anterior o al inicio de Habla"
    >
      <HiArrowLeft className="h-5 w-5" aria-hidden="true" />
      Atrás
    </button>
  );
}
