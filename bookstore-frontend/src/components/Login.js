import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/users/login', { username, password });
      // Store user info including usertype in localStorage
      localStorage.setItem('user', JSON.stringify(res.data));
      // If your backend returns a token, store it here as well, e.g.:
      // localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      navigate('/books'); // Redirect to '/books' after login
    } catch (err) {
      if (err.response && err.response.data) {
        setError(typeof err.response.data === 'string' ? err.response.data : 'Login failed. Please check your credentials.');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={styles.input}
          disabled={loading}
        />
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
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
        {error && <p style={styles.error}>{error}</p>}
        <button
          type="submit"
          disabled={loading || !username || !password}
          style={{
            ...styles.button,
            backgroundColor: loading || !username || !password ? '#999' : '#007bff',
            cursor: loading || !username || !password ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
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

export default Login;



// import React, { useState } from 'react';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = e => {
//     e.preventDefault();
//     alert(`Logging in as ${username}`);
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
//         <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const res = await axios.post('http://localhost:8080/api/users/login', { username, password });
//       // Store user info only
//       localStorage.setItem('user', JSON.stringify(res.data));
//       alert('Login successful!');
//       navigate('/books');
//     } catch (err) {
//       setError('Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Your login form here */}
//     </div>
//   );
// }

// export default Login;
