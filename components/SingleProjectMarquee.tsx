"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Generate array of 14 images starting from porto2
// List of all images in /images/porto
const images = [
  "/images/porto/AppleRebrand.png",
  "/images/porto/GyisJudging.png",
  "/images/porto/HoopTourney.png",
  "/images/porto/ICIAApp.jpg",
  "/images/porto/MyPortfolio.png",
  "/images/porto/ICIAJudgeing.png",
  "/images/porto/Ransite.png",
  "/images/porto/Siw.png",
];

const SingleProjectMarquee = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
    >
      {/* Gradient Atas & Bawah agar terlihat fading halus */}
      <div className="absolute inset-x-0 top-0 h-20 z-10 bg-gradient-to-b from-[var(--surface)] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 z-10 bg-gradient-to-t from-[var(--surface)] to-transparent" />

      {/* Container Animasi */}
      <motion.div
        className="flex flex-col gap-4 w-full px-4"
        initial={{ y: "0%" }}
        animate={{ y: "-50%" }}
        transition={{
          duration: 20, // Sedikit lebih cepat agar terasa dinamis
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Render Gambar (Diduplikasi jadi 2 set agar looping seamless) */}
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative w-full aspect-video rounded-xl overflow-hidden flex-shrink-0"
          >
            <Image
              src={src}
              alt="Project Preview"
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 grayscale-[50%] group-hover:grayscale-0 shadow-2xl"
              sizes="(max-width: 768px) 100vw, 400px"
              priority={index < 4}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SingleProjectMarquee;
