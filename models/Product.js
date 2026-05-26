const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    brand: { type: String, default: 'NoBrand' },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: null },
    discount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    images: [String],
    desc: { type: String, default: '' },
    specs: { type: Map, of: String, default: {} },
    colors: [String],
    sizes: [String]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);