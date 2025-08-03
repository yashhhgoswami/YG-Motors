// src/SignUpPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';
import './SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill out all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // --- REDIRECT to profile creation page ---
        navigate('/create-profile');
      })
      .catch((error) => {
        console.log("Firebase SignUp Error:", error);
        if (error.code === 'auth/email-already-in-use') {
          setError('This email address is already in use.');
        } else if (error.code === 'auth/weak-password') {
          setError('Password should be at least 6 characters.');
        } else {
          setError('Failed to create an account. Please try again.');
        }
      });
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-wrapper">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">Join the exclusive world of YG MOTORS.</p>
        <div className="social-signup-options">
          <button className="social-button google">Sign in with Google</button>
          <button className="social-button facebook">Sign in with Facebook</button>
        </div>
        <div className="divider"><span>OR</span></div>
        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="signup-button">Create Account</button>
        </form>
        <div className="login-prompt">
          <p>Already have an account? <Link to="/login" className="login-link">Log in.</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
