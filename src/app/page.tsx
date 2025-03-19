import { ProtectedPageMessage, ResponsiveText } from "@/components/general";
import {
  Header,
  InitialPageLink,
  Invoices,
  NoInvoiceMessage,
} from "@/components/home";
import {
  INVOICE_STATUSES,
  NUM_INVOICES_PER_PAGE,
  PAGE_NUM_SEARCH_PARAM,
  STATUSES_SEARCH_PARAM,
} from "@/constants/home";
import { db } from "@/db";
import { getUser } from "@/server-helpers";
import { InvoiceStatus } from "@/types/home";
import { classJoin } from "@/utils/general";
import { sql } from "kysely";
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
  [PAGE_NUM_SEARCH_PARAM]: v.optional(
    v.pipe(
      v.fallback(v.string(), "1"),
      v.transform((v) => {
        const res = Number(v);
        return Number.isFinite(res) ? res : 1;
      }),
      v.toMinValue(1)
    ),
    "1"
  ),
});

const allInvoiceQuery = db
  .selectFrom("invoices")
  .select([
    "id",
    "dueDate",
    "to",
    "amount",
    "status",
    sql<number>`count(*) over ()`.as("total"),
  ])
  .limit(NUM_INVOICES_PER_PAGE);

type Props = {
  searchParams?: Promise<Record<string, string>>;
};

export default async function Home(props: Props) {
  const user = await getUser(await cookies());
  if (user === null) {
    return <ProtectedPageMessage />;
  }

  const { statuses: selectedStatuses, pageNum } = v.parse(
    SearchParamsSchema,
    await props.searchParams
  );
  let selectedInvoicesQuery = allInvoiceQuery.offset(
    (pageNum - 1) * NUM_INVOICES_PER_PAGE
  );
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
  const lastPageNum =
    invoices.length > 0
      ? pageNum +
        Math.ceil(
          (invoices[0].total - pageNum * NUM_INVOICES_PER_PAGE) /
            NUM_INVOICES_PER_PAGE
        )
      : 0;
  const curPageDoesNotExists = pageNum > lastPageNum && pageNum > 1;

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
        initialSelectedStatuses={selectedStatuses}
        newInvoiceLinkText={newInvoiceLinkText}
        paginationLinksData={{
          prevPageNum: curPageDoesNotExists || pageNum < 2 ? null : pageNum - 1,
          nextPageNum:
            curPageDoesNotExists || pageNum === lastPageNum
              ? null
              : pageNum + 1,
        }}
      />
      {invoices.length === 0 ? (
        <NoInvoiceMessage
          {...newInvoiceLinkText}
          description={
            curPageDoesNotExists ? (
              <InitialPageLink />
            ) : (
              <span className="inline-block max-w-[13rem]">
                Create a new invoice by clicking the{" "}
                <strong>
                  <ResponsiveText {...newInvoiceLinkText} />
                </strong>{" "}
                button and get started
              </span>
            )
          }
        />
      ) : (
        <Invoices invoices={invoices} />
      )}
    </div>
  );
}

const invoiceStatuesSt = new Set<string>(INVOICE_STATUSES);
function isInvoiceStatus(status: string): status is InvoiceStatus {
  return invoiceStatuesSt.has(status);
}
