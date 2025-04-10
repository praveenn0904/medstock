const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicineModel');

// Add new medicine
router.post('/add', async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json({ message: 'Medicine added successfully' });
  } catch (err) {
    console.error('Error adding medicine:', err);
    res.status(500).json({ error: 'Server error while adding medicine' });
  }
});

// Get all medicines
router.get('/all', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    console.error('Error fetching medicines:', err);
    res.status(500).json({ error: 'Server error while fetching medicines' });
  }
});

// (Optional) Get medicine by ID
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    console.error('Error fetching medicine:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// DELETE a medicine by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedMed = await Medicine.findByIdAndDelete(req.params.id);
      if (!deletedMed) return res.status(404).json({ error: "Medicine not found" });
      res.status(200).json({ message: "Medicine deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
