import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface MobileMenuProps {
  open: boolean;
  links: { name: string; href: string }[];
  onClose: () => void;
}

export default function MobileMenu({ open, links, onClose }: MobileMenuProps) {
  const startX = useRef(0);
  const startY = useRef(0);

  return (
    <div
      onTouchStart={(e) => {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
    }}
    onTouchEnd={(e) => {
      const diffX = e.changedTouches[0].clientX - startX.current;
      const diffY = Math.abs(
        e.changedTouches[0].clientY - startY.current
      );

      // Swipe horizontal hacia la derecha
      if (diffX > 80 && diffY < 50) {
        onClose();
      }
    }}
    className={`fixed inset-0 bg-white z-[60] flex flex-col transition-all duration-500
    ${open ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-10 pointer-events-none"}`}
    >
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Link href="/" onClick={onClose}>
          <Image src="/logo.svg" alt="Tuna Fotografía" width={120} height={28} className="h-7 invert opacity-70" loading="eager" />
        </Link>
      </div>

      {/* Close */}
      <button
        className="absolute top-8 right-6 text-3xl"
        onClick={onClose}
        aria-label="Cerrar menú"
      >
        ✕
      </button>

      {/* Links */}
      <div className="flex flex-1 flex-col items-center justify-center space-y-10 tracking-[0.2em] font-light text-gray-700">
        {links.map((link, i) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClose}
            className={`transition-all duration-500 hover:text-gray-400
            ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
