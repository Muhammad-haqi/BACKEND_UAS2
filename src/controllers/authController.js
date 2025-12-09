// src/controllers/authController.js (FIXED CommonJS)

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Ambil dari Environment Variable Vercel
const GLOBAL_JWT_SECRET = process.env.JWT_SECRET || 'skyfly_kunci_rahasia_anda_harus_panjang'; 

// Fungsi untuk Registrasi User
const register = async (req, res) => {
    const { identifier, password, namaLengkap } = req.body;

    if (!identifier || !password || !namaLengkap) {
        return res.status(400).json({ message: "Semua field harus diisi." });
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier.includes('@') ? identifier : undefined },
                    { nomorHp: !identifier.includes('@') ? identifier : undefined },
                ],
            },
        });

        if (existingUser) {
            return res.status(409).json({ message: "Email atau Nomor HP sudah terdaftar." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userData = {
            namaLengkap,
            password: hashedPassword,
        };

        if (identifier.includes('@')) {
            userData.email = identifier;
        } else {
            userData.nomorHp = identifier;
        }
        
        const newUser = await prisma.user.create({
            data: userData,
        });

        const userRole = newUser.role ? newUser.role.trim() : 'user';

        const token = jwt.sign({ userId: newUser.id, role: userRole }, GLOBAL_JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({
            message: "Registrasi berhasil!",
            token,
            user: { 
                id: newUser.id, 
                email: newUser.email, 
                nomorHp: newUser.nomorHp, 
                namaLengkap: newUser.namaLengkap,
                role: userRole
            }
        });

    } catch (error) {
        console.error('Error saat registrasi:', error);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
};

// Fungsi untuk Login User
const login = async (req, res) => {
    const { identifier, password } = req.body; 

    if (!identifier || !password) {
        return res.status(400).json({ message: "Identifier dan Password harus diisi." });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier.includes('@') ? identifier : undefined },
                    { nomorHp: !identifier.includes('@') ? identifier : undefined },
                ],
            },
        });

        if (!user) {
            return res.status(401).json({ message: "Kredensial tidak valid." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Kredensial tidak valid." });
        }

        const userRole = user.role ? user.role.trim() : 'user';

        const token = jwt.sign({ userId: user.id, role: userRole }, GLOBAL_JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            message: "Login berhasil!",
            token,
            user: { 
                id: user.id, 
                email: user.email, 
                nomorHp: user.nomorHp, 
                namaLengkap: user.namaLengkap,
                role: userRole
            }
        });

    } catch (error) {
        console.error('Error saat login:', error);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
};

// KUNCI: Mengekspor semua fungsi sebagai objek CommonJS
module.exports = {
    register,
    login
};
