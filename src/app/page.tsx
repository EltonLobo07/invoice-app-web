import { ProtectedPageMessage } from "@/components/general";
import {
  Header,
  Invoices,
  NoInvoiceMessage,
  NoPageMessage,
} from "@/components/home";
import { NUM_INVOICES_PER_PAGE } from "@/constants/home";
import { getInvoicesQuery } from "@/database-queries/home";
import { SearchParamsSchema } from "@/schemas/home";
import { getUser } from "@/server-helpers";
import { classJoin } from "@/utils/general";
import { cookies } from "next/headers";
import * as v from "valibot";

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

  const selectedInvoicesQuery = getInvoicesQuery(
    pageNum,
    NUM_INVOICES_PER_PAGE,
    selectedStatuses
  );
  const invoices = (await selectedInvoicesQuery.execute()).map((invoice) => ({
    ...invoice,
    amount: Number(Number(invoice.amount).toFixed(2)),
  }));

  const lastPageNum =
    invoices.length > 0 ? getLastPageNum(pageNum, invoices[0].total) : 0;

  const newInvoiceLinkText = { default: "New", md: "New Invoice" };

  let invoicesJSX: React.ReactNode = null;
  if (invoices.length === 0) {
    const curPageDoesNotExists = pageNum > lastPageNum && pageNum > 1;
    invoicesJSX = curPageDoesNotExists ? (
      <NoPageMessage />
    ) : (
      <NoInvoiceMessage newInvoiceLinkText={newInvoiceLinkText} />
    );
  } else {
    invoicesJSX = <Invoices invoices={invoices} />;
  }

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
        paginationLinksData={getPaginationLinksData(
          invoices.length === 0,
          pageNum,
          lastPageNum
        )}
      />
      {invoicesJSX}
    </div>
  );
}

function getPaginationLinksData(
  noDataPresent: boolean,
  pageNum: number,
  lastPageNum: number
): Record<"prevPageNum" | "nextPageNum", number | null> {
  return {
    prevPageNum: noDataPresent || pageNum < 2 ? null : pageNum - 1,
    nextPageNum: noDataPresent || pageNum === lastPageNum ? null : pageNum + 1,
  };
}

function getLastPageNum(pageNum: number, totalInvoices: number) {
  return (
    pageNum +
    Math.ceil(
      (totalInvoices - pageNum * NUM_INVOICES_PER_PAGE) / NUM_INVOICES_PER_PAGE
    )
  );
}
