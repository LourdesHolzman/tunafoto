"use client";

import { useRef, useState, useEffect } from "react";

export default function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mb-4 relative overflow-hidden bg-gray-100"
      style={!loaded ? { aspectRatio: "3 / 4" } : undefined}
    >
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-skeleton-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200"
        />
      )}
      {inView && (
        <img
          src={src.replace("/upload/", "/upload/w_800/")}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full object-cover hover:scale-[1.02] transition-all duration-500 ease-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
          }`}
        />
      )}
    </div>
  );
}

