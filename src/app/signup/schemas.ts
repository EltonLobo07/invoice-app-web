import * as v from "valibot";

export const SignupSchema = v.pipe(
  v.object({
    username: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty("can't be empty"),
      v.regex(
        /^[a-zA-Z0-9_]+$/,
        "can only contain letters, numbers and underscores"
      )
    ),
    email: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty("can't be empty"),
      v.email()
    ),
    password: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty("can't be empty"),
      v.minLength(8, "should be at least 8 characters long")
    ),
    passwordConfirmation: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [["password"], ["passwordConfirmation"]],
      ({ password, passwordConfirmation }) => password === passwordConfirmation,
      "should match the password"
    ),
    ["passwordConfirmation"]
  )
  // v.transform(
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   ({ passwordConfirmation, ...details }) => details
  // )
);
