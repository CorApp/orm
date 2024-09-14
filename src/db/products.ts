import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull().unique(),
});

const products = sqliteTable("products", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  photo: text("photo").notNull(),
  code: text("code").notNull().unique(),
  considerations: text("considerations"),
  category_id: text("category_id")
    .notNull()
    .references(() => categories.id),
});

export default products;
