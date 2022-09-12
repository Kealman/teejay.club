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

    const invitee = await prisma.user.create({
      data: { login, name, email, password },
    });

    if (!code) {
      return;
    }

    const invite = await prisma.invite.findFirst({
      where: { code, inviteeId: null },
    });

    if (!invite) {
      return;
    }

    try {
      await prisma.invite.update({
        where: { id: invite.id },
        data: { inviteeId: invitee.id },
      });
    } catch (error) {
      console.error(error);
    }
  });
