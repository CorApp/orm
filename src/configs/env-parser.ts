import { z } from "zod";

export const envSchema = z.object({
  TURSO_DATABASE_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string(),
  TURSO_SAAS_URL: z.string().url(),
  TURSO_SAAS_TOKEN: z.string(),
});
