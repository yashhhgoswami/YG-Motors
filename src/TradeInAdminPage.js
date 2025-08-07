// src/TestDriveAdminPage.js

import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './LoanApplicationsAdminPage.css'; // Re-using the same professional table style

function TestDriveAdminPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const q = query(collection(db, "testDriveBookings"));
      const querySnapshot = await getDocs(q);
      const bookingsData = [];
      querySnapshot.forEach((doc) => {
        bookingsData.push({ ...doc.data(), id: doc.id });
      });
      bookingsData.sort((a, b) => b.submittedAt.toDate() - a.submittedAt.toDate());
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching test drive bookings: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const bookingDocRef = doc(db, "testDriveBookings", id);
    try {
      await updateDoc(bookingDocRef, { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  if (loading) {
    return <div className="admin-page-container"><h1 className="admin-page-title">Loading Test Drive Bookings...</h1></div>;
  }

  return (
    <div className="admin-page-container">
      <h1 className="admin-page-title">Test Drive Requests</h1>
      <p className="admin-page-subtitle">Review and manage all client test drive bookings.</p>
      <div className="admin-table-wrapper">
        {bookings.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Vehicle</th>
                <th>Requested Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.fullName}</td>
                  <td>{booking.vehicle?.name || 'N/A'}</td>
                  <td>{booking.date} at {booking.time}</td>
                  <td>
                    <span className={`status-badge status-${booking.status?.toLowerCase() || 'pending'}`}>
                      {booking.status || 'Pending'}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="action-button accept" onClick={() => handleUpdateStatus(booking.id, 'Confirmed')}>Confirm</button>
                    <button className="action-button reject" onClick={() => handleUpdateStatus(booking.id, 'Cancelled')}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data-message">No test drive requests have been submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default TestDriveAdminPage;
