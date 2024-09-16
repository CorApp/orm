import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import users from "@/db/users";

export const countries = sqliteTable("countries", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull().unique(),
});

export const cities = sqliteTable("cities", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  country_id: text("country_id")
    .notNull()
    .references(() => countries.id),
});

export const squares = sqliteTable("squares", {
  // Plazas
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull().unique(),
  city_id: text("city_id")
    .notNull()
    .references(() => cities.id),
});

export const warehouses = sqliteTable("warehouses", {
  // Bodegas
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  square_id: text("square_id")
    .notNull()
    .references(() => squares.id),
});

const stands = sqliteTable("stands", {
  // Puestos
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  seller_id: text("seller_id")
    .notNull()
    .references(() => users.id),
  warehouse_id: text("warehouse_id")
    .notNull()
    .references(() => warehouses.id),
});

export default stands;
