import express from "express";
import { PrismaClient } from "@prisma/client";
import verifyToken from "../middlewares/verifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();
const prisma = new PrismaClient();

// =================== CREATE PESANAN (DIPERBAIKI) ===================
router.post("/", verifyToken, async (req, res) => {
    try {
        // 🔑 Ambil userId yang aman dan sudah diverifikasi dari token
        // Asumsi JWT payload Anda menyimpan user ID sebagai 'userId'
        const userIdFromToken = req.user.userId; 

        // 🚨 Hapus userId dari body (payload) karena kita sudah punya yang lebih aman dari token.
        // Data yang dikirim dari frontend tidak lagi menyertakan userId.
        const { userId, ...data } = req.body; 

        const newOrder = await prisma.pesanan.create({
            data: {
                ...data, // Semua data dari frontend
                userId: userIdFromToken, // 🔑 Gunakan userId yang valid dari token
                tanggalOrder: data.tanggalOrder ?? new Date().toISOString(),
                // 🚨 PERBAIKAN PRISMA: Tambahkan status default
                status: "Menunggu Pembayaran", 
                paid: false, // Asumsi pesanan baru belum dibayar
            },
        });

        res.status(200).json({
            success: true,
            message: "Pesanan berhasil dibuat",
            order: newOrder,
        });
    } catch (err) {
        // Log error lengkap di terminal server untuk diagnosis
        console.error("Error create order:", err); 
        res.status(500).json({ success: false, error: "Gagal membuat pesanan" });
    }
});

// =================== GET PESANAN USER (Sisa code tetap sama) ===================
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

// =================== DELETE PESANAN (Sisa code tetap sama) ===================
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);

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

// =================== UPDATE PESANAN (Sisa code tetap sama) ===================
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const id = parseInt(req.params.id);

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

    router.get("/admin/all", isAdmin, async (req, res) => {
    try {
        // Ambil SEMUA pesanan tanpa filter userId
        const allOrders = await prisma.pesanan.findMany({
            orderBy: { id: "desc" },
        });

        res.json({ success: true, data: allOrders });
    } catch (err) {
        console.error("Error get all orders (Admin):", err);
        res.status(500).json({ success: false, error: "Gagal mengambil semua pesanan" });
    }
});

export default router;