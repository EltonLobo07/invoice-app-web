"use server";

import { isSchemaParseSuccessful, type FormAction } from "@/utils/form";
import { LoginSchema } from "./login.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "@/db";
import { GENERIC_ERROR_MESSAGE } from "@/constants/general";
import * as v from "valibot";
import type { User } from "@/schemas";

type SuccessData = { user: User; jwt: string };

const DataSchema = v.object({ input: LoginSchema });

export const login: FormAction<typeof LoginSchema, SuccessData> = async (
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
    input: { email, password },
  } = data;
  try {
    const users = await db
      .selectFrom("users")
      .where("email", "=", email)
      .select(["username", "passwordHash", "id"])
      .execute();
    if (users.length === 0) {
      return { type: "error", message: "invalid credentials" };
    }
    const [user] = users;
    if (!(await bcrypt.compare(password, user.passwordHash))) {
      return { type: "error", message: "invalid credentials" };
    }
    const appUser = { username: user.username, id: user.id };
    const token = jwt.sign(JSON.stringify(appUser), process.env.JWT_SECRET!);
    return {
      type: "success",
      message: "Login was successful",
      data: { user: appUser, jwt: token },
    };
  } catch (error) {
    console.error(error);
    return { type: "error", message: GENERIC_ERROR_MESSAGE };
  }
};
