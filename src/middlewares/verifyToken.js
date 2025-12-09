import jwt from "jsonwebtoken";

// 🚨 PERBAIKAN: Gunakan KUNCI RAHASIA TUNGGAL SAMA PERSIS seperti di authController.js!
const GLOBAL_JWT_SECRET = process.env.JWT_SECRET || 'skyfly_kunci_rahasia_anda_harus_panjang';

export default function verifyToken(req, res, next) {
    const header = req.header("Authorization");

    if (!header) {
        return res.status(401).json({ message: "Silahkan login terlebih dahulu." });
    }

    const token = header.replace("Bearer ", "");

    try {
        // 🔑 Gunakan GLOBAL_JWT_SECRET untuk memverifikasi token
        const decoded = jwt.verify(token, GLOBAL_JWT_SECRET); 
        req.user = decoded; // simpan userId ke request
        next();
    } catch (err) {
        // Jika verifikasi gagal (invalid, expired, dll.)
        return res.status(401).json({ message: "Token tidak valid atau sesi berakhir." });
    }
}