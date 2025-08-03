// src/OrderHistory.js

import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
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

    fetchOrders();
  }, [currentUser]);

  if (loading) {
    return <div className="loading-message">Loading Order History...</div>;
  }

  return (
    <div className="status-list-wrapper">
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.id} className="order-history-card">
            <img src={order.vehicle?.imageUrl} alt={order.vehicle?.name} className="order-car-image" />
            <div className="order-details">
              <h3>{order.vehicle?.name}</h3>
              <p><strong>Order Date:</strong> {order.submittedAt.toDate().toLocaleDateString()}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            </div>
            <div className="order-status">
              <span className={`status-badge status-${order.status?.toLowerCase() || 'pending'}`}>
                {order.status || 'Pending'}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="no-data-message">You have no past orders.</p>
      )}
    </div>
  );
}

export default OrderHistory;
