import type { Config } from "drizzle-kit";
import { envSchema } from "./src/configs/env-parser";

const env = envSchema.parse(process.env);
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
