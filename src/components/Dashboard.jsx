import React, { useEffect, useState } from 'react';
import "../styles/Dashboard.css";
import Sidebar from './SideBar';
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalMedicines: 0,
    lowStock: 0,
    orders: 0,
    monthlySales: 0,
    expiringSoon: 0
  });

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const res = await fetch("http://localhost:5000/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    };

    const fetchMedicines = async () => {
      const res = await fetch("http://localhost:5000/api/medicine/all");
      const data = await res.json();
      setMedicines(data);
    };

    fetchDashboardStats();
    fetchMedicines();
  }, []);

  const expiringSoon = medicines.filter(med => {
    const expiryDate = new Date(med.expiryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thirtyDaysFromNow = new Date(today);
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return expiryDate > today && expiryDate <= thirtyDaysFromNow;
  });

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Clear any stored user/session data if applicable
      // localStorage.removeItem('user'); or sessionStorage.clear(); as needed

      navigate("/"); // Redirect to login page
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <header className="topbar company-info">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flexGrow: 1, textAlign: "center" }}>
              <h2>Sre Amman Pharma Agency</h2>
              <p>36, Pavadai Street, Erode - 638 001</p>
              <p><strong>GSTIN:</strong> 33AYDPS3699G1Z1</p>
            </div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </header>

        <section className="performance-section">
          <div className="card notification-card">
            <h3>Expiring Medicines</h3>
            {expiringSoon.length === 0 ? (
              <p>No medicines expiring in the next 30 days.</p>
            ) : (
              <ul>
                {expiringSoon.map((med) => (
                  <li key={med._id}>
                    {med.name} - Expires on {new Date(med.expiryDate).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-box">
            <h4>Total Medicines</h4>
            <p>{stats.totalMedicines}</p>
          </div>
          <div className="stat-box">
            <h4>Low Stock</h4>
            <p>{stats.lowStock}</p>
          </div>
          <div className="stat-box">
            <h4>Expiring Medicines</h4>
            <p>{expiringSoon.length}</p>
          </div>
        </section>

        <section className="chart-section">
          <h3>Low Stock Medicines</h3>
          {medicines.filter(med => med.quantity <= 10).length === 0 ? (
            <p>No low stock medicines.</p>
          ) : (
            <ul className="recent-meds">
              {medicines
                .filter(med => med.quantity <= 10)
                .map((med) => (
                  <li key={med._id}>
                    <strong>{med.name}</strong> – Qty: {med.quantity}, Exp: {new Date(med.expiryDate).toLocaleDateString()}
                  </li>
                ))}
            </ul>
          )}
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
