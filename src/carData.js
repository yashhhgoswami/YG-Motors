// src/carData.js

import luxurySedanImg from './assets/inventory-cars/luxury-sedan.jpeg';
import sportCoupeImg from './assets/inventory-cars/sports-coupe.jpeg';
import electricSuvImg from './assets/inventory-cars/electric-suv.jpeg';
import classicRoadsterImg from './assets/inventory-cars/classic-roadster.jpg';
import familyCrossoverImg from './assets/inventory-cars/family-crossover.jpeg';
import compactHatchbackImg from './assets/inventory-cars/compact-hatchback.jpg';

export const modelData = [
  // Sedans
  { id: 'ls01', make: 'Stellari', model: 'Aura Apex', year: 2023, price: 95000, mileage: 1500, bodyStyle: 'Sedan', category: 'Sedan', engine: '4.0L V8 Twin-Turbo', transmission: '8-Speed Automatic', isCertified: true, stockNumber: 'S1023', location: 'Metropolis, CA', description: 'The pinnacle of luxury and performance, featuring a handcrafted interior and state-of-the-art technology.', imageUrl: luxurySedanImg },
  { id: 'ls02', make: 'Quantum', model: 'Serenity', year: 2022, price: 82000, mileage: 11000, bodyStyle: 'Sedan', category: 'Sedan', engine: '3.0L I6 Turbo', transmission: '9-Speed Automatic', isCertified: true, stockNumber: 'Q1022', location: 'Metropolis, CA', description: 'A harmonious blend of comfort and agility, designed for the discerning driver.', imageUrl: luxurySedanImg },

  // Sports Cars
  { id: 'sc01', make: 'Apex Motors', model: 'Velocity V12', year: 2024, price: 250000, mileage: 550, bodyStyle: 'Coupe', category: 'Sports Car', engine: '6.5L V12 Naturally Aspirated', transmission: '7-Speed Dual-Clutch', isCertified: true, stockNumber: 'A1024', location: 'Metropolis, CA', description: 'A pure driving machine with an unfiltered connection to the road.', imageUrl: sportCoupeImg },
  { id: 'sc02', make: 'Blaze Autos', model: 'Ignition GT', year: 2023, price: 180000, mileage: 4000, bodyStyle: 'Coupe', category: 'Sports Car', engine: '5.2L V10', transmission: '8-Speed Dual-Clutch', isCertified: true, stockNumber: 'B1023', location: 'Metropolis, CA', description: 'Engineered for the track, refined for the street. A true modern classic.', imageUrl: sportCoupeImg },
  { id: 'sc03', make: 'Apex Motors', model: 'Razor GTR', year: 2023, price: 195000, mileage: 2500, bodyStyle: 'Coupe', category: 'Sports Car', engine: '3.8L V6 Twin-Turbo', transmission: '6-Speed Dual-Clutch', isCertified: true, stockNumber: 'A1025', location: 'Metropolis, CA', description: 'A legend reborn, the Razor GTR offers supercar performance with everyday usability.', imageUrl: sportCoupeImg },

  // Family SUVs
  { id: 'es01', make: 'Galvanic', model: 'Volt Terra', year: 2023, price: 120000, mileage: 8900, bodyStyle: 'SUV', category: 'Family SUV', engine: 'Dual-Motor Electric', transmission: '1-Speed Automatic', isCertified: false, stockNumber: 'G1023', location: 'Metropolis, CA', description: 'Experience the future of utility. Instant torque and a spacious, sustainable interior.', imageUrl: electricSuvImg },
  { id: 'fc01', make: 'Atlas Automotive', model: 'Nomad Explorer', year: 2022, price: 65000, mileage: 12000, bodyStyle: 'Crossover', category: 'Family SUV', engine: '2.5L Turbocharged I4', transmission: '9-Speed Automatic', isCertified: true, stockNumber: 'AT22', location: 'Metropolis, CA', description: 'Versatility meets comfort in this premium family crossover, ready for any adventure.', imageUrl: familyCrossoverImg },
  { id: 'es02', make: 'Galvanic', model: 'Ion Prime', year: 2024, price: 135000, mileage: 1200, bodyStyle: 'SUV', category: 'Family SUV', engine: 'Tri-Motor Electric', transmission: '1-Speed Automatic', isCertified: true, stockNumber: 'G1024', location: 'Metropolis, CA', description: 'The flagship of electric luxury, offering unparalleled range and performance.', imageUrl: electricSuvImg },

  // Classics
  { id: 'cr01', make: 'Vintage Veloce', model: 'Heritage Spyder', year: 1965, price: 450000, mileage: 25000, bodyStyle: 'Convertible', category: 'Classic', engine: '3.3L V12 Colombo', transmission: '5-Speed Manual', isCertified: true, stockNumber: 'V1965', location: 'Metropolis, CA', description: 'A timeless icon of automotive history. Fully restored to concours condition.', imageUrl: classicRoadsterImg },
  { id: 'cr02', make: 'Monarch Motors', model: 'Regal Tourer', year: 1958, price: 650000, mileage: 45000, bodyStyle: 'Convertible', category: 'Classic', engine: '6.0L V8', transmission: '4-Speed Automatic', isCertified: true, stockNumber: 'M1958', location: 'Metropolis, CA', description: 'The epitome of mid-century elegance and automotive grandeur.', imageUrl: classicRoadsterImg },

  // Compacts
  { id: 'ch01', make: 'UrbanGo', model: 'City Sprint', year: 2023, price: 35000, mileage: 5000, bodyStyle: 'Hatchback', category: 'Compact', engine: '1.5L Turbocharged I3', transmission: 'CVT Automatic', isCertified: false, stockNumber: 'UG23', location: 'Metropolis, CA', description: 'The ultimate city companion, offering agility and efficiency in a stylish package.', imageUrl: compactHatchbackImg },

  // Crossovers
  { id: 'co01', make: 'Venture', model: 'Odyssey Wagon', year: 2023, price: 58000, mileage: 9500, bodyStyle: 'Crossover', category: 'Crossover', engine: '2.0L Turbo I4 Hybrid', transmission: 'e-CVT Automatic', isCertified: true, stockNumber: 'V2023', location: 'Metropolis, CA', description: 'A sophisticated crossover that combines hybrid efficiency with all-road capability.', imageUrl: familyCrossoverImg }
];

export const inventoryCategories = [
    { name: 'Sedan', image: luxurySedanImg, url: '/inventory/Sedan' },
    { name: 'Sports Car', image: sportCoupeImg, url: '/inventory/Sports-Car' },
    { name: 'Family SUV', image: electricSuvImg, url: '/inventory/Family-SUV' },
    { name: 'Classic', image: classicRoadsterImg, url: '/inventory/Classic' },
    { name: 'Compact', image: compactHatchbackImg, url: '/inventory/Compact' },
    { name: 'Crossover', image: familyCrossoverImg, url: '/inventory/Crossover' }
];
