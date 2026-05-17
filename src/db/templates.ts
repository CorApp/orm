import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const templates = sqliteTable(
  "templates",
  {
    id: text().primaryKey().$default(v4),
    name: text().notNull(),          // nombre exacto en Meta
    description: text().notNull(),   // descripción legible para el admin
    query: text(),                   // condición para mostrarla (futuro)
    params: text(),                  // parámetros JSON que necesita la plantilla
    active: integer().notNull().default(1),
    created_at: integer().notNull().$default(() => Math.floor(Date.now() / 1000)),
  },
  (t) => [index("templates_id_index").on(t.id)],
);