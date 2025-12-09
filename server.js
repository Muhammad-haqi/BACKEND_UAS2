// server.js (CommonJS)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Menggunakan require() untuk modul routes
const pesananRoutes = require('./src/routes/pesananRoutes.js');
const authRoutes = require = ('./src/routes/authRoutes.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Skyfly Backend API is running on Vercel! 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/pesanan", pesananRoutes);

// KUNCI VERCEL (CommonJS): Menggunakan module.exports
module.exports = app;
