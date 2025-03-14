"use client";

import { ProtectedPageMessage, ResponsiveText } from "@/components/general";
import { CreateInvoiceLink, InvoiceStatusSelect } from "@/components/home";
import { useStoreContext } from "@/providers/StoreProvider";
import { classJoin } from "@/utils/general";

export default function Home() {
  const user = useStoreContext((s) => s.user);

  if (user === null) {
    return <ProtectedPageMessage />;
  }

  return (
    <div
      className={classJoin(
        "max-w-app mx-auto h-full",
        "pt-32px md:pt-56px lg:pt-[70px]"
      )}
    >
      <header className="flex items-center gap-x-16px flex-wrap">
        <div
          className={classJoin(
            "flex flex-col gap-y-[0.09375rem] md:gap-y-[0.375rem]",
            // adjust title text's line-height mismatch
            "pt-4px md:pt-[6px]"
          )}
        >
          <h2
            className={classJoin(
              "typography-heading-m md:typography-heading-l",
              "text-ds-8 dark:text-white"
            )}
          >
            Invoices
          </h2>
          <p className={classJoin("text-body", "text-ds-6 dark:text-ds-5")}>
            <ResponsiveText default="No invoices" md="No invoices" />
          </p>
        </div>
        <div
          className={classJoin(
            "ml-auto",
            "flex items-center gap-x-[18px] md:gap-x-40px"
          )}
        >
          <InvoiceStatusSelect />
          <CreateInvoiceLink />
        </div>
      </header>
    </div>
  );
}
