"use client";

import {
  InputWithErrMsg,
  Label,
  LabelInputContainer,
} from "@/components/general";
import { type CustomProps, OmitKey } from "@/utils/general";
import React from "react";

type Props = OmitKey<
  React.ComponentPropsWithRef<typeof InputWithErrMsg>,
  "id"
> &
  CustomProps<{
    label: string;
    action?: React.ReactNode;
    flexGrow?: boolean;
    labelInputGap?: "sm" | "lg";
    marginBottomZero?: boolean;
  }>;

export function LabelledInputWithErrMsg({
  $label,
  $labelInputGap,
  $action,
  $flexGrow,
  $marginBottomZero,
  ...inputWithErrMsgProps
}: Props) {
  const id = React.useId();
  const labelJSX = (
    <Label invalidInput={Boolean(inputWithErrMsgProps.$errorMsg)} htmlFor={id}>
      {$label}
    </Label>
  );
  const labelWithAction = $action ? (
    <div className="flex items-center gap-x-1 justify-between">
      {labelJSX}
      {$action}
    </div>
  ) : (
    labelJSX
  );

  return (
    <LabelInputContainer
      $flexGrow={$flexGrow}
      $labelInputGap={$labelInputGap}
      $marginBottomZero={$marginBottomZero}
    >
      {labelWithAction}
      <InputWithErrMsg {...inputWithErrMsgProps} id={id} />
    </LabelInputContainer>
  );
}
