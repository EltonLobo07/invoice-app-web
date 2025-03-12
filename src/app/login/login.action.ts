"use server";

import { isSchemaParseSuccessful, type FormAction } from "@/utils/form";
import { LoginSchema } from "./login.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../../db";
import { GENERIC_ERROR_MESSAGE } from "@/constants";
import type { User } from "@/schemas";

export const login: FormAction<typeof LoginSchema, User> = async (
  _formState,
  inputState
) => {
  // redundant check needed (untrusted senders)
  if (!isSchemaParseSuccessful(LoginSchema, inputState)) {
    return {
      type: "error",
      message: "invalid input",
    };
  }
  const { email, password } = inputState;
  try {
    const users = await db
      .selectFrom("users")
      .where("email", "=", email)
      .select(["username", "passwordHash"])
      .execute();
    if (users.length === 0) {
      console.log({ users });
      return { type: "error", message: "invalid credentials" };
    }
    const [user] = users;
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      console.log("password mismatch");
      return { type: "error", message: "invalid credentials" };
    }
    const appUser = { username: user.username };
    const token = jwt.sign(JSON.stringify(appUser), process.env.JWT_SECRET!);
    return { type: "success", jwt: token, data: appUser };
  } catch (error) {
    console.error(error);
    return { type: "error", message: GENERIC_ERROR_MESSAGE };
  }
};
