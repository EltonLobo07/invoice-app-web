import * as v from "valibot";

export const UserSchema = v.object({
  username: v.string(),
  id: v.number(),
});

export type User = v.InferOutput<typeof UserSchema>;
