import { ArrowDown } from "@/icons";
import type {
  InvoiceStatus as InvoiceStatusType,
  Invoice as InvoiceType,
} from "@/types/home";
import { classJoin } from "@/utils/general";
import Link from "next/link";

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
        href={`/invoices/${invoice.id}`}
        className={classJoin(
          "absolute top-0 left-0 w-full h-full",
          "hover:outline hover:outline-ds-1",
          "rounded-[inherit]"
        )}
      >
        <span className="sr-only">more details of invoice ID {invoice.id}</span>
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
      {/* `div`s are valid: https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element */}
      <div
        className={classJoin(
          "flex justify-between items-center gap-x-2",
          "mb-6",
          "max-w-full overflow-x-hidden"
        )}
      >
        <InvoiceId value={invoice.id} />
        <InvoiceName value={invoice.name} />
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

function InvoiceDetailsLg({ invoice }: InvoiceDetailsProps) {
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
        <InvoiceName value={invoice.name} />
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

function Dt(props: { children: string }) {
  return <dt className="sr-only">{props.children}</dt>;
}

function InvoiceId(props: { value: string }) {
  return (
    <>
      <Dt>invoice id</Dt>
      <dd className="typography-heading-s-var">
        <span className="text-ds-7">#</span>
        <span className="text-ds-8 dark:text-white">{props.value}</span>
      </dd>
    </>
  );
}

function InvoiceDueDate(props: { value: Date }) {
  const [year, , day] = props.value.toISOString().split("T")[0].split("-");
  const formattedDate = [
    day,
    new Intl.DateTimeFormat("en", { month: "short" }).format(props.value),
    year,
  ].join(" ");

  return (
    <>
      <Dt>due date</Dt>
      <dd
        className={classJoin(
          "relative",
          "text-ds-6 dark:text-ds-5",
          "typography-body-md",
          "whitespace-nowrap"
        )}
      >
        <span aria-hidden={true}>{"Due "}</span>
        <span>{formattedDate}</span>
      </dd>
    </>
  );
}

function InvoiceName(props: { value: string }) {
  return (
    <>
      <Dt>name</Dt>
      <dd
        className={classJoin(
          "text-[#858BB2] dark:text-white",
          "typography-body-md",
          "max-w-full overflow-x-hidden whitespace-nowrap text-ellipsis"
        )}
      >
        {props.value}
      </dd>
    </>
  );
}

function InvoiceAmount(props: { value: number }) {
  const [currency, ...rest] = Number(props.value.toFixed(2)).toLocaleString(
    "en-GB",
    {
      style: "currency",
      currency: "GBP",
    }
  );

  return (
    <>
      <Dt>invoice amount</Dt>
      <dd
        className={classJoin(
          "typography-heading-s",
          "text-ds-8 dark:text-white",
          "whitespace-nowrap max-w-full overflow-x-hidden text-ellipsis"
        )}
      >
        {`${currency} `}
        {rest.join("")}
      </dd>
    </>
  );
}

function InvoiceStatus(props: { value: InvoiceStatusType }) {
  return (
    <>
      <Dt>invoice status</Dt>
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
    </>
  );
}
