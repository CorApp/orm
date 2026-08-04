import { index, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { v4 } from "uuid";

export const categories = sqliteTable(
  "categories",
  {
    id: text().primaryKey().$default(v4),
    slug: text().notNull().unique(),
    name: text().notNull(),
    img: text().notNull(),
  },
  (t) => [index("categories_index").on(t.id)],
);

export const products = sqliteTable(
  "products",
  {
    id: text().primaryKey().$default(v4),
    name: text().notNull(),
    photo: text().notNull(),
    code: text().notNull(),
    code_meta: text(),
    meta_product_id: text(),
    category_id: text()
      .notNull()
      .references(() => categories.id),
  },
  (t) => [
    index("products_index").on(t.id),
    unique("code_product_unique").on(t.code),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.category_id],
    references: [categories.id],
  }),
}));
