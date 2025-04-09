import { classJoin, type CustomProps } from "@/utils/general";
import { motion } from "motion/react";

type Props = { children: React.ReactNode } & CustomProps<{
  flexGrow?: boolean;
  labelInputGap?: "sm" | "lg";
  marginBottomZero?: boolean;
}>;

export function LabelInputContainer(props: Props) {
  return (
    <motion.div
      layout="position"
      className={classJoin(
        "flex flex-col",
        props.$flexGrow && "grow",
        props.$labelInputGap === "lg" ? "gap-y-2" : "gap-y-1",
        props.$marginBottomZero ? "mb-0" : "mb-6"
      )}
    >
      {props.children}
    </motion.div>
  );
}
