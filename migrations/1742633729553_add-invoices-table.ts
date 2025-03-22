import { sql, type Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  /*
		CREATE TABLE invoices (
			id SERIAL PRIMARY KEY,
			status invoice_status NOT NULL,
			created_at DATE NOT NULL DEFAULT NOW(),
			payment_term INT NOT NULL CHECK payment_term IN (1, 7, 14, 30),
			client_name TEXT NOT NULL,
			client_email TEXT NOT NULL,
			project_description TEXT,
		);
	*/
  return db.schema
    .createTable("invoices")
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("status", sql`invoice_status`, (c) => c.notNull())
    .addColumn("created_at", "date", (c) => c.notNull().defaultTo("NOW()"))
    .addColumn("payment_term", "integer", (c) =>
      c.notNull().check(sql`payment_term IN (1, 7, 14, 30)`)
    )
    .addColumn("client_name", "text", (c) => c.notNull())
    .addColumn("client_email", "text", (c) => c.notNull())
    .addColumn("project_description", "text")
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  // DROP TABLE invoices;
  return db.schema.dropTable("invoices").execute();
}
