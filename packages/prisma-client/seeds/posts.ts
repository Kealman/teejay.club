import { randomUUID } from "crypto";

import { faker } from "@faker-js/faker";
import { subHours } from "date-fns";

import { PrismaClient } from "../dist";

const prisma = new PrismaClient();

async function main() {
  const promises = Array(100)
    .fill(0)
    .map(() =>
      prisma.post.create({
        data: {
          contentV1: `${faker.lorem.paragraph()}\n\n![Image](${faker.image.cats(
            undefined,
            undefined,
            true
          )})`,
          createdAt: faker.date.between(subHours(new Date(), 3), new Date()),
          author: {
            create: {
              login: randomUUID(),
              password: randomUUID(),
              name: faker.name.fullName(),
            },
          },
          comments: {
            create: {
              author: {
                create: {
                  login: randomUUID(),
                  password: randomUUID(),
                  name: faker.name.fullName(),
                },
              },
              content: faker.lorem.paragraph(),
            },
          },
        },
      })
    );

  await Promise.all(promises);
}

main().catch(console.error);
