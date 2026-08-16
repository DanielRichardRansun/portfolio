"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Generate array of 15 images based on your file structure
const images = Array.from(
  { length: 14 },
  (_, i) => `/images/porto/porto${i + 2}.jpg`, //dimulai dari porto2.jpg
);

// Bagi gambar menjadi 2 kolom untuk efek visual yang dinamis
const column1 = images.slice(0, 7);
const column2 = images.slice(7, 15);

const MarqueeColumn = ({
  images,
  reverse = false,
  duration = 20,
}: {
  images: string[];
  reverse?: boolean;
  duration?: number;
}) => {
  return (
    <motion.div
      className="flex flex-col gap-4 relative w-1/2"
      initial={{ y: reverse ? "-50%" : "0%" }}
      animate={{ y: reverse ? "0%" : "-50%" }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {[...images, ...images].map((src, index) => (
        <div
          key={index}
          className="relative w-full aspect-video rounded-lg overflow-hidden flex-shrink-0 shadow-lg border border-[var(--border-subtle)]"
        >
          <Image
            src={src}
            alt="Project Preview"
            fill
            className="object-cover opacity-100 transition-all duration-500 grayscale-[30%] hover:grayscale-0 brightness-75 hover:brightness-100"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      ))}
    </motion.div>
  );
};

const ProjectMarquee = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`flex gap-4 h-[150%] -mt-10 overflow-hidden select-none pointer-events-none ${className}`}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[var(--surface)] via-transparent to-[var(--surface)] pointer-events-none" />

      <MarqueeColumn images={column1} duration={25} />

      <MarqueeColumn images={column2} reverse duration={30} />
    </div>
  );
};

export default ProjectMarquee;
