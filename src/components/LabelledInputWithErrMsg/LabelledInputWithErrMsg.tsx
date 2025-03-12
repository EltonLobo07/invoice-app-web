"use client";

import { InputWithErrMsg, Label } from "@/components";
import { CustomProps, OmitKey } from "@/utils/general";
import { motion } from "framer-motion";
import React from "react";

type Props = OmitKey<
  React.ComponentPropsWithRef<typeof InputWithErrMsg>,
  "id"
> &
  CustomProps<{
    label: string;
  }>;

export function LabelledInputWithErrMsg({
  $label,
  ...inputWithErrMsgProps
}: Props) {
  const id = React.useId();

  return (
    <motion.div layout="position" className="flex flex-col gap-y-1">
      <Label
        invalidInput={Boolean(inputWithErrMsgProps.$errorMsg)}
        htmlFor={id}
      >
        {$label}
      </Label>
      <InputWithErrMsg {...inputWithErrMsgProps} id={id} />
    </motion.div>
  );
}
