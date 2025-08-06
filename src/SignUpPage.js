// src/SignUpPage.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// --- NEW: Import Google Auth functions ---
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from './firebaseConfig';
import './SignUpPage.css';

// --- NEW: SVG component for the Google Icon ---
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,36.62,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
  </svg>
);

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            email: user.email,
            firstName: user.displayName.split(' ')[0] || '',
            lastName: user.displayName.split(' ')[1] || '',
          });
          navigate('/create-profile');
        } else {
          navigate('/profile');
        }
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        setError("Failed to sign in with Google. Please try again.");
      });
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
          {/* --- UPDATED: Button now includes the icon --- */}
          <button className="social-button google" onClick={handleGoogleSignIn}>
            <GoogleIcon />
            <span>Sign up with Google</span>
          </button>
          <button className="social-button facebook">Sign up with Facebook</button>
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
