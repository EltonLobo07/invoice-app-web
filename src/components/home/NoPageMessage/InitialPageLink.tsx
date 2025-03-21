"use client";

import { PAGE_NUM_SEARCH_PARAM } from "@/constants/home";
import { usePathname, useSearchParams } from "next/navigation";
import { BtnLikeLink } from "@/components/general";

export function InitialPageLink() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(PAGE_NUM_SEARCH_PARAM, "1");

  return (
    <BtnLikeLink href={`${pathname}?${newSearchParams.toString()}`}>
      First page
    </BtnLikeLink>
  );
}
