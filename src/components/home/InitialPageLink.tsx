"use client";

import { PAGE_NUM_SEARCH_PARAM } from "@/constants/home";
import { classJoin } from "@/utils/general";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function InitialPageLink() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(PAGE_NUM_SEARCH_PARAM, "1");

  return (
    <Link
      prefetch={false}
      href={`${pathname}?${newSearchParams.toString()}`}
      className={classJoin(
        "bg-ds-1 hover:bg-ds-2",
        "text-white",
        "rounded-sm",
        "px-16px py-3",
        "typography-heading-s-var",
        "flex justify-center items-center gap-x-1"
      )}
    >
      First page
    </Link>
  );
}
