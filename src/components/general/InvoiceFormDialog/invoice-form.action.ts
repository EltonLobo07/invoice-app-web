"use server";

import { isSchemaParseSuccessful, type FormAction } from "@/utils/form";
import { InputInvoiceSchema } from "./schemas";
import * as v from "valibot";
import { insertInvoice } from "@/services/invoices";
import { GENERIC_ERROR_MESSAGE } from "@/constants/general";

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
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const { input } = data;
  try {
    if (data.intent !== "edit") {
      await insertInvoice(
        {
          id: generateInvoiceId(),
          paymentTerm: Number(input.paymentTerm),
          projectDescription: input.projectDescription,
          clientEmail: input.billTo.clientEmail,
          clientName: input.billTo.clientName,
          createdAt: input.date,
          billFrom: { ...input.billFrom, street: input.billFrom.streetAddress },
          billTo: { ...input.billTo, street: input.billTo.streetAddress },
          items: input.items.map((item) => ({
            ...item,
            price: Number(item.price),
            quantity: Number(item.quantity),
          })),
        },
        data.intent === "save-as-draft"
      );
      return { type: "success", message: "Invoice was created", data: {} };
    }
    return {};
  } catch (error) {
    console.error(error);
    return { type: "error", message: GENERIC_ERROR_MESSAGE };
  }
};

function generateRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

function generateRandomEngLetter() {
  return String.fromCodePoint(
    generateRandomNum("A".codePointAt(0)!, "Z".codePointAt(0)!)
  );
}

function generateRandomDigit() {
  return generateRandomNum(0, 9);
}

function generateInvoiceId() {
  return [
    generateRandomEngLetter(),
    generateRandomEngLetter(),
    generateRandomDigit(),
    generateRandomDigit(),
    generateRandomDigit(),
    generateRandomDigit(),
  ].join("");
}
