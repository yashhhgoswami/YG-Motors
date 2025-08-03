// src/carData.js (CORRECTED)

import luxurySedanImg from './assets/inventory-cars/luxury-sedan.jpeg';
import sportCoupeImg from './assets/inventory-cars/sports-coupe.jpeg';
import electricSuvImg from './assets/inventory-cars/electric-suv.jpeg';
import classicRoadsterImg from './assets/inventory-cars/classic-roadster.jpg';

// The variable is renamed back to modelData to fix import errors.
export const modelData = [
  { 
    id: 'ls01', 
    make: 'Stellari',
    model: 'Aura Apex', 
    year: 2023,
    price: 95000,
    mileage: 1500,
    bodyStyle: 'Sedan',
    engine: '4.0L V8 Twin-Turbo',
    transmission: '8-Speed Automatic',
    isCertified: true,
    stockNumber: 'S1023',
    location: 'Metropolis, CA',
    description: 'The pinnacle of luxury and performance, featuring a handcrafted interior and state-of-the-art technology. One owner, pristine condition.',
    imageUrl: luxurySedanImg 
  },
  { 
    id: 'sc01', 
    make: 'Apex Motors',
    model: 'Velocity V12', 
    year: 2024,
    price: 250000,
    mileage: 550,
    bodyStyle: 'Coupe',
    engine: '6.5L V12 Naturally Aspirated',
    transmission: '7-Speed Dual-Clutch',
    isCertified: true,
    stockNumber: 'A1024',
    location: 'Metropolis, CA',
    description: 'A pure driving machine. The Velocity V12 offers an unfiltered connection to the road with its iconic engine and aerodynamic design.',
    imageUrl: sportCoupeImg
  },
  { 
    id: 'es01', 
    make: 'Galvanic',
    model: 'Volt Terra', 
    year: 2023,
    price: 120000,
    mileage: 8900,
    bodyStyle: 'SUV',
    engine: 'Dual-Motor Electric',
    transmission: '1-Speed Automatic',
    isCertified: false,
    stockNumber: 'G1023',
    location: 'Metropolis, CA',
    description: 'Experience the future of utility. Instant torque, silent operation, and a spacious, sustainable interior for the entire family.',
    imageUrl: electricSuvImg
  },
  { 
    id: 'cr01', 
    make: 'Vintage Veloce',
    model: 'Heritage Spyder', 
    year: 1965,
    price: 450000,
    mileage: 25000,
    bodyStyle: 'Convertible',
    engine: '3.3L V12 Colombo',
    transmission: '5-Speed Manual',
    isCertified: true,
    stockNumber: 'V1965',
    location: 'Metropolis, CA',
    description: 'A timeless icon of automotive history. Fully restored to concours condition, this Heritage Spyder is a blue-chip investment.',
    imageUrl: classicRoadsterImg
  },
];