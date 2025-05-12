import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Admin Panel</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <button onClick={() => navigate('/add')} style={{ padding: '10px' }}>
          Add New Book
        </button>
        <button onClick={() => navigate('/books')} style={{ padding: '10px' }}>
          Manage Books
        </button>
        <button onClick={() => navigate('/orders')} style={{ padding: '10px' }}>
          Manage Orders
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
