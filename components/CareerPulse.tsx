"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const CareerPulse = () => {
  const { t } = useLanguage();

  // The jobs are ordered from newest to oldest. We want oldest on the left, newest on the right.
  const careers = t.career?.items ? [...t.career.items].reverse() : [];

  // Extract short labels gracefully
  const labels = careers.map((c: any) => c.shortTitle || c.role.split(" ")[0]);

  const count = labels.length || 5;
  const pathDuration = 4;
  const repeatDelay = 2;

  // Dynamic SVG dimensions
  const svgWidth = 500;
  const svgHeight = 200;
  const padX = 50;
  const padYTop = 35; // Top padding for text labels
  const padYBottom = 170; // Bottom Y for the first (oldest) milestone

  // Generate evenly-spaced milestone positions from bottom-left to top-right
  const milestones = Array.from({ length: count }, (_, i) => ({
    cx: padX + (i * (svgWidth - padX * 2)) / (count - 1),
    cy: padYBottom - (i * (padYBottom - padYTop)) / (count - 1),
    delay: (pathDuration * i) / (count - 1),
  }));

  // Build a smooth SVG cubic bezier path through all milestones
  const buildPath = () => {
    if (milestones.length < 2) return "";
    let d = `M ${milestones[0].cx} ${milestones[0].cy}`;
    for (let i = 0; i < milestones.length - 1; i++) {
      const curr = milestones[i];
      const next = milestones[i + 1];
      const midX = (curr.cx + next.cx) / 2;
      d += ` C ${midX} ${curr.cy}, ${midX} ${next.cy}, ${next.cx} ${next.cy}`;
    }
    return d;
  };

  const pathD = buildPath();
  const lastIndex = count - 1;

  return (
    <div className="w-full h-full flex items-center justify-center relative select-none pointer-events-none">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-full drop-shadow-lg"
        style={{ color: "var(--border-hover)" }}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 1. Base Line (Garis Redup di Belakang) */}
        <path
          d={pathD}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 2. Animated Line (Garis Cahaya di Depan) */}
        <motion.path
          d={pathD}
          stroke="url(#career-gradient)"
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
          <linearGradient
            id="career-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
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
              r={i === lastIndex ? "8" : "6"}
              className={
                i === lastIndex
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
              className="fill-[var(--text-heading)] text-[16px] font-semibold drop-shadow-md"
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
