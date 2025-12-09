import express from 'express';
// Pastikan .js ditambahkan
import { register, login } from '../controllers/authController.js'; 

const router = express.Router();

// Route untuk registrasi user baru
router.post('/register', register);

// Route untuk login user
router.post('/login', login);

export default router;