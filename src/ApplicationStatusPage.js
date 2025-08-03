// src/ApplicationStatusPage.js

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';
import './ApplicationStatusPage.css';

function ApplicationStatusPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchSubmissions = async () => {
      try {
        // Create queries for all three collections
        const loanQuery = query(collection(db, "loanApplications"), where("userId", "==", currentUser.uid));
        const orderQuery = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
        const tradeInQuery = query(collection(db, "tradeInRequests"), where("userId", "==", currentUser.uid));

        // Fetch all data concurrently
        const [loanSnapshot, orderSnapshot, tradeInSnapshot] = await Promise.all([
          getDocs(loanQuery),
          getDocs(orderQuery),
          getDocs(tradeInQuery)
        ]);

        const allSubmissions = [];

        loanSnapshot.forEach((doc) => {
          allSubmissions.push({ type: 'Loan Application', ...doc.data(), id: doc.id });
        });
        orderSnapshot.forEach((doc) => {
          allSubmissions.push({ type: 'Vehicle Order', ...doc.data(), id: doc.id });
        });
        tradeInSnapshot.forEach((doc) => {
          allSubmissions.push({ type: 'Trade-In Request', ...doc.data(), id: doc.id });
        });

        // Sort all submissions by date, newest first
        allSubmissions.sort((a, b) => b.submittedAt.toDate() - a.submittedAt.toDate());
        
        setSubmissions(allSubmissions);
      } catch (error) {
        console.error("Error fetching user submissions: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [currentUser]);

  if (loading) {
    return <div className="status-page-container"><h1 className="status-page-title">Loading Your Submissions...</h1></div>;
  }

  if (!currentUser) {
    return <div className="status-page-container"><h1 className="status-page-title">Please log in to view your dashboard.</h1></div>;
  }

  // Helper to render the correct details for each card type
  const renderCardBody = (item) => {
    switch(item.type) {
      case 'Loan Application':
        return <p><strong>Amount Requested:</strong> ${parseInt(item.loanAmount || 0).toLocaleString()}</p>;
      case 'Vehicle Order':
        return <p><strong>Vehicle:</strong> {item.vehicle?.name || 'N/A'}</p>;
      case 'Trade-In Request':
        return <p><strong>Vehicle:</strong> {item.year} {item.make} {item.model}</p>;
      default:
        return null;
    }
  }

  return (
    <div className="status-page-container">
      <h1 className="status-page-title">My Submissions</h1>
      <div className="status-list-wrapper">
        {submissions.length > 0 ? (
          submissions.map(item => (
            <div key={item.id} className="status-card">
              <div className="status-card-header">
                <h3>{item.type}</h3>
                <span className={`status-badge status-${item.status?.toLowerCase() || 'pending'}`}>
                  {item.status || 'Pending'}
                </span>
              </div>
              <div className="status-card-body">
                <p><strong>Submitted:</strong> {item.submittedAt.toDate().toLocaleDateString()}</p>
                {renderCardBody(item)}
              </div>
            </div>
          ))
        ) : (
          <p className="no-data-message">You have not made any submissions yet.</p>
        )}
      </div>
    </div>
  );
}

export default ApplicationStatusPage;
