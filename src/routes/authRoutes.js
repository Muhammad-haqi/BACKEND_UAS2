// src/routes/authRoutes.js (FIXED CommonJS)

const express = require('express');
// MENGGUNAKAN require() untuk import fungsi dari controller
const { register, login } = require('../controllers/authController.js'); 

const router = express.Router();

// Route untuk registrasi user baru
router.post('/register', register);

// Route untuk login user
router.post('/login', login);

// MENGGUNAKAN module.exports untuk export router
module.exports = router;
