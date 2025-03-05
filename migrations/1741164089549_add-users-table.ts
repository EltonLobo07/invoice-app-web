import type { Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  /*
		CREATE TABLE IF NOT EXISTS users(
			id            SERIAL       PRIMARY KEY,
			username      VARCHAR(255) UNIQUE NOT NULL,
			email         VARCHAR(255) UNIQUE NOT NULL,
			password_hash VARCHAR(500) NOT NULL,
			created_at    TIMESTAMPZ   NOT NULL DEFAULT NOW(),
		);
	*/

  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("username", "varchar(255)", (c) => c.unique().notNull())
    .addColumn("email", "varchar(255)", (c) => c.unique().notNull())
    .addColumn("password_hash", "varchar(500)", (c) => c.notNull())
    .addColumn("created_at", "timestamptz", (c) =>
      c.notNull().defaultTo("NOW()")
    )
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  // DROP TABLE IF EXISTS users;
  await db.schema.dropTable("users").execute();
}
