import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // import useLocation
import "../styles/UpdateMedicine.css";

const UpdateMedicine = () => {
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    quantity: "",
    manufactureDate: "",
    expiryDate: "",
    price: "",
    manufacturer: "",
  });

  const navigate = useNavigate();
  const location = useLocation(); // get passed state

  useEffect(() => {
    if (location.state && location.state.medicine) {
      const medicine = location.state.medicine;
      setFormData({
        _id: medicine._id || "",
        name: medicine.name || "",
        quantity: medicine.quantity || "",
        manufactureDate: medicine.manufacturedDate ? medicine.manufacturedDate.split('T')[0] : "",
        expiryDate: medicine.expiryDate ? medicine.expiryDate.split('T')[0] : "",
        price: medicine.price || "",
        manufacturer: medicine.manufacturer || "",
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/medicine/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        alert("✅ Medicine updated successfully!");
        console.log("Updated:", data);
        navigate("/view-medicine");
      } else {
        const errData = await res.json();
        alert("❌ Failed to update medicine: " + (errData.message || "Unknown Error"));
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
        {/* Hidden ID Field */}
        <input type="hidden" name="_id" value={formData._id} />

        <div className="form-group">
          <label>Medicine Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Manufacture Date</label>
          <input
            type="date"
            name="manufactureDate"
            value={formData.manufactureDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Manufacturer Details</label>
          <textarea
            name="manufacturer"
            rows="3"
            value={formData.manufacturer}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateMedicine;
