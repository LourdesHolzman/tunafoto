"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../components/FadeIn";

const ITEMS = [
  {
    id: "fotolibros",
    categoria: "FOTOLIBROS",
    titulo: "Diseñados para volver a sentir.",
    descripcion:
      "Fotolibros premium impresos sobre materiales de alta calidad, pensados para conservar tus recuerdos para siempre.",
    image: "/fotolibro.png",

    contenido: (
      <div className="space-y-12">

        {/* PREMIUM */}
        <div className="max-w-4xl">

          <div>
            <p className="text-[10px] tracking-[0.35em] text-gray-400 mb-4">
              PREMIUM
            </p>

            <ul className="space-y-5  text-[15px] text-gray-600 leading-relaxed font-light">
              <li>— Hojas <strong>rígidas </strong>.</li>
              <li>— Su <strong>apertura de 180°</strong> permite disfrutar de fotografías a doble página sin pérdida de información.</li>
              <li>— <strong>Papel fotográfico.</strong></li>
              <li>— Tapa dura o blanda.</li>
              <li>— Mínimo de 10 hojas, se puede agregar hasta 35 hojas rígidas.</li>
              <li>— Capacidad para contener de <strong>10 a 200 fotos</strong>, dependiendo del tamaño.</li>
              <li>— Tapa impresa o de tela.</li>
            </ul>

            <div className="mt-8 space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-gray-400 mb-5">
                  TAMAÑOS
                </p>

                <div className="flex flex-wrap gap-3 text-gray-700">
                  {["15×30", "15×45", "20×30", "20×40", "20×60", "30×45", "30×60"].map((s) => (
                    <span
                      key={s}
                      className="px-4 py-2 rounded-full border border-gray-200 text-[12px]"
                    >
                      {s} cm
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    ),
  },

  {
    id: "fotos",
    categoria: "FOTOS",
    titulo: "Tus imágenes fuera de la pantalla.",
    descripcion:
      "Impresiones fotográficas profesionales y fine art con distintos tamaños y terminaciones.",
    image: "/fotos.png",

    contenido: (
      <div className="space-y-12 text-gray-700">

        <div>
          <p className="text-[10px] tracking-[0.35em] text-gray-400 mb-5">
            TAMAÑOS ESTÁNDAR
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Polaroid","9×13", "10×15", "10×30", "13×13", "13×18", "15×15", "15×21", "15×30", "20×20", "20×30", "20×40","20×60", "20×90", "30×30", "30×45", "30×60", "30×90",
            ].map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full border border-gray-200 text-[12px]"
              >
                {s}
                {s !== "Polaroid" && " cm"}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.35em] text-gray-400 mb-5">
            GRAN FORMATO
          </p>

          <div className="space-y-4">
            {[
              "40×60",
              "60×60",              
              "50×70",
              "50×75",
              "60×90",
              "60×100",
              "90×135",
            ].map((s) => (
              <div
                key={s}
                className="flex items-center justify-between border-b border-gray-200 pb-4"
              >
                <span className="text-sm">{s} cm</span>

                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] border border-gray-200 px-2 py-1">
                    Fotográfico profesional
                  </span>

                  <span className="text-[10px] border border-gray-200 px-2 py-1">
                    Canvas Polyester
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    ),
  },

  {
    id: "bastidores",
    categoria: "BASTIDORES",
    titulo: "Listos para habitar tus espacios.",
    descripcion:
      "Canvas y bastidores montados sobre madera para transformar tus imágenes en piezas decorativas.",
    image: "/bastidor.png",

    contenido: (
      <div className="space-y-4 text-gray-700">
        <p className="text-[10px] tracking-[0.35em] text-gray-400 mb-5">
            TAMAÑOS Y FORMATOS
        </p>

        {[
          "20×30",
          "30×45",
          "40×60",
          "50×70",
          "60×90",
        ].map((s) => (
          <div
            key={s}
            className="flex items-center justify-between border-b border-gray-200 pb-4"
          >
            <span className="text-sm">{s} cm</span>

            <div className="flex gap-2 flex-wrap">
              <span className="text-[10px] border border-gray-200 px-2 py-1">
                Bastidor madera
              </span>

              <span className="text-[10px] border border-gray-200 px-2 py-1">
                Canvas bastidor
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },

  {
    id: "cuadros",
    categoria: "CUADROS",
    titulo: "Imágenes que permanecen.",
    descripcion:
      "Tus fotografías impresas y enmarcadas, listas para habitar tus espacios.",
    image: "/cuadroo.jpg",

    contenido: (
      <div className="space-y-4">
        <p className="text-[10px] tracking-[0.35em] text-gray-400 mb-5">
            TAMAÑOS
        </p>

        <div className="flex flex-wrap gap-3 text-gray-700">

        {["20×30", "30×30", "30×45", "40×60", "70×100"].map((s) => (
          <span
            key={s}
            className="px-4 py-2 rounded-full border border-gray-200 text-[12px]"
          >
            {s} cm
          </span>
        ))}
        </div>
      </div>
    ),
  },
];

export default function Impresiones() {
  const [active, setActive] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <section className="min-h-screen text-black px-4 sm:px-6 pt-20 sm:pt-28 pb-24">

      {/* HEADER */}
      <FadeIn direction="up">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-20">

          <p className="text-[10px] tracking-[0.4em] text-gray-400 mb-4">
            IMPRESIONES
          </p>

          <h1 className="text-3xl sm:text-5xl font-light leading-tight mb-6">
            Tus recuerdos también
            <br />
            merecen un lugar
            <br />
            en tu hogar.
          </h1>

        </div>
      </FadeIn>

      {/* CARDS */}
      <div className="space-y-6 max-w-6xl mx-auto">

        {ITEMS.map((item, i) => {
          const opened = active === item.id;

          return (
            <FadeIn key={item.id} direction="up" delay={i * 0.1}>

              <div className="bg-[#F7F1EA] rounded-[32px] overflow-hidden">

                {/* CARD */}
                <button
                  onClick={() => {
                    if (opened) {
                    setActive(null);
                  return;
                  }

                  setActive(item.id);

                  setTimeout(() => {
                      const element = contentRefs.current[item.id];

                      if (element) {
                        const y =
                          element.getBoundingClientRect().top +
                          window.pageYOffset -
                          180; // ajustá entre 180 y 220 según tu navbar

                        window.scrollTo({
                          top: y,
                          behavior: "smooth",
                        });
                      }
                    }, 900);
                  }}
                  className="group w-full text-left p-6 sm:p-10"
                >

                  <div className="grid md:grid-cols-2 gap-10 items-center">

                    <div className="relative w-full h-[280px] sm:h-[420px] overflow-hidden rounded-[24px]">
                      <Image
                        src={item.image}
                        alt={item.categoria}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div>

                      <p className="text-[10px] tracking-[0.35em] text-gray-400 mb-4">
                        {item.categoria}
                      </p>

                      <h2 className="text-3xl md:text-5xl font-light leading-tight mb-6 text-gray-700">
                        {item.titulo}
                      </h2>

                      <p className="text-[14px] md:text-[15px] text-gray-400 leading-relaxed font-light mb-10">
                        {item.descripcion}
                      </p>

                      <div className="flex items-center gap-4">

                        <span className="text-[11px] tracking-[0.3em] border-b text-gray-400 pb-1">
                          {opened ? "CERRAR" : "VER INFORMACIÓN"}
                        </span>

                        <motion.span
                          animate={{ rotate: opened ? 45 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-2xl font-light text-gray-400"
                        >
                          +
                        </motion.span>

                      </div>

                    </div>

                  </div>

                </button>

                {/* CONTENIDO */}
                <AnimatePresence>
                  {opened && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.45 }}
                      className="overflow-hidden px-6 sm:px-10 pb-10"
                    >
                      <div
                        ref={(el) => {
                          contentRefs.current[item.id] = el;
                        }}
                        className="border-t border-gray-100 pt-6"
                      >
                        {item.contenido}
                        <div className="mt-4 pt-8 border-t border-gray-100">
                        <a
                          href={`https://wa.me/542954545210?text=Hola%20Lupe,%20quiero%20consultar%20por%20los%20precios%20y%20tamaños%20de%20${item.categoria}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 text-[11px] tracking-[0.3em] text-gray-600 hover:text-black transition-all duration-300"
                        >
                          CONSULTAR TAMAÑOS Y PRECIOS
                          <span>→</span>
                        </a>
                      </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </FadeIn>
          );
        })}

      </div>

    </section>
  );
}