// src/middlewares/verifyToken.js (FIXED CommonJS)

const jwt = require('jsonwebtoken');

// Pastikan ini adalah SECRET KEY yang sama dengan yang ada di authController.js dan Vercel ENV
const GLOBAL_JWT_SECRET = process.env.JWT_SECRET || 'skyfly_kunci_rahasia_anda_harus_panjang'; 

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    // Cek apakah header Authorization ada dan formatnya Bearer Token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan atau format salah." });
    }

    // Ambil token (hapus 'Bearer ')
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Akses ditolak. Token hilang." });
    }

    try {
        // Dekode token
        const decoded = jwt.verify(token, GLOBAL_JWT_SECRET);
        
        // Simpan payload token di req.user untuk digunakan oleh route dan middleware lain
        req.user = decoded; 
        
        next(); // Lanjutkan ke middleware atau route berikutnya
    } catch (err) {
        // Jika token tidak valid (expired, signature error)
        return res.status(403).json({ message: "Token tidak valid atau kadaluarsa." });
    }
}

// Export fungsi tunggal
module.exports = verifyToken;
