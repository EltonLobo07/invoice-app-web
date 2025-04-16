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
      items.quantity,
      to_address.street AS to_street,
      to_address.post_code AS to_post_code,
      to_address.city AS to_city,
      to_address.country AS to_country,
      from_address.street AS from_street,
      from_address.post_code AS from_post_code,
      from_address.city AS from_city,
      from_address.country AS from_country
    FROM
      (
        SELECT 
          invoices.id,
          invoices.status,
          invoices.project_description,
          invoices.created_at,
          invoices.payment_term,
          invoices.client_name,
          invoices.client_email
        FROM 
          invoices
        WHERE 
          invoices.id = <ID_VAR>
      ) AS invoices
    JOIN
      items
        ON items.invoice_id = invoices.id
    JOIN 
      (
        SELECT 
          invoice_addresses.street,
          invoice_addresses.post_code,
          invoice_addresses.city,
          invoice_addresses.country,
          invoice_addresses.invoice_id
        FROM 
          invoice_addresses
        WHERE 
          invoice_addresses.invoice_id = <ID_VAR> AND invoice_addresses.type = 'to'
      ) AS to_address
        ON to_address.invoice_id = invoices.id
    JOIN 
      (
        SELECT 
          invoice_addresses.street,
          invoice_addresses.post_code,
          invoice_addresses.city,
          invoice_addresses.country,
          invoice_addresses.invoice_id
        FROM 
          invoice_addresses
        WHERE 
          invoice_addresses.invoice_id = <ID_VAR> AND invoice_addresses.type = 'from'
      ) AS from_address
        ON from_address.invoice_id = invoices.id;
  */

  const invoices = await db
    .selectFrom(
      db
        .selectFrom("invoices")
        .select([
          "invoices.id",
          "invoices.status",
          "invoices.projectDescription",
          "invoices.createdAt",
          "invoices.paymentTerm",
          "invoices.clientName",
          "invoices.clientEmail",
        ])
        .where("invoices.id", "=", id)
        .as("invoices")
    )
    .innerJoin("items", "invoices.id", "items.invoiceId")
    .innerJoin(
      db
        .selectFrom("invoiceAddresses")
        .select([
          "invoiceAddresses.street",
          "invoiceAddresses.postCode",
          "invoiceAddresses.city",
          "invoiceAddresses.country",
          "invoiceAddresses.invoiceId",
        ])
        .where((eb) =>
          eb.and([
            eb("invoiceAddresses.invoiceId", "=", id),
            eb("invoiceAddresses.type", "=", "to"),
          ])
        )
        .as("toAddress"),
      "invoices.id",
      "toAddress.invoiceId"
    )
    .innerJoin(
      db
        .selectFrom("invoiceAddresses")
        .select([
          "invoiceAddresses.street",
          "invoiceAddresses.postCode",
          "invoiceAddresses.city",
          "invoiceAddresses.country",
          "invoiceAddresses.invoiceId",
        ])
        .where((eb) =>
          eb.and([
            eb("invoiceAddresses.invoiceId", "=", id),
            eb("invoiceAddresses.type", "=", "from"),
          ])
        )
        .as("fromAddress"),
      "invoices.id",
      "fromAddress.invoiceId"
    )
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
      "toAddress.street as toStreet",
      "toAddress.postCode as toPostCode",
      "toAddress.city as toCity",
      "toAddress.country as toCountry",
      "fromAddress.street as fromStreet",
      "fromAddress.postCode as fromPostCode",
      "fromAddress.city as fromCity",
      "fromAddress.country as fromCountry",
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
    id: invoice.id,
    status: invoice.status,
    projectDescription: invoice.projectDescription,
    createdAt: invoice.createdAt,
    paymentTerm: invoice.paymentTerm,
    clientName: invoice.clientName,
    clientEmail: invoice.clientEmail,
    toAddress: {
      street: invoice.toStreet,
      postCode: invoice.toPostCode,
      city: invoice.toCity,
      country: invoice.toCountry,
    },
    fromAddress: {
      street: invoice.fromStreet,
      postCode: invoice.fromPostCode,
      city: invoice.fromCity,
      country: invoice.fromCountry,
    },
    items: invoices.map(({ itemId, name, price, quantity }) => ({
      id: itemId,
      name,
      // todo: converting to number is not safe, fix it
      price: Number(price),
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

type InvoiceAddress = {
  street: string;
  postCode: string;
  city: string;
  country: string;
};

type InsertInvoiceParams = [
  invoice: {
    id: string;
    paymentTerm: number;
    clientName: string;
    clientEmail: string;
    projectDescription?: string;
    createdAt: string;
    items: {
      name: string;
      price: number;
      quantity: number;
    }[];
    billFrom: InvoiceAddress;
    billTo: InvoiceAddress;
  },
  saveAsDraft: boolean
];

export async function insertInvoice(...params: InsertInvoiceParams) {
  const [invoice, saveAsDraft] = params;

  return db.transaction().execute(async (trx) => {
    /*
      INSERT INTO
        invoices (
          id,
          payment_term,
          client_name,
          client_email,
          project_description,
          created_at,
          status
        ) VALUES (
          <ID>,
          <PAYMENT_TERM>,
          <CLIENT_NAME>,
          <CLIENT_EMAIL>,
          <PROJECT_DESCRIPTION>,
          <CREATED_AT>,
          'pending'
        ) RETURNING id;
    */
    const { id: invoiceId } = await trx
      .insertInto("invoices")
      .values({
        id: invoice.id,
        paymentTerm: invoice.paymentTerm,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail,
        projectDescription: invoice.projectDescription,
        createdAt: invoice.createdAt,
        status: saveAsDraft ? "draft" : "pending",
      })
      .returning("id")
      .executeTakeFirstOrThrow();

    /*
      INSERT INTO
        items (
          name,
          price,
          quantity,
          invoice_id
        ) VALUES 
          (<NAME_1>, <QUANTITY_1>, <PRICE_1>, <INVOICE_ID>),
          (<NAME_2>, <QUANTITY_2>, <PRICE_2>, <INVOICE_ID>),
          (<NAME_3>, <QUANTITY_3>, <PRICE_3>, <INVOICE_ID>);
    */
    await trx
      .insertInto("items")
      .values(
        invoice.items.map((item) => ({
          invoiceId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }))
      )
      .execute();

    /*
      INSERT INTO
        invoice_addresses (
          street,
          post_code,
          city,
          country,
          type,
          invoice_id
        ) VALUES 
          (<STREET_1>, <POST_CODE_1>, <CITY_1>, <COUNTRY_1>, 'from', <INVOICE_ID>),
          (<STREET_2>, <POST_CODE_2>, <CITY_2>, <COUNTRY_2>, 'to', <INVOICE_ID>);
    */
    await trx
      .insertInto("invoiceAddresses")
      .values([
        {
          invoiceId,
          street: invoice.billFrom.street,
          postCode: invoice.billFrom.postCode,
          city: invoice.billFrom.city,
          country: invoice.billFrom.country,
          type: "from",
        },
        {
          invoiceId,
          street: invoice.billTo.street,
          postCode: invoice.billTo.postCode,
          city: invoice.billTo.city,
          country: invoice.billTo.country,
          type: "to",
        },
      ])
      .execute();
  });
}
