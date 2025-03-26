import { ProtectedPageMessage } from "@/components/general";
import { ParamsSchema } from "@/schemas/invoice-page";
import { getUser } from "@/server-helpers";
import { getInvoiceById } from "@/services/invoices";
import { cookies } from "next/headers";
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

  return <div>todo: edit invoice</div>;
}
