// src/routes/authRoutes.js (CommonJS)

const express = require('express');
// Menggunakan require() untuk import fungsi dari controller
const { register, login } = require('../controllers/authController.js'); 

const router = express.Router();

// Route untuk registrasi user baru
router.post('/register', register);

// Route untuk login user
router.post('/login', login);

// Menggunakan module.exports
module.exports = router;
