"use client";

import { AnimatePresence, useMotionTemplate, motion } from "motion/react";
import { useProgress } from "./useProgress";
import { ProgressBarContext } from "./ProgressBarContext";

export function ProgressBar({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const progress = useProgress();
  const width = useMotionTemplate`${progress.value}%`;

  return (
    <ProgressBarContext.Provider value={progress}>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className={className}
          />
        )}
      </AnimatePresence>

      {children}
    </ProgressBarContext.Provider>
  );
}
