import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';

function Signup() {
  return (
    <div className="main-container">
      <div className="left-panel" />

      <div className="right-panel">
       
        <div className="brand-name">Sre Amman Pharma Agency</div>
        <div className="tagline">Create Your Account</div>

        <form>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>

        <p>
        <p>Already have an account? <Link to="/">Login here</Link></p>
        </p>
      </div>
    </div>
  );
}

export default Signup;
