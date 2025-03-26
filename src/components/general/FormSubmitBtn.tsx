"use client";

import { Spinner } from "@/components/general";
import { motion } from "motion/react";

type Props = {
  isFormSubmitting: boolean;
  children: string;
  className?: string;
};

export function FormSubmitBtn(props: Props) {
  return (
    <motion.button
      layout={true}
      aria-disabled={props.isFormSubmitting}
      type={props.isFormSubmitting ? "button" : "submit"}
      className={props.className}
    >
      <Spinner isLoading={props.isFormSubmitting} />
      <motion.span
        layout="position"
        animate={{ y: 1.5 }}
        className="inline-block"
      >
        {props.children}
      </motion.span>
    </motion.button>
  );
}
