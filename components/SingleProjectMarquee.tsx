"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Generate array of 15 images
const images = Array.from(
  { length: 15 },
  (_, i) => `/images/porto/porto${i + 1}.jpg`
);

const SingleProjectMarquee = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* Gradient Atas & Bawah agar terlihat fading halus */}
      <div className="absolute inset-x-0 top-0 h-20 z-10 bg-gradient-to-b from-[#1E1E1E] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 z-10 bg-gradient-to-t from-[#1E1E1E] to-transparent" />

      {/* Container Animasi */}
      <motion.div
        className="flex flex-col gap-4 w-full px-4"
        // Mulai dari 0, bergerak ke atas sampai -50% (setengah dari total duplikasi)
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 60, // Atur kecepatan di sini (makin besar = makin lambat)
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Render Gambar (Diduplikasi jadi 2 set agar looping seamless) */}
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={src}
              alt="Project Preview"
              fill
              className="object-cover opacity-80 hover:opacity-100 transition-all duration-500 grayscale-[50%] hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SingleProjectMarquee;
