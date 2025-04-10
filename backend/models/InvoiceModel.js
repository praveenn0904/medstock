const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  mfgDate: String,
  expDate: String,
  qty: Number,
  mrp: Number,
  discount: Number
});

const InvoiceSchema = new mongoose.Schema({
  invoiceNo: String,
  invoiceDate: String,
  customerName: String,
  customerGSTIN: String,
  placeOfSupply: String,
  items: [ItemSchema],
  taxableTotal: Number,
  taxAmount: Number,
  grandTotal: Number
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
