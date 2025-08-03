// src/ProfilePage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './ProfilePage.css';

function ProfilePage({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  if (!user) {
    return ( <div className="profile-page-container"><div className="profile-wrapper"><h1 className="profile-title">Loading...</h1></div></div> );
  }

  return (
    <div className="profile-page-container">
      <div className="profile-wrapper">
        <h1 className="profile-title">My Dashboard</h1>
        <div className="profile-details">
          <p><strong>Logged in as:</strong></p>
          <p className="user-email">{user.email}</p>
        </div>
        
        <Link to="/my-applications" className="profile-action-button">
          View Application Status
        </Link>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
