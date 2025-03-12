import * as v from "valibot";

export const LoginSchema = v.object({
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("can't be empty"),
    v.email("invalid email")
  ),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("can't be empty"),
    v.minLength(8, "should be at least 8 characters long")
  ),
});
