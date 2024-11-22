import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import users from "@/db/users";

const whatsapp = sqliteTable("whatsapp", {
  id: text("id").primaryKey().unique().$default(v4),
  user_id: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
  status: text("status").notNull().default("unstarted"),
  temp: text("temp").notNull().default(JSON.stringify({})),
});

export default whatsapp;
