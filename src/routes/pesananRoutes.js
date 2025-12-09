// src/routes/pesananRoutes.js (COMMONJS)

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const verifyToken = require("../middlewares/verifyToken.js");
const isAdmin = require("../middlewares/isAdmin.js");

const router = express.Router();
const prisma = new PrismaClient();

// =================== CREATE PESANAN (POST /) ===================
router.post("/", verifyToken, async (req, res) => {
    try {
        // 🔑 Ambil userId yang aman dan sudah diverifikasi dari token
        // Asumsi verifyToken menempelkan data token di req.user
        const userIdFromToken = req.user.userId; 

        // 🚨 Hapus userId dari body (payload) karena kita sudah punya yang lebih aman dari token.
        const { userId, ...data } = req.body; 

        const newOrder = await prisma.pesanan.create({
            data: {
                ...data, // Semua data dari frontend
                userId: userIdFromToken, // 🔑 Gunakan userId yang valid dari token
                tanggalOrder: data.tanggalOrder ?? new Date().toISOString(),
                status: "Menunggu Pembayaran", 
                paid: false, // Asumsi pesanan baru belum dibayar
            },
        });

        res.status(201).json({ // Menggunakan 201 Created untuk POST
            success: true,
            message: "Pesanan berhasil dibuat",
            order: newOrder,
        });
    } catch (err) {
        console.error("Error create order:", err); 
        res.status(500).json({ success: false, error: "Gagal membuat pesanan" });
    }
});

// =================== GET PESANAN USER (GET /riwayat) ===================
router.get("/riwayat", verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Mengambil userId dari token

        const allOrders = await prisma.pesanan.findMany({
            where: { userId },
            orderBy: { id: "desc" },
        });

        res.json({ success: true, data: allOrders });
    } catch (err) {
        console.error("Error get orders:", err);
        res.status(500).json({ success: false, error: "Gagal mengambil pesanan" });
    }
});

// =================== DELETE PESANAN (DELETE /:id) ===================
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Opsi: Tambahkan logika otorisasi untuk memastikan pengguna hanya bisa menghapus pesanannya sendiri
        
        const deleted = await prisma.pesanan.delete({
            where: { id },
        });

        res.json({
            success: true,
            message: "Pesanan berhasil dihapus",
            deleted,
        });
    } catch (err) {
        console.error("Error delete order:", err);
        res.status(500).json({ success: false, error: "Gagal menghapus pesanan" });
    }
});

// =================== UPDATE PESANAN (PUT /:id) ===================
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Opsi: Tambahkan logika otorisasi jika pesanan bukan milik pengguna
        
        const updated = await prisma.pesanan.update({
            where: { id },
            data: req.body,
        });

        res.json({
            success: true,
            message: "Pesanan berhasil diperbarui",
            updated,
        });
    } catch (err) {
        console.error("Error update order:", err);
        res.status(500).json({ success: false, error: "Gagal memperbarui pesanan" });
    }
});

// =================== ADMIN: GET SEMUA PESANAN (GET /admin/all) ===================
router.get("/admin/all", verifyToken, isAdmin, async (req, res) => { // Pastikan verifyToken ada sebelum isAdmin
    try {
        const allOrders = await prisma.pesanan.findMany({
            orderBy: { id: "desc" },
        });

        res.json({ success: true, data: allOrders });
    } catch (err) {
        console.error("Error get all orders (Admin):", err);
        res.status(500).json({ success: false, error: "Gagal mengambil semua pesanan" });
    }
});

// KUNCI: Export sebagai CommonJS
module.exports = router;
