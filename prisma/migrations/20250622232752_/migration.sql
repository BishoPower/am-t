/*
  Warnings:

  - A unique constraint covering the columns `[reviewerId,tradeId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Review_reviewerId_revieweeId_listingId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Review_reviewerId_tradeId_key" ON "Review"("reviewerId", "tradeId");
