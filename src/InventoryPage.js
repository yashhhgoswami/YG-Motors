// src/InventoryPage.js

import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // This import is no longer needed and has been removed.
import { modelData } from './carData';
import './InventoryPage.css';
import VehicleDetailsModal from './VehicleDetailsModal';

// --- FILTER SIDEBAR COMPONENT (RESTORED) ---
const FilterSidebar = () => (
  <aside className="filter-sidebar">
    <div className="filter-group">
      <h3 className="filter-title">Body Style</h3>
      <ul className="filter-options">
        <li><button type="button" className="filter-button">Convertible</button><span>1</span></li>
        <li><button type="button" className="filter-button">Coupe</button><span>1</span></li>
        <li><button type="button" className="filter-button">Sedan</button><span>1</span></li>
        <li><button type="button" className="filter-button">SUV</button><span>1</span></li>
      </ul>
    </div>
    <div className="filter-group">
      <h3 className="filter-title">Make</h3>
      <ul className="filter-options">
        <li><button type="button" className="filter-button">Apex Motors</button><span>1</span></li>
        <li><button type="button" className="filter-button">Galvanic</button><span>1</span></li>
        <li><button type="button" className="filter-button">Stellari</button><span>1</span></li>
        <li><button type="button" className="filter-button">Vintage Veloce</button><span>1</span></li>
      </ul>
    </div>
    <div className="filter-group">
      <h3 className="filter-title">Price</h3>
      <ul className="filter-options">
        <li><button type="button" className="filter-button">$50,000 - $149,999</button><span>2</span></li>
        <li><button type="button" className="filter-button">$150,000+</button><span>2</span></li>
      </ul>
    </div>
  </aside>
);

// Vehicle Listing Card Component
const VehicleCard = ({ vehicle, onViewDetails }) => (
  <div className="vehicle-listing-card">
    <div className="card-image-section">
      <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} />
      {vehicle.isCertified && <span className="certified-badge">CERTIFIED PRE-OWNED</span>}
    </div>
    <div className="card-details-section">
      <h2 className="vehicle-title">{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</h2>
      <div className="price-mileage-row">
        <span className="price">${vehicle.price.toLocaleString()}</span>
        <span className="mileage">{vehicle.mileage.toLocaleString()} mi</span>
      </div>
      <p className="description">{vehicle.description}</p>
      <div className="card-footer">
        <p className="location"><strong>Location:</strong> {vehicle.location}</p>
        <button onClick={() => onViewDetails(vehicle)} className="details-button">Details</button>
      </div>
    </div>
  </div>
);

// Main Inventory Page Component
function InventoryPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <>
      <div className="inventory-page-container">
        <div className="inventory-header">
          <h1>Our Collection</h1>
          <p>Browse our curated selection of the world's finest automobiles.</p>
        </div>
        <div className="inventory-layout">
          <FilterSidebar />
          <main className="results-area">
            <div className="results-header">
              <h3>Showing {modelData.length} Vehicles</h3>
            </div>
            <div className="results-grid">
              {modelData.map(vehicle => (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  onViewDetails={setSelectedVehicle} 
                />
              ))}
            </div>
          </main>
        </div>
      </div>
      
      <VehicleDetailsModal 
        vehicle={selectedVehicle} 
        onClose={() => setSelectedVehicle(null)} 
      />
    </>
  );
}

export default InventoryPage;
