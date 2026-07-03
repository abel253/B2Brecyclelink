const db = require('../db');

// ለየብቻ ኤክስፖርት ማድረጉ ስህተትን ይቀንሳል
const getStats = async (req, res) => {
    try {
        const [user] = await db.query("SELECT * FROM users WHERE id = 1");
        const [listings] = await db.query("SELECT * FROM listings WHERE status = 'available'");
        
        res.json({ 
            user: user[0] || { company_name: "New Company", eco_points: 0 }, 
            listings: listings 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// ይህን መስመር በትክክል መኖሩን አረጋግጥ
module.exports = { getStats };