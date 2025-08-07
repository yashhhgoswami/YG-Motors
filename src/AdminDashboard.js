// src/AdminDashboard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard({ onLogout }) {
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-wrapper">
        <h1 className="admin-title">Administrator Dashboard</h1>
        <p className="admin-welcome">Welcome, Sir. All systems are operational.</p>
        
        <div className="admin-actions-grid">
          {/* --- NEW: Client Messages Card --- */}
          <Link to="/admin/messages" className="action-card">
            <h3>Client Messages</h3>
            <p>Review and respond to all inquiries.</p>
          </Link>
          <Link to="/admin/loan-applications" className="action-card">
            <h3>Received Loan Applications</h3>
            <p>View and manage all client financing requests.</p>
          </Link>
          <Link to="/admin/orders" className="action-card">
            <h3>Client Orders</h3>
            <p>Review and process all vehicle commission orders.</p>
          </Link>
          <Link to="/admin/trade-in-requests" className="action-card">
            <h3>Trade-In Requests</h3>
            <p>Assess and manage all vehicle trade-in submissions.</p>
          </Link>
          {/* --- NEW: Test Drive Requests Card --- */}
          <Link to="/admin/test-drives" className="action-card">
            <h3>Test Drive Requests</h3>
            <p>Manage and confirm all test drive bookings.</p>
          </Link>
        </div>

        <button onClick={onLogout} className="admin-logout-button">
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
