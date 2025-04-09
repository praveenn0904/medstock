// src/components/ViewMedicine.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ViewMedicine.css";

const ViewMedicine = () => {
  const navigate = useNavigate();
  const medicines = JSON.parse(localStorage.getItem("medicines")) || [];

  const handleCardClick = (medicine) => {
    navigate("/medicine-details", { state: medicine });
  };

  return (
    <div className="view-medicine-container">
      <h2>All Medicines</h2>
      <div className="medicine-card-grid">
        {medicines.length > 0 ? (
          medicines.map((med, index) => (
            <div
              className="medicine-card"
              key={index}
              onClick={() => handleCardClick(med)}
            >
              <img src={med.photo} alt={med.name} className="medicine-image" />
              <div className="medicine-info">
                <h3>{med.name}</h3>
                <p><strong>Qty:</strong> {med.quantity}</p>
                <p><strong>Price:</strong> ₹{med.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No medicines found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewMedicine;
