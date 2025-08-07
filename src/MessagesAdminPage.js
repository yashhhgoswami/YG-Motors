// src/MessagesAdminPage.js

import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './LoanApplicationsAdminPage.css'; // Re-using the same professional table style

const MessageDetailsModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Message from {message.name}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="detail-section">
            <h3>Contact Details</h3>
            <p><strong>Name:</strong> {message.name}</p>
            <p><strong>Email:</strong> <a href={`mailto:${message.email}`}>{message.email}</a></p>
            <p><strong>Date:</strong> {message.submittedAt?.toDate().toLocaleString()}</p>
          </div>
          <div className="detail-section">
            <h3>Subject</h3>
            <p>{message.subject || 'No subject provided'}</p>
          </div>
          <div className="detail-section">
            <h3>Message</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{message.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function MessagesAdminPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(collection(db, "contactMessages"));
        const querySnapshot = await getDocs(q);
        const messagesData = [];
        querySnapshot.forEach((doc) => {
          messagesData.push({ ...doc.data(), id: doc.id });
        });
        messagesData.sort((a, b) => b.submittedAt.toDate() - a.submittedAt.toDate());
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div className="admin-page-container"><h1 className="admin-page-title">Loading Messages...</h1></div>;
  }

  return (
    <>
      <div className="admin-page-container">
        <h1 className="admin-page-title">Client Messages</h1>
        <p className="admin-page-subtitle">Review and respond to all inquiries submitted through the contact form.</p>
        <div className="admin-table-wrapper">
          {messages.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Subject</th>
                  <th>Date Received</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => (
                  <tr key={msg.id}>
                    <td>{msg.name}</td>
                    <td>{msg.subject}</td>
                    <td>{msg.submittedAt?.toDate().toLocaleDateString()}</td>
                    <td>
                      <button className="details-button-admin" onClick={() => setSelectedMessage(msg)}>
                        View Message
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">There are no new messages.</p>
          )}
        </div>
      </div>
      <MessageDetailsModal 
        message={selectedMessage} 
        onClose={() => setSelectedMessage(null)} 
      />
    </>
  );
}

export default MessagesAdminPage;
