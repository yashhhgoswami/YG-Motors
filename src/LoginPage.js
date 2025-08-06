// src/LoginPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// --- NEW: Import Google Auth functions ---
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from './firebaseConfig';
import './LoginPage.css';

function LoginPage({ onAdminLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // --- NEW: Function to handle Google Sign-In ---
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        // Check if this is a new user
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // New user, save their info and redirect to create profile
          await setDoc(userDocRef, {
            email: user.email,
            firstName: user.displayName.split(' ')[0] || '',
            lastName: user.displayName.split(' ')[1] || '',
          });
          navigate('/create-profile');
        } else {
          // Existing user, redirect to their dashboard
          navigate('/profile');
        }
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        setError("Failed to sign in with Google. Please try again.");
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError('');

    if (email === 'yashhhvalo@gmail.com' && password === '1107ykG@@2003') {
      onAdminLogin();
      navigate('/admin/dashboard');
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
        
        {/* --- UPDATED: Social Login Button --- */}
        <div className="social-signup-options">
            <button className="social-button google" onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
        <div className="divider"><span>OR</span></div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
