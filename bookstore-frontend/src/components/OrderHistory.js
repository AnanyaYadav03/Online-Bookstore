import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user && user.username) {
      axios.get(`http://localhost:8080/api/orders?user=${user.username}`)
        .then(res => setOrders(res.data))
        .catch(err => setError('Failed to load orders'))
        .finally(() => setLoading(false));
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, [user]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Book ID: {order.bookId}, Quantity: {order.quantity}, Date: {new Date(order.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
