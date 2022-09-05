import { randomBytes } from "node:crypto";

import { hash } from "bcrypt";

import { PrismaClient } from "../dist";

async function main() {
  const prisma = new PrismaClient();

  await createAdmin(prisma);
}

async function createAdmin(prisma: PrismaClient) {
  const plaintextPassword = randomBytes(32).toString("hex");
  const password = await hash(plaintextPassword, 10);

  const user = await prisma.user.create({
    data: {
      login: "admin",
      name: "Админ",
      password,
    },
  });

  const maxLength = 10;
  console.info("User ".padStart(maxLength));
  console.info(`ID: `.padStart(maxLength), user.id);
  console.info(`Login: `.padStart(maxLength), user.login);
  console.info(`Name: `.padStart(maxLength), user.name);
  console.info(`Password: `.padStart(maxLength), plaintextPassword);
}

main().catch(console.error);
