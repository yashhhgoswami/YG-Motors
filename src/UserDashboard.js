// src/UserDashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import './UserDashboard.css';
import OrderHistory from './OrderHistory';
import ApplicationStatusPage from './ApplicationStatusPage';

// --- Account Details Component ---
const AccountDetails = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '', lastName: '', phone: '', city: '', state: '', zip: '', dob: '',
  });

  // Fetch user data from Firestore when component loads
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        }
      }
    };
    fetchUserData();
  }, [user.uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const userDocRef = doc(db, "users", user.uid);
    try {
      await setDoc(userDocRef, profileData, { merge: true });
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="account-details-container">
      {isEditing ? (
        <>
          <div className="form-grid">
            <div className="form-group"><label>First Name</label><input type="text" name="firstName" value={profileData.firstName} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Last Name</label><input type="text" name="lastName" value={profileData.lastName} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Phone Number</label><input type="tel" name="phone" value={profileData.phone} onChange={handleInputChange} /></div>
            <div className="form-group"><label>Date of Birth</label><input type="date" name="dob" value={profileData.dob} onChange={handleInputChange} /></div>
            <div className="form-group"><label>City</label><input type="text" name="city" value={profileData.city} onChange={handleInputChange} /></div>
            <div className="form-group"><label>State / Province</label><input type="text" name="state" value={profileData.state} onChange={handleInputChange} /></div>
            <div className="form-group full-width"><label>Zip / Postal Code</label><input type="text" name="zip" value={profileData.zip} onChange={handleInputChange} /></div>
          </div>
          <div className="edit-actions">
            <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>
            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="details-grid">
            <p><strong>First Name:</strong> {profileData.firstName || 'N/A'}</p>
            <p><strong>Last Name:</strong> {profileData.lastName || 'N/A'}</p>
            <p><strong>Email:</strong> {profileData.email || user.email}</p>
            <p><strong>Phone:</strong> {profileData.phone || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {profileData.dob || 'N/A'}</p>
            <p><strong>Location:</strong> {`${profileData.city || ''}, ${profileData.state || ''} ${profileData.zip || ''}`.replace(/, ,/g, ',').trim() || 'N/A'}</p>
          </div>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
};


function UserDashboard({ user }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/')).catch((error) => console.error("Logout Error:", error));
  };

  if (!user) {
    return <div className="user-dashboard-container"><div className="dashboard-wrapper"><h1 className="dashboard-title">Loading...</h1></div></div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountDetails user={user} />;
      case 'orders':
        return <OrderHistory />;
      case 'loans':
        return <ApplicationStatusPage />;
      case 'tradeins':
        return <div className="no-data-message">Trade-In status feature coming soon.</div>;
      default:
        return <AccountDetails user={user} />;
    }
  };

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Dashboard</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
        <p className="dashboard-welcome">Welcome, {user.email}</p>
        <div className="dashboard-tabs">
          <button className={`tab-button ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>Account</button>
          <button className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Order History</button>
          <button className={`tab-button ${activeTab === 'loans' ? 'active' : ''}`} onClick={() => setActiveTab('loans')}>Loan Applications</button>
          <button className={`tab-button ${activeTab === 'tradeins' ? 'active' : ''}`} onClick={() => setActiveTab('tradeins')}>My Trade-In Requests</button>
        </div>
        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  );
}

export default UserDashboard;
