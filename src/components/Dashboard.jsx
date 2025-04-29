import React, { useEffect, useState } from 'react';
import "../styles/Dashboard.css";
import Sidebar from './SideBar';
import { Link } from "react-router-dom";

const Dashboard = () => {
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
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow;
  });

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <header className="topbar company-info">
          <center>
            <h2>Sre Amman Pharma Agency</h2>
            <p>36, Pavadai Street, Erode - 638 001</p>
            <p><strong>GSTIN:</strong> 33AYDPS3699G1Z1</p>
          </center>
        </header>

        <section className="performance-section">
          <div className="card notification-card">
            <h3>Expiring Medicines</h3>
            <ul>
              {expiringSoon.map((med) => (
                <li key={med._id}>
                  {med.name} - Expires on {new Date(med.expiryDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-box"><h4>Total Medicines</h4><p>{stats.totalMedicines}</p></div>
          <div className="stat-box"><h4>Low Stock</h4><p>{stats.lowStock}</p></div>
          <div className="stat-box">
            <h4>Expiring Medicines</h4>
            <p>{medicines.filter(med => new Date(med.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length}</p>
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
