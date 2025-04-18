import { CREATE_INVOICE_SEARCH_PARAM } from "@/constants/home";
import { InvoiceFormDialog } from "../general";

type Props = {
  jwt: string;
};

export function CreateInvoiceDialog(props: Props) {
  return (
    <InvoiceFormDialog
      type="create"
      jwt={props.jwt}
      onCloseDeleteSearchParam={CREATE_INVOICE_SEARCH_PARAM}
    />
  );
}
