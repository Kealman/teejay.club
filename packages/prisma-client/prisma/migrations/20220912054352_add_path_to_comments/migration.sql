create extension if not exists ltree;
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "path" ltree;
