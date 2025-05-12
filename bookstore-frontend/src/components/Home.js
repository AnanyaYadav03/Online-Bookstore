import React from 'react';
import { Link } from 'react-router-dom';

const bookImages = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
];

const backgroundStyle = {
  minHeight: '100vh',
  background: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${bookImages[0]}) center/cover no-repeat fixed`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const overlayBooksStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  display: 'flex',
  flexWrap: 'wrap',
  opacity: 0.18,
};

const bookImgStyle = {
  width: '180px',
  height: '260px',
  objectFit: 'cover',
  margin: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
};

const contentStyle = {
  zIndex: 1,
  textAlign: 'center',
  padding: '40px 20px',
  background: 'rgba(255,255,255,0.92)',
  borderRadius: '16px',
  boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
};

function Home() {
  return (
    <div style={backgroundStyle}>
      {/* Book covers in the background */}
      <div style={overlayBooksStyle}>
        {bookImages.concat(bookImages).map((img, idx) => (
          <img src={img} alt="Book cover" style={bookImgStyle} key={idx} />
        ))}
      </div>
      {/* Main content */}
      <div style={contentStyle}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: 16, color: '#2c3e50' }}>
          Online Book Store
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: 32, color: '#555' }}>
          Discover, buy, and sell your favorite books online!
        </p>
        <div style={{ marginBottom: 24 }}>
          <Link to="/login" style={{ ...buttonStyle, background: '#fff', color: '#007bff', border: '2px solid #007bff' }}>Login</Link>
        </div>
        <div>
          <p style={{ fontWeight: 500, marginBottom: 8 }}>New here? Register as:</p>
          <Link to="/register?role=buyer" style={roleButtonStyle}>Buyer</Link>
          <Link to="/register?role=seller" style={{ ...roleButtonStyle, background: '#28a745' }}>Seller</Link>
        </div>
      </div>
    </div>
  );
}

const buttonStyle = {
  display: 'inline-block',
  padding: '12px 32px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textDecoration: 'none',
  margin: '0 8px',
  transition: 'background 0.2s',
};

const roleButtonStyle = {
  display: 'inline-block',
  padding: '10px 24px',
  background: '#ff9800',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  fontWeight: 500,
  textDecoration: 'none',
  margin: '0 8px',
  marginBottom: '10px',
  transition: 'background 0.2s',
};

export default Home;
