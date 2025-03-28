"use server";

import type { FormState } from "@/utils/form";
import * as v from "valibot";
import { GENERIC_ERROR_MESSAGE } from "@/constants/general";
import { deleteInvoice as deleteInvoiceService } from "@/services/invoices";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const DeleteInvoiceSchema = v.object({
  invoiceId: v.pipe(v.string(), v.trim()),
});

export async function deleteInvoice(
  state: FormState<string>,
  formData: FormData
): Promise<FormState<string>> {
  const result = v.safeParse(
    DeleteInvoiceSchema,
    Object.fromEntries(formData.entries()),
    { abortEarly: true }
  );
  if (!result.success) {
    return {
      type: "error",
      message: "invalid input",
    };
  }
  const { invoiceId } = result.output;
  try {
    await deleteInvoiceService(invoiceId);
    // return {
    //   type: "success",
    //   message: `Invoice #${invoiceId} was deleted successfully`,
    //   data: invoiceId,
    // };
  } catch (error) {
    console.error(error);
    return { type: "error", message: GENERIC_ERROR_MESSAGE };
  }
  revalidatePath("/");
  redirect("/");
}
