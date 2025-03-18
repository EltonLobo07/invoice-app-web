import type { Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  /*
		CREATE TYPE INVOICE_STATUS AS ENUM('draft', 'pending', 'paid');
	*/
  return db.schema
    .createType("invoice_status")
    .asEnum(["draft", "pending", "paid"])
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  /*
		DROP TYPE INVOICE_STATUS;
	*/
  return db.schema.dropType("invoice_status").execute();
}
