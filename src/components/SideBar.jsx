import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Sidebar.css"; // You can optionally create Sidebar-specific styles

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">Sre Amman Pharma</div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/add-medicine">Add Medicine</Link></li>
          <li><Link to="/view-medicine">View Medicine</Link></li>
          <li><Link to="/billing">Billing</Link></li>

        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
