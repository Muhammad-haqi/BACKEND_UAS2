-- DropForeignKey
ALTER TABLE "Pesanan" DROP CONSTRAINT "Pesanan_userId_fkey";

-- AlterTable
ALTER TABLE "Pesanan" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pesanan" ADD CONSTRAINT "Pesanan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
