import { int, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import users from "@/db/users";
import { relations } from "drizzle-orm";

const vehicles = sqliteTable("vehicles", {
  id: int().primaryKey({ autoIncrement: true }),
  driver_id: int()
    .notNull()
    .references(() => users.id),
  type: text().notNull(),
  max_weight: numeric().notNull(),
  status: text().notNull().default("sleeping"),
});

export default vehicles;

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  driver: one(users, {
    fields: [vehicles.driver_id],
    references: [users.id],
  }),
}));
