import { TRPCError } from "@trpc/server";

import { signInInput } from "../inputs";
import { signInOutput } from "../outputs";

import { prisma } from "@/prisma";
import { t } from "@/trpc";
import { comparePassword, JwtPayload, signJwt } from "@/utilities";

export const signIn = t.procedure
  .input(signInInput)
  .output(signInOutput)
  .mutation(async ({ input: { login, password } }) => {
    const user = await prisma.user.findUnique({
      where: { login },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const payload: JwtPayload = { sub: user.id.toString() };

    return signJwt(payload);
  });
