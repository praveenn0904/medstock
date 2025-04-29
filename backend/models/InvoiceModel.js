// models/Invoice.js

const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNo: Number,
  date: String,
  customer: {
    name: String,
    gstin: String,
    place: String,
  },
  items: Array,
  totalTaxableValue: Number,
  cgst: Number,
  sgst: Number,
  grandTotal: Number,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
