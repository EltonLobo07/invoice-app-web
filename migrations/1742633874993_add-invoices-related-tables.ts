import { sql, type Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  /*
		CREATE TABLE address (
			id SERIAL PRIMARY KEY,
			street TEXT NOT NULL,
			post_code TEXT NOT NULL,
			city TEXT NOT NULL,
			country TEXT NOT NULL,
			type invoice_address_type NOT NULL
			invoice_id INT NOT NULL,
			CONSTRAINT fk_invoice,
				FOREIGN KEY(invoice_id)
				REFERENCES invoices(id)
				ON DELETE CASCADE
		);
	*/
  await db.schema
    .createTable("invoice_addresses")
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("street", "text", (c) => c.notNull())
    .addColumn("post_code", "text", (c) => c.notNull())
    .addColumn("city", "text", (c) => c.notNull())
    .addColumn("country", "text", (c) => c.notNull())
    .addColumn("type", sql`invoice_address_type`, (c) => c.notNull())
    .addColumn("invoice_id", "integer", (c) => c.notNull())
    .addForeignKeyConstraint("fk_invoice", ["invoice_id"], "invoices", ["id"])
    .execute();

  /*
		CREATE TABLE items (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			quantity INT NOT NULL CHECK quantity > 0,
			price NUMERIC NOT NULL CHECK price > 0.0,
			invoice_id INT NOT NULL,
			CONSTRAINT fk_invoice,
				FOREIGN KEY(invoice_id)
				REFERENCES invoices(id)
				ON DELETE CASCADE
		);
	*/
  return db.schema
    .createTable("items")
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("name", "text", (c) => c.notNull())
    .addColumn("quantity", "integer", (c) =>
      c.notNull().check(sql`quantity > 0`)
    )
    .addColumn("price", "numeric", (c) => c.notNull().check(sql`price > 0.0`))
    .addColumn("invoice_id", "integer", (c) => c.notNull())
    .addForeignKeyConstraint("fk_invoice", ["invoice_id"], "invoices", ["id"])
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  //	DROP TABLE invoice_addresses;
  await db.schema.dropTable("invoice_addresses").execute();

  // DROP TABLE items;
  return db.schema.dropTable("items").execute();
}
