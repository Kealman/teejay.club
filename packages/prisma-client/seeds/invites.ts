import { randomBytes } from "crypto";

import { PrismaClient } from "../dist";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findUniqueOrThrow({
    where: { login: "admin" },
  });

  const promises = Array(100)
    .fill(0)
    .map(() =>
      prisma.invite.create({
        data: {
          inviterId: admin.id,
          code: randomBytes(32).toString("hex"),
        },
      })
    );

  await Promise.all(promises);
}

main().catch(console.error);
