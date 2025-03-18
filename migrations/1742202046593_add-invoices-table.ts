import { sql, type Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  /*
		CREATE TABLE IF NOT EXISTS invoices (
			id CHAR(6) PRIMARY KEY,
			due_date DATE NOT NULL,
			to TEXT NOT NULL,
			amount NUMERIC NOT NULL,
			created_at TIMESTAMPZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			status INVOICE_STATUS NOT NULL
		);
	*/
  return db.schema
    .createTable("invoices")
    .ifNotExists()
    .addColumn("id", "char(6)", (c) => c.primaryKey())
    .addColumn("due_date", "date", (c) => c.notNull())
    .addColumn("to", "text", (c) => c.notNull())
    .addColumn("amount", "numeric", (c) => c.notNull())
    .addColumn("created_at", "timestamptz", (c) => c.notNull().defaultTo("now"))
    .addColumn("status", sql`invoice_status`, (c) => c.notNull())
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  /*
		DROP TABLE IF EXISTS invoices;
	*/
  return db.schema.dropTable("invoices").ifExists().execute();
}
