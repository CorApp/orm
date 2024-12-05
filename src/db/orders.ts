import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import users from "@/db/users";
import posts from "@/db/posts";
import { v4 } from "uuid";

export const DELIVERY_METHODS: DeliveryMethod[] = ["pickup", "delivery"];
export const PAYMENT_METHODS: PaymentMethod[] = ["cash", "online"];
export const ORDER_STATUSES: StatusOrder[] = [
  "awaiting_confirmation",
  "awaiting_payment",
  "awaiting_shipment",
  "driver_assigned",
  "sending",
  "awaiting_finish",
  "finished",
];

const orders = sqliteTable("orders", {
  id: text("id").primaryKey().unique().$default(v4),
  buyer_id: text("buyer_id")
    .notNull()
    .references(() => users.id),
  delivery: text("delivery").notNull(),
  payment: text("payment").notNull(),
  paid: numeric("paid").notNull().default("0"),
  status: text("status").notNull(),
  extra: text("extra").notNull().default(JSON.stringify({})),
  created: text("created")
    .notNull()
    .$default(() => new Date().toISOString()),
  driver_id: text("driver_id").references(() => users.id),
});

export const order_items = sqliteTable("order_items", {
  id: text("id").primaryKey().unique().$default(v4),
  order_id: text("order_id")
    .notNull()
    .references(() => orders.id),
  post_id: text("post_id")
    .notNull()
    .references(() => posts.id),
  quantity: text("quantity").notNull(),
  price: text("price").notNull(),
});

export default orders;
