import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "@/db/users";
import { relations } from "drizzle-orm";
import { v4 } from "uuid";

export const vehicles = sqliteTable("vehicles", {
  id: text().primaryKey().$default(v4),
  driver_id: text()
    .notNull()
    .references(() => users.id),
  type: text().notNull(),
  max_weight: numeric().notNull(),
  status: text().notNull().default("sleeping"),
});

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  driver: one(users, {
    fields: [vehicles.driver_id],
    references: [users.id],
  }),
}));
