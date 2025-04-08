"use client";

import { CREATE_INVOICE } from "@/constants/home";
import { useRouter } from "@/hooks";
import { ArrowDown } from "@/icons";
import { classJoin } from "@/utils/general";
import * as Ariakit from "@ariakit/react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { LabelledInputWithErrMsg } from "../LabelledInputWithErrMsg";
import { Legend } from "./Legend";
import { AddressInputs } from "./AddressInputs";

type Props =
  | { type: "create" }
  | {
      type: "edit";
      invoiceId: string;
    };

export function InvoiceFormDialog(props: Props) {
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
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{
                stiffness: 500,
                damping: 40,
              }}
              className={classJoin(
                // set top based on the app header's height
                "fixed left-0 top-72px md:top-[77px] lg:top-0 bottom-0",
                // set left padding based on the app header's width
                "pl-24px md:pl-56px lg:pl-[calc(103px+56px)]",
                "pr-24px md:pr-56px",
                // "pt-8 md:pt-[3.6875rem]",
                "bg-white dark:bg-ds-12",
                "w-full max-w-[min(100%,38.5rem)] lg:max-w-[min(100%,45rem)]",
                // "md:rounded-r-[20px]",
                "max-h-full overflow-y-auto"
              )}
            />
          }
        >
          <div
            className={classJoin(
              "pb-[1.375rem]",
              "pt-8 md:pt-[3.6875rem]",
              "bg-inherit",
              "sticky top-0"
            )}
          >
            <Ariakit.DialogDismiss
              className={classJoin(
                "flex gap-x-6 items-center",
                "mb-[1.625rem]",
                "typography-heading-s-var",
                "text-ds-8 dark:text-white"
              )}
            >
              <ArrowDown className={classJoin("rotate-90", "text-ds-1")} />
              <span>Main page</span>
            </Ariakit.DialogDismiss>
            <Ariakit.DialogHeading
              className={classJoin(
                "text-ds-8 dark:text-white",
                "font-bold",
                "text-2xl",
                "-tracking-[0.03125rem]"
                // "mb-[1.375rem]"
              )}
            >
              {props.type === "create" ? (
                "New Invoice"
              ) : (
                <>
                  <span>{`Edit `}</span>
                  <span className="text-ds-7 dark:text-ds-6">#</span>
                  <span>{props.invoiceId}</span>
                </>
              )}
            </Ariakit.DialogHeading>
          </div>
          <form className="px-2px">
            <fieldset className="mb-10">
              <Legend>Bill From</Legend>
              <AddressInputs />
            </fieldset>
            <fieldset className="mb-10">
              <Legend>Bill To</Legend>
              <LabelledInputWithErrMsg
                $label="Client's Name"
                $labelInputGap="lg"
                $padding="lg"
              />
              <LabelledInputWithErrMsg
                $label="Client's Email"
                $labelInputGap="lg"
                $padding="lg"
                type="email"
              />
              <AddressInputs />
            </fieldset>
            <LabelledInputWithErrMsg
              $label="Invoice Date"
              $labelInputGap="lg"
              $padding="lg"
              type="date"
            />
            <LabelledInputWithErrMsg
              $label="Project Description"
              $labelInputGap="lg"
              $padding="lg"
            />
          </form>
        </Ariakit.Dialog>
      )}
    </AnimatePresence>
  );
}
