import { z } from "zod";

export const envSchema = z.object({
  TURSO_DATABASE_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
