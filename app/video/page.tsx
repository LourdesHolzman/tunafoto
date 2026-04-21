"use client";

import { motion } from "framer-motion";

export default function Film() {
  const videos = [
    {
      src: "https://res.cloudinary.com/dj2q45vvk/video/upload/f_auto,q_auto/v1776784730/1_qx961j.mp4",
      titulo: "BODA",
      descripcion: "20-11-22"
    },
    {
      src: "https://res.cloudinary.com/dj2q45vvk/video/upload/f_auto,q_auto/v1776784760/incendios_rztv0r.mp4",
      titulo: "PEGATINA",
      descripcion: "25-07-21"
    }
  ];

  return (
    <section className="min-h-screen bg-white text-black px-6 pt-32 pb-20">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center mb-20"
      >
        <h1 className="text-2xl md:text-4xl font-light tracking-[0.2em] mb-6">
          HISTORIAS EN MOVIMIENTO
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-600 text-[15px] leading-relaxed max-w-xl mx-auto"
        >
          Momentos que suceden sin intervenir,<br />
          donde cada gesto, cada mirada y cada emoción hablan por sí solas. <br />
          El video permite volver a ese instante y revivirlo una y otra vez.
        </motion.p>
      </motion.div>

      {/* VIDEOS */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-6">
        {videos.map((video, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="group"
          >
            <video
              src={video.src}
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />

            <div className="mt-4 text-center space-y-1">
              <p className="text-xs tracking-[0.2em] uppercase text-gray-500">
                {video.titulo}
              </p>

              <p className="text-xs uppercase text-gray-500">
                {video.descripcion}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}