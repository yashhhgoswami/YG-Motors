// src/AboutPage.js

import React from 'react';
import './AboutPage.css'; // We will create this CSS file next

function AboutPage() {
  return (
    <div className="about-page-container">
      <div className="about-page-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1>Our Legacy, Your Future</h1>
          <p>Discover the philosophy that drives YG MOTORS.</p>
        </div>
      </div>

      <div className="about-page-main-content">
        <div className="about-mission">
          <h2>The Pursuit of Perfection</h2>
          <p>
            Founded on a passion for precision engineering and unparalleled luxury, YG MOTORS is not merely a dealership; it is a destination for connoisseurs of the world's finest automobiles. We curate an exclusive collection of vehicles that represent the pinnacle of performance, design, and technological innovation.
          </p>
          <p>
            Our mission is to provide a seamless and bespoke client experience that begins with the first inquiry and extends far beyond the moment you take the wheel. We believe in a standard of excellence that reflects the masterpieces we represent.
          </p>
        </div>

        <div className="about-values">
          <div className="value-card">
            <h3>Curated Selection</h3>
            <p>Every vehicle is hand-selected and rigorously inspected by our experts to ensure it meets the highest standards of quality and provenance.</p>
          </div>
          <div className="value-card">
            <h3>Unmatched Service</h3>
            <p>Our dedicated team of professionals is committed to providing personalized, discreet, and attentive service to every client.</p>
          </div>
          <div className="value-card">
            <h3>Global Network</h3>
            <p>Leveraging our extensive global network, we can source the most sought-after and rare automobiles for our discerning clientele.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;