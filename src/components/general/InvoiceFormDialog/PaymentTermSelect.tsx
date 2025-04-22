"use client";

import {
  Select,
  SelectItem,
  SelectItemCheck,
  SelectLabel,
  SelectPopover,
  SelectProvider,
} from "@ariakit/react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { classJoin } from "@/utils/general";
import { Label, LabelInputContainer } from "@/components/general";
import { ArrowDown, Check } from "@/icons";
import type { PaymentTerm } from "@/types/general";
import { PAYMENT_TERMS } from "@/constants/general";

type Props = {
  onChange: (paymentTerm: PaymentTerm) => void;
  onBlur: () => void;
  value: PaymentTerm;
  name: string;
  ref: React.ComponentPropsWithRef<typeof Select>["ref"];
};

const lastPaymentTermIndex = PAYMENT_TERMS.length - 1;

export function PaymentTermSelect(props: Props) {
  const id = React.useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LabelInputContainer
      $labelInputGap="lg"
      $marginBottom="lg"
      $flexGrow={true}
    >
      <SelectProvider
        open={isOpen}
        setOpen={setIsOpen}
        value={props.value}
        setValue={props.onChange}
      >
        <Label as={SelectLabel}>Payment Terms</Label>
        <Select
          id={id}
          ref={props.ref}
          onBlur={props.onBlur}
          className={classJoin(
            "flex gap-x-2 justify-between items-center",
            "rounded-sm",
            "border border-ds-5 dark:border-ds-4",
            "bg-white dark:bg-ds-3",
            "text-ds-8 dark:text-white",
            "typography-heading-s-var",
            "px-[19px] pt-[1.0625rem] pb-[0.875rem]"
          )}
        >
          <span>{getUIPaymentTerm(props.value)}</span>
          <ArrowDown
            className={classJoin(
              "shrink-0",
              "text-ds-1",
              "inline-block",
              "transition-transform",
              "duration-300",
              isOpen ? "motion-safe:rotate-180" : "motion-safe:rotate-0"
            )}
          />
        </Select>
        <AnimatePresence>
          {isOpen && (
            <SelectPopover
              sameWidth={true}
              render={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                />
              }
              gutter={8}
              alwaysVisible={true}
              className={classJoin(
                "z-20",
                "bg-white dark:bg-ds-4",
                // "p-24px",
                "rounded-[8px]",
                "shadow-[0px_10px_20px_0px_#48549F40] dark:shadow-[0px_10px_20px_0px_#00000040]"
                // "flex flex-col gap-y-[0.9375rem]"
              )}
            >
              {PAYMENT_TERMS.map((term, termIndex) => (
                <SelectItem
                  key={term}
                  value={term}
                  className={classJoin(
                    "flex gap-x-2 justify-between items-center",
                    "px-24px py-4",
                    termIndex !== lastPaymentTermIndex &&
                      "border-b border-ds-5 dark:border-ds-3",
                    "cursor-default",
                    // "data-[active-item=true]:ring-2 ring-ds-1 ring-offset-2 dark:ring-offset-ds-3",
                    "group"
                  )}
                >
                  <span
                    className={classJoin(
                      "typography-heading-s-var",
                      "text-ds-8 dark:text-ds-5 group-hover:text-ds-1"
                    )}
                  >
                    {getUIPaymentTerm(term)}
                  </span>
                  <SelectItemCheck
                    className={classJoin(
                      "flex items-center justify-center",
                      "text-ds-1"
                    )}
                  >
                    <Check strokeCurrentColor={true} />
                  </SelectItemCheck>
                </SelectItem>
              ))}
            </SelectPopover>
          )}
        </AnimatePresence>
      </SelectProvider>
    </LabelInputContainer>
  );
}

function getUIPaymentTerm(paymentTerm: PaymentTerm) {
  return `Net ${paymentTerm} Day${paymentTerm === "1" ? "" : "s"}`;
}
