// src/AboutPage.js

import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page-container">
      <div className="about-hero-section">
        <div className="about-hero-text-content">
          <h1>More Than a Machine.</h1>
          <p>Discover the philosophy that drives every aspect of YG MOTORS.</p>
        </div>
        
        {/* --- TEXT LOGO RESTRUCTURED --- */}
        <div className="about-hero-logo-text">
          <span className="logo-yg">YG</span>
          <span className="logo-motors">MOTORS</span>
        </div>
      </div>

      <div className="about-content-wrapper">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            To redefine the automotive experience by curating a collection of the world's most significant vehicles and providing a level of service as exceptional as the machines we represent. At YG MOTORS, we don't just sell cars; we facilitate the acquisition of automotive art and deliver unparalleled driving experiences.
          </p>
        </div>

        <div className="about-section philosophy-section">
          <h2>Our Philosophy</h2>
          <div className="philosophy-grid">
            <div className="philosophy-card">
              <h3>Precision</h3>
              <p>Every vehicle in our collection is meticulously selected and inspected for its provenance, condition, and performance, ensuring it meets the most exacting standards.</p>
            </div>
            <div className="philosophy-card">
              <h3>Performance</h3>
              <p>We are driven by a passion for power and engineering excellence. We represent the pinnacle of automotive innovation and the sheer thrill of an unfiltered driving experience.</p>
            </div>
            <div className="philosophy-card">
              <h3>Prestige</h3>
              <p>Our commitment is to provide a seamless, discreet, and bespoke client journey, built on a foundation of trust and a shared appreciation for the extraordinary.</p>
            </div>
          </div>
        </div>

        <div className="about-section founder-section">
          <div className="founder-quote">
            <blockquote>
              "We started YG MOTORS not just to sell cars, but to share a passion. Each vehicle has a story, a soul. Our role is to be the trusted curator for the next chapter of that story."
            </blockquote>
            <cite>— Yash Goswami, Founder, YG MOTORS</cite>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
