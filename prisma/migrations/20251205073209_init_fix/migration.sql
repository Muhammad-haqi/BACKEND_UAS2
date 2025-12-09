/*
  Warnings:

  - Added the required column `userId` to the `Pesanan` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `namaPenumpang` on the `Pesanan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `kursi` on the `Pesanan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Pesanan" ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "namaPenumpang",
ADD COLUMN     "namaPenumpang" JSONB NOT NULL,
DROP COLUMN "kursi",
ADD COLUMN     "kursi" JSONB NOT NULL;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
