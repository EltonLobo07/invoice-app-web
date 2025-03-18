import type { Kysely } from "kysely";
import type { DB } from "kysely-codegen";

export async function seed(db: Kysely<DB>): Promise<void> {
  await db
    .insertInto("invoices")
    .values([
      {
        id: "RT3080",
        dueDate: new Date("2021-08-19"),
        to: "Jensen Huang",
        amount: 1800.9,
        status: "paid",
      },
      {
        id: "XM9141",
        dueDate: new Date("2021-09-20"),
        to: "Alex Grim",
        amount: 556,
        status: "pending",
      },
      {
        id: "RG0314",
        dueDate: new Date("2021-10-01"),
        to: "John Morrison",
        amount: 14002.33,
        status: "paid",
      },
      {
        id: "RT2080",
        dueDate: new Date("2021-10-12"),
        to: "Alysa Werner",
        amount: 102.04,
        status: "pending",
      },
      {
        id: "AA1449",
        dueDate: new Date("2021-10-14"),
        to: "Melisha Clarke",
        amount: 4032.33,
        status: "pending",
      },
      {
        id: "TY9141",
        dueDate: new Date("2021-10-31"),
        to: "Thomas Wayne",
        amount: 6155.91,
        status: "pending",
      },
      {
        id: "FV2353",
        dueDate: new Date("2021-11-12"),
        to: "Anita Wainwright",
        amount: 3102.04,
        status: "draft",
      },
    ])
    .execute();
}
