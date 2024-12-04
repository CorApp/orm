import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const shorts = sqliteTable("shorts", {
  id: text("id").primaryKey().unique(),
  url: text("url").notNull(),
});

export default shorts;
