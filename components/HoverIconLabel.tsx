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
          className="relative z-10" // Pastikan icon ada di layer atas
        >
          <IconContent icon={icon} iconClassName={iconClassName} />
        </a>
      ) : (
        <div onClick={onClick} className="relative z-10 cursor-pointer">
          <IconContent icon={icon} iconClassName={iconClassName} />
        </div>
      )}

      {/* LABEL (ABSOLUTE DI LUAR LINK AGAR TIDAK MENGGANGGU KLIK) */}
      <motion.div
        className={`absolute top-full mt-3 px-3 py-1.5 bg-[#2a2a2a] border border-white/10 rounded-md shadow-xl z-50 ${labelClassName}`}
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
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2a2a2a] rotate-45 border-l border-t border-white/10"></div>

        <span className="text-[11px] font-semibold text-white whitespace-nowrap block">
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
    className={`w-10 h-10 rounded-full bg-[#1E1E1E] border border-white/10 flex items-center justify-center text-gray-400 transition-colors shadow-md ${iconClassName}`}
    variants={{
      rest: {
        scale: 1,
        color: "#9ca3af",
        backgroundColor: "#1E1E1E",
        borderColor: "rgba(255,255,255,0.1)",
      },
      hover: {
        scale: 1.1,
        color: "#ffffff",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255,255,255,0.5)",
        boxShadow: "0 0 15px rgba(255,255,255,0.1)",
      },
      tap: { scale: 0.95 },
    }}
  >
    {icon}
  </motion.div>
);

export default HoverIconLabel;
