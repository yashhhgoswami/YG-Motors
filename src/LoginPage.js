// src/LoginPage.js (UPDATED TO TRIGGER ADMIN LOGIN)

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';
import './LoginPage.css';

// The component now accepts the onAdminLogin function as a prop
function LoginPage({ onAdminLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    setError('');

    if (email === 'yashhhvalo@gmail.com' && password === '1107ykG@@2003') {
      onAdminLogin(); // --- THIS IS THE NEW, CRUCIAL STEP ---
      navigate('/admin/dashboard'); // Navigate to the new dashboard
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/profile');
      })
      .catch((error) => {
        setError('Invalid email or password. Please try again.');
      });
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">Client Access</h1>
        <p className="login-subtitle">Enter your credentials to access the YG MOTORS portal.</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-prompt">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Create one now.</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;