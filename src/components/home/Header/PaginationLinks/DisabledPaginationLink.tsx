import { LinkWithTooltip } from "./LinkWithTooltip";

type Props = {
  children: React.ReactNode;
  tooltipText: string;
  className?: string;
};

export function DisabledPaginationLink(props: Props) {
  return (
    <LinkWithTooltip
      aria-disabled={true}
      href="#"
      tooltipText={props.tooltipText}
      className={props.className}
    >
      {props.children}
    </LinkWithTooltip>
  );
}
