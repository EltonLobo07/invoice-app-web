import type { Invoice as InvoiceType } from "@/types/home";
import { classJoin } from "@/utils/general";
import { InvoiceId } from "./InvoiceId";
import { InvoiceDueDate } from "./InvoiceDueDate";
import { InvoiceClientName } from "./InvoiceClientName";
import { InvoiceAmount } from "./InvoiceAmount";
import { InvoiceStatus } from "./InvoiceStatus";
import { ArrowDown } from "@/icons";

type Props = {
  invoice: InvoiceType;
};

export function InvoiceDetailsLg({ invoice }: Props) {
  return (
    <dl
      className={classJoin("relative", "hidden md:flex gap-x-5 items-center")}
    >
      <div className={classJoin("mr-8px lg:mr-24px", "w-[7ch]")}>
        <InvoiceId value={invoice.id} />
      </div>
      <div className="mr-[31px] lg:mr-[39px]">
        <InvoiceDueDate value={invoice.dueDate} />
      </div>
      <div className="grow overflow-x-hidden">
        <InvoiceClientName value={invoice.clientName} />
      </div>
      <div
        className={classJoin(
          "grow overflow-x-hidden",
          "flex justify-end",
          "mr-20px"
        )}
      >
        <InvoiceAmount value={invoice.amount} />
      </div>
      <div>
        <InvoiceStatus value={invoice.status} />
      </div>
      <ArrowDown className={classJoin("-rotate-90", "text-ds-1", "shrink-0")} />
    </dl>
  );
}
