const express = require('express');
const pool = require('./db'); // የ db.js ፋይል host, user, password እና database ትክክል መሆኑን አረጋግጥ
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // ፎልደር ለመፍጠር
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// የምስል ፎልደር ከሌለ እንዲፈጠር
const uploadDir = './uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static('uploads'));

// ምስል መቀበያ (Multer Setup)
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, 'IMG-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });
// --- የተስተካከለ የምዝገባ ክፍል ---
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        
        // 1. ኢሜይሉ ቀድሞ መኖሩን ማረጋገጥ
        const [existing] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: "ይህ ኢሜይል ቀድሞ ተመዝግቧል!" });
        }

        // 2. ፓስወርድ Hash ማድረግ
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 3. ዳታቤዝ ውስጥ ማስገባት (name, email, phone, password)
        const sql = 'INSERT INTO users (fullName, email, phone, password) VALUES (?, ?, ?, ?)';
        await pool.execute(sql, [name, email, phone, hashedPassword]);
        
        res.status(201).json({ message: "ተመዝግበዋል! አሁን Login ማድረግ ይችላሉ።" });
    } catch (err) {
        console.error("Database Registration Error:", err.message); 
        res.status(500).json({ message: "ምዝገባው አልተሳካም። " + err.message });
    }
});

// --- 2. USER LOGIN ---
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "ተጠቃሚው አልተገኘም! እባክዎ መጀመሪያ ይመዝገቡ።" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "ኢሜይል ወይም ፓስወርድ ተሳስቷል!" });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            'secret123', 
            { expiresIn: '2h' }
        );

        res.json({ 
            token, 
            role: user.role, 
            fullName: user.fullName, 
            userId: user.id 
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

// --- 3. CREATE LISTING (DashboardPost ገጽ የሚጠቀምበት) ---
app.post('/api/listings', upload.single('image'), async (req, res) => {
    try {
        const { title, category, price, weight, location, role, sellerId } = req.body;
        const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';

        // በዳታቤዝህ መሰረት 'seller_id' እና ሌሎች ስሞች መመሳሰላቸውን አረጋግጥ
        await pool.execute(
            'INSERT INTO listings (seller_id, title, category, weight, price, location, role, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [sellerId, title, category, weight, price, location, role, imageUrl]
        );
        res.status(201).json({ message: "በተሳካ ሁኔታ ተለጥፏል!" });
    } catch (err) {
        console.error("Listing Post Error:", err);
        res.status(500).json({ error: "መረጃውን መመዝገብ አልተቻለም" });
    }
});

// --- 4. GET ALL LISTINGS (ለ Marketplace) ---
app.get('/api/listings', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM listings ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching marketplace data" });
    }
});

// --- 5. GET USER SPECIFIC LISTINGS (ለ Dashboard) ---
app.get('/api/listings/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const [rows] = await pool.execute('SELECT * FROM listings WHERE seller_id = ? ORDER BY created_at DESC', [userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user listings" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));