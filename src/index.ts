import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import env from "@/configs/env";
import { document_types, roles, users } from "@/db";

const turso = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

const db = drizzle(turso, { schema: { users, roles, document_types } });
export default db;
export * from "@/db";
