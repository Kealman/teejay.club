-- AlterTable
ALTER TABLE "User"
  ALTER COLUMN "avatarId" DROP NOT NULL,
  ALTER COLUMN "avatarId" DROP DEFAULT;
UPDATE "User" SET "avatarId" = NULL;
