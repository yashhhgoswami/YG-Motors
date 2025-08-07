// src/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// SVG Icons for Social Media (Your code is perfect, no changes needed here)
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
);
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.299 1.634 4.212 3.793 4.649-.69.188-1.423.239-2.165.162.599 1.944 2.336 3.296 4.295 3.335-1.795 1.408-3.989 2.288-6.213 2.288-.404 0-.802-.023-1.195-.069 2.259 1.455 4.931 2.309 7.79 2.309 9.281 0 14.307-7.721 13.995-14.646.992-.718 1.852-1.62 2.543-2.65z"/></svg>
);

function Footer() {
  return (
    // Renamed footer class for consistency
    <footer className="site-footer"> 
      <div className="footer-content">
        <div className="footer-column">
          <h3>About YG MOTORS</h3>
          <ul>
            <li><Link to="/about">Our Philosophy</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/inventory">Our Collection</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Client Services</h3>
          <ul>
            <li><Link to="/loan-application">Apply for Financing</Link></li>
            <li><Link to="/order">Commission a Vehicle</Link></li>
            <li><Link to="/trade-in">Value Your Trade</Link></li>
            <li><Link to="/book-test-drive">Book a Test Drive</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>YG MOTORS INC.</h3>
          <p>Unit 42, Grand Auto Complex</p>
          <p>Metropolis, CA 90210, USA</p>
          <p>Phone: +1 (800) YG-MOTORS</p>
          {/* Renamed social links class */}
          <div className="social-links"> 
            <a href="https://www.linkedin.com/in/yashhhgoswami" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="https://www.instagram.com/yashhhgoswami" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://github.com/yashhhgoswami" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href="https://x.com/yashgoswami" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><TwitterIcon /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} YG MOTORS INC. All Rights Reserved.</p>
        <p>Website Developed by: Yash Goswami</p>
      </div>
    </footer>
  );
}

export default Footer;