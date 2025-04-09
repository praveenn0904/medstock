import React from 'react';
import '../styles/ForgotPassword.css';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2 className="forgot-title">Forgot Password</h2>
        <p className="forgot-subtitle">
          Enter your email and we'll send you a reset link.
        </p>

        <form className="forgot-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Send Reset Link</button>
        </form>

        <p className="forgot-back">
          <Link to="/">← Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
