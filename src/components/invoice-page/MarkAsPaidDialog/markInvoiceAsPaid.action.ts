"use server";

import type { FormState } from "@/utils/form";
import * as v from "valibot";
import { GENERIC_ERROR_MESSAGE } from "@/constants/general";
import { revalidatePath } from "next/cache";
import { markInvoiceAsPaid as markInvoiceAsPaidService } from "@/services/invoices";

const MarkInvoiceAsPaidSchema = v.object({
  invoiceId: v.pipe(v.string(), v.trim()),
});

export async function markInvoiceAsPaid(
  state: FormState<string>,
  formData: FormData
): Promise<FormState<string>> {
  const result = v.safeParse(
    MarkInvoiceAsPaidSchema,
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
    await markInvoiceAsPaidService(invoiceId);
    revalidatePath("/");
    return {
      type: "success",
      message: `Invoice #${invoiceId} was marked as "Paid" successfully`,
      data: invoiceId,
    };
  } catch (error) {
    console.error(error);
    return { type: "error", message: GENERIC_ERROR_MESSAGE };
  }
}
