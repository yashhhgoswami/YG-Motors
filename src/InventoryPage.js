// src/InventoryPage.js

import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { modelData } from './carData';
import './InventoryPage.css';
import VehicleDetailsModal from './VehicleDetailsModal';

const FilterSidebar = ({ vehicles, activeFilters, onFilterChange }) => {
  const makes = [...new Set(vehicles.map(v => v.make))];
  const priceRanges = [
    { label: '$0 - $99,999', min: 0, max: 99999 },
    { label: '$100,000 - $249,999', min: 100000, max: 249999 },
    { label: '$250,000+', min: 250000, max: Infinity },
  ];

  return (
    <aside className="filter-sidebar">
      <div className="filter-group">
        <h3 className="filter-title">Make</h3>
        <ul className="filter-options">
          {makes.map(make => (
            <li key={make}>
              <button 
                type="button" 
                className={`filter-button ${activeFilters.make === make ? 'active' : ''}`}
                onClick={() => onFilterChange('make', make)}
              >
                {make}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="filter-group">
        <h3 className="filter-title">Price</h3>
        <ul className="filter-options">
          {priceRanges.map(range => (
            <li key={range.label}>
              <button 
                type="button" 
                className={`filter-button ${activeFilters.price === range.label ? 'active' : ''}`}
                onClick={() => onFilterChange('price', range.label)}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {(activeFilters.make || activeFilters.price) && (
        <button className="clear-filters-button" onClick={() => onFilterChange('clear', null)}>
          Clear All Filters
        </button>
      )}
    </aside>
  );
};

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

function InventoryPage() {
  const { category } = useParams();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    make: null,
    price: null,
  });

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setActiveFilters({ make: null, price: null });
      return;
    }
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  const filteredVehicles = useMemo(() => {
    let vehicles = category 
      ? modelData.filter(vehicle => vehicle.category.replace(/\s+/g, '-').toLowerCase() === category.toLowerCase())
      : modelData;

    if (activeFilters.make) {
      vehicles = vehicles.filter(v => v.make === activeFilters.make);
    }
    if (activeFilters.price) {
      const priceRanges = {
        '$0 - $99,999': { min: 0, max: 99999 },
        '$100,000 - $249,999': { min: 100000, max: 249999 },
        '$250,000+': { min: 250000, max: Infinity },
      };
      const range = priceRanges[activeFilters.price];
      if (range) {
        vehicles = vehicles.filter(v => v.price >= range.min && v.price <= range.max);
      }
    }
    return vehicles;
  }, [category, activeFilters]);
  
  const pageTitle = category ? category.replace(/-/g, ' ') : 'Our Collection';
  const pageSubtitle = category ? `Browse our curated selection of ${category.toLowerCase().replace(/-/g, ' ')} vehicles.` : "Browse our curated selection of the world's finest automobiles.";

  return (
    <>
      <div className="inventory-page-container">
        <div className="inventory-header">
          <h1>{pageTitle}</h1>
          <p>{pageSubtitle}</p>
          {category && <Link to="/inventory" className="back-to-categories">← Back to All Categories</Link>}
        </div>
        <div className="inventory-layout">
          <FilterSidebar 
            vehicles={modelData.filter(vehicle => vehicle.category.replace(/\s+/g, '-').toLowerCase() === category.toLowerCase())} 
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
          <main className="results-area">
            <div className="results-header">
              <h3>Showing {filteredVehicles.length} Vehicles</h3>
            </div>
            <div className="results-grid">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map(vehicle => (
                  <VehicleCard 
                    key={vehicle.id} 
                    vehicle={vehicle} 
                    onViewDetails={setSelectedVehicle} 
                  />
                ))
              ) : (
                <p className="no-data-message">No vehicles match the current filters.</p>
              )}
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
