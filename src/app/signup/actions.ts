"use server";

import { type FormAction, isSchemaParseSuccessful } from "@/utils/form";
import { SignupSchema } from "./schemas";
// import bcrypt from "bcrypt";
// import { db } from "../../../db";

export const signup: FormAction<typeof SignupSchema> = async (
  _formState,
  inputState
) => {
  // redundant check needed (untrusted senders)
  if (!isSchemaParseSuccessful(SignupSchema, inputState)) {
    return {
      type: "error",
      message: "invalid input",
      inputState,
    };
  }
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // const { username, email, password } = inputState;
  // const passwordHash = await bcrypt.hash(password, 10);
  // const { id: userId } = await db
  //   .insertInto("users")
  //   .values({
  //     email,
  //     username,
  //     passwordHash,
  //   })
  //   .returning("id")
  //   .executeTakeFirstOrThrow();
  // console.log(inputState);
  return {
    type: "success",
    message: "signup successful",
    data: { userId: 123 },
  };
};
