import { index, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

const shorts = sqliteTable(
  "shorts",
  {
    id: text().primaryKey(),
    url: text().notNull(),
  },
  (t) => [
    index("shorts_index").on(t.id),
    unique("shorts_url_unique").on(t.url),
  ],
);

export default shorts;
