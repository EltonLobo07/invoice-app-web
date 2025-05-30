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
    mdSrOnlyLabel?: boolean;
    action?: React.ReactNode;
    flexGrow?: boolean;
    labelInputGap?: "sm" | "lg";
    marginBottomZero?: boolean;
    zeroMinWidth?: boolean;
  }>;

export function LabelledInputWithErrMsg({
  $label,
  $mdSrOnlyLabel,
  $labelInputGap,
  $action,
  $flexGrow,
  $marginBottomZero,
  $zeroMinWidth,
  ...inputWithErrMsgProps
}: Props) {
  const id = React.useId();
  const labelJSX = (
    <Label
      mdSrOnlyLabel={$mdSrOnlyLabel}
      invalidInput={Boolean(inputWithErrMsgProps.$errorMsg)}
      htmlFor={id}
    >
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
      $zeroMinWidth={$zeroMinWidth}
    >
      {labelWithAction}
      <InputWithErrMsg {...inputWithErrMsgProps} id={id} />
    </LabelInputContainer>
  );
}
