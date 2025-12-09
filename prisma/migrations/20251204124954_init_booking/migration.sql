/*
  Warnings:

  - You are about to drop the `Tiket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tiket";

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "namaPemesan" TEXT NOT NULL,
    "nomorHp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "maskapai" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "asal" TEXT NOT NULL,
    "tujuan" TEXT NOT NULL,
    "tanggalBerangkat" TEXT NOT NULL,
    "penumpang" INTEGER NOT NULL,
    "namaPenumpang" TEXT[],
    "kursi" TEXT[],
    "total" INTEGER NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'Belum dibayar',
    "tanggalOrder" TEXT NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
