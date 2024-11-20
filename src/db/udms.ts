import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

const udms = sqliteTable("udms", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  height: numeric("height").notNull(),
  width: numeric("width").notNull(),
  length: numeric("length").notNull(),
  weight: numeric("weight").notNull().default("1"),
});

export default udms;
