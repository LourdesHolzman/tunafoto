"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { BATCH_SIZE, CATEGORIAS, TEXTOS_CATEGORIA, SCROLL_ROOT_MARGIN } from "@/lib/constants";
import { KEYS } from "@/lib/keys";
import CategoryMenu from "./CategoryMenu";
import Gallery from "./Gallery";

type Categoria = (typeof CATEGORIAS)[number];

const SWIPE_THRESHOLD_X = 70;
const SWIPE_MAX_Y = 60;

export default function FotografiaContent() {
  const [navHeight, setNavHeight] = useState(0);
  const [active, setActive] = useState<Categoria>(CATEGORIAS[0]);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [showSticky, setShowSticky] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right" | "none">("none");

  const sectionRef = useRef<HTMLElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const cache = useRef<Record<string, string[]>>({});
  const userInteractedRef = useRef(false);

  // Sync active ← URL hash (initial load + back/forward + external link)
  useEffect(() => {
    const applyHash = () => {
      const slug = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!slug) return;
      const found = CATEGORIAS.find((c) => c.slug === slug);
      if (found) setActive(found);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // Sync URL hash ← active (only after user interaction, never on first mount)
  useEffect(() => {
    if (!userInteractedRef.current) return;
    const newHash = `#${active.slug}`;
    if (window.location.hash !== newHash) {
      const url = `${window.location.pathname}${window.location.search}${newHash}`;
      window.history.replaceState(null, "", url);
    }
  }, [active.slug]);

  const scrollToTop = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const nav = document.getElementById("main-navbar");
    const navH = nav?.offsetHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  }, []);

  const goToCategory = useCallback((dir: -1 | 1) => {
    setActive((prev) => {
      const idx = CATEGORIAS.findIndex((c) => c.slug === prev.slug);
      const next = idx + dir;
      if (next < 0 || next >= CATEGORIAS.length) return prev;
      userInteractedRef.current = true;
      setSlideDir(dir === 1 ? "left" : "right");
      scrollToTop();
      return CATEGORIAS[next];
    });
  }, [scrollToTop]);

  useEffect(() => {
    const nav = document.getElementById("main-navbar");
    if (!nav) return;
    const update = () => setNavHeight(nav.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(nav);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast = entry.boundingClientRect.top < 0;
        setShowSticky(!entry.isIntersecting && scrolledPast);
      },
      { threshold: 0 },
    );
    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);

    if (cache.current[active.slug]) {
      setImagenes(cache.current[active.slug]);
      return;
    }
    setImagenes([]);
    fetch(`/api/imagenes?folder=${active.slug}`)
      .then((res) => res.json())
      .then((data) => {
        cache.current[active.slug] = data;
        setImagenes(data);
      });
  }, [active.slug]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, imagenes.length));
  }, [imagenes.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: SCROLL_ROOT_MARGIN },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Horizontal swipe (mobile) + keyboard arrows (desktop) → switch category
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < SWIPE_THRESHOLD_X) return;
      if (Math.abs(dy) > SWIPE_MAX_Y) return;
      goToCategory(dx < 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (e.key === KEYS.right) goToCategory(1);
      else if (e.key === KEYS.left) goToCategory(-1);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [goToCategory]);

  const handleSelect = useCallback((cat: Categoria) => {
    setActive((prev) => {
      if (prev.slug === cat.slug) return prev;
      const prevIdx = CATEGORIAS.findIndex((c) => c.slug === prev.slug);
      const nextIdx = CATEGORIAS.findIndex((c) => c.slug === cat.slug);
      userInteractedRef.current = true;
      setSlideDir(nextIdx > prevIdx ? "left" : "right");
      scrollToTop();
      return cat;
    });
  }, [scrollToTop]);

  const slideClass =
    slideDir === "left"
      ? "animate-slide-in-left"
      : slideDir === "right"
      ? "animate-slide-in-right"
      : "animate-fade-in-up";

  return (
    <section
      ref={sectionRef}
      className="min-h-svh bg-white text-black px-4 sm:px-6 pt-24 sm:pt-28 pb-16 touch-pan-y overflow-x-clip"
    >
      <div ref={triggerRef} />

      <CategoryMenu
        id="main"
        active={active}
        onSelect={handleSelect}
        className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.3em] font-light mb-10 sm:mb-16"
      />

      <div
        style={{ top: navHeight }}
        className={`fixed left-0 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 z-40 shadow-sm transition-all duration-300 ${
          showSticky ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="scrollbar-hide overflow-x-auto md:overflow-visible scrollbar-fade-x md:[mask-image:none]">
          <CategoryMenu
            id="sticky"
            active={active}
            onSelect={handleSelect}
            className="flex md:flex-wrap md:justify-center gap-6 md:gap-10 text-[10px] sm:text-[11px] tracking-[0.3em] font-light px-6 py-4 min-w-max md:min-w-0"
          />
        </div>
      </div>

      <div key={`title-${active.slug}`} className={`max-w-3xl mx-auto text-center mb-10 sm:mb-16 ${slideClass}`}>
        <h1 className="text-xl sm:text-2xl md:text-4xl font-light mb-4 sm:mb-6 tracking-[0.15em] sm:tracking-[0.2em]">
          {active.name}
        </h1>

        <div className="space-y-3 sm:space-y-2 text-gray-600 text-sm sm:text-[15px] leading-relaxed px-2 sm:px-0">
          {TEXTOS_CATEGORIA[active.slug]?.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <div key={`gallery-${active.slug}`} className={slideClass}>
        <Gallery imagenes={imagenes} visibleCount={visibleCount} categoryName={active.name} />
      </div>

      {visibleCount < imagenes.length && <div ref={sentinelRef} className="h-1" />}
    </section>
  );
}
