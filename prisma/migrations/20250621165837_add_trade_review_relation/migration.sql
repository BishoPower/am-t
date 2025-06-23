-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "tradeId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "TradeRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
