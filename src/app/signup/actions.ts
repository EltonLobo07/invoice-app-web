"use server";

import { type FormAction, isSchemaParseSuccessful } from "@/utils/form";
import { SignupSchema } from "./schemas";
import bcrypt from "bcrypt";
import { db } from "../../../db";
import { redirect } from "next/navigation";
import * as v from "valibot";
import {
  USERS_UNIQUE_EMAIL_CONSTRAINT,
  USERS_UNIQUE_USERNAME_CONSTRAINT,
} from "@/database";
import { GENERIC_ERROR_MESSAGE } from "@/constants";

const ColumnConstraintSchema = v.object({
  constraint: v.picklist([
    USERS_UNIQUE_EMAIL_CONSTRAINT,
    USERS_UNIQUE_USERNAME_CONSTRAINT,
  ]),
});

function getErrMsg(
  constraint: v.InferOutput<typeof ColumnConstraintSchema>["constraint"]
): string {
  switch (constraint) {
    case USERS_UNIQUE_EMAIL_CONSTRAINT:
      return "Email already exists";
    case USERS_UNIQUE_USERNAME_CONSTRAINT:
      return "Username already exists";
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _x: never = constraint;
      return "";
  }
}

export const signup: FormAction<typeof SignupSchema> = async (
  _formState,
  inputState
) => {
  // redundant check needed (untrusted senders)
  if (!isSchemaParseSuccessful(SignupSchema, inputState)) {
    return {
      type: "error",
      message: "invalid input",
    };
  }
  const { username, email, password } = inputState;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await db
      .insertInto("users")
      .values({
        email,
        username,
        passwordHash,
      })
      .execute();
  } catch (error) {
    return {
      type: "error",
      message: v.is(ColumnConstraintSchema, error)
        ? getErrMsg(error.constraint)
        : GENERIC_ERROR_MESSAGE,
    };
  }
  redirect("/login");
};
