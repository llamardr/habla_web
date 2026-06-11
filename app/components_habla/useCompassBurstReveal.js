"use client";

import { useScroll } from "framer-motion";
import { useEffect } from "react";

export default function useCompassBurstReveal(
  targetRef,
  { offset = ["start end", "end end"] } = {}
) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  });

  useEffect(() => {
    const svg = targetRef.current?.querySelector("svg");
    if (!svg) return;

    const bursts = Array.from(svg.querySelectorAll('[class*="burst"]'));
    bursts.reverse();

    bursts.forEach((el) => {
      el.style.opacity = 0;
      el.style.transition = "opacity 0.1s ease";
    });

    const applyVisibility = (value) => {
      let visibleCount = Math.ceil(value * bursts.length);
      visibleCount = Math.min(Math.max(visibleCount, 0), bursts.length);

      bursts.forEach((el, idx) => {
        el.style.opacity = idx < visibleCount ? 1 : 0;
      });
    };

    applyVisibility(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", applyVisibility);

    return () => unsubscribe();
  }, [scrollYProgress, targetRef]);
}
