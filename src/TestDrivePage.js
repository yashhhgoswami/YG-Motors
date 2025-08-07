// src/TestDrivePage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modelData } from './carData';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from './firebaseConfig';
import './TestDrivePage.css';

const TestDriveProgressBar = ({ currentStep }) => {
  const steps = ['Vehicle', 'Schedule', 'Details', 'Confirm'];
  return (
    <div className="progress-bar-container">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className={`step-item ${index + 1 <= currentStep ? 'active' : ''}`}>
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

function TestDrivePage({ showModal }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicle: null,
    date: '',
    time: '',
    fullName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'vehicle') {
      nextStep();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      showModal({
        isOpen: true,
        type: 'auth',
        title: "Authentication Required",
        message: "You must be logged in to book a test drive.",
        buttonText: "Go to Login",
        onConfirm: () => navigate('/login')
      });
      return;
    }

    try {
      await addDoc(collection(db, "testDriveBookings"), {
        ...formData,
        submittedAt: new Date(),
        status: 'Pending', // Add default status
        userId: user.uid, // Tag with user's ID
        userEmail: user.email
      });
      showModal({
        isOpen: true,
        type: 'success',
        title: "Request Submitted",
        message: "Your test drive request has been received. A concierge will contact you shortly to confirm.",
        buttonText: "Okay",
        onConfirm: () => navigate('/')
      });
    } catch (error) {
      console.error("Error submitting test drive request: ", error);
      alert('There was an error submitting your request. Please try again.');
    }
  };

  const allModels = Object.values(modelData).flat();
  const isStep2Valid = formData.date && formData.time;
  const isStep3Valid = formData.fullName && formData.email && formData.phone;

  const availableDates = ["August 8", "August 9", "August 10", "August 11"];
  const availableTimes = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM"];

  return (
    <div className="test-drive-container">
      <div className="test-drive-header">
        <h1>Schedule Your Experience</h1>
        <p>Select a vehicle and a time that suits you. The driver's seat awaits.</p>
      </div>
      <div className="test-drive-form-wrapper">
        <TestDriveProgressBar currentStep={step} />
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <h2 className="step-title">Step 1: Select Your Vehicle</h2>
              <div className="vehicle-selection-grid">
                {allModels.map(model => (
                  <div key={model.id} className="vehicle-card" onClick={() => handleSelect('vehicle', model)}>
                    <img src={model.imageUrl} alt={model.name} className="vehicle-card-img" />
                    <div className="vehicle-card-body"><h4>{model.name}</h4><p>{model.brand}</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="form-step">
              <h2 className="step-title">Step 2: Choose a Date & Time</h2>
              <h3 className="sub-title">Select a Date</h3>
              <div className="selection-grid">
                {availableDates.map(date => <button type="button" key={date} className={`selection-chip ${formData.date === date ? 'selected' : ''}`} onClick={() => handleSelect('date', date)}>{date}</button>)}
              </div>
              <h3 className="sub-title">Select a Time</h3>
              <div className="selection-grid">
                {availableTimes.map(time => <button type="button" key={time} className={`selection-chip ${formData.time === time ? 'selected' : ''}`} onClick={() => handleSelect('time', time)}>{time}</button>)}
              </div>
              <div className="step-navigation"><button type="button" className="back-button" onClick={prevStep}>&larr; Back</button><button type="button" className="next-button" onClick={nextStep} disabled={!isStep2Valid}>Next Step &rarr;</button></div>
            </div>
          )}
          {step === 3 && (
            <div className="form-step">
              <h2 className="step-title">Step 3: Your Details</h2>
              <div className="details-form-grid">
                <div className="form-group"><label>Full Name</label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>Email Address</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
                <div className="form-group full-width"><label>Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required /></div>
              </div>
              <div className="step-navigation"><button type="button" className="back-button" onClick={prevStep}>&larr; Back</button><button type="button" className="next-button" onClick={nextStep} disabled={!isStep3Valid}>Next Step &rarr;</button></div>
            </div>
          )}
          {step === 4 && (
            <div className="form-step">
              <h2 className="step-title">Step 4: Review & Confirm</h2>
              <div className="review-summary">
                <div className="review-section"><h4>Vehicle</h4><p><strong>{formData.vehicle.name}</strong> ({formData.vehicle.brand})</p></div>
                <div className="review-section"><h4>Requested Time</h4><p>{formData.date} at {formData.time}</p></div>
                <div className="review-section"><h4>Personal Information</h4><p>{formData.fullName}</p><p>{formData.email}</p><p>{formData.phone}</p></div>
              </div>
              <p className="final-notice">A concierge will contact you to confirm your appointment.</p>
              <div className="step-navigation"><button type="button" className="back-button" onClick={prevStep}>&larr; Back</button><button type="submit" className="submit-button">Request Test Drive</button></div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default TestDrivePage;
