"use client";

import * as RPToast from "@radix-ui/react-toast";
import { AnimatePresence } from "motion/react";
import {
  type Toast as ToastType,
  useStoreContext,
} from "@/providers/StoreProvider";
import React from "react";
import { motion } from "motion/react";
import { classJoin } from "@/utils/general";
import { CheckCircle, XCircle, XOctagon } from "@/icons";

export function Toast() {
  const toast = useStoreContext((s) => s.toast);

  return toast && <ToastInternal key={toast.id} toast={toast} />;
}

function ToastInternal({ toast }: { toast: ToastType }) {
  const [open, setOpen] = React.useState(true);
  const setToast = useStoreContext((s) => s.setToast);
  const Icon = toast.type === "Error" ? XOctagon : CheckCircle;

  return (
    <AnimatePresence onExitComplete={() => setToast(null)}>
      {open && (
        <RPToast.Root open={true} onOpenChange={() => setOpen(false)} asChild>
          <motion.div
            initial={{
              x: 100,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: 100,
              opacity: 0,
            }}
            className={classJoin(
              "rounded-md",
              "w-[18.75rem] md:w-[20rem]",
              "p-3",
              "bg-white dark:bg-ds-8",
              "shadow-sm",
              "border border-ds-5 dark:border-ds-4",
              "flex gap-x-2 items-start"
            )}
          >
            <Icon
              className={
                toast.type === "Error" ? "text-red-500" : "text-green-500"
              }
            />
            <div className="grow">
              <div className="flex gap-x-1 justify-between items-start">
                <RPToast.Title
                  className={classJoin(
                    "font-bold text-base",
                    "text-black dark:text-white"
                  )}
                >{`${toast.type} Message`}</RPToast.Title>
                <RPToast.Close className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white">
                  <XCircle />
                </RPToast.Close>
              </div>
              <RPToast.Description
                className={classJoin("text-ds-7 dark:text-ds-5", "text-sm")}
              >
                {toast.message}
              </RPToast.Description>
            </div>
          </motion.div>
        </RPToast.Root>
      )}
    </AnimatePresence>
  );
}
