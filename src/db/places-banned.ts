import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const placesBanned = sqliteTable(
  "places_banned",
  {
    id: text().primaryKey().$default(v4),
    name: text().notNull(),
  },
  (t) => [index("places_banned_index").on(t.id)],
);
