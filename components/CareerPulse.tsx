"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const CareerPulse = () => {
  const { t } = useLanguage();

  // The jobs are ordered from newest to oldest. We want oldest on the left, newest on the right.
  const careers = t.career?.items ? [...t.career.items].reverse() : [];

  // Extract short labels gracefully
  const labels =
    careers.length >= 4
      ? careers.map((c: any) => c.shortTitle || c.role.split(" ")[0])
      : ["Volunteer", "Lecturer", "Intern", "Full-Stack"];

  const pathDuration = 4; // Sedikit lebih lambat
  const repeatDelay = 2; // Delay sebelum mengulang ke titik pertama diubah menjadi lebih lama

  // Daftar posisi setiap titik
  const milestones = [
    { cx: 50, cy: 160, delay: 0 },
    { cx: 150, cy: 120, delay: pathDuration * 0.333 },
    { cx: 250, cy: 80, delay: pathDuration * 0.666 },
    { cx: 350, cy: 40, delay: pathDuration * 1.0 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none pointer-events-none">
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full drop-shadow-lg"
        style={{ color: "var(--border-hover)" }}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 1. Base Line (Garis Redup di Belakang) */}
        <path
          d="M 50 160 C 100 160, 100 120, 150 120 C 200 120, 200 80, 250 80 C 300 80, 300 40, 350 40"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 2. Animated Line (Garis Cahaya di Depan) */}
        <motion.path
          d="M 50 160 C 100 160, 100 120, 150 120 C 200 120, 200 80, 250 80 C 300 80, 300 40, 350 40"
          stroke="url(#gradient)" // Pakai Gradient
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: pathDuration,
            ease: "linear",
            repeat: Infinity,
            repeatDelay: repeatDelay,
          }}
        />

        {/* 3. Definisi Gradient (Warna Hijau/Putih) */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {/* Start slightly invisible, but quickly turn bright green so the head is visible between dots */}
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="20%" stopColor="#22c55e" />
            <stop offset="80%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        {/* 4. Titik-titik Milestone dan Short Title */}
        {milestones.map((pos, i) => (
          <g key={i}>
            {/* Dot */}
            <motion.circle
              cx={pos.cx}
              cy={pos.cy}
              r={i === 3 ? "8" : "6"}
              className={
                i === 3
                  ? "fill-green-500 stroke-green-200 stroke-4 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                  : "fill-[var(--surface)] stroke-[var(--text-muted)] stroke-2"
              }
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 0.5,
                delay: pos.delay,
                repeat: Infinity,
                repeatDelay: pathDuration + repeatDelay - 0.5,
              }}
            />

            {/* Short Title Text yg muncul pas glow menabrak */}
            <motion.text
              x={pos.cx}
              y={pos.cy - 16}
              textAnchor="middle"
              className="fill-[var(--text-heading)] text-[12px] font-semibold drop-shadow-md"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -5] }}
              transition={{
                duration: 2,
                delay: pos.delay,
                repeat: Infinity,
                repeatDelay: pathDuration + repeatDelay - 2,
              }}
            >
              {labels[i]}
            </motion.text>
          </g>
        ))}
      </svg>

      {/* Glow Effect di Background Grafik */}
      <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full" />
    </div>
  );
};

export default CareerPulse;
