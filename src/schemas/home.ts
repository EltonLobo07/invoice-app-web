import {
  CREATE_INVOICE_SEARCH_PARAM,
  INVOICE_STATUSES,
  PAGE_NUM_SEARCH_PARAM,
  STATUSES_SEARCH_PARAM,
} from "@/constants/home";
import { InvoiceStatus } from "@/types/home";
import * as v from "valibot";
import { BoolSearchParamSchema } from "./general";

export const SearchParamsSchema = v.object({
  [STATUSES_SEARCH_PARAM]: v.optional(
    v.pipe(
      v.fallback(v.string(), ""),
      v.transform((s) => s.split(",")),
      v.filterItems(isInvoiceStatus),
      v.custom<InvoiceStatus[]>(() => true)
    ),
    ""
  ),
  [PAGE_NUM_SEARCH_PARAM]: v.optional(
    v.pipe(
      v.fallback(v.string(), "1"),
      v.transform((v) => {
        const res = Number(v);
        return Number.isFinite(res) ? res : 1;
      }),
      v.toMinValue(1)
    ),
    "1"
  ),
  [CREATE_INVOICE_SEARCH_PARAM]: BoolSearchParamSchema,
});

const invoiceStatuesSt = new Set<string>(INVOICE_STATUSES);
function isInvoiceStatus(status: string): status is InvoiceStatus {
  return invoiceStatuesSt.has(status);
}
