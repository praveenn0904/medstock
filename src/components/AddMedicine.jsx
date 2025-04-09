import React, { useState } from 'react';
import "../styles/AddMedicine.css";

function AddMedicine() {
  const [medicineData, setMedicineData] = useState({
    id: '',
    name: '',
    quantity: '',
    manufacturedDate: '',
    expiryDate: '',
    price: '',
    manufacturer: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setMedicineData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just logging the data
    console.log('Medicine Data:', medicineData);

    // You can add API submission logic here later
    alert("Medicine added successfully!");

    // Reset form
    setMedicineData({
      id: '',
      name: '',
      quantity: '',
      manufacturedDate: '',
      expiryDate: '',
      price: '',
      manufacturer: '',
      photo: null,
    });
  };

  return (
    <div className="add-medicine-container">
      <h2>Add New Medicine</h2>
      <form className="add-medicine-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Medicine ID</label>
          <input type="text" name="id" value={medicineData.id} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Medicine Name</label>
          <input type="text" name="name" value={medicineData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" value={medicineData.quantity} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Manufactured Date</label>
          <input type="date" name="manufacturedDate" value={medicineData.manufacturedDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Expiry Date</label>
          <input type="date" name="expiryDate" value={medicineData.expiryDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={medicineData.price} onChange={handleChange} required />
        </div>

        <div className="form-group full-width">
          <label>Medicine Photo</label>
          <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </div>

        <div className="form-group full-width">
          <label>Manufacturer Details</label>
          <textarea name="manufacturer" value={medicineData.manufacturer} onChange={handleChange} rows="3" required></textarea>
        </div>

        <button type="submit" className="submit-btn">Add Medicine</button>
      </form>
    </div>
  );
}

export default AddMedicine;
