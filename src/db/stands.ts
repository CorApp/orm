import { index, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { users } from "@/db/users";
import { relations } from "drizzle-orm";
import { v4 } from "uuid";

export const countries = sqliteTable(
  "countries",
  {
    id: text().primaryKey().$default(v4),
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
    id: text().primaryKey().$default(v4),
    name: text().notNull(),
    country_id: text()
      .notNull()
      .references(() => countries.id),
  },
  (t) => [index("cities_index").on(t.id)],
);

export const squares = sqliteTable(
  "squares",
  {
    // Plazas
    id: text().primaryKey().$default(v4),
    name: text().notNull(),
    city_id: text()
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
    id: text().primaryKey().$default(v4),
    name: text().notNull(),
    code: text().notNull(),
    square_id: text()
      .notNull()
      .references(() => squares.id),
  },
  (t) => [
    index("warehouses_index").on(t.id),
    unique("warehouses_code_unique").on(t.code),
  ],
);

export const stands = sqliteTable(
  "stands",
  {
    // Puestos
    id: text().primaryKey().$default(v4),
    name: text().notNull(),
    code: text().notNull(),
    seller_id: text()
      .notNull()
      .references(() => users.id),
    warehouse_id: text()
      .notNull()
      .references(() => warehouses.id),
  },
  (t) => [
    index("stands_index").on(t.id),
    unique("stands_code_unique").on(t.code),
  ],
);

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
