// src/TradeInAdminPage.js

import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './LoanApplicationsAdminPage.css'; // Re-using styles

const TradeInDetailsModal = ({ request, onClose }) => {
  if (!request) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Trade-In Request Details</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="detail-section">
            <h3>Client Information</h3>
            <p><strong>Name:</strong> {request.firstName} {request.lastName}</p>
            <p><strong>Email:</strong> {request.email}</p>
            <p><strong>Phone:</strong> {request.phone}</p>
          </div>
          <div className="detail-section">
            <h3>Vehicle Details</h3>
            <p><strong>Vehicle:</strong> {request.year} {request.make} {request.model} {request.trim}</p>
            <p><strong>VIN:</strong> {request.vin}</p>
            <p><strong>Odometer:</strong> {parseInt(request.odometer || 0).toLocaleString()} miles</p>
            <p><strong>Asking Price:</strong> ${parseInt(request.askingPrice || 0).toLocaleString()}</p>
          </div>
          <div className="detail-section">
            <h3>Client Comments</h3>
            <p>{request.comments || 'No comments provided.'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function TradeInAdminPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchRequests = async () => {
    try {
      const q = query(collection(db, "tradeInRequests"));
      const querySnapshot = await getDocs(q);
      const requestsData = [];
      querySnapshot.forEach((doc) => {
        requestsData.push({ ...doc.data(), id: doc.id });
      });
      requestsData.sort((a, b) => b.submittedAt.toDate() - a.submittedAt.toDate());
      setRequests(requestsData);
    } catch (error) {
      console.error("Error fetching trade-in requests: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const requestDocRef = doc(db, "tradeInRequests", id);
    try {
      await updateDoc(requestDocRef, { status: newStatus });
      fetchRequests();
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  if (loading) {
    return <div className="admin-page-container"><h1 className="admin-page-title">Loading Trade-In Requests...</h1></div>;
  }

  return (
    <>
      <div className="admin-page-container">
        <h1 className="admin-page-title">Received Trade-In Requests</h1>
        <p className="admin-page-subtitle">Review and manage all client trade-in submissions.</p>
        <div className="admin-table-wrapper">
          {requests.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Vehicle</th>
                  <th>Asking Price</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr key={req.id}>
                    <td>{req.firstName} {req.lastName}</td>
                    <td>{req.year} {req.make} {req.model}</td>
                    <td>${parseInt(req.askingPrice || 0).toLocaleString()}</td>
                    <td>{req.submittedAt?.toDate().toLocaleDateString() || 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${req.status?.toLowerCase() || 'pending'}`}>
                        {req.status || 'Pending'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="action-button accept" onClick={() => handleUpdateStatus(req.id, 'Accepted')}>Accept</button>
                      <button className="action-button reject" onClick={() => handleUpdateStatus(req.id, 'Rejected')}>Reject</button>
                      <button className="details-button-admin" onClick={() => setSelectedRequest(req)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No trade-in requests have been submitted yet.</p>
          )}
        </div>
      </div>
      <TradeInDetailsModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
    </>
  );
}

export default TradeInAdminPage;
