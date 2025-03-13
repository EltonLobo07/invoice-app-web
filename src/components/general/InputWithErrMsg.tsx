"use client";

import { classJoin, CustomProps, OmitKey } from "@/utils/general";
import React from "react";
import { Input } from "./Input";

type Props = OmitKey<
  React.ComponentPropsWithRef<typeof Input>,
  "aria-invalid" | "aria-describedby"
> &
  CustomProps<{
    errorMsg?: string;
  }>;

export function InputWithErrMsg({ $errorMsg, ...inputProps }: Props) {
  const id = React.useId();
  const errorMsgId = `${id}-error`;
  const isInvalid = Boolean($errorMsg);

  return (
    <div className="flex flex-col gap-y-1 mb-4">
      <Input
        {...inputProps}
        aria-invalid={isInvalid}
        aria-describedby={errorMsgId}
      />
      <span
        id={errorMsgId}
        className={classJoin(
          "typography-body-var text-ds-9",
          "inline-block transition-opacity duration-300",
          isInvalid ? "opacity-100" : "opacity-0"
        )}
      >
        {$errorMsg}
      </span>
    </div>
  );
}
