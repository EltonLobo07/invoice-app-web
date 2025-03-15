import type { Invoice, ResponsiveTextType } from "@/types/home";
import { NoInvoiceMessage } from "./NoInvoiceMessage";

type Props = {
  invoices: Invoice[];
  newInvoiceLinkText: ResponsiveTextType;
};

export function Invoices(props: Props) {
  if (props.invoices.length === 0) {
    return <NoInvoiceMessage newInvoiceLinkText={props.newInvoiceLinkText} />;
  }
  // todo
  return null;
}
