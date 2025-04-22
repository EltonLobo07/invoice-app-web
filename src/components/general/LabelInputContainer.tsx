import { classJoin, type CustomProps } from "@/utils/general";
import { motion } from "motion/react";

type Props = { children: React.ReactNode } & CustomProps<
  {
    flexGrow?: boolean;
    labelInputGap?: "sm" | "lg";
    zeroMinWidth?: boolean;
  } & (
    | { marginBottomZero?: boolean; marginBottom?: undefined }
    | { marginBottomZero?: undefined; marginBottom?: "sm" | "lg" }
  )
>;

export function LabelInputContainer(props: Props) {
  return (
    <motion.div
      layout="position"
      className={classJoin(
        "flex flex-col",
        props.$zeroMinWidth && "min-w-0",
        props.$flexGrow && "grow",
        props.$labelInputGap === "lg" ? "gap-y-1" : "gap-y-0.5",
        props.$marginBottomZero
          ? "mb-0"
          : props.$marginBottom === "lg"
          ? "mb-[2.1875rem]"
          : "mb-4"
      )}
    >
      {props.children}
    </motion.div>
  );
}
