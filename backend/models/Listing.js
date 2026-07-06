const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true }, // Plastic, Metal, Paper...
    price: { type: Number, required: true },
    weight: { type: String, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, default: "https://cdn-icons-png.flaticon.com/512/815/815525.png" },
    featured: { type: Boolean, default: false },
    sellerId: { type: String, required: true }, // ሻጩን ለመለየት
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listing', listingSchema);