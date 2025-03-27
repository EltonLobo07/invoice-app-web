"use client";

import { classJoin } from "@/utils/general";
import * as Ariakit from "@ariakit/react";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { FormSubmitBtn } from "../general";
import { deleteInvoice } from "./deleteInvoice.action";
import { useStoreContext } from "@/providers/StoreProvider";
import { useRouter } from "next/navigation";
import { startHolyLoader } from "holy-loader";

type Props = {
  invoiceId: string;
};

export function DeleteDialog(props: Props) {
  const [open, setOpen] = React.useState({ ariakit: false, internal: false });
  const [formState, formAction, isFormSubmitting] = React.useActionState(
    deleteInvoice,
    {}
  );
  const setToast = useStoreContext((s) => s.setToast);
  const router = useRouter();
  const hideDialog = React.useCallback(() => {
    setOpen((open) =>
      open.ariakit && open.internal ? { internal: true, ariakit: false } : open
    );
  }, []);

  React.useEffect(() => {
    if (formState.type === "error" || formState.type === "success") {
      hideDialog();
      setToast({ type: "Error", message: formState.message });
    }
  }, [formState, hideDialog, setToast]);

  React.useEffect(() => {
    if (formState.type === "success") {
      hideDialog();
      setToast({ type: "Success", message: formState.message });
      startHolyLoader();
      router.push("/");
      router.refresh();
    }
  }, [formState, hideDialog, router, setToast]);

  return (
    <>
      <Ariakit.Button
        onClick={() =>
          setOpen((open) =>
            open.ariakit && open.internal
              ? open
              : { ariakit: true, internal: true }
          )
        }
        type="button"
        className={classJoin(
          "bg-ds-9 hover:bg-ds-10",
          "text-white",
          "typography-heading-s-var",
          "pt-[1.125rem] pb-[0.9375rem] px-6",
          "rounded-3xl"
        )}
      >
        Delete
      </Ariakit.Button>
      <AnimatePresence
        onExitComplete={() => {
          /*
            - this callback is triggered multiple times and 
            each trigger creates a new open object
            - creation of new object even though its field values remain the same is somewhat needed 
            but logically I am not sure why. Essentially, the delete dialog cannot be reopened if I 
            don't allow this

            todo: figure out the root cause and fix this 
          */
          setOpen({ ariakit: false, internal: false });
        }}
      >
        {open.ariakit && (
          <Ariakit.Dialog
            getPersistentElements={() => {
              const element = document.querySelector(
                "[data-global-toast-viewport]"
              );
              return element === null ? [] : [element];
            }}
            open={open.ariakit || open.internal}
            onClose={() => {
              if (isFormSubmitting) {
                return;
              }
              hideDialog();
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
              Confirm Deletion
            </Ariakit.DialogHeading>
            <p
              className={classJoin(
                "text-ds-6",
                "typography-body-lg",
                "mb-[1.375rem] md:mb-[0.875rem]"
              )}
            >
              {`Are you sure you want to delete invoice #${props.invoiceId}? This action
            cannot be undone.`}
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
                      isFormSubmitting
                        ? "cursor-not-allowed"
                        : "hover:bg-ds-5 hover:dark:bg-white"
                    )}
                  >
                    Cancel
                  </motion.button>
                }
              />
              <form action={formAction}>
                <input type="hidden" name="invoiceId" value={props.invoiceId} />
                <Ariakit.Button
                  render={
                    <FormSubmitBtn
                      isFormSubmitting={isFormSubmitting}
                      className={classJoin(
                        "text-white",
                        "typography-heading-s-var",
                        "px-6",
                        "py-[1.03125rem]",
                        "rounded-3xl",
                        "flex gap-x-1 items-center",
                        isFormSubmitting
                          ? "bg-ds-10 cursor-not-allowed"
                          : "bg-ds-9 hover:bg-ds-10"
                      )}
                    >
                      Delete
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
