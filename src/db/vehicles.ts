import { numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import users from "@/db/users";

const vehicles = sqliteTable("vehicles", {
  id: text("id").primaryKey().unique().$default(v4),
  driver_id: text("driver_id")
    .notNull()
    .references(() => users.id),
  type: text("type").notNull(),
  max_weight: numeric("max_weight").notNull(),
  status: text("status").notNull().default("sleeping"),
});

export default vehicles;
