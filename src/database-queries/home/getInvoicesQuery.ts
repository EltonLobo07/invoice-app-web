import type { InvoiceStatus } from "@/types/home";
import { db } from "@/db";
import { sql } from "kysely";

export function getInvoicesQuery(
  pageNum: number,
  numInvoicesPerPage: number,
  selectedStatuses: readonly InvoiceStatus[]
) {
  const allInvoiceQuery = db
    .selectFrom("invoices")
    .select([
      "id",
      "dueDate",
      "to",
      "amount",
      "status",
      sql<number>`count(*) over ()`.as("total"),
    ])
    .limit(numInvoicesPerPage);

  let selectedInvoicesQuery = allInvoiceQuery.offset(
    (pageNum - 1) * numInvoicesPerPage
  );
  if (selectedStatuses.length > 0) {
    selectedInvoicesQuery = selectedInvoicesQuery.where(
      "status",
      "in",
      selectedStatuses
    );
  }

  return selectedInvoicesQuery;
}
