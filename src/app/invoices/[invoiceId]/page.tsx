import { ProtectedPageMessage } from "@/components/general";
import { ParamsSchema } from "@/schemas/invoice-page";
import { getUser } from "@/server-helpers";
import { getInvoiceById } from "@/services/invoices";
import { classJoin } from "@/utils/general";
import { cookies } from "next/headers";
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
    return <div>no page</div>;
  }

  let output: React.ReactNode = null;
  const invoice = await getInvoiceById(result.output.invoiceId);
  if (invoice === null) {
    output = "no invoice found";
  } else {
    output = JSON.stringify(invoice);
  }

  return (
    <div
      className={classJoin(
        "h-full overflow-y-auto",
        "px-app",
        "bg-inherit",
        "max-w-app mx-auto"
      )}
    >
      {output}
    </div>
  );
}
