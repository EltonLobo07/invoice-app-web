"use client";

import { ProtectedPageMessage } from "@/components/general";
import { Header, Invoices } from "@/components/home";
import { INVOICE_STATUSES, STATUSES_SEARCH_PARAM } from "@/constants/home";
import { useStoreContext } from "@/providers/StoreProvider";
import type { Invoice, InvoiceStatus } from "@/types/home";
import { classJoin } from "@/utils/general";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const user = useStoreContext((s) => s.user);

  if (user === null) {
    return <ProtectedPageMessage />;
  }

  const selectedStatuses =
    searchParams
      .get(STATUSES_SEARCH_PARAM)
      ?.split(",")
      .filter(isInvoiceStatus) ?? [];
  const selectedStatusesSt = new Set(selectedStatuses);
  const invoices = INVOICES.filter(
    ({ status }) =>
      selectedStatusesSt.size === 0 || selectedStatusesSt.has(status)
  );

  const newInvoiceLinkText = { default: "New", md: "New Invoice" };

  return (
    <div
      className={classJoin(
        "h-full overflow-y-scroll",
        "isolate",
        "px-app",
        "flex flex-col",
        "bg-inherit"
      )}
    >
      <Header
        numInvoices={invoices.length}
        selectedStatuses={selectedStatuses}
        newInvoiceLinkText={newInvoiceLinkText}
      />
      <Invoices invoices={invoices} newInvoiceLinkText={newInvoiceLinkText} />
    </div>
  );
}

const invoiceStatuesSt = new Set<string>(INVOICE_STATUSES);
function isInvoiceStatus(status: string): status is InvoiceStatus {
  return invoiceStatuesSt.has(status);
}

const INVOICES: Invoice[] = [
  {
    id: "RT3080",
    dueDate: new Date("2021-08-19"),
    name: "Jensen Huang",
    amount: 1800.9,
    status: "paid",
  },
  {
    id: "XM9141",
    dueDate: new Date("2021-09-20"),
    name: "Alex Grim",
    amount: 556,
    status: "pending",
  },
  {
    id: "RG0314",
    dueDate: new Date("2021-10-01"),
    name: "John Morrison",
    amount: 14002.33,
    status: "paid",
  },
  {
    id: "RT2080",
    dueDate: new Date("2021-10-12"),
    name: "Alysa Werner",
    amount: 102.04,
    status: "pending",
  },
  {
    id: "AA1449",
    dueDate: new Date("2021-10-14"),
    name: "Melisha Clarke",
    amount: 4032.33,
    status: "pending",
  },
  {
    id: "TY9141",
    dueDate: new Date("2021-10-31"),
    name: "Thomas Wayne",
    amount: 6155.91,
    status: "pending",
  },
  {
    id: "FV2353",
    dueDate: new Date("2021-11-12"),
    name: "Anita Wainwright",
    amount: 3102.04,
    status: "draft",
  },
];
