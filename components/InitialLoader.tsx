"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InitialLoader() {
  const [count, setCount] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Simulasi loading: Cepat di awal, melambat di akhir
    let current = 0;
    const interval = setInterval(() => {
      // Logika acak biar terasa seperti loading beneran
      const increment = Math.floor(Math.random() * 10) + 1;
      current += increment;

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setComplete(true), 500); // Delay dikit pas 100
      }
      setCount(current);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)] text-[var(--text-heading)]"
          exit={{
            opacity: 0,
            filter: "blur(20px)", // Efek exit nge-blur keren
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Angka Besar */}
            <motion.h1
              className="text-8xl md:text-9xl font-bold tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {count}%
            </motion.h1>

            {/* Progress Bar Tipis di bawah */}
            <div className="w-64 h-[2px] bg-[var(--border-subtle)] mt-8 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--text-heading)]"
                initial={{ width: 0 }}
                animate={{ width: `${count}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Status Text Kecil */}
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] animate-pulse">
              Loading Assets
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
