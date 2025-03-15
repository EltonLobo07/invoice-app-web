import { INVOICE_STATUSES } from "@/constants/home";

export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export type Invoice = {
  id: string;
  dueDate: Date;
  name: string;
  amount: number;
  status: InvoiceStatus;
};

export type ResponsiveTextType = Record<"default" | "md", string>;
