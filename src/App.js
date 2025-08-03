// src/App.js

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

// CSS Imports
import './App.css';
import './Modal.css';
import './ContactPage.css';
import './AboutPage.css';
import './TradeInPage.css';
import './OrderPage.css';
import './LoanApplicationPage.css';
import './InventoryPage.css';
import './LoginPage.css';
import './SignUpPage.css';
import './UserDashboard.css';
import './AdminDashboard.css';
import './LoanApplicationsAdminPage.css';
import './TestDrivePage.css';
import './ApplicationStatusPage.css';
import './CreateProfilePage.css';
import './VehicleDetailsModal.css';

// Component Imports
import Modal from './Modal';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import TradeInPage from './TradeInPage';
import OrderPage from './OrderPage';
import LoanApplicationPage from './LoanApplicationPage';
import InventoryPage from './InventoryPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import LoanApplicationsAdminPage from './LoanApplicationsAdminPage';
import OrdersAdminPage from './OrdersAdminPage';
import TradeInAdminPage from './TradeInAdminPage';
import TestDrivePage from './TestDrivePage';
import ApplicationStatusPage from './ApplicationStatusPage';
import CreateProfilePage from './CreateProfilePage';

// Asset Imports
import logo from './assets/Vector.png';
import luxurySedanImg from './assets/inventory-cars/luxury-sedan.jpeg';
import sportCoupeImg from './assets/inventory-cars/sports-coupe.jpeg';
import electricSuvImg from './assets/inventory-cars/electric-suv.jpeg';
import classicRoadsterImg from './assets/inventory-cars/classic-roadster.jpg';
import familyCrossoverImg from './assets/inventory-cars/family-crossover.jpeg';
import compactHatchbackImg from './assets/inventory-cars/compact-hatchback.jpg';

function Navbar({ isScrolled, user, isAdmin }) {
  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <ul className="navbar-links navbar-links-left">
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/book-test-drive">Book Test Drive</Link></li>
      </ul>
      <Link to="/" className="navbar-brand-link">
        <img src={logo} alt="YG MOTORS Logo" className="navbar-logo" />
      </Link>
      <ul className="navbar-links navbar-links-right">
        {isAdmin ? (
          <>
            <li><Link to="/admin/loan-applications">Loan Applications</Link></li>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/trade-in-requests">Trade-In Requests</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/loan-application">Loan Application</Link></li>
            <li><Link to="/order">Order</Link></li>
            <li><Link to="/trade-in">Trade In</Link></li>
          </>
        )}
        <li>
          {user || isAdmin ? (
            <Link to={isAdmin ? "/admin/dashboard" : "/profile"}>Dashboard</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

function HeroSection() {
  const [showScrollCars, setShowScrollCars] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const cars = [
    { id: 'luxury-sedan', name: 'Luxury Sedan', details: 'Elegant design, powerful engine.', imageUrl: luxurySedanImg },
    { id: 'sport-coupe', name: 'Sport Coupe', details: 'Dynamic performance, sleek profile.', imageUrl: sportCoupeImg },
    { id: 'electric-suv', name: 'Electric SUV', details: 'Eco-friendly, spacious interior.', imageUrl: electricSuvImg },
    { id: 'classic-roadster', name: 'Classic Roadster', details: 'Timeless beauty, open-top driving.', imageUrl: classicRoadsterImg },
    { id: 'family-crossover', name: 'Family Crossover', details: 'Spacious and versatile.', imageUrl: familyCrossoverImg },
    { id: 'compact-hatchback', name: 'Compact Hatchback', details: 'Economical and agile.', imageUrl: compactHatchbackImg },
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5 && !showScrollCars) {
        setShowScrollCars(true);
      }
      setIsTextVisible(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollCars]);
  const handleDiscoverClick = () => {
    const inventorySection = document.getElementById('inventory-section');
    if (inventorySection) {
      inventorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className="hero-section">
      <video
  className="main-car-video"
  src="https://res.cloudinary.com/dpnndqqm4/video/upload/v1754243153/luruus_kjgpcs.mp4" // Paste your Cloudinary URL here
  autoPlay loop muted playsInline
/>
      <div className="video-overlay"></div>
      <div className={`hero-text-container ${!isTextVisible ? 'hero-text--hidden' : ''}`}>
        <h1 className="hero-title-unleash">UNLEASH</h1>
        <h2 className="hero-title-drive">THE DRIVE</h2>
        <p className="hero-quote">Precision | Performance | Prestige.</p>
        <button className="cta-button" onClick={handleDiscoverClick}>
          Discover Now
        </button>
      </div>
      <div id="inventory-section" className={`scrollable-content ${showScrollCars ? 'show' : ''}`}>
        <h2 className="inventory-heading">Our Current Inventory</h2>
        <div className="scrollable-cars-container">
          {cars.map(car => (
            <Link to="/inventory" key={car.id} className="car-card-link">
              <div className="car-card">
                <img src={car.imageUrl} alt={car.name} className="car-image" />
                <div className="car-details-box">
                  <h3>{car.name}</h3>
                  <p>{car.details}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutUsSection() {
    return (
      <section className="about-us-section" id="about-us">
        <div className="about-us-content">
          <h2 className="about-us-heading">Curators of Automotive Excellence</h2>
          <p className="about-us-text">
            At YG MOTORS, we believe a vehicle is more than a machine; it is a masterpiece of design, a statement of intent, and a vessel for experience. Our philosophy transcends the transactional. We are not simply a dealership; we are purveyors of automotive artistry.
          </p>
           <p className="about-us-text">
            Our collection is meticulously curated, representing the world's most coveted and significant marques. Each vehicle is selected for its provenance, performance, and power to inspire. We invite you to begin a journey with us—one built on trust, discretion, and a shared passion for the extraordinary.
          </p>
        </div>
      </section>
    );
}

function ContactUsSection() {
    return (
        <section className="contact-us-section" id="contact-us">
            <h2 className="contact-heading">Contact Us</h2>
            <div className="contact-info-grid">
                <div className="contact-item"><h3>General Inquiries</h3><p>For all general questions about our vehicles and services, please contact us via:</p></div>
                <div className="contact-item"><h3>Our Location</h3><p>YG Motors Headquarters</p><p>Unit 42, Grand Auto Complex</p><p>Metropolis, CA 90210, USA</p></div>
                <div className="contact-item"><h3>Sales Hotline</h3><p>Reach our sales team directly:</p><p><a href="tel:+1-800-YG-MOTORS">+1 (800) YG-MOTORS</a></p><p><a href="tel:+1-555-987-6543">+1 (555) 987-6543</a></p></div>
                <div className="contact-item"><h3>Email Us</h3><p>Send us an email for detailed inquiries:</p><p><a href="mailto:info@ygmotors.net">info@ygmotors.net</a></p><p><a href="mailto:support@ygmotors.net">support@ygmotors.net</a></p></div>
                <div className="contact-item"><h3>Business Hours</h3><p>Monday - Friday: 9:00 AM - 7:00 PM</p><p>Saturday: 10:00 AM - 5:00 PM</p><p>Sunday: Closed</p></div>
            </div>
            <div className="developer-info">
                <h3>Website Developed by: Yash Goswami</h3>
                <p><a href="mailto:yash.goswami.dev@gmail.com" target="_blank" rel="noopener noreferrer">Email: yash.goswami.dev@gmail.com</a></p>
                <p><a href="https://www.linkedin.com/in/yashgoswami" target="_blank" rel="noopener noreferrer">LinkedIn: linkedin.com/in/yashgoswami</a></p>
                <p><a href="https://github.com/yashgoswami" target="_blank" rel="noopener noreferrer">GitHub: github.com/yashgoswami</a></p>
            </div>
        </section>
    );
}

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);
  return (
    <div className="splash-screen">
      <div className="splash-text">
        <h1 className="splash-yg-motors">YG MOTORS</h1>
        <p className="splash-about-text">It's all About</p>
        <p className="splash-speed-text">SPEED</p>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <ContactUsSection />
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false });

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setUser(null);
  };

  const handleLogout = () => {
    signOut(auth).catch((error) => console.error("Logout Error:", error));
    setIsAdmin(false);
  };

  const handleSplashFinish = () => setShowSplash(false);
  
  const showModal = (config) => {
    setModalConfig({ ...config, isOpen: true });
  };

  const hideModal = () => {
    setModalConfig({ isOpen: false });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="App">
        <Modal config={modalConfig} onClose={hideModal} />
        {showSplash ? <SplashScreen onFinish={handleSplashFinish} /> : (
          <>
            <Navbar isScrolled={isScrolled} user={user} isAdmin={isAdmin} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/trade-in" element={<TradeInPage showModal={showModal}/>} />
              <Route path="/order" element={<OrderPage showModal={showModal}/>} />
              <Route path="/loan-application" element={<LoanApplicationPage showModal={showModal} />} />
              <Route path="/login" element={<LoginPage onAdminLogin={handleAdminLogin} />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/profile" element={<UserDashboard user={user} />} />
              <Route path="/my-applications" element={<ApplicationStatusPage />} />
              <Route path="/create-profile" element={<CreateProfilePage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard onLogout={handleLogout} />} />
              <Route path="/admin/loan-applications" element={<LoanApplicationsAdminPage />} />
              <Route path="/admin/orders" element={<OrdersAdminPage />} />
              <Route path="/admin/trade-in-requests" element={<TradeInAdminPage />} />
              <Route path="/book-test-drive" element={<TestDrivePage showModal={showModal}/>} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
