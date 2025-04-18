import { Kysely } from "kysely";
import { SignupSchema } from "../src/app/signup/signup.schema";
import * as v from "valibot";
import { DB } from "kysely-codegen";
import bcrypt from "bcrypt";

export async function seed(db: Kysely<DB>): Promise<void> {
  const { email, password, username } = v.parse(SignupSchema, {
    username: "guest_user",
    email: "guest_user@gmail.com",
    password: "guest_user@123",
    passwordConfirmation: "guest_user@123",
  });
  const passwordHash = await bcrypt.hash(password, 10);
  await db
    .insertInto("users")
    .values({
      email,
      passwordHash,
      username,
    })
    .execute();
}
