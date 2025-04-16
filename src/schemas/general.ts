import * as v from "valibot";

export const BoolSearchParamSchema = v.optional(
  v.fallback(
    v.pipe(
      v.string(),
      v.transform((v) => v === "true")
    ),
    false
  ),
  "false"
);
