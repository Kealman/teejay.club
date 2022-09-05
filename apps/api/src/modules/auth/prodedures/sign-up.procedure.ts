import { TRPCError } from "@trpc/server";

import { signUpInput } from "../inputs";
import { signUpOutput } from "../outputs";

import { prisma } from "@/prisma";
import { t } from "@/trpc";
import { encryptPassword } from "@/utilities";

export const signUp = t.procedure
  .input(signUpInput)
  .output(signUpOutput)
  .mutation(async ({ input }) => {
    const { code, login, name, email } = input;
    const password = await encryptPassword(input.password);

    const invite = await prisma.invite.findFirst({
      where: { code, inviteeId: null },
    });

    if (!invite) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    try {
      await prisma.invite.update({
        where: { code },
        data: {
          invitee: {
            create: { login, name, email, password },
          },
        },
      });
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Login already used by another user",
      });
    }
  });
