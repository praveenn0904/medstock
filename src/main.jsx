import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component imports
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import AddMedicine from "./components/AddMedicine"; 
import UpdateMedicine from "./components/UpdateMedicine";
import ViewMedicine from "./components/ViewMedicine";
import Billing from "./components/Billing";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-medicine" element={<AddMedicine />} /> 
        <Route path="/update-medicine/:id" element={<UpdateMedicine />} /> {/* 💥 This is needed */}
        <Route path="/view-medicine" element={<ViewMedicine />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
