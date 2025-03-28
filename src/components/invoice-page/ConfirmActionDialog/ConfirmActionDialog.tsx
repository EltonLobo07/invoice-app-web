"use client";

import { classJoin } from "@/utils/general";
import * as Ariakit from "@ariakit/react";
import { motion, AnimatePresence } from "motion/react";
import { FormSubmitBtn } from "@/components/general";
import React from "react";
import { useConfirmActionDialogState } from "./useConfirmActionDialogState";

type Props = {
  isFormSubmitting: boolean;
  formAction: Exclude<React.ComponentProps<"form">["action"], undefined>;
  invoiceId: string;
  title: string;
  description: string;
  submitBtnText: string;
  theme: "danger" | "primary";
} & ReturnType<typeof useConfirmActionDialogState>;

export function ConfirmActionDialog(props: Props) {
  return (
    <>
      <Ariakit.Button
        onClick={props.showDialog}
        type="button"
        className={classJoin(
          props.theme === "danger"
            ? "bg-ds-9 hover:bg-ds-10"
            : props.theme === "primary"
            ? "bg-ds-1 hover:bg-ds-2"
            : "",
          "text-white",
          "typography-heading-s-var",
          "pt-[1.125rem] pb-[0.9375rem] px-6",
          "rounded-3xl",
          "whitespace-nowrap"
        )}
      >
        {props.submitBtnText}
      </Ariakit.Button>
      <AnimatePresence
        onExitComplete={() =>
          /*
            For some unknown reason, creating a new object even if all of the field values 
            are the same is needed for the trigger to open the dialog again

            todo: find out the reason and avoid creating a new object
          */
          props._setIsDialogOpen({ ariakit: false, internal: false })
        }
      >
        {props.showAriakitDialog && (
          <Ariakit.Dialog
            getPersistentElements={() => {
              const element = document.querySelector(
                "[data-global-toast-viewport]"
              );
              return element === null ? [] : [element];
            }}
            open={props.ariakitDialogOpenState}
            onClose={() => {
              if (props.isFormSubmitting) {
                return;
              }
              props.hideAriakitDialog();
            }}
            unmountOnHide={true}
            backdrop={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={classJoin(
                  "fixed left-0 top-0 w-full h-full",
                  "bg-black/50",
                  "z-30"
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
                  "z-30",
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
              {props.title}
            </Ariakit.DialogHeading>
            <p
              className={classJoin(
                "text-ds-6",
                "typography-body-lg",
                "mb-[1.375rem] md:mb-[0.875rem]"
              )}
            >
              {props.description}
            </p>
            <div className="flex justify-end gap-x-2 gap-y-1 flex-wrap">
              <Ariakit.DialogDismiss
                render={
                  <motion.button
                    layout="position"
                    className={classJoin(
                      "bg-[#F9FAFE] dark:bg-ds-4",
                      "text-ds-7",
                      "typography-heading-s-var",
                      "pt-[1.125rem] pb-[0.9375rem] px-6",
                      "rounded-3xl",
                      props.isFormSubmitting
                        ? "cursor-not-allowed"
                        : "hover:bg-ds-5 hover:dark:bg-white"
                    )}
                  >
                    Cancel
                  </motion.button>
                }
              />
              <form action={props.formAction}>
                <input type="hidden" name="invoiceId" value={props.invoiceId} />
                <Ariakit.Button
                  render={
                    <FormSubmitBtn
                      isFormSubmitting={props.isFormSubmitting}
                      className={classJoin(
                        "text-white",
                        "typography-heading-s-var",
                        "px-6",
                        "py-[1.03125rem]",
                        "rounded-3xl",
                        "flex gap-x-1 items-center",
                        props.isFormSubmitting
                          ? props.theme === "danger"
                            ? "bg-ds-10 cursor-not-allowed"
                            : props.theme === "primary"
                            ? "bg-ds-2 cursor-not-allowed"
                            : ""
                          : props.theme === "danger"
                          ? "bg-ds-9 hover:bg-ds-10"
                          : props.theme === "primary"
                          ? "bg-ds-1 hover:bg-ds-2"
                          : ""
                      )}
                    >
                      {props.submitBtnText}
                    </FormSubmitBtn>
                  }
                />
              </form>
            </div>
          </Ariakit.Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
