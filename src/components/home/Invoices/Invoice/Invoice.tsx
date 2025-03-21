import type { Invoice as InvoiceType } from "@/types/home";
import { classJoin } from "@/utils/general";
import Link from "next/link";
import { InvoiceDetailsSm } from "./InvoiceDetailsSm";
import { InvoiceDetailsLg } from "./InvoiceDetailsLg";

type Props = {
  invoice: InvoiceType;
  isFirst: boolean;
};

export function Invoice({ invoice, isFirst }: Props) {
  return (
    <li
      className={classJoin(
        "bg-white dark:bg-ds-3",
        "shadow-[0px_10px_10px_-10px_#48549F1A]",
        "rounded-lg",
        "pl-24px lg:pl-32px",
        "pr-24px",
        "pt-[1.5625rem] md:pt-4",
        "pb-[1.375rem] md:pb-[0.9375rem]",
        "relative",
        "mx-4px",
        isFirst && "mt-4px",
        "min-w-[15.5625rem]"
      )}
    >
      <InvoiceDetailsSm invoice={invoice} />
      <InvoiceDetailsLg invoice={invoice} />
      <Link
        prefetch={false}
        href={`/invoices/${invoice.id}`}
        className={classJoin(
          "absolute top-0 left-0 w-full h-full",
          "hover:outline hover:outline-ds-1",
          "rounded-[inherit]"
        )}
      >
        <span className="sr-only">to invoice ID {invoice.id} page</span>
      </Link>
    </li>
  );
}
