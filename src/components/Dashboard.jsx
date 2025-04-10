import React, { useEffect, useState } from 'react';
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
import { Bell, ShoppingCart, User } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMedicines: 0,
    lowStock: 0,
    orders: 0,
    monthlySales: 0,
    expiringSoon: 0
  });


  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Sre Amman Pharma</div>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-medicine" className="nav-link">Add Medicine</Link></li>
            <li><Link to="/update-medicine">Update Medicine</Link></li>
            <li><Link to="/view-medicine">View Medicine</Link></li>
            <li><Link to="/billing">Billing</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="top-icons">
          </div>
        </header>

        <section className="performance-section">
         
          <div className="card notification-card">
            <h3>Expiring Medicines</h3>
            <p>{stats.expiringSoon} medicines are about to expire.</p>
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
            <h4>Orders</h4>
            <p>{stats.orders}</p>
          </div>
          <div className="stat-box">
            <h4>Sales This Month</h4>
            <p>₹{stats.monthlySales}</p>
          </div>
        </section>

        <section className="chart-section">
          <h3>Monthly Sales Overview</h3>
          <div className="chart-placeholder">[Graph Here]</div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
