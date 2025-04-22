"use client";

import { classJoin, CustomProps, OmitKey } from "@/utils/general";
import React from "react";
import { Input } from "./Input";
import { AnimatePresence, motion } from "motion/react";

type Props = OmitKey<
  React.ComponentPropsWithRef<typeof Input>,
  "aria-invalid" | "aria-describedby"
> &
  CustomProps<{
    errorMsg?: string;
    errorMsgZIdxOnFocus?: `z-${10 | 20 | 30 | 40 | 50}`;
  }>;

export function InputWithErrMsg({
  $errorMsg,
  $errorMsgZIdxOnFocus,
  ...inputProps
}: Props) {
  const id = React.useId();
  const errorMsgId = `${id}-error`;
  const isInvalid = Boolean($errorMsg);
  const [inputFocused, setInputFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useLayoutEffect(() => {
    if (document.activeElement === inputRef.current) {
      setInputFocused(true);
    }
  }, []);

  return (
    <div
      className={classJoin("relative", "max-w-full", "flex flex-col gap-y-1")}
    >
      <Input
        {...inputProps}
        ref={(ele) => {
          inputRef.current = ele;
          if (typeof inputProps.ref === "function") {
            inputProps.ref(ele);
          } else if (inputProps.ref && typeof inputProps.ref === "object") {
            inputProps.ref.current = ele;
          }
        }}
        onFocus={(e) => {
          setInputFocused(true);
          inputProps.onFocus?.(e);
        }}
        onBlur={(e) => {
          setInputFocused(false);
          inputProps.onBlur?.(e);
        }}
        aria-invalid={isInvalid}
        aria-describedby={errorMsgId}
      />
      <span
        id={errorMsgId}
        className={classJoin(
          "text-ds-9",
          "typography-body-sm min-h-[var(--leading-body-sm)]",
          "inline-block transition-opacity duration-300",
          "max-w-full overflow-x-hidden text-nowrap text-ellipsis",
          isInvalid ? "opacity-100" : "opacity-0"
        )}
      >
        {$errorMsg}
      </span>
      <AnimatePresence>
        {inputFocused && isInvalid && (
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            aria-hidden={true}
            className={classJoin(
              "absolute top-[calc(100%-var(--leading-body-sm))] left-0 right-0",
              "bg-red-500 text-white",
              "px-2 py-0.5",
              "text-body-sm",
              "rounded-sm",
              "origin-[--popover-transform-origin]",
              "max-w-full overflow-x-hidden break-words hyphens-auto",
              "shadow-sm",
              $errorMsgZIdxOnFocus
            )}
          >
            {$errorMsg}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
