import { classJoin } from "@/utils/general";
import { ResponsiveText } from "../general";
import { InvoiceStatusSelect } from "./InvoiceStatusSelect";
import { CreateInvoiceLink } from "./CreateInvoiceLink";
import type { InvoiceStatus } from "@/types/home";

type Props = {
  numInvoices: number;
  selectedStatuses: InvoiceStatus[];
};

export function Header(props: Props) {
  return (
    <header className="flex items-center gap-x-16px flex-wrap">
      <div
        className={classJoin(
          "flex flex-col gap-y-[0.09375rem] md:gap-y-[0.375rem]",
          // adjust title text's line-height mismatch
          "pt-4px md:pt-[6px]"
        )}
      >
        <h2
          className={classJoin(
            "typography-heading-m md:typography-heading-l",
            "text-ds-8 dark:text-white"
          )}
        >
          Invoices
        </h2>
        <p className={classJoin("text-body", "text-ds-6 dark:text-ds-5")}>
          <ResponsiveText {...getNumInvoiceStr(props.numInvoices)} />
        </p>
      </div>
      <div
        className={classJoin(
          "ml-auto",
          "flex items-center gap-x-[18px] md:gap-x-40px"
        )}
      >
        <InvoiceStatusSelect selectedStatuses={props.selectedStatuses} />
        <CreateInvoiceLink />
      </div>
    </header>
  );
}

function getNumInvoiceStr(
  numInvoices: number
): Record<"default" | "md", string> {
  if (numInvoices === 0) {
    return { default: "No invoices", md: "No invoices" };
  }
  if (numInvoices === 1) {
    return { default: "1 invoice", md: "There is just 1 invoice" };
  }
  return {
    default: `${numInvoices} invoices`,
    md: `There are ${numInvoices} total invoices`,
  };
}
