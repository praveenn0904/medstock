import React, { useState } from 'react';
import "../styles/AddMedicine.css";
import Sidebar from './SideBar';

function AddMedicine() {
  const [medicineData, setMedicineData] = useState({
    id: '',
    name: '',
    quantity: '',
    manufacturedDate: '',
    expiryDate: '',
    price: '',
    manufacturer: '',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/medicine/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicineData),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.message || "Something went wrong");
        return;
      }

      setSuccessMsg("Medicine added successfully!");
      setErrorMsg('');
      setMedicineData({
        id: '',
        name: '',
        quantity: '',
        manufacturedDate: '',
        expiryDate: '',
        price: '',
        manufacturer: '',
      });
    } catch (error) {
      setErrorMsg("Failed to add medicine. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="add-medicine-container">
        <h2>Add New Medicine</h2>

        {successMsg && <div className="success-msg">{successMsg}</div>}
        {errorMsg && <div className="error-msg">{errorMsg}</div>}

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
            <label>Price (₹)</label>
            <input type="number" name="price" value={medicineData.price} onChange={handleChange} required />
          </div>

          <div className="form-group full-width">
            <label>Manufacturer Details</label>
            <textarea name="manufacturer" value={medicineData.manufacturer} onChange={handleChange} rows="3" required />
          </div>

          <button type="submit" className="submit-btn">Add Medicine</button>
        </form>
      </div>
    </div>
  );
}

export default AddMedicine;
