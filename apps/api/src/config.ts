import * as dotenv from "dotenv";
import { z } from "zod";

const configSchema = z.object({
  PORT: z.string().regex(/\d+/),

  JWT_SECRET: z.string().min(64),
  JWT_ISSUER: z.string().min(6),
  JWT_AUDIENCE: z.string().min(6),
  JWT_EXPIRATION_TIME: z.string().min(2),

  S3_ENPOINT: z.string().startsWith("http://"),
  S3_ACCESS_KEY_ID: z.string().min(16),
  S3_SECRET_ACCESS_KEY: z.string().min(16),
});

export const config = (() => {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  return configSchema.parse(result.parsed);
})();
