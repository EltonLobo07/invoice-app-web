"use client";

import { CREATE_INVOICE } from "@/constants/home";
import { useRouter } from "@/hooks";
import { ArrowDown, Delete } from "@/icons";
import { classJoin } from "@/utils/general";
import * as Ariakit from "@ariakit/react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { LabelledInputWithErrMsg } from "../LabelledInputWithErrMsg";
import { Legend } from "./Legend";
import { AddressInputs } from "./AddressInputs";
import { PaymentTermSelect } from "./PaymentTermSelect";

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

  const [items, setItems] = React.useState([{ id: "1" }, { id: "2" }]);
  const allowItemDeletion = items.length > 1;

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
                "bg-white dark:bg-ds-12",
                "w-full max-w-[min(100%,38.5rem)] lg:max-w-[min(100%,45rem)]",
                "max-h-full overflow-y-auto",
                "isolate"
              )}
            />
          }
        >
          <div
            className={classJoin(
              "pb-[1.375rem] md:pb-[2.875rem]",
              "pt-8 md:pt-[1.125rem]",
              "bg-inherit",
              "sticky top-0",
              "z-10"
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
          <form className={classJoin("px-2px", "bg-inherit")}>
            <fieldset className="mb-10 md:mb-12">
              <Legend>Bill From</Legend>
              <AddressInputs />
            </fieldset>
            <fieldset className="mb-10 md:mb-12">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24px">
              <LabelledInputWithErrMsg
                $label="Invoice Date"
                $labelInputGap="lg"
                $padding="lg"
                type="date"
              />
              <PaymentTermSelect />
            </div>
            <LabelledInputWithErrMsg
              $label="Project Description"
              $labelInputGap="lg"
              $padding="lg"
            />
            <fieldset className="mt-[4.25rem]">
              <legend
                className={classJoin(
                  "text-[#777F98]",
                  "mb-[1.375rem]",
                  "font-bold text-[1.125rem] leading-8 -tracking-[0.02375rem]"
                )}
              >
                Item List
              </legend>
              <ol>
                {items.map((item, i) => {
                  const isNotFirstItem = i !== 0;

                  return (
                    <li
                      key={item.id}
                      className={classJoin(
                        "mb-12 md:mb-[1.0625rem]",
                        "md:flex md:gap-x-16px md:items-center"
                      )}
                    >
                      <div
                        className={classJoin(
                          "mb-6 md:mb-0",
                          "md:basis-[214px] md:shrink-0 md:grow"
                        )}
                      >
                        <LabelledInputWithErrMsg
                          $label="Invoice Name"
                          $mdSrOnlyLabel={isNotFirstItem}
                          $labelInputGap="lg"
                          $padding="lg"
                          $marginBottomZero={true}
                        />
                      </div>
                      <div className="grid grid-cols-[repeat(3,minmax(65px,1fr))_min-content] gap-x-16px items-center">
                        <LabelledInputWithErrMsg
                          $label="Qty."
                          $mdSrOnlyLabel={isNotFirstItem}
                          $labelInputGap="lg"
                          $padding="lg"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]+"
                          $marginBottomZero={true}
                        />
                        <LabelledInputWithErrMsg
                          $label="Price"
                          $mdSrOnlyLabel={isNotFirstItem}
                          $labelInputGap="lg"
                          $padding="lg"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]+"
                          $marginBottomZero={true}
                        />
                        <LabelledInputWithErrMsg
                          $label="Total"
                          $mdSrOnlyLabel={isNotFirstItem}
                          $labelInputGap="lg"
                          $padding="lg"
                          readOnly={true}
                          type="text"
                          inputMode="numeric"
                          $marginBottomZero={true}
                        />
                        {allowItemDeletion && (
                          <button
                            type="button"
                            onClick={() => {
                              setItems((items) =>
                                items.filter(({ id }) => id !== item.id)
                              );
                            }}
                            className={classJoin(
                              "relative",
                              "text-ds-6",
                              "self-end",
                              "mb-5"
                            )}
                          >
                            <span className="sr-only">delete this item</span>
                            <Delete />
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
              <button
                type="button"
                onClick={() =>
                  setItems((items) => {
                    return [...items, { id: crypto.randomUUID() }];
                  })
                }
                className={classJoin(
                  "bg-[#F9FAFE] hover:bg-ds-5 dark:bg-ds-4 hover:dark:bg-ds-8",
                  "text-ds-7 dark:test-ds-5",
                  "pt-[1.125rem]",
                  "pb-[0.9375rem]",
                  "w-full",
                  "rounded-3xl",
                  "typography-heading-s-var",
                  "mb-[5.5rem]"
                )}
              >
                Add New Item
              </button>
            </fieldset>
            <div
              className={classJoin(
                "px-24px",
                "py-5",
                "bg-white dark:bg-ds-3 lg:bg-inherit lg:dark:bg-inherit",
                "sticky bottom-0",
                "-ml-24px md:-ml-56px lg:-ml-[calc(103px+56px)]",
                "-mr-24px md:-mr-56px",
                "pl-24px md:pl-56px lg:pl-[calc(103px+56px)]",
                "pr-24px md:pr-56px",
                "flex items-center gap-x-2"
              )}
            >
              <button
                type="button"
                className={classJoin(
                  "pt-[1.125rem]",
                  "pb-[0.9375rem]",
                  "rounded-3xl",
                  "px-16px",
                  "typography-heading-s-var",
                  "bg-[#F9FAFE] hover:bg-ds-5 dark:bg-ds-4 hover:dark:bg-ds-8",
                  "text-ds-7 dark:text-ds-5"
                )}
              >
                Discard
              </button>
              {props.type === "create" && (
                <button
                  type="button"
                  className={classJoin(
                    "pt-[1.125rem]",
                    "pb-[0.9375rem]",
                    "rounded-3xl",
                    "px-16px",
                    "typography-heading-s-var",
                    "bg-[#373B53] hover:bg-ds-8 dark:hover:bg-ds-3",
                    "text-ds-6 dark:text-ds-5",
                    "ml-auto"
                  )}
                >
                  Save as Draft
                </button>
              )}
              <button
                type="button"
                className={classJoin(
                  "pt-[1.125rem]",
                  "pb-[0.9375rem]",
                  "rounded-3xl",
                  "px-16px",
                  "typography-heading-s-var",
                  "bg-ds-1 hover:bg-ds-2",
                  "text-white"
                )}
              >
                {props.type === "edit" ? "Save Changes" : "Save & Send"}
              </button>
            </div>
          </form>
        </Ariakit.Dialog>
      )}
    </AnimatePresence>
  );
}
