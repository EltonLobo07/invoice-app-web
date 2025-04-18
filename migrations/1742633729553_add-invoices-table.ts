import { sql, type Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  /*
		CREATE TABLE invoices (
			id CHAR(6) PRIMARY KEY,
			status invoice_status NOT NULL,
			created_at DATE NOT NULL DEFAULT NOW(),
			payment_term INT NOT NULL CHECK payment_term IN (1, 7, 14, 30),
			client_name TEXT NOT NULL,
			client_email TEXT NOT NULL,
			project_description TEXT,
      user_id INT NOT NULL REFERENCES users(id)
		);
	*/
  return db.schema
    .createTable("invoices")
    .addColumn("id", "char(6)", (c) => c.primaryKey())
    .addColumn("status", sql`invoice_status`, (c) => c.notNull())
    .addColumn("created_at", "date", (c) => c.notNull().defaultTo("NOW()"))
    .addColumn("payment_term", "integer", (c) =>
      c.notNull().check(sql`payment_term IN (1, 7, 14, 30)`)
    )
    .addColumn("client_name", "text", (c) => c.notNull())
    .addColumn("client_email", "text", (c) => c.notNull())
    .addColumn("project_description", "text")
    .addColumn("user_id", "integer", (c) => c.notNull())
    .addForeignKeyConstraint("user_id_fk", ["user_id"], "users", ["id"])
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  // DROP TABLE invoices;
  return db.schema.dropTable("invoices").execute();
}
