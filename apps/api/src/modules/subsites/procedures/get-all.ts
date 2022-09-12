import { prisma } from "@/prisma";
import { t } from "@/trpc";

export const getAll = t.procedure.query(async () => {
  return prisma.subsite.findMany();
});
