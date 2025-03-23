import type { Selectable } from "kysely";
import type { Invoices } from "kysely-codegen";

type SelectableInvoice = Selectable<Invoices>;

export type InvoiceStatus = SelectableInvoice["status"];

export type Invoice = {
  id: SelectableInvoice["id"];
  dueDate: Date;
  clientName: SelectableInvoice["clientName"];
  amount: number;
  status: InvoiceStatus;
};

export type ResponsiveTextType = Record<"default" | "md", string>;
