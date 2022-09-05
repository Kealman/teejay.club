import { sign, verify } from "jsonwebtoken";
import { z } from "zod";

import { config } from "@/config";

const payloadSchema = z.object({
  sub: z.string().regex(/\d+/),
});

export type JwtPayload = z.infer<typeof payloadSchema>;

export async function signJwt(payload: JwtPayload) {
  payloadSchema.parse(payload);
  return sign(payload, config.JWT_SECRET, {
    issuer: config.JWT_ISSUER,
    audience: config.JWT_AUDIENCE,
    expiresIn: config.JWT_EXPIRATION_TIME,
  });
}

export async function extractJwt(authorizationHeader?: string) {
  if (!authorizationHeader) {
    return "";
  }

  if (!authorizationHeader.startsWith("Bearer ")) {
    return "";
  }

  return authorizationHeader.slice("Bearer ".length);
}

export async function verifyJwt(jwt: string): Promise<JwtPayload> {
  const result = verify(jwt, config.JWT_SECRET, {
    issuer: config.JWT_ISSUER,
    audience: config.JWT_AUDIENCE,
  });
  return payloadSchema.parse(result);
}
