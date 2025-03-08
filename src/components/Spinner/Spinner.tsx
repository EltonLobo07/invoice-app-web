"use client";

import { classJoin } from "@/utils/general";

type Props = {
  isLoading?: boolean;
};

export function Spinner(props: Props) {
  return (
    <svg
      aria-hidden={true}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={classJoin(
        "motion-safe:animate-spin",
        "transition-opacity duration-500",
        props.isLoading ? "opacity-100" : "w-0 h-0 opacity-0"
      )}
      viewBox="0 0 24 24"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
    </svg>
  );
}
