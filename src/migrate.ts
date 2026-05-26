import { createClient } from "@libsql/client";
import * as dotenv from "dotenv";

dotenv.config();

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

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

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      query TEXT,
      params TEXT,
      active INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL
    )
  `);

  await turso.execute(`
    CREATE INDEX IF NOT EXISTS templates_id_index ON templates(id)
  `);

  console.log("✅ Migración exitosa");
  process.exit(0);
}

migrate().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
