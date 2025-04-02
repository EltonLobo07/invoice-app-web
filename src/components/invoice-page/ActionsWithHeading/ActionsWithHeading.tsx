import { classJoin } from "@/utils/general";
import Link from "next/link";
import { DeleteDialog } from "./DeleteDialog";
import { MarkAsPaidDialog } from "./MarkAsPaidDialog";

type ActionsWithHeadingProps = {
  invoiceId: string;
  showMarkAsPaid: boolean;
};

export function ActionsWithHeading(props: ActionsWithHeadingProps) {
  return (
    <div className="flex gap-x-1 gap-y-2 items-center justify-center flex-wrap">
      <h3 className="sr-only">available actions</h3>
      <Link
        href={`/invoices/${props.invoiceId}/edit`}
        className={classJoin(
          "bg-[#F9FAFE] hover:bg-ds-5 dark:bg-ds-4 hover:dark:bg-white",
          "text-ds-7",
          "typography-heading-s-var",
          "pt-[1.125rem] pb-[0.9375rem] px-6",
          "rounded-3xl"
        )}
      >
        Edit
      </Link>
      <DeleteDialog invoiceId={props.invoiceId} />
      {props.showMarkAsPaid && <MarkAsPaidDialog invoiceId={props.invoiceId} />}
    </div>
  );
}
