-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "contentV2" JSONB,
ALTER COLUMN "contentV1" DROP NOT NULL;
