"use server";

import { type FormAction, getFormErrors, toObject } from "@/utils/form";
import * as v from "valibot";
import { SignupSchema } from "./schemas";
// import bcrypt from "bcrypt";
// import { db } from "../../../db";

export const signup: FormAction<typeof SignupSchema> = async (
  _formState,
  formData
) => {
  const inputState = toObject(formData);
  const result = v.safeParse(SignupSchema, inputState);
  if (!result.success) {
    return {
      type: "error",
      formErrors: getFormErrors(result.issues),
      inputState,
    };
  }
  // const { username, email, password } = result.output;
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
  return {
    type: "success",
    message: "signup successful",
    data: { userId: 123 },
  };
};
