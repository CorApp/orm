import {
  index,
  int,
  numeric,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import udms, { qualities } from "@/db/udms";
import products from "@/db/products";
import stands from "@/db/stands";
import users from "@/db/users";
import { relations } from "drizzle-orm";

const posts = sqliteTable(
  "posts",
  {
    id: int().primaryKey({ autoIncrement: true }),
    price: numeric().notNull(),
    extra: numeric().default("0"),
    min: int().notNull().default(1),
    wholesale: int().notNull().default(0),
    description: text(),
    seller_id: int()
      .notNull()
      .references(() => users.id),
    udm_id: int()
      .notNull()
      .references(() => udms.id),
    quality_id: int()
      .notNull()
      .references(() => qualities.id),
    product_id: int()
      .notNull()
      .references(() => products.id),
    stand_id: int()
      .notNull()
      .references(() => stands.id),
    published: int().notNull().default(0),
    updated: int().notNull().default(0),
    offer: int().notNull().default(0),
    created: text()
      .notNull()
      .$default(() => new Date().toISOString()),
  },
  (t) => [index("posts_index").on(t.id)],
);

export default posts;

export const postsRelations = relations(posts, ({ one }) => ({
  seller: one(users, {
    fields: [posts.seller_id],
    references: [users.id],
  }),
  udm: one(udms, {
    fields: [posts.udm_id],
    references: [udms.id],
  }),
  quality: one(qualities, {
    fields: [posts.quality_id],
    references: [qualities.id],
  }),
  product: one(products, {
    fields: [posts.product_id],
    references: [products.id],
  }),
  stand: one(stands, {
    fields: [posts.stand_id],
    references: [stands.id],
  }),
}));
