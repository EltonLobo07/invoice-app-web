import { classJoin } from "@/utils/general";
import { ResponsiveText } from "@/components/general";
import { InvoiceStatusSelect } from "./InvoiceStatusSelect";
import { CreateInvoiceLink } from "./CreateInvoiceLink";
import type { InvoiceStatus, ResponsiveTextType } from "@/types/home";
import { getNumInvoiceStr } from "./Header.helpers";

type Props = {
  numInvoices: number;
  selectedStatuses: InvoiceStatus[];
  newInvoiceLinkText: ResponsiveTextType;
};

export function Header(props: Props) {
  return (
    <header
      className={classJoin(
        "flex items-center gap-x-16px flex-wrap",
        "sticky top-0",
        "max-w-app mx-auto w-full",
        "pt-32px md:pt-56px lg:pt-[70px]",
        "pb-8",
        "z-10 bg-inherit"
      )}
    >
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
        <CreateInvoiceLink text={props.newInvoiceLinkText} />
      </div>
    </header>
  );
}
