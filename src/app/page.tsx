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
  const invoices: Invoice[] = [];

  if (user === null) {
    return <ProtectedPageMessage />;
  }

  const selectedStatuses =
    searchParams
      .get(STATUSES_SEARCH_PARAM)
      ?.split(",")
      .filter(isInvoiceStatus) ?? [];

  const newInvoiceLinkText = { default: "New", md: "New Invoice" };

  return (
    <div
      className={classJoin(
        "max-w-app mx-auto h-full",
        "pt-32px md:pt-56px lg:pt-[70px]",
        "flex flex-col"
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
