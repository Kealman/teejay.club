import { Prisma } from "@teejay/prisma-client";

import { users } from "@/modules";

export const select = () =>
  Prisma.validator<Prisma.InviteSelect>()({
    id: true,
    code: true,
    inviter: { select: users.select() },
  });
