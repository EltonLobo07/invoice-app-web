import { defineConfig } from "kysely-ctl";
import { db as kysely } from "./db";

export default defineConfig({
  kysely,
});
