import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

function Navbar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Update login state on mount and when localStorage changes 
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      setIsLoggedIn(!!storedUser);
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    checkUser();

    // Listen to storage changes (e.g., login/logout in other tabs)
    window.addEventListener('storage', checkUser);

    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setLoggingOut(true);
      setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLoggingOut(false);
        setIsLoggedIn(false);
        setUser(null);
        alert('Logged out successfully');
        navigate('/login');
      }, 500);
    }
  };

  const activeStyle = {
    fontWeight: 'bold',
    color: '#007bff',
    textDecoration: 'underline',
  };

  const navStyle = {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    borderRadius: '4px',
    cursor: loggingOut ? 'not-allowed' : 'pointer',
    opacity: loggingOut ? 0.6 : 1,
    fontSize: '14px',
  };

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        Home
      </NavLink>

      {isLoggedIn && user && user.usertype === 1 && (
        <>
          <NavLink to="/admin" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Admin Panel
          </NavLink>
          <NavLink to="/add" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Add Book
          </NavLink>
        </>
      )}

      {isLoggedIn && (
        <NavLink to="/orders" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          Order History
        </NavLink>
      )}

      {!isLoggedIn ? (
        <>
          <NavLink to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Login
          </NavLink>
          <NavLink to="/register" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Register
          </NavLink>
        </>
      ) : (
        <button onClick={handleLogout} disabled={loggingOut} style={buttonStyle}>
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
      )}

      <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>
        Cart ({totalItems})
      </div>
    </nav>
  );
}

export default Navbar;
