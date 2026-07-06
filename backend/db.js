const mysql = require('mysql2/promise');

// የኮኔክሽን ፑል ማዘጋጃ (ይህ አፕሊኬሽኑ ሲነሳ አንድ ጊዜ ብቻ ነው የሚሰራው)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'recycle_admin', // እዚህ ጋር 'recycle_admin' አድርገው
    password: '1212', 
    database: 'RecycleLink',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// ፑሉን ለሌሎች ፋይሎች አሳልፎ መስጠት
module.exports = pool;