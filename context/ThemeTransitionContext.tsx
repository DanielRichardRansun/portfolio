"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ThemeTransitionContextType {
  isTransitioning: boolean;
  triggerTransition: (callback: () => void) => void;
}

const ThemeTransitionContext = createContext<
  ThemeTransitionContextType | undefined
>(undefined);

export function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerTransition = (callback: () => void) => {
    setIsTransitioning(true);

    // Wait for entrance animation to cover the screen (adjust timing based on CSS/Motion duration)
    // Assuming entrance takes about 800ms to fully cover
    setTimeout(() => {
      callback(); // Execute the actual theme switch

      // Optional: Add a small delay while screen is covered to let theme settle
      setTimeout(() => {
        setIsTransitioning(false); // Trigger exit animation
      }, 500);
    }, 800);
  };

  return (
    <ThemeTransitionContext.Provider
      value={{ isTransitioning, triggerTransition }}
    >
      {children}
    </ThemeTransitionContext.Provider>
  );
}

export function useThemeTransition() {
  const context = useContext(ThemeTransitionContext);
  if (context === undefined) {
    throw new Error(
      "useThemeTransition must be used within a ThemeTransitionProvider",
    );
  }
  return context;
}
