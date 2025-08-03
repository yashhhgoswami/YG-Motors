// src/CreateProfilePage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';
import './CreateProfilePage.css'; // We'll create this next

function CreateProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        // Create a document in a 'users' collection with the user's UID as the document ID
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          ...formData
        });
        alert("Profile created successfully!");
        navigate('/profile'); // Redirect to the main dashboard
      } catch (error) {
        console.error("Error creating profile: ", error);
        alert("Failed to create profile. Please try again.");
      }
    } else {
      alert("No authenticated user found. Please sign in again.");
      navigate('/login');
    }
  };

  return (
    <div className="create-profile-container">
      <div className="create-profile-wrapper">
        <h1 className="create-profile-title">Complete Your Profile</h1>
        <p className="create-profile-subtitle">Help us get to know you better.</p>
        <form onSubmit={handleProfileSubmit}>
          <div className="form-grid">
            <div className="form-group"><label>First Name</label><input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleInputChange} /></div>
            <div className="form-group"><label>City</label><input type="text" name="city" value={formData.city} onChange={handleInputChange} /></div>
            <div className="form-group"><label>State / Province</label><input type="text" name="state" value={formData.state} onChange={handleInputChange} /></div>
            <div className="form-group full-width"><label>Zip / Postal Code</label><input type="text" name="zip" value={formData.zip} onChange={handleInputChange} /></div>
          </div>
          <button type="submit" className="submit-button">Save & Continue</button>
        </form>
      </div>
    </div>
  );
}

export default CreateProfilePage;
