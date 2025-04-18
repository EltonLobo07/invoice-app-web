import { ProtectedPageMessage } from "@/components/general";
import {
  CreateInvoiceDialog,
  Header,
  Invoices,
  NoInvoiceMessage,
  NoPageMessage,
} from "@/components/home";
import { NUM_INVOICES_PER_PAGE } from "@/constants/home";
import { SearchParamsSchema } from "@/schemas/home";
import { getJwt, getUser } from "@/server-helpers";
import { classJoin } from "@/utils/general";
import { cookies } from "next/headers";
import * as v from "valibot";
import { getInvoiceList } from "@/services/invoices";
import type { NextParamsProp } from "@/types/general";

type Props = {
  searchParams?: NextParamsProp;
};

export default async function Home(props: Props) {
  const jwt = await getJwt(await cookies());
  if (jwt === null || (await getUser(jwt)) === null) {
    return <ProtectedPageMessage />;
  }

  const {
    statuses: selectedStatuses,
    pageNum,
    createInvoice,
  } = v.parse(SearchParamsSchema, await props.searchParams);

  const invoices = await getInvoiceList(
    pageNum,
    NUM_INVOICES_PER_PAGE,
    selectedStatuses
  );

  let totalInvoices = 0;
  let lastPageNum = 0;
  if (invoices.length > 0) {
    totalInvoices = invoices[0].totalInvoices;
    lastPageNum = getLastPageNum(pageNum, totalInvoices);
  }

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
        numInvoices={totalInvoices}
        initialSelectedStatuses={selectedStatuses}
        newInvoiceLinkText={newInvoiceLinkText}
        paginationLinksData={getPaginationLinksData(
          invoices.length === 0,
          pageNum,
          lastPageNum
        )}
      />
      {invoicesJSX}
      {createInvoice && <CreateInvoiceDialog jwt={jwt} />}
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
