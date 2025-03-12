import { defineConfig } from "kysely-ctl";
import { db as kysely } from "./src/db";

export default defineConfig({
  kysely,
});
