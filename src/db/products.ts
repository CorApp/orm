import { index, int, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const categories = sqliteTable(
  "categories",
  {
    id: int().primaryKey({ autoIncrement: true }),
    slug: text().notNull().unique(),
    name: text().notNull(),
    img: text().notNull(),
  },
  (t) => [index("categories_index").on(t.id)],
);

const products = sqliteTable(
  "products",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    photo: text().notNull(),
    code: text().notNull(),
    category_id: int()
      .notNull()
      .references(() => categories.id),
  },
  (t) => [
    index("products_index").on(t.id),
    unique("code_product_unique").on(t.code),
  ],
);

export default products;

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.category_id],
    references: [categories.id],
  }),
}));
