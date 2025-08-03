// src/LoanApplicationPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 
import { db, auth } from './firebaseConfig'; // Import auth
import './LoanApplicationPage.css';

const LoanProgressBar = ({ currentStep }) => {
  const steps = ['Personal', 'Residency', 'Financial', 'Loan'];
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

function LoanApplicationPage({ showModal }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', ssn: '',
    streetAddress: '', city: '', state: '', zip: '', primaryResidence: 'Own',
    employmentStatus: 'Employed', presentEmployer: '', grossMonthlyIncome: '',
    liquidAssets: '', otherMonthlyIncome: '', expensesLiabilities: '', creditScore: '',
    loanAmount: '', termInMonths: '', downPayment: '', hasTradeIn: 'No'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to submit an application.");
      return;
    }

    try {
      await addDoc(collection(db, "loanApplications"), {
        ...formData,
        submittedAt: new Date(),
        status: 'Pending',
        userId: user.uid,
        userEmail: user.email
      });
      
      showModal({
        title: "Submission Successful",
        message: "Your application has been received. You can check its status in your dashboard.",
        buttonText: "Okay",
        onConfirm: () => navigate('/')
      });

    } catch (error) {
      console.error("Error adding document: ", error);
      alert('There was an error submitting your application.');
    }
  };
  
  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.ssn && formData.phone;
  const isStep2Valid = formData.streetAddress && formData.city && formData.state && formData.zip && formData.presentEmployer && formData.grossMonthlyIncome;
  const isStep3Valid = formData.liquidAssets && formData.expensesLiabilities && formData.creditScore;
  const isStep4Valid = formData.loanAmount && formData.termInMonths && formData.downPayment;

  return (
    <div className="loan-page-container">
      <div className="loan-page-header">
        <h1>Secure Financing</h1>
        <p>Our secure and confidential application makes financing your next vehicle simple.</p>
      </div>
      <div className="loan-form-wrapper">
        <LoanProgressBar currentStep={step} />
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <h2 className="form-section-title">General Information</h2>
              <div className="form-grid">
                <div className="form-group"><label>First Name <span className="required">*</span></label><input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>Last Name <span className="required">*</span></label><input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>Email Address <span className="required">*</span></label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>Phone Number <span className="required">*</span></label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required/></div>
                <div className="form-group"><label>SSN <span className="required">*</span></label><input type="text" name="ssn" placeholder="***-**-****" value={formData.ssn} onChange={handleInputChange} required/></div>
              </div>
              <div className="step-navigation">
                <button type="button" className="next-button" onClick={nextStep} disabled={!isStep1Valid}>Next Step &rarr;</button>
              </div>
            </div>
          )}
          {step === 2 && (
             <div className="form-step">
              <h2 className="form-section-title">Residency & Housing</h2>
              <div className="form-grid">
                <div className="form-group full-width"><label>Street Address <span className="required">*</span></label><input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} required/></div>
                <div className="form-group"><label>City <span className="required">*</span></label><input type="text" name="city" value={formData.city} onChange={handleInputChange} required/></div>
                <div className="form-group"><label>State/Province <span className="required">*</span></label><input type="text" name="state" value={formData.state} onChange={handleInputChange} required/></div>
                <div className="form-group"><label>Zip/Postal Code <span className="required">*</span></label><input type="text" name="zip" value={formData.zip} onChange={handleInputChange} required/></div>
                <div className="form-group full-width"><label>Primary Residence</label>
                    <div className="radio-group">
                        <label><input type="radio" name="primaryResidence" value="Own" checked={formData.primaryResidence === 'Own'} onChange={handleInputChange}/> Own</label>
                        <label><input type="radio" name="primaryResidence" value="Rent" checked={formData.primaryResidence === 'Rent'} onChange={handleInputChange}/> Rent</label>
                        <label><input type="radio" name="primaryResidence" value="Other" checked={formData.primaryResidence === 'Other'} onChange={handleInputChange}/> Other</label>
                    </div>
                </div>
              </div>
              <h2 className="form-section-title">Employment Information</h2>
              <div className="form-grid">
                 <div className="form-group"><label>Employment Status</label><select name="employmentStatus" value={formData.employmentStatus} onChange={handleInputChange}><option>Employed</option><option>Self-Employed</option><option>Unemployed</option><option>Retired</option></select></div>
                 <div className="form-group"><label>Present Employer <span className="required">*</span></label><input type="text" name="presentEmployer" value={formData.presentEmployer} onChange={handleInputChange} required /></div>
                 <div className="form-group full-width"><label>Gross Monthly Income ($) <span className="required">*</span></label><input type="number" name="grossMonthlyIncome" value={formData.grossMonthlyIncome} onChange={handleInputChange} required /></div>
              </div>
              <div className="step-navigation">
                <button type="button" className="back-button" onClick={prevStep}>&larr; Back</button>
                <button type="button" className="next-button" onClick={nextStep} disabled={!isStep2Valid}>Next Step &rarr;</button>
              </div>
            </div>
          )}
          {step === 3 && (
             <div className="form-step">
               <h2 className="form-section-title">Assets & Liabilities</h2>
               <div className="form-grid">
                <div className="form-group"><label>Liquid Assets ($) <span className="required">*</span></label><input type="number" name="liquidAssets" value={formData.liquidAssets} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>Other Monthly Income ($)</label><input type="number" name="otherMonthlyIncome" value={formData.otherMonthlyIncome} onChange={handleInputChange} /></div>
                <div className="form-group"><label>Monthly Expenses & Liabilities ($) <span className="required">*</span></label><input type="number" name="expensesLiabilities" value={formData.expensesLiabilities} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>Estimated Credit Score <span className="required">*</span></label><input type="number" name="creditScore" value={formData.creditScore} onChange={handleInputChange} required /></div>
               </div>
              <div className="step-navigation">
                <button type="button" className="back-button" onClick={prevStep}>&larr; Back</button>
                <button type="button" className="next-button" onClick={nextStep} disabled={!isStep3Valid}>Next Step &rarr;</button>
              </div>
            </div>
          )}
          {step === 4 && (
             <div className="form-step">
              <h2 className="form-section-title">Your Loan</h2>
              <div className="form-grid">
                <div className="form-group"><label>Loan Amount Requested ($) <span className="required">*</span></label><input type="number" name="loanAmount" value={formData.loanAmount} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>Term in Months <span className="required">*</span></label><input type="number" name="termInMonths" value={formData.termInMonths} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>Down Payment ($) <span className="required">*</span></label><input type="number" name="downPayment" value={formData.downPayment} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>Do you have a vehicle to trade in?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="hasTradeIn" value="Yes" checked={formData.hasTradeIn === 'Yes'} onChange={handleInputChange}/> Yes</label>
                        <label><input type="radio" name="hasTradeIn" value="No" checked={formData.hasTradeIn === 'No'} onChange={handleInputChange}/> No</label>
                    </div>
                </div>
              </div>
              <div className="step-navigation">
                <button type="button" className="back-button" onClick={prevStep}>&larr; Back</button>
                <button type="submit" className="submit-button" disabled={!isStep4Valid}>Submit Application</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoanApplicationPage;
