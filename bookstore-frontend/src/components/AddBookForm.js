import React, { useState } from 'react'; 
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  

const AddBookForm = () => {
  const [formData, setFormData] = useState({ title: '', author: '', price: '', quantity: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/books', formData)
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2 style={{ marginBottom: 20 }}>Add Book</h2>
      <form onSubmit={handleSubmit}>
        {['title', 'author', 'price', 'quantity'].map((field) => (
          <div key={field} style={{ marginBottom: 16 }}>
            <label htmlFor={field} style={{ display: 'block', marginBottom: 5 }}>{field.toUpperCase()}:</label>
            <input
              type={field === 'price' || field === 'quantity' ? 'number' : 'text'}
              id={field}
              value={formData[field]}
              required
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
        ))}

        <button
          type="submit"
          style={{
            padding: '10px 15px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
