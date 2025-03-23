import type { InvoiceStatus } from "@/types/home";
import { db } from "@/db";
import { sql } from "kysely";

export function getInvoicesQuery(
  pageNum: number,
  numInvoicesPerPage: number,
  selectedStatuses: readonly InvoiceStatus[]
) {
  /*
    SELECT 
      invoices.id,
      invoices.created_at,
      invoices.payment_term,
      invoices.client_name,
      invoices.status,
      SUM(items.price * items.quantity) AS amount,
      COUNT(*) OVER() AS total_invoices
    FROM
      invoices
    JOIN 
      items
        ON items.invoice_id = invoices.id
    GROUP BY
      invoices.id,
      invoices.created_at,
      invoices.payment_term,
      invoices.client_name,
      invoices.status
    ORDER BY 
      invoices.created_at, 
      invoices.id
    LIMIT
      <NUM_INVOICES_PER_PAGE_VAR>
    OFFSET
      <CALCULATED_OFFSET_VAR>;
  */
  let invoicesDataSrc = db.selectFrom("invoices");
  if (selectedStatuses.length > 0) {
    invoicesDataSrc = invoicesDataSrc.where("status", "in", selectedStatuses);
  }

  return invoicesDataSrc
    .select((eb) => [
      "invoices.id",
      "invoices.createdAt",
      "invoices.paymentTerm",
      "invoices.clientName",
      "invoices.status",
      eb.fn.sum(sql`items.price * items.quantity`).as("amount"),
      eb.fn.countAll().over().as("totalInvoices"),
    ])
    .innerJoin("items", "items.invoiceId", "invoices.id")
    .groupBy([
      "invoices.id",
      "invoices.createdAt",
      "invoices.paymentTerm",
      "invoices.clientName",
      "invoices.status",
    ])
    .orderBy("invoices.clientEmail desc")
    .orderBy("invoices.id")
    .limit(numInvoicesPerPage)
    .offset((pageNum - 1) * numInvoicesPerPage);
}
