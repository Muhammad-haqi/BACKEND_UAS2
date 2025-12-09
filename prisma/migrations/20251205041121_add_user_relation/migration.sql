/*
  Warnings:

  - Made the column `userId` on table `Pesanan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Pesanan" DROP CONSTRAINT "Pesanan_userId_fkey";

-- AlterTable
ALTER TABLE "Pesanan" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
