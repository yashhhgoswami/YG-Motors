// src/ContactPage.js

import React, { useState } from 'react';
// useNavigate is no longer needed, so it has been removed from this import
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './ContactPage.css';

// --- SVG Icon Components ---
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);


function ContactPage({ showModal }) {
  // The navigate constant has been removed as it was unused
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        submittedAt: new Date()
      });
      showModal({
        isOpen: true,
        type: 'success',
        title: "Message Sent",
        message: "Thank you for contacting us. We have received your message and will respond shortly.",
        buttonText: "Okay",
        onConfirm: () => {
          setFormData({ name: '', email: '', subject: '', message: '' });
        }
      });
    } catch (error) {
      console.error("Error sending message: ", error);
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="contact-page-container">
      <div className="contact-page-header">
        <h1>Get in Touch</h1>
        <p>We're here to help and answer any question you might have. We look forward to hearing from you.</p>
      </div>
      <div className="contact-page-content">
        <div className="contact-details-wrapper">
          <h2>Contact Information</h2>
          <div className="info-item">
            <div className="info-icon"><LocationIcon /></div>
            <div><strong>Our Headquarters</strong><p>Unit 42, Grand Auto Complex<br />Metropolis, CA 90210, USA</p></div>
          </div>
          <div className="info-item">
            <div className="info-icon"><EmailIcon /></div>
            <div><strong>Email Us</strong><p><a href="mailto:sales@ygmotors.net">sales@ygmotors.net</a></p></div>
          </div>
          <div className="info-item">
            <div className="info-icon"><PhoneIcon /></div>
            <div><strong>Call Us</strong><p><a href="tel:+1-800-YG-MOTORS">+1 (800) YG-MOTORS</a></p></div>
          </div>
          <div className="info-item">
            <div className="info-icon"><ClockIcon /></div>
            <div><strong>Business Hours</strong><p>Mon - Fri: 9:00 AM - 7:00 PM<br />Sat: 10:00 AM - 5:00 PM</p></div>
          </div>
        </div>
        <div className="contact-form-wrapper">
          <h2>Send a Message</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleInputChange} required />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} />
            <textarea rows="6" name="message" placeholder="Your Message" value={formData.message} onChange={handleInputChange} required></textarea>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
