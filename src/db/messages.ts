import { index, sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { users } from "@/db/users";
import { relations } from "drizzle-orm";

export const messages = sqliteTable(
  "messages",
  {
    id: text().primaryKey().$default(v4),
    user_id: text().notNull().references(() => users.id),
    role: text().notNull(), // "user" | "assistant" | "admin"
    content: text().notNull(),
    created_at: integer().notNull().$default(() => Math.floor(Date.now() / 1000)),
  },
  (t) => [index("messages_user_id_index").on(t.user_id)],
);

export const messagesRelations = relations(messages, ({ one }) => ({
  user: one(users, {
    fields: [messages.user_id],
    references: [users.id],
  }),
}));