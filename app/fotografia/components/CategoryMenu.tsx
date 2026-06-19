"use client";

import { useEffect, useRef } from "react";
import { CATEGORIAS } from "@/lib/constants";

interface CategoryMenuProps {
  id: string;
  active: { slug: string };
  onSelect: (cat: (typeof CATEGORIAS)[number]) => void;
  className?: string;
}

export default function CategoryMenu({ id, active, onSelect, className }: CategoryMenuProps) {
  const activeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const btn = activeBtnRef.current;
    if (!btn) return;
    btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active.slug]);

  return (
    <div className={className}>
      {CATEGORIAS.map((cat) => {
        const isActive = active.slug === cat.slug;
        return (
          <button
            key={`${id}-${cat.slug}`}
            ref={isActive ? activeBtnRef : undefined}
            onClick={() => onSelect(cat)}
            className={`relative whitespace-nowrap transition-all duration-300 ${
              isActive ? "text-black" : "text-gray-400 hover:text-black"
            }`}
          >
            {cat.name}
            {isActive && (
              <span className="absolute left-0 -bottom-2 w-full h-[1px] bg-black" />
            )}
          </button>
        );
      })}
    </div>
  );
}

