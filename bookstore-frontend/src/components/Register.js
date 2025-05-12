import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '', password: '', firstname: '', lastname: '',
    address: '', phone: '', mailid: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Basic validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.mailid) newErrors.mailid = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.mailid)) newErrors.mailid = 'Invalid email address';
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    return newErrors;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/users/register', formData);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      setErrors({ api: 'Registration failed. Try a different username or email.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
        />
        {errors.username && <span style={styles.error}>{errors.username}</span>}

        <div style={{ position: 'relative', width: '100%' }}>
          <input
            name="password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggleButton}
            tabIndex={-1}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <span style={styles.error}>{errors.password}</span>}

        <input
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
        />

        <input
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
        />
        {errors.phone && <span style={styles.error}>{errors.phone}</span>}

        <input
          name="mailid"
          placeholder="Email"
          value={formData.mailid}
          onChange={handleChange}
          style={styles.input}
          disabled={loading}
        />
        {errors.mailid && <span style={styles.error}>{errors.mailid}</span>}

        {errors.api && <span style={styles.error}>{errors.api}</span>}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            backgroundColor: loading ? '#999' : '#007bff',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  toggleButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0',
    fontSize: '14px',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '-10px',
  },
};

export default Register;
