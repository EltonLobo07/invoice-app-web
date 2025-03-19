import type { Invoice as InvoiceType } from "@/types/home";
import { Invoice } from "./Invoice";
import { classJoin } from "@/utils/general";

type Props = {
  invoices: InvoiceType[];
};

export function Invoices(props: Props) {
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
