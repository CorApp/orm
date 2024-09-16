import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import env from "@/configs/env";
import * as schemas from "@/db";

const turso = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

const db = drizzle(turso, { schema: schemas });
export default db;
export { schemas };
