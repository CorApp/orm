import {
  index,
  int,
  numeric,
  sqliteTable,
  text,
  unique,
} from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const DOCUMENT_TYPES: DocumentTypes[] = ["CC", "CE", "NIT", "PP", "PPT"];
export const USER_ROLES: UserRole[] = [
  "admin",
  "buyer",
  "seller",
  "driver",
  "shopper",
];

// Sqlite table
export const document_types = sqliteTable(
  "document_types",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
  },
  (t) => [
    index("document_types_index").on(t.id),
    unique("document_types_name_unique").on(t.name),
  ],
);

export const roles = sqliteTable(
  "roles",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
  },
  (t) => [
    index("roles_index").on(t.id),
    unique("roles_name_unique").on(t.name),
  ],
);

const users = sqliteTable(
  "users",
  {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    phone: text().notNull(),
    thread: text(),
    balance: numeric().notNull().default("0"),
    telegram: text(),
    email: text().notNull(),
    password: text()
      .notNull()
      .$default(() => Date.now().toString()),
    role_id: int()
      .notNull()
      .references(() => roles.id),
    document: text().notNull(),
    document_type_id: int()
      .notNull()
      .references(() => document_types.id),
    created: text()
      .notNull()
      .$default(() => new Date().toISOString()),
    temp: text()
      .notNull()
      .default(
        JSON.stringify({
          status: "unstarted",
          tgStatus: "unstarted",
          last_message: 0,
        }),
      ),
  },
  (t) => [
    index("users_index").on(t.id),
    unique("users_phone_unique").on(t.phone),
    unique("users_email_unique").on(t.email),
  ],
);

export default users;

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
  documentType: one(document_types, {
    fields: [users.document_type_id],
    references: [document_types.id],
  }),
}));
