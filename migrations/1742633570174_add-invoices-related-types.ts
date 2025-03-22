import type { Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  /*
		CREATE TYPE invoice_status AS ENUM('draft', 'pending', 'paid');
	*/
  await db.schema
    .createType("invoice_status")
    .asEnum(["draft", "pending", "paid"])
    .execute();

  /*
    CREATE TYPE invoice_address_type AS ENUM('to', 'from');
  */
  await db.schema
    .createType("invoice_address_type")
    .asEnum(["to", "from"])
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  // DROP TYPE invoice_status;
  await db.schema.dropType("invoice_status").execute();

  // DROP TYPE invoice_address_type;
  return db.schema.dropType("invoice_address_type").execute();
}
