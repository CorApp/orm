import { index, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

const udms = sqliteTable(
  "udms",
  {
    id: text().primaryKey().$default(v4),
    name: text().notNull(),
    height: numeric().notNull().default("1"),
    width: numeric().notNull().default("1"),
    length: numeric().notNull().default("1"),
    weight: numeric().notNull().default("1"),
  },
  (t) => [index("udms_index").on(t.id)],
);

export const qualities = sqliteTable(
  "qualities",
  {
    id: text().primaryKey().$default(v4),
    name: text().notNull(),
  },
  (t) => [index("qualities_index").on(t.id)],
);

export default udms;
