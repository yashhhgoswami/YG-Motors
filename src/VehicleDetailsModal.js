// src/VehicleDetailsModal.js

import React from 'react';
import { Link } from 'react-router-dom';
import './VehicleDetailsModal.css';

function VehicleDetailsModal({ vehicle, onClose }) {
  if (!vehicle) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="vehicle-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="vehicle-modal-layout">
          <div className="modal-image-section">
            <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} />
          </div>
          <div className="modal-details-section">
            <h1 className="modal-vehicle-title">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
            <div className="modal-price-mileage">
              <span className="modal-price">${vehicle.price.toLocaleString()}</span>
              <span className="modal-mileage">{vehicle.mileage.toLocaleString()} mi</span>
            </div>
            <p className="modal-description">{vehicle.description}</p>
            <div className="specs-list">
              <h3>Specifications</h3>
              <ul>
                <li><strong>Stock #:</strong> {vehicle.stockNumber}</li>
                <li><strong>Engine:</strong> {vehicle.engine}</li>
                <li><strong>Transmission:</strong> {vehicle.transmission}</li>
                <li><strong>Body Style:</strong> {vehicle.bodyStyle}</li>
                <li><strong>Location:</strong> {vehicle.location}</li>
              </ul>
            </div>
            <div className="modal-actions">
              <Link to="/order" className="action-button primary">Order Now</Link>
              <Link to="/book-test-drive" className="action-button secondary">Request a Test Drive</Link>
              <Link to="/loan-application" className="action-button secondary">Apply for Financing</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailsModal;
