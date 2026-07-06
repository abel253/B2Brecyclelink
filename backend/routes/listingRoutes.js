const express = require('express');
const router = express.Router();
const pool = require('../db'); // አሁን የፈጠርነውን ፋይል እዚህ ጋር እንጠራዋለን

// የ tree መረጃዎችን ከMySQL ለማምጣት
router.get('/trees', async (req, res) => {
    try {
        // ከፑሉ ላይ አንድ ኮኔክሽን በራሱ ተበድሮ ያመጣል፣ ሲጨርስም ይመልሳል
        const [rows] = await pool.execute('SELECT * FROM tree ORDER BY id DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    // ምንም አይነት connection.end() ወይም መዝጋት እዚህ አያስፈልግም!
});

module.exports = router;