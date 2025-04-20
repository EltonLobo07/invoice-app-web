import { classJoin, type CustomProps } from "@/utils/general";
import { motion } from "motion/react";

type Props = { children: React.ReactNode } & CustomProps<
  {
    flexGrow?: boolean;
    labelInputGap?: "sm" | "lg";
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
        props.$flexGrow && "grow",
        props.$labelInputGap === "lg" ? "gap-y-2" : "gap-y-1",
        props.$marginBottomZero
          ? "mb-0"
          : props.$marginBottom === "lg"
          ? "mb-[1.5625rem]"
          : "mb-5"
      )}
    >
      {props.children}
    </motion.div>
  );
}
