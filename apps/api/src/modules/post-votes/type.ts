import { Prisma } from "@teejay/prisma-client";

import { select } from "./selector";

type Find = { select: ReturnType<typeof select> };

export type TPostVote = Prisma.PostVoteGetPayload<Find>;
