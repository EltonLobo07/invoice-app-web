import * as v from "valibot";
import { BoolSearchParamSchema } from "./general";
import { EDIT_INVOICE_SEARCH_PARAM } from "@/constants/invoice-page";

export const ParamsSchema = v.object({
  invoiceId: v.pipe(v.string(), v.trim()),
});

export const SearchParamsSchema = v.object({
  [EDIT_INVOICE_SEARCH_PARAM]: BoolSearchParamSchema,
});
