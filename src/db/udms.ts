import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

const udms = sqliteTable("udms", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  height: numeric("height").notNull().default("1"),
  width: numeric("width").notNull().default("1"),
  length: numeric("length").notNull().default("1"),
  weight: numeric("weight").notNull().default("1"),
});

export default udms;
