import * as v from "valibot";

export const ParamsSchema = v.object({
  invoiceId: v.pipe(v.string(), v.trim()),
});
