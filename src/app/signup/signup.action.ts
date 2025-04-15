"use server";

import { type FormAction, isSchemaParseSuccessful } from "@/utils/form";
import { SignupSchema } from "./signup.schema";
import bcrypt from "bcrypt";
import { db } from "@/db";
import * as v from "valibot";
import {
  USERS_UNIQUE_EMAIL_CONSTRAINT,
  USERS_UNIQUE_USERNAME_CONSTRAINT,
} from "@/constants/database";
import { GENERIC_ERROR_MESSAGE } from "@/constants/general";

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

const DataSchema = v.object({ input: SignupSchema });

export const signup: FormAction<typeof SignupSchema> = async (
  _formState,
  data
) => {
  // redundant check needed (untrusted senders)
  if (!isSchemaParseSuccessful(DataSchema, data)) {
    return {
      type: "error",
      message: "invalid input",
    };
  }
  const {
    input: { username, email, password },
  } = data;
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
  return { type: "success", message: "Signup was successful", data: {} };
};
