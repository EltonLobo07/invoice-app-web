import { PAYMENT_TERMS } from "@/constants/general";
import * as v from "valibot";

const AddressSchema = v.object({
  streetAddress: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
  city: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
  postCode: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
  country: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
});

export const ItemPriceSchema = v.pipe(
  v.string(),
  v.trim(),
  v.nonEmpty("can't be empty"),
  v.transform(Number),
  v.number("invalid"),
  v.gtValue(0, "invalid"),
  v.transform(String)
);

export const ItemQuantitySchema = v.pipe(
  v.string(),
  v.trim(),
  v.nonEmpty("can't be empty"),
  v.transform(Number),
  v.integer("invalid"),
  v.minValue(1, "invalid"),
  v.transform(String)
);

const ItemSchema = v.object({
  id: v.string(),
  name: v.pipe(v.string(), v.trim(), v.nonEmpty("can't be empty")),
  quantity: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("can't be empty"),
    v.transform(Number),
    v.integer("invalid"),
    v.minValue(1, "invalid"),
    v.transform(String)
  ),
  price: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("can't be empty"),
    v.transform(Number),
    v.number("invalid"),
    v.gtValue(0, "invalid"),
    v.transform(String)
  ),
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
  items: v.tupleWithRest([ItemSchema], ItemSchema),
});
