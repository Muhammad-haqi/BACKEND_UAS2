/*
  Warnings:

  - You are about to drop the column `refundReason` on the `Pesanan` table. All the data in the column will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tiket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pesananId_fkey";

-- DropForeignKey
ALTER TABLE "Tiket" DROP CONSTRAINT "Tiket_pesananId_fkey";

-- AlterTable
ALTER TABLE "Pesanan" DROP COLUMN "refundReason";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Tiket";
