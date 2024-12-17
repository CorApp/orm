import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey().unique().$default(v4),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  img: text("img").notNull(),
});

const products = sqliteTable("products", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  photo: text("photo").notNull(),
  code: text("code").notNull().unique(),
  category_id: text("category_id")
    .notNull()
    .references(() => categories.id),
});

export default products;
