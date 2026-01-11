"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface TabPanel {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  panels: TabPanel[];
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ panels, className = "" }) => {
  const [activeTab, setActiveTab] = useState<string>(panels[0]?.id || "");

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div className="flex justify-center mb-8">
        <div className="relative p-1 bg-[#1E1E1E] rounded-xl border border-white/10">
          {panels.map((panel, index) => (
            <button
              key={panel.id}
              onClick={() => setActiveTab(panel.id)}
              className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 z-10 ${
                activeTab === panel.id
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {panel.label}

              {activeTab === panel.id && (
                <motion.div
                  className="absolute inset-0 bg-[#2D2D2D] rounded-lg z-[-1]"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {panels.map((panel) => (
          activeTab === panel.id && (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {panel.content}
            </motion.div>
          )
        ))}
      </div>
    </div>
  );
};

export default Tabs;