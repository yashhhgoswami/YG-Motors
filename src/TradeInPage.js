// src/TradeInPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from './firebaseConfig';
import './TradeInPage.css';

function TradeInPage({ showModal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    motorizedType: '', model: '', vin: '', trim: '', year: '', askingPrice: '', make: '', odometer: '',
    firstName: '', email: '', lastName: '', phone: '', comments: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      showModal({
        isOpen: true,
        type: 'auth',
        title: "Authentication Required",
        message: "You must be logged in to submit a trade-in request. Please log in or create an account to proceed.",
        buttonText: "Go to Login",
        onConfirm: () => navigate('/login')
      });
      return;
    }

    try {
      await addDoc(collection(db, "tradeInRequests"), {
        ...formData,
        submittedAt: new Date(),
        status: 'Pending',
        userId: user.uid,
        userEmail: user.email
      });

      showModal({
        isOpen: true,
        type: 'success',
        title: "Request Submitted",
        message: "Your trade-in request has been received. You can check its status in your dashboard.",
        buttonText: "Okay",
        onConfirm: () => navigate('/')
      });

    } catch (error) {
      console.error("Error submitting trade-in: ", error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  return (
    <div className="trade-in-container">
      <div className="trade-in-header">
        <h1>Value Your Trade</h1>
        <p>Fill out the form below to receive an estimate for your vehicle.</p>
      </div>
      <form className="trade-in-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2 className="form-section-title">Vehicle Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="motorizedType">Motorized Type</label>
              <select id="motorizedType" name="motorizedType" value={formData.motorizedType} onChange={handleInputChange}>
                <option>Select Motorized Type</option>
                <option>Car</option>
                <option>Truck</option>
                <option>SUV</option>
                <option>Motorcycle</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input type="text" id="model" name="model" placeholder="e.g., Urus" value={formData.model} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="vin">VIN #</label>
              <input type="text" id="vin" name="vin" placeholder="Vehicle Identification Number" value={formData.vin} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="trim">Trim</label>
              <input type="text" id="trim" name="trim" placeholder="e.g., Performante" value={formData.trim} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <select id="year" name="year" value={formData.year} onChange={handleInputChange}>
                <option>Select Year</option>
                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="askingPrice">Asking Price</label>
              <input type="number" id="askingPrice" name="askingPrice" placeholder="$" value={formData.askingPrice} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="make">Make</label>
              <input type="text" id="make" name="make" placeholder="e.g., Lamborghini" value={formData.make} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="odometer">Odometer (Miles)</label>
              <input type="number" id="odometer" name="odometer" placeholder="Current Mileage" value={formData.odometer} onChange={handleInputChange} />
            </div>
          </div>
        </div>
        <div className="form-section">
          <h2 className="form-section-title">Contact Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name <span className="required">*</span></label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address <span className="required">*</span></label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name <span className="required">*</span></label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
          </div>
        </div>
        <div className="form-section">
          <h2 className="form-section-title">Comments & Photos</h2>
          <div className="form-group full-width">
            <label htmlFor="comments">Comments</label>
            <textarea id="comments" name="comments" rows="6" placeholder="Please describe the condition of your vehicle..." value={formData.comments} onChange={handleInputChange}></textarea>
          </div>
          <div className="form-group full-width">
            <label>Upload Photos</label>
            <div className="upload-area">
              <input type="file" id="photoUpload" name="photoUpload" multiple style={{display: 'none'}} />
              <button type="button" className="upload-button" onClick={() => document.getElementById('photoUpload').click()}>
                <i className="upload-icon">⬆</i> Upload
              </button>
              <p className="upload-info">* Image file size should not exceed 5 MB. Allowed types: .jpeg, .jpg, .png</p>
            </div>
          </div>
        </div>
        <div className="form-submission-area">
          <p className="required-info">* indicates required fields</p>
          <button type="submit" className="submit-button">Submit Trade-In</button>
        </div>
      </form>
    </div>
  );
}

export default TradeInPage;
