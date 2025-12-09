// src/controllers/pesananController.js (FINAL COMMONJS VERSION)

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fungsi untuk membuat pesanan baru (dipanggil dari POST /)
// Logika booking kursi dihapus.
const createPesanan = async (req, res) => {
    try {
        // Asumsi req.user.userId ada dari verifyToken
        const userIdFromToken = req.user.userId; 
        const { userId, ...data } = req.body; 

        // 1. Buat Pesanan
        const newOrder = await prisma.pesanan.create({
            data: {
                ...data,
                userId: userIdFromToken, 
                tanggalOrder: data.tanggalOrder ?? new Date().toISOString(),
                status: "Menunggu Pembayaran", 
                paid: false,
            },
        });
        
        // 🚨 Tidak ada lagi panggilan ke bookingController.createBookingOnOrder

        res.status(201).json({ 
            success: true,
            message: "Pesanan berhasil dibuat.",
            order: newOrder,
        });
        
    } catch (err) {
        console.error("Error create order:", err); 
        res.status(500).json({ success: false, error: "Gagal membuat pesanan." });
    }
};

// Fungsi untuk menghapus pesanan (dipanggil dari DELETE /:id)
// Logika hapus booking kursi dihapus.
const deletePesanan = async (req, res) => {
    try {
        const id = Number(req.params.id);

        // 🚨 Tidak ada lagi panggilan ke bookingController.deleteBookingOnOrderDelete

        // Hapus Pesanan
        await prisma.pesanan.delete({
            where: { id },
        });

        res.json({ success: true, message: "Pesanan berhasil dihapus" });
    } catch (err) {
        console.error("Error delete:", err);
        res.status(500).json({ success: false, error: "Gagal menghapus pesanan" });
    }
};

// Export semua fungsi yang digunakan di routes
module.exports = {
    createPesanan,
    deletePesanan,
    
};
