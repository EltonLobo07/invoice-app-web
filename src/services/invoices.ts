import { db } from "@/db";
import { sql, type Selectable } from "kysely";
import type { Invoices } from "kysely-codegen";

export function getInvoiceList(
  pageNum: number,
  numInvoicesPerPage: number,
  selectedStatuses: readonly Selectable<Invoices>["status"][]
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
    .offset((pageNum - 1) * numInvoicesPerPage)
    .execute()
    .then((invoices) =>
      invoices.map((invoice) => ({
        ...invoice,
        // todo: converting to number is not safe, fix it
        amount: Number(Number(invoice.amount).toFixed(2)),
        totalInvoices: Number(invoice.totalInvoices),
        dueDate: new Date(invoice.createdAt.getTime() + invoice.paymentTerm),
      }))
    );
}

// todo: improve the query (the transformations should happen in SQL)
export async function getInvoiceById(id: string) {
  /*
    SELECT
      invoices.id,
      invoices.status,
      invoices.project_description,
      invoices.created_at,
      invoices.payment_term,
      invoices.client_name,
      invoices.client_email,
      items.id as item_id,
      items.name,
      items.price,
      items.quantity
    FROM
      invoices
    JOIN 
      items
        ON items.invoice_id = invoices.id
    WHERE
        invoices.id = <ID_VAR;
  */

  const invoices = await db
    .selectFrom("invoices")
    .innerJoin("items", "invoices.id", "items.invoiceId")
    .select([
      "invoices.id",
      "invoices.status",
      "invoices.projectDescription",
      "invoices.createdAt",
      "invoices.paymentTerm",
      "invoices.clientName",
      "invoices.clientEmail",
      "items.id as itemId",
      "items.name",
      "items.price",
      "items.quantity",
    ])
    .where("invoices.id", "=", id)
    .execute();

  if (
    invoices.length === 0 ||
    !invoices.every((invoice) => invoice.id === id)
  ) {
    return null;
  }
  const invoice = invoices[0];
  return {
    ...invoice,
    items: invoices.map(({ itemId, name, price, quantity }) => ({
      itemId,
      name,
      price,
      quantity,
    })),
  };
}

export function deleteInvoice(id: string) {
  /*
    DELETE FROM
      invoices
    WHERE
      invoices.id = <ID_VAR>;
  */
  return db.deleteFrom("invoices").where("id", "=", id).execute();
}

export function markInvoiceAsPaid(id: string) {
  /*
    UPDATE TABLE
      invoices
    SET
      status = "paid"
    WHERE
      invoices.id = <ID_VAR>;
  */
  return db
    .updateTable("invoices")
    .set({ status: "paid" })
    .where("id", "=", id)
    .execute();
}
