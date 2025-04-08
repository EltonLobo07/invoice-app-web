"use client";

import { InputWithErrMsg, Label } from "@/components/general";
import { classJoin, CustomProps, OmitKey } from "@/utils/general";
import { motion } from "motion/react";
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
  }>;

export function LabelledInputWithErrMsg({
  $label,
  $labelInputGap,
  $action,
  $flexGrow,
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
    <motion.div
      layout="position"
      className={classJoin(
        "flex flex-col",
        $flexGrow && "grow",
        $labelInputGap === "lg" ? "gap-y-2" : "gap-y-1"
      )}
    >
      {labelWithAction}
      <InputWithErrMsg {...inputWithErrMsgProps} id={id} />
    </motion.div>
  );
}
