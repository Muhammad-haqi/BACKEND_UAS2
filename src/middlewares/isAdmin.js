// File: src/middlewares/isAdmin.js
import verifyToken from './verifyToken.js'; 

export default function isAdmin(req, res, next) {
    // Jalankan middleware otentikasi (verifyToken) terlebih dahulu
    // Ini akan mendekode token dan mengisi req.user
    verifyToken(req, res, () => {
        // Cek apakah verifyToken gagal mengisi req.user atau jika token valid tapi role bukan admin
        if (req.user && req.user.role === 'admin') {
            next(); // Lanjutkan ke route jika user adalah admin
        } else {
            // Tolak akses (403 Forbidden)
            return res.status(403).json({ 
                message: "Akses ditolak. Diperlukan hak akses Admin." 
            });
        }
    });
}