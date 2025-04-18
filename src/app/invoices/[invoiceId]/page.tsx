import {
  InvoiceFormDialog,
  InvoiceStatusDD,
  ProtectedPageMessage,
} from "@/components/general";
import {
  Dt,
  InvoiceAddress,
  ActionsWithHeading,
  ItemsTable,
} from "@/components/invoice-page";
import { EDIT_INVOICE_SEARCH_PARAM } from "@/constants/invoice-page";
import { ArrowDown } from "@/icons";
import { ParamsSchema, SearchParamsSchema } from "@/schemas/invoice-page";
import { getJwt, getUser } from "@/server-helpers";
import { getInvoiceById } from "@/services/invoices";
import { NextParamsProp, PaymentTerm } from "@/types/general";
import {
  assertMinLengthOne,
  classJoin,
  getMillisecondsFromDays,
  getUIDateString,
} from "@/utils/general";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as v from "valibot";

type Props = {
  params?: NextParamsProp;
  searchParams?: NextParamsProp;
};

export default async function Page(props: Props) {
  const jwt = await getJwt(await cookies());
  const user = await getUser(jwt);
  if (jwt === null || user === null) {
    return <ProtectedPageMessage />;
  }

  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const paramsResult = v.safeParse(ParamsSchema, params);
  if (!paramsResult.success || paramsResult.output.invoiceId === "") {
    notFound();
  }

  const invoice = await getInvoiceById(user.id, paramsResult.output.invoiceId);
  if (invoice === null) {
    notFound();
  }

  const { editInvoice } = v.parse(SearchParamsSchema, searchParams);
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set(EDIT_INVOICE_SEARCH_PARAM, String(true));
  const editInvoiceHref = `/invoices/${
    invoice.id
  }?${newSearchParams.toString()}`;

  const showMarkAsPaid = invoice.status === "pending";

  const headerJSX = (
    <div
      className={classJoin(
        "w-full px-app",
        "max-w-app",
        "sticky top-0 bg-inherit",
        "pt-[2.0625rem] md:pt-[3.0625rem] lg:pt-[4.0625rem]",
        "z-10"
      )}
    >
      <header className="pb-4 md:pb-6">
        <Link
          href="/"
          className={classJoin(
            "flex items-center gap-x-24px",
            "typography-heading-s-var",
            "text-ds-8 hover:text-ds-7 dark:text-white dark:hover:ds-6",
            "mb-[1.9375rem]",
            "w-fit"
          )}
        >
          <ArrowDown className={classJoin("rotate-90", "text-ds-1")} />
          <span>All invoices</span>
        </Link>
        <div
          className={classJoin(
            "bg-white dark:bg-ds-3",
            "shadow-[0px_10px_10px_-10px_#48549F1A]",
            "rounded-lg",
            "px-24px md:px-32px",
            "py-4 md:py-5",
            "flex gap-x-1 items-center justify-between"
          )}
        >
          <dl
            className={classJoin(
              "flex gap-x-20px gap-y-1 items-center justify-between flex-wrap",
              "grow md:grow-0"
            )}
          >
            <dt
              className={classJoin(
                "typography-body-md",
                "text-[#858BB2] dark:text-ds-5",
                // optic centering
                "translate-y-0.5"
              )}
            >
              Status
            </dt>
            <InvoiceStatusDD value={invoice.status} />
          </dl>
          <section className="hidden md:block">
            <ActionsWithHeading
              invoiceId={invoice.id}
              jwt={jwt}
              editInvoiceHref={editInvoiceHref}
              showMarkAsPaid={showMarkAsPaid}
            />
          </section>
        </div>
      </header>
    </div>
  );

  const invoiceDetailsJSX = (
    <section
      className={classJoin(
        "max-w-app",
        "w-full px-app",
        "relative",
        "grow",
        "mb-14"
      )}
    >
      <h3 className="sr-only">invoice details</h3>
      <div
        className={classJoin(
          "bg-white dark:bg-ds-3",
          "shadow-[0px_10px_10px_-10px_#48549F1A]",
          "rounded-lg",
          "px-24px md:px-32px lg:px-48px",
          "py-6 md:py-8 lg:py-12",
          "flex flex-col gap-y-[1.875rem] md:gap-y-5",
          "max-w-full overflow-auto"
        )}
      >
        <dl
          className={classJoin(
            "relative",
            "flex gap-x-3 md:gap-x-6 lg:gap-x-9 gap-y-[1.875rem] flex-wrap justify-between"
          )}
        >
          <div
            className={classJoin(
              "flex flex-col gap-y-[0.4375rem]",
              "grow overflow-hidden"
            )}
          >
            <div>
              <dt className="sr-only">ID</dt>
              <dd className="typography-heading-s-var md:typography-heading-s">
                <span className="text-ds-7 dark:text-ds-6">#</span>
                <span className="text-ds-8 dark:text-white">{invoice.id}</span>
              </dd>
            </div>
            <div className="max-w-full overflow-hidden">
              <dt className="sr-only">project description</dt>
              <dd
                className={classJoin(
                  "text-ds-7 dark:text-ds-5",
                  "typography-body-md",
                  "max-w-full overflow-x-hidden break-words hyphens-auto",
                  "relative"
                )}
              >
                {invoice.projectDescription ? (
                  invoice.projectDescription
                ) : (
                  <>
                    <span aria-hidden={true}>-</span>
                    <span className="sr-only">no project description</span>
                  </>
                )}
              </dd>
            </div>
          </div>
          <dt className="sr-only">Bill from</dt>
          <dd className="grow">
            <InvoiceAddress {...invoice.fromAddress} textAlignRight={true} />
          </dd>
        </dl>
        <dl className="flex gap-x-[3.875rem] gap-y-8 flex-wrap">
          <div className="flex flex-col gap-y-[1.875rem]">
            <div>
              <Dt>Invoice Date</Dt>
              <dd
                className={classJoin(
                  "text-nowrap",
                  "text-ds-8 dark:text-white",
                  "font-bold text-heading-s leading-5 tracking-heading-s"
                )}
              >
                {getUIDateString(invoice.createdAt)}
              </dd>
            </div>
            <div>
              <Dt>Payment Due</Dt>
              <dd
                className={classJoin(
                  "text-nowrap",
                  "text-ds-8 dark:text-white",
                  "font-bold text-heading-s leading-5 tracking-heading-s"
                )}
              >
                {getUIDateString(
                  new Date(
                    invoice.createdAt.getTime() +
                      getMillisecondsFromDays(invoice.paymentTerm)
                  )
                )}
              </dd>
            </div>
          </div>
          <div className="max-w-full overflow-hidden">
            <Dt>Bill To</Dt>
            <dd>
              <span
                className={classJoin(
                  "text-ds-8 dark:text-white",
                  "font-bold text-heading-s leading-5 tracking-heading-s",
                  "inline-block",
                  "mb-[0.4375rem]",
                  "max-w-full overflow-x-hidden break-words hyphens-auto"
                )}
              >
                {invoice.clientName}
              </span>
              <InvoiceAddress {...invoice.toAddress} />
            </dd>
          </div>
          <div className="max-w-full overflow-hidden">
            <Dt>Sent to</Dt>
            <dd
              className={classJoin(
                "text-ds-8 dark:text-white",
                "font-bold text-heading-s leading-5 tracking-heading-s",
                "max-w-full overflow-x-hidden break-words hyphens-auto"
              )}
            >
              {invoice.clientEmail}
            </dd>
          </div>
        </dl>
        {Boolean(invoice.items.length) && <ItemsTable items={invoice.items} />}
      </div>
    </section>
  );

  const stickyActionsJSX = (
    <section
      className={classJoin(
        "max-w-app",
        "w-full px-app",
        "bg-white dark:bg-ds-3",
        "pt-[1.3125rem] pb-[1.375rem]",
        "md:hidden",
        "sticky bottom-0"
      )}
    >
      <ActionsWithHeading
        invoiceId={invoice.id}
        jwt={jwt}
        editInvoiceHref={editInvoiceHref}
        showMarkAsPaid={showMarkAsPaid}
      />
    </section>
  );

  const transformedItems = invoice.items.map((item) => ({
    ...item,
    id: String(item.id),
    price: String(item.price),
    quantity: String(item.quantity),
  }));

  assertMinLengthOne(transformedItems);

  return (
    <div
      className={classJoin(
        "bg-inherit",
        "h-full overflow-y-auto",
        "isolate",
        "flex flex-col items-center"
      )}
    >
      {headerJSX}
      {invoiceDetailsJSX}
      {stickyActionsJSX}
      {editInvoice && (
        <InvoiceFormDialog
          jwt={jwt}
          type="edit"
          onCloseDeleteSearchParam={EDIT_INVOICE_SEARCH_PARAM}
          invoiceId={invoice.id}
          invoice={{
            // todo: get rid of the type assertion
            paymentTerm: String(invoice.paymentTerm) as PaymentTerm,
            projectDescription: invoice.projectDescription ?? undefined,
            billFrom: {
              ...invoice.fromAddress,
              streetAddress: invoice.fromAddress.street,
            },
            billTo: {
              ...invoice.toAddress,
              streetAddress: invoice.toAddress.street,
              clientEmail: invoice.clientEmail,
              clientName: invoice.clientName,
            },
            items: transformedItems,
            date: invoice.createdAt.toISOString().split("T")[0],
          }}
        />
      )}
    </div>
  );
}
