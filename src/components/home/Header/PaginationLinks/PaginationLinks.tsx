// for motion's `motion` component
"use client";

import { ArrowLeft, ArrowRight } from "@/icons";
import { PaginationLink } from "./PaginationLink";
import { motion } from "motion/react";
import type { PaginationLinksData } from "./types";

type Props = PaginationLinksData;

export function PaginationLinks(props: Props) {
  return (
    <motion.div layout="position" className="flex gap-x-8px items-center">
      <PaginationLink
        pageNum={props.prevPageNum}
        tooltipText="Previous invoices"
      >
        <ArrowLeft />
        <span className="sr-only">see previous invoices</span>
      </PaginationLink>
      <PaginationLink pageNum={props.nextPageNum} tooltipText="Next invoices">
        <ArrowRight />
        <span className="sr-only">see next invoices</span>
      </PaginationLink>
    </motion.div>
  );
}
