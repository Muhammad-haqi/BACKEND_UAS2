// controllers/pesananController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// AMBIL SEMUA PESANAN
exports.getAllPesanan = async (req, res) => {
  try {
    const data = await prisma.pesanan.findMany({
      orderBy: { id: "desc" },
    });

    res.json({ success: true, data });
  } catch (err) {
    console.error("Error get all:", err);
    res.status(500).json({ success: false, error: "Gagal mengambil pesanan" });
  }
};

// UPDATE PESANAN (Bayar / Edit / Refund)
exports.updatePesanan = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const updated = await prisma.pesanan.update({
      where: { id },
      data: req.body,
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Error update:", err);
    res.status(500).json({ success: false, error: "Gagal update pesanan" });
  }
};

// HAPUS PESANAN
exports.deletePesanan = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.pesanan.delete({
      where: { id },
    });

    res.json({ success: true, message: "Pesanan berhasil dihapus" });
  } catch (err) {
    console.error("Error delete:", err);
    res.status(500).json({ success: false, error: "Gagal menghapus pesanan" });
  }
};
