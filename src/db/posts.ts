import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import udms, { qualities } from "@/db/udms";
import products from "@/db/products";
import stands from "@/db/stands";
import users from "@/db/users";

export const post_prices = sqliteTable("post_prices", {
  id: text("id").primaryKey().unique().$default(v4),
  post_id: text("post_id")
    .notNull()
    .references(() => posts.id),
  price: numeric("price").notNull(),
});

const posts = sqliteTable("posts", {
  id: text("id").primaryKey().unique().$default(v4),
  price: numeric("price").notNull(),
  extra: numeric("extra").default("0"),
  min: numeric("min").notNull().default("1"),
  wholesale: numeric("wholesale").notNull().default("0"),
  description: text("description"),
  seller_id: text("seller_id")
    .notNull()
    .references(() => users.id),
  udm_id: text("udm_id")
    .notNull()
    .references(() => udms.id),
  quality_id: text("quality_id")
    .notNull()
    .references(() => qualities.id),
  product_id: text("product_id")
    .notNull()
    .references(() => products.id),
  stand_id: text("stand_id")
    .notNull()
    .references(() => stands.id),
  published: numeric("published").notNull().default("0"),
  updated: numeric("updated").notNull().default("0"),
  created: text("created")
    .notNull()
    .$default(() => new Date().toISOString()),
  deleted: numeric("deleted").notNull().default("0"),
});

export default posts;
