"use client";

import { Loading } from "@/icons";
import { classJoin } from "@/utils/general";

type Props = {
  isLoading?: boolean;
};

export function Spinner(props: Props) {
  return (
    <Loading
      className={classJoin(
        "motion-safe:animate-spin",
        "transition-opacity duration-500",
        props.isLoading ? "opacity-100" : "w-0 h-0 opacity-0"
      )}
    />
  );
}
