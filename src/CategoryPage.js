// src/CategoryPage.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { modelData } from './carData';
import './CategoryPage.css'; 

function CategoryPage() {
  const { categoryId } = useParams();
  const models = modelData[categoryId] || [];
  const categoryName = categoryId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="category-page">
      <div className="category-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>{categoryName}</h1>
      </div>
      {models.length > 0 ? (
        <div className="model-grid">
          {models.map(model => (
            <div key={model.id} className="model-card">
              <img src={model.imageUrl} alt={model.name} className="model-image" />
              <div className="model-details">
                <h3>{model.name}</h3>
                <p>{model.brand}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-models-message">No models currently available for this category.</p>
      )}
    </div>
  );
}

export default CategoryPage;