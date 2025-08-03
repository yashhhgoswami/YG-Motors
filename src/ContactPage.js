// src/ContactPage.js

import React from 'react';
import './ContactPage.css'; // We will create this CSS file next

function ContactPage() {
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
            <span className="info-icon">📍</span>
            <div>
              <strong>Our Headquarters</strong>
              <p>Unit 42, Grand Auto Complex<br />Metropolis, CA 90210, USA</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">✉️</span>
            <div>
              <strong>Email Us</strong>
              <p><a href="mailto:sales@ygmotors.net">sales@ygmotors.net</a></p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">📞</span>
            <div>
              <strong>Call Us</strong>
              <p><a href="tel:+1-800-YG-MOTORS">+1 (800) YG-MOTORS</a></p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon">⏰</span>
            <div>
              <strong>Business Hours</strong>
              <p>Mon - Fri: 9:00 AM - 7:00 PM<br />Sat: 10:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
        <div className="contact-form-wrapper">
          <h2>Send a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea rows="6" placeholder="Your Message" required></textarea>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;