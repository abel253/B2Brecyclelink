// ከላይ db.js ፋይልን እናመጣለን (እንደ ፋይሉ መገኛ ርቀት ../db ወይም ./db ሊሆን ይችላል)
const pool = require('../db'); 

// የ tree መረጃዎችን ከዳታቤዝ ለማምጣት የምትጠቀምበት ፈንክሽን
async function getTreeData(req, res) {
    try {
        // ከፑሉ ላይ አንድ ኮኔክሽን በራሱ ተበድሮ ያመጣል፣ ሲጨርስም ይመልሳል
        const [rows] = await pool.execute('SELECT * FROM የ_tree_ሰንጠረዥ_ስም'); 
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    // ምንም አይነት connection.end() እዚህ ጋር አያስፈልግም!
}