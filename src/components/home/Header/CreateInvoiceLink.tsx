"use client";

import { Plus } from "@/icons";
import { classJoin } from "@/utils/general";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ResponsiveText } from "@/components/general";
import type { ResponsiveTextType } from "@/types/home";
import { motion } from "motion/react";

const href = "/invoices/create";

type Props = {
  text: ResponsiveTextType;
};

const MotionLink = motion(Link);

export function CreateInvoiceLink(props: Props) {
  const pathname = usePathname();
  const disabled = pathname === href;

  return (
    <MotionLink
      layout="position"
      aria-disabled={disabled}
      href={href}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
        }
      }}
      className={classJoin(
        "relative",
        "bg-ds-1",
        disabled ? "opacity-75" : "hover:bg-ds-2",
        "text-white",
        "rounded-[24px]",
        "py-[6px] md:py-8px",
        "pl-[6px] md:pl-8px",
        "pr-[15px] md:pr-[17px]",
        "typography-heading-s-var",
        "flex justify-center items-center gap-x-8px md:gap-x-16px"
      )}
    >
      <Plus className="text-ds-1" />
      <span className="inline-block translate-y-[1.5px]">
        <ResponsiveText {...props.text} />
      </span>
    </MotionLink>
  );
}
