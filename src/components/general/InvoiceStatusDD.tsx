import type { InvoiceStatus } from "@/types/home";
import { classJoin } from "@/utils/general";

type Props = {
  value: InvoiceStatus;
};

export function InvoiceStatusDD(props: Props) {
  return (
    <dd
      className={classJoin(
        "min-w-[6.5rem] w-fit",
        "flex items-center justify-center gap-x-2",
        "typography-heading-s-var",
        "capitalize",
        "pt-[0.875rem] pb-[0.6875rem] px-1",
        "rounded-[0.375rem]",
        "bg-current/5",
        props.value === "paid"
          ? "text-[#33D69F]"
          : props.value === "pending"
          ? "text-[#FF8F00]"
          : "text-[#373B53] dark:text-ds-5"
      )}
    >
      <span
        className={classJoin(
          "inline-block w-2 h-2",
          "rounded-full",
          "bg-current"
        )}
      />
      <span>{props.value}</span>
    </dd>
  );
}
