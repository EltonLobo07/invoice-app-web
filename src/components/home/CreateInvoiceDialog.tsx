import { CREATE_INVOICE_SEARCH_PARAM } from "@/constants/home";
import { InvoiceFormDialog } from "../general";

export function CreateInvoiceDialog() {
  return (
    <InvoiceFormDialog
      type="create"
      onCloseDeleteSearchParam={CREATE_INVOICE_SEARCH_PARAM}
    />
  );
}
