-- AlterTable
ALTER TABLE "Pesanan" ADD COLUMN     "refundReason" TEXT;

-- CreateTable
CREATE TABLE "Tiket" (
    "id" SERIAL NOT NULL,
    "pesananId" INTEGER NOT NULL,
    "nomorKursi" TEXT NOT NULL,
    "namaPenumpang" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Tiket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "pesananId" INTEGER,
    "asal" TEXT NOT NULL,
    "tujuan" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "nomorKursi" TEXT NOT NULL,
    "statusKursi" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tiket" ADD CONSTRAINT "Tiket_pesananId_fkey" FOREIGN KEY ("pesananId") REFERENCES "Pesanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_pesananId_fkey" FOREIGN KEY ("pesananId") REFERENCES "Pesanan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
