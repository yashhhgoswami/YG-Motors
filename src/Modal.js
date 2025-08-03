// src/Modal.js

import React from 'react';
import './Modal.css';

// --- NEW: SVG Icon for authentication warnings ---
const AuthIcon = () => (
  <svg className="modal-icon warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
  </svg>
);

const SuccessIcon = () => (
  <svg className="modal-icon success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

function Modal({ config, onClose }) {
  if (!config.isOpen) {
    return null;
  }

  const handleConfirm = () => {
    if (config.onConfirm) {
      config.onConfirm();
    }
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          {/* --- Conditionally render the icon based on type --- */}
          {config.type === 'auth' ? <AuthIcon /> : <SuccessIcon />}
          <h2 className="modal-title">{config.title}</h2>
        </div>
        <div className="modal-body">
          <p>{config.message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={handleConfirm}>
            {config.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
