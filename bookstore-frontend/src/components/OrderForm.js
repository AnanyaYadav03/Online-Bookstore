import React, { useState } from 'react';
import axios from 'axios';

function OrderForm({ book }) {
  const [quantity, setQuantity] = useState(1);

  const user = JSON.parse(localStorage.getItem('user')) || { username: 'demo' };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (quantity < 1 || quantity > book.quantity) {
      alert(`Please enter a valid quantity (1-${book.quantity})`);
      return;
    }
    try {
      await axios.post('http://localhost:8080/api/orders', {
        username: user.username,
        bookId: book.id,
        quantity: Number(quantity),
      });
      alert('Order placed successfully!');
    } catch (err) {
      alert('Order failed');
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Order: {book.title}</h3>
      <form onSubmit={handleOrder}>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          min="1"
          max={book.quantity}
          required
        />
        <button type="submit">Buy Now</button>
      </form>
    </div>
  );
}

export default OrderForm;
