// src/OrdersAdminPage.js

import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import './LoanApplicationsAdminPage.css'; // Re-using styles

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Details</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="detail-section">
            <h3>Client Information</h3>
            <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
          </div>
          <div className="detail-section">
            <h3>Vehicle Details</h3>
            <p><strong>Vehicle:</strong> {order.vehicle?.name}</p>
            <p><strong>Brand:</strong> {order.vehicle?.brand}</p>
          </div>
          <div className="detail-section">
            <h3>Financials</h3>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, "orders"));
      const querySnapshot = await getDocs(q);
      const ordersData = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ ...doc.data(), id: doc.id });
      });
      ordersData.sort((a, b) => b.submittedAt.toDate() - a.submittedAt.toDate());
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    const orderDocRef = doc(db, "orders", id);
    try {
      await updateDoc(orderDocRef, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  if (loading) {
    return <div className="admin-page-container"><h1 className="admin-page-title">Loading Orders...</h1></div>;
  }

  return (
    <>
      <div className="admin-page-container">
        <h1 className="admin-page-title">Received Client Orders</h1>
        <p className="admin-page-subtitle">Review and manage all vehicle commission orders.</p>
        <div className="admin-table-wrapper">
          {orders.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Vehicle Ordered</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.firstName} {order.lastName}</td>
                    <td>{order.vehicle?.name || 'N/A'}</td>
                    <td>{order.submittedAt?.toDate().toLocaleDateString() || 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${order.status?.toLowerCase() || 'pending'}`}>
                        {order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button className="action-button accept" onClick={() => handleUpdateStatus(order.id, 'Accepted')}>Accept</button>
                      <button className="action-button reject" onClick={() => handleUpdateStatus(order.id, 'Rejected')}>Reject</button>
                      <button className="details-button-admin" onClick={() => setSelectedOrder(order)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data-message">No orders have been submitted yet.</p>
          )}
        </div>
      </div>
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
}

export default OrdersAdminPage;
