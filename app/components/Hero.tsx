"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeroProps {
  embedded?: boolean;
}

export default function Hero({ embedded = false }: HeroProps) {
  const router = useRouter();

  useEffect(() => {
    if (embedded) return;

    let startY = 0;
    let navigated = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth >= 768) return;
      if (navigated) return;

      const endY = e.changedTouches[0].clientY;
      const distance = startY - endY;

      if (distance > 50) {
        navigated = true;
        router.push("/fotografia");
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [router, embedded]);

  const handleArrow = (e: React.MouseEvent) => {
    if (!embedded) return;
    e.preventDefault();
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative h-svh w-full overflow-hidden" aria-label="Portada">
      <Image
        src="/emmaa.jpg"
        alt="Portada Tuna Fotografía"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[40%_center] md:object-[center_20%] block md:block hidden md:block"
      />
      <Image
        src="/emmaa-mobile2.jpg"
        alt="Portada Tuna Fotografía"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center block md:hidden"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-6">
        <p className="uppercase tracking-[0.2em] text-sm mb-4">
          Fotografía & Video
        </p>

        <h1 className="text-4xl md:text-6xl font-light tracking-wide leading-tight max-w-4xl">
          Momentos únicos<br />para toda la vida
        </h1>

        <Link
          href="/fotografia"
          onClick={handleArrow}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70 md:hidden"
        >
          ↓
        </Link>
      </div>
    </section>
  );
}