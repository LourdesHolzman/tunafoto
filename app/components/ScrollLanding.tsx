"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import FotografiaContent from "../fotografia/components/FotografiaContent";
import { PATHS } from "@/lib/keys";

const HERO_HIDE_THRESHOLD = 1.05;
const URL_SWITCH_THRESHOLD = 0.55;

export default function ScrollLanding() {
  const [progress, setProgress] = useState(0);
  const [heroMounted, setHeroMounted] = useState(true);
  const tickingRef = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Intercept clicks on links to "/" while already on the landing → smooth scroll up
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href !== PATHS.home) return;
      e.preventDefault();
      window.history.replaceState(null, "", PATHS.home);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const compute = () => {
      const vh = window.innerHeight || 1;
      const y = window.scrollY;
      const p = Math.min(Math.max(y / vh, 0), 1);
      setProgress(p);

      const ratio = y / vh;
      setHeroMounted(ratio < HERO_HIDE_THRESHOLD);

      const target = ratio > URL_SWITCH_THRESHOLD ? PATHS.fotografia : PATHS.home;
      if (window.location.pathname !== target) {
        const hash = target === PATHS.fotografia ? window.location.hash : "";
        window.history.replaceState(null, "", `${target}${hash}`);
      }
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const eased = progress * progress * (3 - 2 * progress);

  return (
    <>
      {heroMounted && (
        <div
          className="fixed inset-0 h-svh w-full z-20 will-change-transform"
          style={{
            transform: `translate3d(0, ${-eased * 100}%, 0) scale(${1 - eased * 0.04})`,
            opacity: 1 - eased,
            pointerEvents: progress > 0.5 ? "none" : "auto",
          }}
          aria-hidden={progress > 0.5}
        >
          <Hero embedded />
        </div>
      )}

      <div aria-hidden style={{ height: "100svh" }} />

      <FotografiaContent />
    </>
  );
}
