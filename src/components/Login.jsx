import React from 'react';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // prevent form from reloading the page
    navigate('/dashboard'); // navigate to dashboard page
  };

  return (
    <div className="main-container">
      <div className="left-panel" />

      <div className="right-panel">
        <div className="brand-name">Sre Amman Pharma Agency</div>
        <div className="tagline"></div>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>

        <p>
          New user? <Link to="/signup" className="auth-link">Sign up here</Link><br />
          Forgot password? <Link to="/forgot-password" className="auth-link">Reset it here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
