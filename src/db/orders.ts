import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import posts from "@/db/posts";
import users from "@/db/users";

const orders = sqliteTable("orders", {
  id: text("id"),
  buyer_id: text("buyer_id")
    .notNull()
    .references(() => users.id),
  post_id: text("post_id")
    .notNull()
    .references(() => posts.id),
  quantity: numeric("quantity").notNull().default("1"),
});

export default orders;
