import type { ResponsiveTextType } from "@/types/home";

export function getNumInvoiceStr(numInvoices: number): ResponsiveTextType {
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
