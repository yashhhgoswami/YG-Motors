// src/InventoryLandingPage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { inventoryCategories } from './carData';
import './InventoryLandingPage.css';

function InventoryLandingPage() {
  return (
    <div className="inventory-landing-container">
      <div className="inventory-header">
        <h1>Explore Our Collection</h1>
        <p>Select a category to discover the pinnacle of automotive engineering.</p>
      </div>
      <div className="category-grid">
        {inventoryCategories.map((category, index) => (
          <Link to={category.url} key={index} className="category-card">
            <div className="card-background" style={{ backgroundImage: `url(${category.image})` }}></div>
            <div className="card-overlay"></div>
            <h2 className="category-name">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default InventoryLandingPage;
