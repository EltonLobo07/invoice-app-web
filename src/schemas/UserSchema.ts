import * as v from "valibot";

export const UserSchema = v.object({
  username: v.string(),
});

export type User = v.InferOutput<typeof UserSchema>;
