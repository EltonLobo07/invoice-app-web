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
    marginBottomZero?: boolean;
  }>;

export function InputWithErrMsg({
  $errorMsg,
  $marginBottomZero,
  ...inputProps
}: Props) {
  const id = React.useId();
  const errorMsgId = `${id}-error`;
  const isInvalid = Boolean($errorMsg);

  return (
    <div
      className={classJoin(
        "flex flex-col gap-y-1",
        $marginBottomZero ? "mb-0" : "mb-6"
      )}
    >
      <Input
        {...inputProps}
        aria-invalid={isInvalid}
        aria-describedby={errorMsgId}
      />
      <span
        id={errorMsgId}
        className={classJoin(
          "typography-body-sm text-ds-9",
          "inline-block transition-opacity duration-300",
          isInvalid ? "opacity-100" : "opacity-0"
        )}
      >
        {$errorMsg}
      </span>
    </div>
  );
}
