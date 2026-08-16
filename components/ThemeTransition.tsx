"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useThemeTransition } from "@/context/ThemeTransitionContext";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeTransition() {
  const { isTransitioning } = useThemeTransition();
  const { theme } = useTheme();

  const isTargetLight = theme === "light";

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center text-white"
          initial={{
            opacity: 0,
            backgroundColor: isTargetLight ? "#ffffff" : "#1a1a1a",
          }}
          animate={{
            opacity: 1,
            backgroundColor: isTargetLight ? "#ffffff" : "#1a1a1a",
          }}
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative flex items-center justify-center">
            {/* SUN ICON (Visible if switching TO Light) */}
            {isTargetLight && (
              <motion.div
                initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 1.5, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="absolute"
              >
                <FiSun
                  size={80}
                  className="text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]"
                />
              </motion.div>
            )}

            {/* MOON ICON (Visible if switching TO Dark) */}
            {!isTargetLight && (
              <motion.div
                initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 1.5, rotate: -90, opacity: 0 }}
                transition={{ duration: 0.8, ease: "backOut" }}
                className="absolute"
              >
                <FiMoon
                  size={80}
                  className="text-blue-100 drop-shadow-[0_0_30px_rgba(219,234,254,0.4)]"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
