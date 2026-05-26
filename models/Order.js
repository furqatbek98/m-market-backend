const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: String,
  color: String,
  size: String,
  quantity: Number,
  price: Number
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: String
  },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, enum: ['yangi', 'jarayonda', 'yetkazildi', 'bekor_qilindi'], default: 'yangi' },
  paymentMethod: { type: String, enum: ['naqd', 'karta'], default: 'naqd' }
}, { timestamps: true });

orderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    const now = new Date();
    const y = now.getFullYear().toString().slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const r = Math.floor(Math.random() * 9000) + 1000;
    this.orderNumber = `M-${y}${m}${d}-${r}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);