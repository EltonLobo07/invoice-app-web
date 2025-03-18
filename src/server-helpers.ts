"use server";

import { cookies } from "next/headers";
import { User, UserSchema } from "./schemas";
import * as v from "valibot";
import { USER_JWT_COOKIE_NAME } from "./constants/general";
import jwt from "jsonwebtoken";
import { cache } from "react";

async function getUserHelper(
  cookieStore: Awaited<ReturnType<typeof cookies>>
): Promise<User | null> {
  const userJwt = cookieStore.get(USER_JWT_COOKIE_NAME)?.value ?? null;
  let user: User | null = null;
  try {
    if (userJwt !== null) {
      user = v.parse(UserSchema, jwt.verify(userJwt, process.env.JWT_SECRET!), {
        abortEarly: true,
      });
    }
  } catch (error) {
    console.error(error);
  }
  return user;
}

export const getUser = cache(getUserHelper);
