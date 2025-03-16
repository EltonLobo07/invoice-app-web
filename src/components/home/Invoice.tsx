import type { Invoice as InvoiceType } from "@/types/home";
import { classJoin } from "@/utils/general";
import Link from "next/link";

type Props = {
  invoice: InvoiceType;
};

export function Invoice({ invoice }: Props) {
  return (
    <li
      className={classJoin(
        "bg-white dark:bg-ds-3",
        "shadow-[0px_10px_10px_-10px_#48549F1A]",
        "rounded-lg",
        "px-24px",
        "pt-[1.5625rem]",
        "pb-[1.375rem]"
      )}
    >
      <InvoiceDetailsSm invoice={invoice} />
      <InvoiceDetailsLg invoice={invoice} />
      <Link href={`/invoices/${invoice.id}`}>
        <span>more details of invoice ID {invoice.id}</span>
      </Link>
    </li>
  );
}

type InvoiceDetailsProps = {
  invoice: InvoiceType;
};

function InvoiceDetailsSm({ invoice }: InvoiceDetailsProps) {
  return (
    <dl className="relative md:hidden">
      <dt className="sr-only">invoice id</dt>
      <dd>{invoice.id}</dd>
      <dt className="sr-only">due date</dt>
      <dd>{invoice.dueDate.toString()}</dd>
      <dt className="sr-only">name</dt>
      <dd>{invoice.name}</dd>
      <dt className="sr-only">amount</dt>
      <dd>£{invoice.amount.toFixed(2)}</dd>
      <dt className="sr-only">status</dt>
      <dd>{invoice.status}</dd>
      <span>sm</span>
    </dl>
  );
}

function InvoiceDetailsLg({ invoice }: InvoiceDetailsProps) {
  return (
    <dl className="relative hidden md:display-revert">
      <dt className="sr-only">invoice id</dt>
      <dd>{invoice.id}</dd>
      <dt className="sr-only">due date</dt>
      <dd>{invoice.dueDate.toString()}</dd>
      <dt className="sr-only">name</dt>
      <dd>{invoice.name}</dd>
      <dt className="sr-only">amount</dt>
      <dd>£{invoice.amount.toFixed(2)}</dd>
      <dt className="sr-only">status</dt>
      <dd>{invoice.status}</dd>
      <span>lg</span>
    </dl>
  );
}
