import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";

export const DOCUMENT_TYPES: DocumentTypes[] = ["CC", "CE", "NIT", "PP"];
export const USER_ROLES: UserRole[] = [
  "admin",
  "buyer",
  "seller",
  "driver",
  "carrier",
  "shopper",
];

// Sqlite table
export const document_types = sqliteTable("document_types", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name", { enum: ["CC", ...DOCUMENT_TYPES] })
    .notNull()
    .unique(),
});

export const roles = sqliteTable("roles", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name", { enum: ["admin", ...USER_ROLES] })
    .notNull()
    .unique(),
});

const users = sqliteTable("users", {
  id: text("id").primaryKey().unique().$default(v4),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  salt: text("salt").notNull(),
  role_id: text("role_id")
    .notNull()
    .references(() => roles.id),
  document: text("document").notNull(),
  document_type_id: text("document_type_id")
    .notNull()
    .references(() => document_types.id),
});

export default users;
