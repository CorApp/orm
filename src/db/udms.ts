import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const dimensions = sqliteTable("dimensions", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  height: numeric("height").notNull(),
  width: numeric("width").notNull(),
  length: numeric("length").notNull(),
  weight: numeric("weight").notNull(),
});

const udms = sqliteTable("udms", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  dimension_id: text("dimension_id")
    .notNull()
    .references(() => dimensions.id),
});

export default udms;
