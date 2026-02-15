"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedTagProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedTag: React.FC<AnimatedTagProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <motion.div
        className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--border-subtle)] border border-[var(--border-subtle)] text-sm font-medium shadow-sm cursor-default overflow-hidden text-[var(--text-body)]"
        initial="hovered"
        whileHover="idle"
        whileTap={{ scale: 0.98 }}
        variants={{
          hovered: {
            borderColor: "var(--border-hover)",
          },
          idle: {
            borderColor: "var(--border-subtle)",
          },
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 -left-20 -skew-x-12 bg-gradient-to-r from-transparent via-[var(--spotlight)] to-transparent"
          variants={{
            hovered: { x: "140%" },
            idle: {
              x: 0,
              transition: { duration: 0.6, ease: "easeInOut" },
            },
          }}
        />

        <div className="relative z-10 flex items-center gap-2">{children}</div>
      </motion.div>
    </div>
  );
};

export default AnimatedTag;
