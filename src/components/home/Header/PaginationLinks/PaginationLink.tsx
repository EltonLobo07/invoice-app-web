import { classJoin } from "@/utils/general";
import { DisabledPaginationLink } from "./DisabledPaginationLink";
import { ActivePaginationLink } from "./ActivePaginationLink";

type Props = {
  pageNum: number | null;
  children: React.ReactNode;
  tooltipText: string;
};

export function PaginationLink(props: Props) {
  const classes = classJoin(
    "px-8px py-4px",
    "rounded-md",
    "flex items-center justify-center",
    "text-ds-1",
    "relative",
    "bg-white dark:bg-ds-3",
    "border border-ds-1/15",
    props.pageNum === null && "opacity-40"
  );

  if (props.pageNum === null) {
    return (
      <DisabledPaginationLink
        tooltipText={props.tooltipText}
        className={classes}
      >
        {props.children}
      </DisabledPaginationLink>
    );
  }

  return (
    <ActivePaginationLink
      tooltipText={props.tooltipText}
      pageNum={props.pageNum}
      className={classes}
    >
      {props.children}
    </ActivePaginationLink>
  );
}
