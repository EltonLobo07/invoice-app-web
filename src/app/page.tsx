import { ProtectedPageMessage } from "@/components/general";
import { Header, Invoices } from "@/components/home";
import { INVOICE_STATUSES, STATUSES_SEARCH_PARAM } from "@/constants/home";
import { db } from "@/db";
import { getUser } from "@/server-helpers";
import { InvoiceStatus } from "@/types/home";
import { classJoin } from "@/utils/general";
import { cookies } from "next/headers";
import * as v from "valibot";

const SearchParamsSchema = v.object({
  [STATUSES_SEARCH_PARAM]: v.optional(
    v.pipe(
      v.fallback(v.string(), ""),
      v.transform((s) => s.split(",")),
      v.filterItems(isInvoiceStatus),
      v.custom<InvoiceStatus[]>(() => true)
    ),
    ""
  ),
});

const allInvoiceQuery = db
  .selectFrom("invoices")
  .select(["id", "dueDate", "to", "amount", "status"]);

type Props = {
  searchParams?: Promise<Record<string, string>>;
};

export default async function Home(props: Props) {
  const user = await getUser(await cookies());
  if (user === null) {
    return <ProtectedPageMessage />;
  }

  const { statuses: selectedStatuses } = v.parse(
    SearchParamsSchema,
    await props.searchParams
  );
  let selectedInvoicesQuery = allInvoiceQuery;
  if (selectedStatuses.length > 0) {
    selectedInvoicesQuery = selectedInvoicesQuery.where(
      "status",
      "in",
      selectedStatuses
    );
  }
  const invoices = (await selectedInvoicesQuery.execute()).map((invoice) => ({
    ...invoice,
    amount: Number(Number(invoice.amount).toFixed(2)),
  }));

  const newInvoiceLinkText = { default: "New", md: "New Invoice" };

  return (
    <div
      className={classJoin(
        "h-full overflow-y-scroll",
        "isolate",
        "px-app",
        "flex flex-col",
        "bg-inherit"
      )}
    >
      <Header
        numInvoices={invoices.length}
        selectedStatuses={selectedStatuses}
        newInvoiceLinkText={newInvoiceLinkText}
      />
      <Invoices invoices={invoices} newInvoiceLinkText={newInvoiceLinkText} />
    </div>
  );
}

const invoiceStatuesSt = new Set<string>(INVOICE_STATUSES);
function isInvoiceStatus(status: string): status is InvoiceStatus {
  return invoiceStatuesSt.has(status);
}
