-- CreateTable
CREATE TABLE "Tiket" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "asal" TEXT NOT NULL,
    "tujuan" TEXT NOT NULL,
    "tanggal" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tiket_pkey" PRIMARY KEY ("id")
);
