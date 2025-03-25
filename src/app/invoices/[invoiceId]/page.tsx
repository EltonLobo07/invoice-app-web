import { InvoiceStatusDD, ProtectedPageMessage } from "@/components/general";
import { ArrowDown } from "@/icons";
import { ParamsSchema } from "@/schemas/invoice-page";
import { getUser } from "@/server-helpers";
import { getInvoiceById } from "@/services/invoices";
import { classJoin } from "@/utils/general";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as v from "valibot";

type Props = {
  params?: Promise<Record<string, string>>;
};

export default async function Page(props: Props) {
  const user = await getUser(await cookies());
  if (user === null) {
    return <ProtectedPageMessage />;
  }

  const params = await props.params;
  const result = v.safeParse(ParamsSchema, params);
  if (!result.success || result.output.invoiceId === "") {
    notFound();
  }

  const invoice = await getInvoiceById(result.output.invoiceId);
  if (invoice === null) {
    notFound();
  }

  return (
    <div
      className={classJoin(
        // "px-app",
        "bg-inherit",
        "h-full overflow-y-auto",
        "isolate",
        "flex flex-col items-center"
      )}
    >
      <header
        className={classJoin(
          "w-full px-app",
          "max-w-app",
          "sticky top-0 bg-inherit",
          "pt-[2.0625rem] md:pt-[3.0625rem] lg:pt-[4.0625rem]",
          "z-10"
        )}
      >
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
            <ActionsWithHeading />
          </section>
        </div>
      </header>
      <section
        className={classJoin("max-w-app", "w-full px-app", "relative", "grow")}
      >
        <h3 className="sr-only">invoice details</h3>
        <div>todo: display invoice information</div>
      </section>
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
        <ActionsWithHeading />
      </section>
    </div>
  );
}

function ActionsWithHeading() {
  return (
    <div className="flex gap-x-1 gap-y-2 items-center justify-center flex-wrap">
      <h3 className="sr-only">available actions</h3>
      <Link
        href="/"
        className={classJoin(
          "bg-[#F9FAFE] hover:bg-ds-5 dark:bg-ds-4 hover:dark:bg-white",
          "text-ds-7",
          "typography-heading-s-var",
          "pt-[1.125rem] pb-[0.9375rem] px-6",
          "rounded-3xl"
        )}
      >
        Edit
      </Link>
      <button
        type="button"
        className={classJoin(
          "bg-ds-9 hover:bg-ds-10",
          "text-white",
          "typography-heading-s-var",
          "pt-[1.125rem] pb-[0.9375rem] px-6",
          "rounded-3xl"
        )}
      >
        Delete
      </button>
      <form>
        <button
          type="submit"
          className={classJoin(
            "bg-ds-1 hover:bg-ds-2",
            "text-white",
            "typography-heading-s-var",
            "pt-[1.125rem] pb-[0.9375rem] px-6",
            "rounded-3xl",
            "whitespace-nowrap"
          )}
        >
          Mark as Paid
        </button>
      </form>
    </div>
  );
}
