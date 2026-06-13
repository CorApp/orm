import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { envSchema } from "@/configs/env-parser";
import * as schemas from "@/db";
import * as orm from "drizzle-orm";

// Conexión a la base de CorApp actual
export function dbInit(envInit: object) {
  const env = envSchema.parse(envInit);
  const turso = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });
  return drizzle(turso, { schema: schemas });
}

// Conexión a la base madre del SaaS
export function dbSaasInit(envInit: object) {
  const env = envSchema.parse(envInit);
  const turso = createClient({
    url: env.TURSO_SAAS_URL,
    authToken: env.TURSO_SAAS_TOKEN,
  });
  return drizzle(turso, { schema: schemas });
}

// Conexión dinámica a la base de un tenant específico
export function dbTenantInit(dbUrl: string, dbToken: string) {
  const turso = createClient({
    url: dbUrl,
    authToken: dbToken,
  });
  return drizzle(turso, { schema: schemas });
}

export { schemas, orm };