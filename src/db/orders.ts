import {
  index,
  int,
  numeric,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import users from "@/db/users";
import posts from "@/db/posts";
import { relations } from "drizzle-orm";

const orders = sqliteTable(
  "orders",
  {
    id: int().primaryKey({ autoIncrement: true }),
    buyer_id: int()
      .notNull()
      .references(() => users.id),
    delivery: text().notNull(),
    payment: text().notNull(),
    paid: numeric().notNull(),
    status: text().notNull(),
    extra: text().notNull().default(JSON.stringify({})),
    created: text()
      .notNull()
      .$default(() => new Date().toISOString()),
    driver_id: int().references(() => users.id),
  },
  (t) => [index("orders_index").on(t.id)],
);

export const order_items = sqliteTable(
  "order_items",
  {
    id: int().primaryKey({ autoIncrement: true }),
    order_id: int()
      .notNull()
      .references(() => orders.id),
    post_id: int()
      .notNull()
      .references(() => posts.id),
    quantity: text().notNull(),
    price: text().notNull(),
  },
  (t) => [index("order_item_index").on(t.id)],
);

export default orders;

export const ordersRelations = relations(orders, ({ one, many }) => ({
  buyer: one(users, {
    fields: [orders.buyer_id],
    references: [users.id],
  }),
  items: many(order_items),
}));

export const orderItemsRelations = relations(order_items, ({ one }) => ({
  order: one(orders, {
    fields: [order_items.order_id],
    references: [orders.id],
  }),
  post: one(posts, {
    fields: [order_items.post_id],
    references: [posts.id],
  }),
}));
