import { z } from "zod";

const envSchema = z.object({
  TURSO_DATABASE_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string(),
});

export default function envParser(env: NodeJS.ProcessEnv) {
  return envSchema.parse(env);
}
