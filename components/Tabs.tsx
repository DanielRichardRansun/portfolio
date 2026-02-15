"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabPanel {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  panels: TabPanel[];
  className?: string;
}

const TabsGlassy: React.FC<TabsProps> = ({ panels, className = "" }) => {
  const [activeTab, setActiveTab] = useState<string>(panels[0]?.id || "");

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* HEADER: Grid Button Terpisah */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {panels.map((panel) => {
          const isActive = activeTab === panel.id;
          return (
            <button
              key={panel.id}
              onClick={() => setActiveTab(panel.id)}
              className="relative px-6 py-3 rounded-lg text-sm font-semibold outline-none"
            >
              {/* Background Effect */}
              {isActive ? (
                <motion.div
                  layoutId="activeGlass"
                  className="absolute inset-0 bg-[var(--spotlight)] border border-[var(--border-hover)] rounded-lg backdrop-blur-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              ) : (
                // Hover effect untuk yang tidak aktif
                <div className="absolute inset-0 bg-transparent hover:bg-[var(--border-subtle)] border border-transparent hover:border-[var(--border-subtle)] rounded-lg transition-all duration-300" />
              )}

              {/* Text */}
              <span
                className={`relative z-10 transition-colors duration-300 ${isActive ? "text-[var(--text-heading)]" : "text-[var(--text-muted)]"}`}
              >
                {panel.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* CONTENT */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {panels.map((panel) =>
            activeTab === panel.id ? (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {panel.content}
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabsGlassy;
