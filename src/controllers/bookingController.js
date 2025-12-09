// File: src/controllers/bookingController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fungsi untuk memblokir kursi saat pesanan dibuat
exports.createBookingOnOrder = async (newOrder) => {
    
    // 1. Persiapkan data booking dari Pesanan yang baru dibuat
    const bookingData = newOrder.kursi.map((kursi) => ({
        pesananId: newOrder.id, // Kaitkan dengan ID Pesanan
        asal: newOrder.asal,
        tujuan: newOrder.tujuan,
        tanggal: newOrder.tanggalBerangkat,
        nomorKursi: kursi,
        statusKursi: "Booked", // Status: Diblokir/Dipesan
    }));

    try {
        // 2. Simpan entri booking ke database
        await prisma.booking.createMany({
            data: bookingData,
        });

        console.log(`Kursi berhasil diblokir untuk Pesanan ID: ${newOrder.id}`);
        return { success: true };
        
    } catch (error) {
        // Jika ada error (misal, kursi sudah diblokir/unique constraint), log error.
        console.error("Gagal membuat Booking kursi:", error);
        
        // ⚠️ Penting: Kita perlu membatalkan Pesanan yang baru dibuat jika booking gagal, 
        // tetapi untuk kesederhanaan, kita hanya akan melempar error dan membiarkan 
        // pesananRoutes yang menanganinya, atau Anda bisa menerapkan transaksi di sini.
        throw new Error("Kursi sudah terambil atau terjadi kesalahan booking.");
    }
};

// Fungsi untuk melepaskan kursi saat pesanan dibatalkan/dihapus
exports.deleteBookingOnOrderDelete = async (pesananId) => {
    try {
        await prisma.booking.deleteMany({
            where: { pesananId: pesananId }
        });
        console.log(`Booking kursi dilepaskan untuk Pesanan ID: ${pesananId}`);
        return { success: true };
    } catch (error) {
        console.error("Gagal menghapus Booking kursi:", error);
        throw new Error("Gagal melepaskan kursi.");
    }
};

// --- Anda bisa menambahkan fungsi GET/PUT Booking lainnya di sini ---