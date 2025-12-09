// server.js (Menggunakan Sintaks ESM - Solusi A)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// ⚠️ Catatan Penting: Dalam ESM, path relatif memerlukan ekstensi file (.js)
import pesananRoutes from './src/routes/pesananRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Skyfly Backend API is running on Vercel! 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/pesanan", pesananRoutes);

// 🔑 KUNCI VERCEL (Dalam ESM): Gunakan 'export default'
export default app;