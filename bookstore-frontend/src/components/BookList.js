import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  // Get user info from localStorage to check admin status
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.usertype === 1;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/books');
        setBooks(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const fetchBookDetails = async (id) => {
    setDetailsLoading(true);
    setDetailsError(null);
    try {
      const response = await axios.get(`http://localhost:8080/api/books/${id}`);
      setSelectedBook(response.data);
      setQuantity(1);
    } catch (err) {
      setDetailsError('Failed to load book details');
      console.error(err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const openDetails = (id) => {
    fetchBookDetails(id);
  };

  const closeDetails = () => {
    setSelectedBook(null);
    setDetailsError(null);
  };

  const handleAddToCart = () => {
    if (quantity < 1 || quantity > selectedBook.quantity) {
      alert(`Please enter a valid quantity (1-${selectedBook.quantity})`);
      return;
    }
    addToCart({ ...selectedBook, availableQuantity: selectedBook.quantity }, quantity);

    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === selectedBook.id
          ? { ...book, quantity: book.quantity - quantity }
          : book
      )
    );
    alert(`Added ${quantity} copies of "${selectedBook.title}" to cart.`);
    closeDetails();
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>Book List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search books..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ padding: 8, marginBottom: 20, width: '100%' }}
      />

      {/* Check Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => navigate('/cart')}
          style={{
            marginBottom: 20,
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Check Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      )}

      {/* Book List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredBooks.map(book => (
          <li key={book.id} style={{
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 16,
            marginBottom: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <strong>{book.title}</strong> by {book.author}
            </div>
            <div>
              <button
                style={{
                  padding: '6px 12px',
                  background: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  marginRight: 8,
                }}
                onClick={() => openDetails(book.id)}
                disabled={book.quantity === 0}
                title={book.quantity === 0 ? 'Out of stock' : ''}
              >
                Details
              </button>

              {isAdmin && (
                <button
                  style={{
                    padding: '6px 12px',
                    background: '#ffc107',
                    color: '#212529',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/books/edit/${book.id}`)}
                >
                  Edit
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Book Details */}
      {selectedBook && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 8,
            maxWidth: 600,
            width: '90%',
            position: 'relative'
          }}>
            <button
              onClick={closeDetails}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'transparent',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer'
              }}
              aria-label="Close"
            >
              &times;
            </button>

            {detailsLoading ? (
              <p>Loading details...</p>
            ) : detailsError ? (
              <p style={{ color: 'red' }}>{detailsError}</p>
            ) : (
              <>
                <h2>{selectedBook.title}</h2>
                <p><strong>Author:</strong> {selectedBook.author}</p>
                <p><strong>Price:</strong> ₹{selectedBook.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p><strong>Quantity Available:</strong> {selectedBook.quantity}</p>
                <p><strong>Description:</strong></p>
                <p>{selectedBook.description || 'No description available.'}</p>

                <div style={{ marginTop: 20 }}>
                  <label>
                    Quantity to buy:{' '}
                    <input
                      type="number"
                      min="1"
                      max={selectedBook.quantity}
                      value={quantity}
                      onChange={e => setQuantity(Number(e.target.value))}
                      style={{ width: 60 }}
                    />
                  </label>
                  <button
                    onClick={handleAddToCart}
                    style={{
                      marginLeft: 10,
                      padding: '6px 12px',
                      background: 'green',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer'
                    }}
                    disabled={selectedBook.quantity === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
