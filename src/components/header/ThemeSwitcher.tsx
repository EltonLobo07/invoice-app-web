"use client";

import { Moon, Sun } from "@/icons";
import { useStoreContext } from "@/providers/StoreProvider";
import { classJoin } from "@/utils/general";
import * as Toggle from "@radix-ui/react-toggle";
import { motion } from "motion/react";

export function ThemeSwitcher() {
  const isDarkTheme = useStoreContext((s) => s.isDarkTheme);
  const toggleIsDarkTheme = useStoreContext((s) => s.toggleIsDarkTheme);

  const Icon = isDarkTheme ? Sun : Moon;

  return (
    <Toggle.Root
      asChild={true}
      aria-label="switch to dark theme"
      pressed={isDarkTheme}
      onPressedChange={toggleIsDarkTheme}
    >
      <motion.div
        layout="position"
        className={classJoin(
          "flex justify-center items-center",
          "text-ds-7 dark:text-[#858BB2]",
          "hover:bg-ds-7/15 dark:hover:bg-[#858BB2]/15",
          "px-24px md:px-32px lg:py-32px"
        )}
      >
        <Icon />
      </motion.div>
    </Toggle.Root>
  );
}
