"use server";

import { isSchemaParseSuccessful, type FormAction } from "@/utils/form";
import { InputInvoiceSchema } from "./schemas";
import * as v from "valibot";

const DataSchema = v.intersect([
  v.object({
    input: InputInvoiceSchema,
  }),
  v.variant("intent", [
    v.object({ intent: v.literal("edit"), invoiceId: v.string() }),
    v.object({
      intent: v.union([v.literal("save"), v.literal("save-as-draft")]),
      invoiceId: v.optional(v.undefined()),
    }),
  ]),
]);

export const InvoiceFormAction: FormAction<
  typeof InputInvoiceSchema,
  unknown,
  unknown,
  [],
  v.InferInput<typeof DataSchema>
> = async (_formState, data) => {
  // redundant check needed (untrusted senders)
  if (!isSchemaParseSuccessful(DataSchema, data)) {
    return {
      type: "error",
      message: "invalid input",
    };
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(data);
  // todo: implement
  return {};
};
