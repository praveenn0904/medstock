const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  manufacturedDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  price: { type: Number, required: true },
  manufacturer: { type: String, required: true }
});

module.exports = mongoose.model('Medicine', medicineSchema);
