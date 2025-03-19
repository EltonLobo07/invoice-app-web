"use client";

import { classJoin } from "@/utils/general";
import * as Ariakit from "@ariakit/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  tooltipText: string;
  "aria-disabled"?: boolean;
};

export function LinkWithTooltip(props: Props) {
  const store = Ariakit.useTooltipStore();
  const open = Ariakit.useStoreState(store, "open");

  return (
    <Ariakit.TooltipProvider placement="bottom" store={store}>
      <Ariakit.TooltipAnchor
        render={
          <Link
            aria-disabled={props["aria-disabled"]}
            prefetch={false}
            href={props.href}
          />
        }
        className={props.className}
      >
        {props.children}
      </Ariakit.TooltipAnchor>
      <AnimatePresence>
        {open && (
          <Ariakit.Tooltip
            render={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              />
            }
            alwaysVisible={true}
            className={classJoin(
              "bg-ds-1 text-white",
              "px-2 py-0.5",
              "opacity-80",
              "text-sm",
              "rounded-sm",
              "origin-[--popover-transform-origin]"
            )}
          >
            {props.tooltipText}
          </Ariakit.Tooltip>
        )}
      </AnimatePresence>
    </Ariakit.TooltipProvider>
  );
}
