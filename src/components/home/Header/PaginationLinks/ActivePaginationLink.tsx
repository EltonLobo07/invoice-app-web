"use client";

import { PAGE_NUM_SEARCH_PARAM } from "@/constants/home";
import { usePathname, useSearchParams } from "next/navigation";
import { LinkWithTooltip } from "./LinkWithTooltip";

type Props = {
  pageNum: number;
  children: React.ReactNode;
  tooltipText: string;
  className?: string;
};

export function ActivePaginationLink(props: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(PAGE_NUM_SEARCH_PARAM, props.pageNum.toString());

  return (
    <LinkWithTooltip
      tooltipText={props.tooltipText}
      href={`${pathname}?${newSearchParams.toString()}`}
      className={props.className}
    >
      {props.children}
    </LinkWithTooltip>
  );
}
