-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "subsiteId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '/images/users/avatar.webp';

-- CreateTable
CREATE TABLE "Subsite" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subsite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_subsiteId_fkey" FOREIGN KEY ("subsiteId") REFERENCES "Subsite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
