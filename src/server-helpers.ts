"use server";

import { cookies } from "next/headers";
import { User, UserSchema } from "./schemas";
import * as v from "valibot";
import { USER_JWT_COOKIE_NAME } from "./constants/general";
import jsonwebtoken from "jsonwebtoken";
import { cache } from "react";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

export async function getJwt(cookieStore: CookieStore): Promise<string | null> {
  return cookieStore.get(USER_JWT_COOKIE_NAME)?.value ?? null;
}

async function getUserHelper(jwt: string | null): Promise<User | null> {
  try {
    if (jwt !== null) {
      const user = v.parse(
        UserSchema,
        jsonwebtoken.verify(jwt, process.env.JWT_SECRET!),
        {
          abortEarly: true,
        }
      );
      return user;
    }
  } catch (error) {
    console.error(error);
  }
  return null;
}

export const getUser = cache(getUserHelper);
