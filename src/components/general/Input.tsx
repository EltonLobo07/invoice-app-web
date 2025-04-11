import { classJoin, type OmitKey, type CustomProps } from "@/utils/general";
import React from "react";

type NativeInputProps = React.ComponentPropsWithRef<"input">;

type Props = OmitKey<NativeInputProps, "className" | "style" | "aria-invalid"> &
  CustomProps<{
    padding?: "sm" | "lg";
  }> &
  Required<Pick<NativeInputProps, "id" | "aria-invalid">>;

export function Input({ $padding, ...inputProps }: Props) {
  return (
    <input
      {...inputProps}
      className={classJoin(
        "grow",
        "w-full",
        "rounded-sm",
        "border",
        "bg-white dark:bg-ds-3",
        inputProps["aria-invalid"]
          ? "border-ds-9"
          : "border-ds-5 dark:border-ds-4",
        "text-ds-8 dark:text-white",
        "typography-heading-s-var",
        $padding === "sm"
          ? "px-12px pt-[0.875rem] pb-3"
          : "px-[19px] pt-[1.0625rem] pb-[0.875rem]"
      )}
    />
  );
}
