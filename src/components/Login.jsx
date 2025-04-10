import React, { useState } from 'react';
import '../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Login successful');
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="main-container">
      <div className="left-panel" />
      <div className="right-panel">
        <div className="brand-name">Sre Amman Pharma Agency</div><br></br>

        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
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
