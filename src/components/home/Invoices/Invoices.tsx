import type { Invoice as InvoiceType, ResponsiveTextType } from "@/types/home";
import { NoInvoiceMessage } from "./NoInvoiceMessage";
import { Invoice } from "./Invoice";
import { classJoin } from "@/utils/general";

type Props = {
  invoices: InvoiceType[];
  newInvoiceLinkText: ResponsiveTextType;
};

export function Invoices(props: Props) {
  if (props.invoices.length === 0) {
    return <NoInvoiceMessage newInvoiceLinkText={props.newInvoiceLinkText} />;
  }

  return (
    <div className="pb-2">
      <ol
        className={classJoin(
          "flex flex-col gap-y-4",
          "max-w-app mx-auto w-full"
        )}
      >
        {props.invoices.map((invoice, idx) => (
          <Invoice key={invoice.id} invoice={invoice} isFirst={idx === 0} />
        ))}
      </ol>
    </div>
  );
}
