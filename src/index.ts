import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import envParser from "@/configs/env-parser";
import * as schemas from "@/db";
import * as orm from "drizzle-orm";

export default function dbInit(envInit: NodeJS.ProcessEnv) {
  const env = envParser(envInit);

  const turso = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });

  return drizzle(turso, { schema: schemas });
}
export { schemas, orm };
