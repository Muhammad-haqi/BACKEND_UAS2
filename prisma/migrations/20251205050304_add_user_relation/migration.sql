/*
  Warnings:

  - You are about to drop the column `userId` on the `Pesanan` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pesanan" DROP CONSTRAINT "Pesanan_userId_fkey";

-- DropIndex
DROP INDEX "Pesanan_userId_idx";

-- AlterTable
ALTER TABLE "Pesanan" DROP COLUMN "userId";

-- DropTable
DROP TABLE "User";
