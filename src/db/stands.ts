import { index, int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import users from "@/db/users";
import { relations } from "drizzle-orm";

export const countries = sqliteTable(
  "countries",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
  },
  (t) => [
    index("countries_index").on(t.id),
    unique("countries_name_unique").on(t.name),
  ],
);

export const cities = sqliteTable(
  "cities",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    country_id: int()
      .notNull()
      .references(() => countries.id),
  },
  (t) => [index("cities_index").on(t.id)],
);

export const squares = sqliteTable(
  "squares",
  {
    // Plazas
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    city_id: int()
      .notNull()
      .references(() => cities.id),
  },
  (t) => [
    index("squares_index").on(t.id),
    unique("squares_name_unique").on(t.name),
  ],
);

export const warehouses = sqliteTable(
  "warehouses",
  {
    // Bodegas
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    code: text().notNull(),
    square_id: int("square_id")
      .notNull()
      .references(() => squares.id),
  },
  (t) => [
    index("warehouses_index").on(t.id),
    unique("warehouses_code_unique").on(t.code),
  ],
);

const stands = sqliteTable(
  "stands",
  {
    // Puestos
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    code: text().notNull(),
    seller_id: int()
      .notNull()
      .references(() => users.id),
    warehouse_id: int()
      .notNull()
      .references(() => warehouses.id),
  },
  (t) => [
    index("stands_index").on(t.id),
    unique("stands_code_unique").on(t.code),
  ],
);

export default stands;

export const standsRelations = relations(stands, ({ one }) => ({
  warehouse: one(warehouses, {
    fields: [stands.warehouse_id],
    references: [warehouses.id],
  }),
  seller: one(users, {
    fields: [stands.seller_id],
    references: [users.id],
  }),
}));

export const warehousesRelations = relations(warehouses, ({ many, one }) => ({
  stands: many(stands),
  square: one(squares, {
    fields: [warehouses.square_id],
    references: [squares.id],
  }),
}));

export const squaresRelations = relations(squares, ({ one }) => ({
  city: one(cities, {
    fields: [squares.city_id],
    references: [cities.id],
  }),
}));

export const citiesRelations = relations(cities, ({ one }) => ({
  country: one(countries, {
    fields: [cities.country_id],
    references: [countries.id],
  }),
}));
