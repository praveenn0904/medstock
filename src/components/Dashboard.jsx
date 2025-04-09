import React from 'react';
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
import { Bell, ShoppingCart, User } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Sre Amman Pharma </div>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-medicine">Add Medicine</Link></li>
            <li><Link to="/update-medicine">Update Medicine</Link></li>
            <li><Link to="/billing">Billing</Link></li>
            <li><Link to="/purchase-order">Purchase Order</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <input type="text" placeholder="Search" className="search-bar" />
          <div className="top-icons">
            <Bell size={20} />
            <ShoppingCart size={20} />
            <div className="profile-icon"><User size={20} /></div>
          </div>
        </header>

        <section className="performance-section">
          <div className="card welcome-card">
            <h2>Welcome, Admin</h2>
            <p>Here's your overview for today.</p>
          </div>
          <div className="card notification-card">
            <h3>Expiring Medicines</h3>
            <p>3 medicines are about to expire.</p>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-box">
            <h4>Total Medicines</h4>
            <p>120</p>
          </div>
          <div className="stat-box">
            <h4>Low Stock</h4>
            <p>8</p>
          </div>
          <div className="stat-box">
            <h4>Orders</h4>
            <p>23</p>
          </div>
          <div className="stat-box">
            <h4>Sales This Month</h4>
            <p>₹50,000</p>
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
