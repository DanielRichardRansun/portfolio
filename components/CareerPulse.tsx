"use client";

import React from "react";
import { motion } from "framer-motion";

const CareerPulse = () => {
  // Koordinat Path (Bentuk Grafik Naik)
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const, // Cast to const to fix type error
      },
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none pointer-events-none">
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full text-white/10 drop-shadow-lg"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 1. Base Line (Garis Redup di Belakang) */}
        <path
          d="M 50 150 C 100 150, 100 100, 200 100 C 300 100, 300 50, 350 50"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 2. Animated Line (Garis Cahaya di Depan) */}
        <motion.path
          d="M 50 150 C 100 150, 100 100, 200 100 C 300 100, 300 50, 350 50"
          stroke="url(#gradient)" // Pakai Gradient
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity, // Looping terus
          }}
        />

        {/* 3. Definisi Gradient (Warna Hijau/Putih) */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />{" "}
            {/* Transparan */}
            <stop offset="50%" stopColor="#22c55e" /> {/* Hijau */}
            <stop offset="100%" stopColor="#ffffff" /> {/* Putih Ujungnya */}
          </linearGradient>
        </defs>

        {/* 4. Titik-titik Milestone (Dots) */}
        {/* Dot 1 (Start) */}
        <motion.circle
          cx="50"
          cy="150"
          r="6"
          className="fill-[#1E1E1E] stroke-white/50 stroke-2"
          whileInView={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        />

        {/* Dot 2 (Mid) */}
        <motion.circle
          cx="200"
          cy="100"
          r="6"
          className="fill-[#1E1E1E] stroke-white/50 stroke-2"
          whileInView={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
        />

        {/* Dot 3 (End - Success) */}
        <motion.circle
          cx="350"
          cy="50"
          r="8"
          className="fill-green-500 stroke-green-200 stroke-4"
          initial={{ boxShadow: "0 0 0px rgba(34, 197, 94, 0)" }}
          animate={{ boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)" }}
          whileInView={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
        />
      </svg>

      {/* Glow Effect di Background Grafik */}
      <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full" />
    </div>
  );
};

export default CareerPulse;
