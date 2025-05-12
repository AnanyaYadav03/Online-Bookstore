import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Your Cart</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map(item => (
          <li key={item.id} style={{ borderBottom: '1px solid #ddd', padding: 10 }}>
            <div><strong>{item.title}</strong> by {item.author}</div>
            <div>
              Price: ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div>
              Quantity: 
              <input
                type="number"
                min="1"
                max={item.availableQuantity || 1000}
                value={item.quantity}
                onChange={e => {
                  const val = Number(e.target.value);
                  if (val >= 1 && val <= (item.availableQuantity || 1000)) {
                    updateQuantity(item.id, val);
                  }
                }}
                style={{ width: 60, marginLeft: 5 }}
              />
            </div>
            <button onClick={() => removeFromCart(item.id)} style={{ marginTop: 5, color: 'red' }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ₹{totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
      <button 
        onClick={() => navigate('/checkout')} 
        style={{ padding: '10px 20px', fontSize: 16 }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Cart;
