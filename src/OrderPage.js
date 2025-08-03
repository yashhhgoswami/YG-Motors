// src/OrderPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modelData } from './carData';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from './firebaseConfig';
import './OrderPage.css';

const OrderProgressBar = ({ currentStep }) => {
  const steps = ['Vehicle', 'Details', 'Review'];
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

function OrderPage({ showModal }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicle: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    paymentMethod: 'Finance',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleVehicleSelect = (vehicle) => {
    setFormData(prev => ({ ...prev, vehicle }));
    nextStep();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      showModal({
        isOpen: true,
        type: 'auth',
        title: "Authentication Required",
        message: "You must be logged in to place an order. Please log in or create an account to proceed.",
        buttonText: "Go to Login",
        onConfirm: () => navigate('/login')
      });
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        ...formData,
        submittedAt: new Date(),
        status: 'Pending',
        userId: user.uid,
        userEmail: user.email
      });
      
      showModal({
        isOpen: true,
        type: 'success',
        title: "Order Submitted",
        message: "Your vehicle commission has been received. You can check its status in your dashboard.",
        buttonText: "Okay",
        onConfirm: () => navigate('/')
      });

    } catch (error) {
      console.error("Error submitting order: ", error);
      alert('There was an error submitting your order. Please try again.');
    }
  };
  
  const allModels = Object.values(modelData).flat();
  const isStep2Valid = formData.firstName && formData.lastName && formData.email && formData.phone;

  return (
    <div className="order-page-container">
      <div className="order-page-header">
        <h1>Commission Your Vehicle</h1>
        <p>Follow the steps below to begin your journey with YG MOTORS.</p>
      </div>
      <div className="order-form-wrapper">
        <OrderProgressBar currentStep={step} />
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <h2 className="step-title">Step 1: Select Your Vehicle</h2>
              <div className="vehicle-selection-grid">
                {allModels.map(model => (
                  <div 
                    key={model.id} 
                    className={`vehicle-card ${formData.vehicle?.id === model.id ? 'selected' : ''}`}
                    onClick={() => handleVehicleSelect(model)}
                  >
                    <img src={model.imageUrl} alt={model.name} className="vehicle-card-img" />
                    <div className="vehicle-card-body">
                      <h4>{model.name}</h4>
                      <p>{model.brand}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="form-step">
              <h2 className="step-title">Step 2: Your Details</h2>
              <div className="details-form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="paymentMethod">Preferred Payment Method</label>
                  <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                    <option>Finance</option>
                    <option>Lease</option>
                    <option>Cash Purchase</option>
                  </select>
                </div>
              </div>
              <div className="step-navigation">
                <button type="button" className="back-button" onClick={prevStep}>&larr; Back</button>
                <button type="button" className="next-button" onClick={nextStep} disabled={!isStep2Valid}>Next Step &rarr;</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="form-step">
              <h2 className="step-title">Step 3: Review & Confirm</h2>
              <div className="review-summary">
                <div className="review-section">
                  <h4>Selected Vehicle</h4>
                  <p><strong>{formData.vehicle.name}</strong> ({formData.vehicle.brand})</p>
                </div>
                <div className="review-section">
                  <h4>Personal Information</h4>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.email}</p>
                  <p>{formData.phone}</p>
                </div>
                <div className="review-section">
                  <h4>Payment Preference</h4>
                  <p>{formData.paymentMethod}</p>
                </div>
              </div>
              <p className="final-notice">By submitting, you confirm that the details are correct. A YG MOTORS concierge will contact you within 24 hours to finalize your commission.</p>
              <div className="step-navigation">
                <button type="button" className="back-button" onClick={prevStep}>&larr; Back</button>
                <button type="submit" className="submit-button">Submit Order</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default OrderPage;
