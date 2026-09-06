import { index, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "@/db/users";
import { posts } from "@/db/posts";
import { relations } from "drizzle-orm";
import { v4 } from "uuid";

export const orders = sqliteTable(
  "orders",
  {
    id: text().primaryKey().$default(v4),
    buyer_id: text()
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
    driver_id: text().references(() => users.id),
    order_number: text(),
  },
  (t) => [index("orders_index").on(t.id)],
);

export const order_items = sqliteTable(
  "order_items",
  {
    id: text().primaryKey().$default(v4),
    order_id: text()
      .notNull()
      .references(() => orders.id),
    post_id: text()
      .notNull()
      .references(() => posts.id),
    quantity: text().notNull(),
    price: text().notNull(),
  },
  (t) => [index("order_item_index").on(t.id)],
);

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