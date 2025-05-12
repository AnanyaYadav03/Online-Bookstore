import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCheckout = async () => {
    if (!user || !user.username) {
      alert('Please login to place an order.');
      navigate('/login');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    setLoading(true);
    setError(null);

    const orderRequest = {
      username: user.username,
      items: cart.map(item => ({
        bookId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await axios.post('http://localhost:8080/api/orders', orderRequest); 
      setOrderSuccess(true);
      setCart([]); 
    } catch (err) {
      setError(err.response?.data || 'Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
        <h2>Order placed successfully!</h2>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => navigate('/')} style={{ marginRight: 10 }}>
            Home / Book List
          </button>
          <button onClick={() => navigate('/orders')} style={{ marginRight: 10 }}>
            Order History
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.title} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleCheckout} disabled={loading}>
            {loading ? 'Placing order...' : 'Place Order'}
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;



