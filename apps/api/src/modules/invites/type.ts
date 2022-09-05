import { Prisma } from "@teejay/prisma-client";

import { select } from "./selector";

type Find = { select: ReturnType<typeof select> };

export type TInvite = Prisma.InviteGetPayload<Find>;
