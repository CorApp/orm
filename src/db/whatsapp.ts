import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { users } from "@/db";

const whatsapp = sqliteTable("whatsapp", {
  id: text("id").primaryKey().unique().$default(v4),
  user_id: text("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
  enabled: numeric("enabled").notNull().default("0"),
  status: text("status").notNull().default("unstarted"),
  temp: text("temp"),
});

export default whatsapp;
