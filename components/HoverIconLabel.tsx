"use client";

import React from "react";
import { motion } from "framer-motion";

interface HoverIconLabelProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const HoverIconLabel: React.FC<HoverIconLabelProps> = ({
  icon,
  label,
  href,
  className = "",
  iconClassName = "",
  labelClassName = "",
  onClick,
  target,
  rel,
}) => {
  return (
    <motion.div
      className={`relative flex flex-col items-center justify-center ${className}`}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      {/* WRAPPER LINK ATAU DIV */}
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          onClick={onClick}
          className="relative z-10"
        >
          <IconContent icon={icon} iconClassName={iconClassName} />
        </a>
      ) : (
        <div onClick={onClick} className="relative z-10 cursor-pointer">
          <IconContent icon={icon} iconClassName={iconClassName} />
        </div>
      )}

      {/* LABEL (ABSOLUTE) */}
      <motion.div
        className={`absolute top-full mt-3 px-3 py-1.5 bg-[var(--surface-hover)] border border-[var(--border-subtle)] rounded-md shadow-xl z-50 ${labelClassName}`}
        variants={{
          rest: {
            opacity: 0,
            y: -10,
            scale: 0.8,
            pointerEvents: "none",
          },
          hover: {
            opacity: 1,
            y: 0,
            scale: 1,
            pointerEvents: "auto",
            transition: { type: "spring", stiffness: 300, damping: 20 },
          },
        }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--surface-hover)] rotate-45 border-l border-t border-[var(--border-subtle)]"></div>

        <span className="text-[11px] font-semibold text-[var(--text-heading)] whitespace-nowrap block">
          {label}
        </span>
      </motion.div>
    </motion.div>
  );
};

const IconContent = ({
  icon,
  iconClassName,
}: {
  icon: React.ReactNode;
  iconClassName: string;
}) => (
  <motion.div
    className={`w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] transition-colors shadow-md ${iconClassName}`}
    variants={{
      rest: {
        scale: 1,
      },
      hover: {
        scale: 1.1,
        boxShadow: "0 0 15px var(--spotlight)",
      },
      tap: { scale: 0.95 },
    }}
  >
    {icon}
  </motion.div>
);

export default HoverIconLabel;
