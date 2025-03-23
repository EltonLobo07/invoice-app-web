import type { Invoice as InvoiceType } from "@/types/home";
import { classJoin } from "@/utils/general";
import { InvoiceId } from "./InvoiceId";
import { InvoiceClientName } from "./InvoiceClientName";
import { InvoiceDueDate } from "./InvoiceDueDate";
import { InvoiceAmount } from "./InvoiceAmount";
import { InvoiceStatus } from "./InvoiceStatus";

type Props = {
  invoice: InvoiceType;
};

export function InvoiceDetailsSm({ invoice }: Props) {
  return (
    <dl className="relative md:hidden">
      {/* `div`s are valid: https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element */}
      <div
        className={classJoin(
          "flex justify-between items-center gap-x-2",
          "mb-6",
          "max-w-full overflow-x-hidden"
        )}
      >
        <InvoiceId value={invoice.id} />
        <InvoiceClientName value={invoice.clientName} />
      </div>
      <div className="flex justify-between items-center gap-x-2">
        <div
          className={classJoin(
            "flex flex-col gap-y-2 items-start",
            "grow overflow-x-hidden"
          )}
        >
          <InvoiceDueDate value={invoice.dueDate} />
          <InvoiceAmount value={invoice.amount} />
        </div>
        <InvoiceStatus value={invoice.status} />
      </div>
    </dl>
  );
}
