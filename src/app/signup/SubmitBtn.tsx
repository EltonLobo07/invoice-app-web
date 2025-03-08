"use client";

import { Spinner } from "@/components";
import { motion } from "framer-motion";
import { classJoin } from "@/utils/general";

type Props = {
  isFormSubmitting: boolean;
};

export function SubmitBtn(props: Props) {
  return (
    <motion.button
      layout="position"
      type="submit"
      className={classJoin(
        "bg-ds-1 hover:bg-ds-2",
        "text-white",
        "rounded-sm",
        "px-16px py-3",
        "typography-heading-s-var",
        "w-full",
        "flex justify-center items-center gap-x-1"
      )}
    >
      <Spinner isLoading={props.isFormSubmitting} />
      <motion.span
        layout="position"
        animate={{ y: 1.5 }}
        className="inline-block"
      >
        Submit
      </motion.span>
    </motion.button>
  );
}
