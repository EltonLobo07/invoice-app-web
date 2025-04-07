"use client";

import { CREATE_INVOICE } from "@/constants/home";
import { useRouter } from "@/hooks";
import { classJoin } from "@/utils/general";
import * as Ariakit from "@ariakit/react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export function InvoiceFormDialog() {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onExitAnimationComplete = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(CREATE_INVOICE);
    const newSearchParamStr = newSearchParams.toString();
    router.push(
      `${pathname}${newSearchParamStr === "" ? "" : "?"}${newSearchParamStr}`
    );
  };

  return (
    <AnimatePresence onExitComplete={onExitAnimationComplete}>
      {open && (
        <Ariakit.Dialog
          open={true}
          onClose={() => {
            setOpen(false);
          }}
          getPersistentElements={() => {
            const elements: Element[] = [];
            const globalToastViewPort = document.querySelector(
              "[data-global-toast-viewport]"
            );
            if (globalToastViewPort !== null) {
              elements.push(globalToastViewPort);
            }
            const appHeader = document.querySelector("[data-app-header]");
            if (appHeader !== null) {
              elements.push(appHeader);
            }
            return elements;
          }}
          unmountOnHide={true}
          backdrop={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={classJoin(
                "fixed left-0 top-0 w-full h-full",
                "bg-black/50"
              )}
            />
          }
          render={
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={classJoin(
                "fixed left-24px right-24px top-24px bottom-24px",
                "bg-white dark:bg-ds-3",
                "rounded-lg",
                "px-32px md:px-48px",
                "pb-8 md:pb-12",
                "pt-[2.125rem] md:pt-[3.1875rem]",
                "max-w-[30rem] m-auto",
                "h-fit"
              )}
            />
          }
        >
          <Ariakit.DialogHeading
            className={classJoin(
              "text-ds-8 dark:text-white",
              "font-bold",
              "text-2xl",
              "-tracking-[0.03125rem]",
              "mb-2 md:mb-3"
            )}
          >
            Todo: add form content
          </Ariakit.DialogHeading>
          <Ariakit.DialogDismiss>cancel</Ariakit.DialogDismiss>
        </Ariakit.Dialog>
      )}
    </AnimatePresence>
  );
}
