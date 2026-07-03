const express = require('express');
const router = express.Router();
// ፋይሉ ያለበትን ቦታ ደግመህ አረጋግጥ (../controllers/listingController)
const listingController = require('../controllers/listingController');

// እዚህ ጋር listingController.getStats መኖሩን እና ፈንክሽን መሆኑን ያረጋግጣል
if (listingController && listingController.getStats) {
    router.get('/dashboard-data', listingController.getStats);
} else {
    console.error("Error: listingController.getStats is not defined!");
}

module.exports = router;