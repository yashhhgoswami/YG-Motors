// src/LoanApplicationsAdminPage.js

import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './LoanApplicationsAdminPage.css';

const ApplicationDetailsModal = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Loan Application Details</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="detail-section">
            <h3>Personal & Residential</h3>
            <p><strong>Name:</strong> {application.firstName} {application.lastName}</p>
            <p><strong>Email:</strong> {application.email}</p>
            <p><strong>Phone:</strong> {application.phone}</p>
            <p><strong>SSN:</strong> ***-**-{application.ssn?.slice(-4)}</p>
            <p><strong>Address:</strong> {application.streetAddress}, {application.city}, {application.state} {application.zip}</p>
          </div>
          <div className="detail-section">
            <h3>Housing & Employment</h3>
            <p><strong>Primary Residence:</strong> {application.primaryResidence}</p>
            <p><strong>Employment Status:</strong> {application.employmentStatus}</p>
            <p><strong>Employer:</strong> {application.presentEmployer}</p>
            <p><strong>Gross Monthly Income:</strong> ${parseInt(application.grossMonthlyIncome || 0).toLocaleString()}</p>
          </div>
          <div className="detail-section">
            <h3>Financial Snapshot</h3>
            <p><strong>Liquid Assets:</strong> ${parseInt(application.liquidAssets || 0).toLocaleString()}</p>
            <p><strong>Other Monthly Income:</strong> ${parseInt(application.otherMonthlyIncome || 0).toLocaleString()}</p>
            <p><strong>Expenses & Liabilities:</strong> ${parseInt(application.expensesLiabilities || 0).toLocaleString()}</p>
            <p><strong>Credit Score:</strong> {application.creditScore}</p>
          </div>
          <div className="detail-section">
            <h3>Loan Request</h3>
            <p><strong>Amount Requested:</strong> ${parseInt(application.loanAmount || 0).toLocaleString()}</p>
            <p><strong>Term:</strong> {application.termInMonths} months</p>
            <p><strong>Down Payment:</strong> ${parseInt(application.downPayment || 0).toLocaleString()}</p>
            <p><strong>Has Trade-In:</strong> {application.hasTradeIn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function LoanApplicationsAdminPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchApplications = async () => {
    try {
      const q = query(collection(db, "loanApplications"));
      const querySnapshot = await getDocs(q);
      const appsData = [];
      querySnapshot.forEach((doc) => {
        appsData.push({ ...doc.data(), id: doc.id });
      });
      appsData.sort((a, b) => b.submittedAt.toDate() - a.submittedAt.toDate());
      setApplications(appsData);
    } catch (error) {
      console.error("Error fetching loan applications: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const appDocRef = doc(db, "loanApplications", id);
    try {
      await updateDoc(appDocRef, { status: newStatus });
      fetchApplications(); 
    } catch (error) {
      console.error("Error updating status: ", error);
      alert("Failed to update status. Please try again.");
    }
  };

  if (loading) {
    return <div className="admin-page-container"><h1 className="admin-page-title">Loading Applications...</h1></div>;
  }

  return (
    <>
      <div className="admin-page-container">
        <h1 className="admin-page-title">Received Loan Applications</h1>
        <p className="admin-page-subtitle">Review and manage all client financing requests.</p>
        <div className="admin-table-wrapper">
          {applications.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Loan Amount</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id}>
                    <td>{app.firstName} {app.lastName}</td>
                    <td>${parseInt(app.loanAmount || 0).toLocaleString()}</td>
                    <td>{app.submittedAt?.toDate().toLocaleDateString() || 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${app.status?.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="action-button accept" onClick={() => handleUpdateStatus(app.id, 'Accepted')}>Accept</button>
                      <button className="action-button reject" onClick={() => handleUpdateStatus(app.id, 'Rejected')}>Reject</button>
                      <button className="details-button-admin" onClick={() => setSelectedApplication(app)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No loan applications have been submitted yet.</p>
          )}
        </div>
      </div>
      <ApplicationDetailsModal 
        application={selectedApplication} 
        onClose={() => setSelectedApplication(null)} 
      />
    </>
  );
}

export default LoanApplicationsAdminPage;
