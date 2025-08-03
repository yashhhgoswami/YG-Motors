// src/components/Notification.js

import React, { useEffect } from 'react';
import './Notification.css';

function Notification({ message, onClose }) {
  useEffect(() => {
    // Automatically close the notification after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className="notification-container">
      <div className="notification-content">
        <span>✅</span>
        <p>{message}</p>
      </div>
      <button className="notification-close" onClick={onClose}>&times;</button>
    </div>
  );
}

export default Notification;
