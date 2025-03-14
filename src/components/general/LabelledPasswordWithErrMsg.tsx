import { classJoin, OmitKey } from "@/utils/general";
import React from "react";
import { LabelledInputWithErrMsg } from "./LabelledInputWithErrMsg";
import { Eye, EyeSlash } from "@/icons";
import * as Toggle from "@radix-ui/react-toggle";

type Props = OmitKey<
  React.ComponentPropsWithRef<typeof LabelledInputWithErrMsg>,
  "type" | "$action"
>;

export function LabelledPasswordWithErrMsg(props: Props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const ShowPasswordIcon = showPassword ? EyeSlash : Eye;

  return (
    <LabelledInputWithErrMsg
      type={showPassword ? "text" : "password"}
      $action={
        <Toggle.Root
          aria-label="show password"
          pressed={showPassword}
          onPressedChange={() =>
            setShowPassword((showPassword) => !showPassword)
          }
          className={classJoin(
            "text-ds-7 dark:text-ds-5 hover:text-black  dark:hover:text-white",
            "mr-4px"
          )}
        >
          <ShowPasswordIcon />
        </Toggle.Root>
      }
      {...props}
    />
  );
}
