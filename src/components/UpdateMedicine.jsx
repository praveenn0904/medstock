import React, { useState } from "react";
import "../styles/UpdateMedicine.css";

const UpdateMedicine = () => {
  const [formData, setFormData] = useState({
    medicineId: "",
    name: "",
    quantity: "",
    manufactureDate: "",
    expiryDate: "",
    price: "",
    manufacturer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`http://localhost:5000/api/medicine/${formData.medicineId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        const data = await res.json();
        alert("Medicine details updated successfully!");
        console.log("Updated:", data);
      } else {
        const errData = await res.json();
        alert("Failed to update medicine: " + errData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error while updating medicine.");
    }
  };
  

  return (
    <div className="update-medicine-container">
      <h2>Update Medicine Details</h2>
      <form className="update-medicine-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Medicine ID</label>
          <input type="text" name="medicineId" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Medicine Name</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Manufacture Date</label>
          <input type="date" name="manufactureDate" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input type="date" name="expiryDate" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" onChange={handleChange} />
        </div>
        <div className="form-group full-width">
          <label>Manufacturer Details</label>
          <textarea name="manufacturer" rows="3" onChange={handleChange} />
        </div>
        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateMedicine;
