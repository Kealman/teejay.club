import { randomBytes } from "crypto";

import { PrismaClient } from "../dist";

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    Array(100)
      .fill(0)
      .map(() =>
        prisma.invite.create({
          data: {
            inviterId: 1,
            code: randomBytes(32).toString("hex"),
          },
        })
      )
  );
}

main().catch(console.error);
