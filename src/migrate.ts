import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as dotenv from "dotenv";

dotenv.config();

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(turso);

async function migrate() {
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `);
  
  await turso.execute(`
    CREATE INDEX IF NOT EXISTS messages_user_id_index ON messages(user_id)
  `);
  
  console.log("✅ Tabla messages creada exitosamente");
  process.exit(0);
}

migrate().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});