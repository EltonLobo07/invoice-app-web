import { PAYMENT_TERMS } from "@/constants/general";
import * as v from "valibot";

const AddressSchema = v.object({
  streetAddress: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
  city: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
  postCode: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
  country: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
});

export const InputInvoiceSchema = v.object({
  billFrom: AddressSchema,
  billTo: v.object({
    ...AddressSchema.entries,
    clientName: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
    clientEmail: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty("can't be empty"),
      v.email("invalid email")
    ),
  }),
  date: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("can't be empty"),
    v.isoDate("invalid date")
  ),
  paymentTerm: v.picklist(PAYMENT_TERMS),
  projectDescription: v.optional(v.pipe(v.string(), v.trim())),
  items: v.pipe(
    v.array(
      v.object({
        id: v.string(),
        name: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
        quantity: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty("can't be empty"),
          v.decimal()
        ),
        price: v.pipe(
          v.string(),
          v.trim(),
          v.nonEmpty("can't be empty"),
          v.decimal()
        ),
      })
    ),
    v.minLength(1, "should contain at least one item")
  ),
});
