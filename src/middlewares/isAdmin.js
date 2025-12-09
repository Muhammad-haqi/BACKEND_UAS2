// src/middlewares/isAdmin.js (FIXED CommonJS)

// TIDAK ADA import verifyToken di sini! Kita asumsikan verifyToken dipanggil sebelumnya di route.

function isAdmin(req, res, next) {
    // Middleware ini hanya memeriksa req.user yang seharusnya sudah diisi oleh verifyToken
    
    // Cek apakah req.user ada (artinya token sudah diverifikasi) dan role-nya adalah 'admin'
    if (req.user && req.user.role === 'admin') {
        next(); // Lanjutkan ke route jika user adalah admin
    } else {
        // Tolak akses (403 Forbidden)
        return res.status(403).json({ 
            message: "Akses ditolak. Diperlukan hak akses Admin." 
        });
    }
}

// Export fungsi tunggal
module.exports = isAdmin;
