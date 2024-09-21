import type { Config } from "drizzle-kit";
import envParser from "./src/configs/env-parser";

const env = envParser(process.env);
export default {
  schema: "src/db",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  strict: true,
} satisfies Config;
