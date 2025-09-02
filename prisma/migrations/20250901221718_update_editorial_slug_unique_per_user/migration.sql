/*
  Warnings:

  - A unique constraint covering the columns `[authorId,slug]` on the table `Editorial` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Editorial_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Editorial_authorId_slug_key" ON "Editorial"("authorId", "slug");
