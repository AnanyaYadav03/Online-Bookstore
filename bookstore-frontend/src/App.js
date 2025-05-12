import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login'; 
import BookList from './components/BookList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel'; 
import PrivateRoute from './components/PrivateRoute'; 
import OrderHistory from './components/OrderHistory';
import AddBook from './components/AddBookForm';
import EditBook from './components/EditBookForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />             
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        } />
        <Route path="/add" element={
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        } />
        <Route path="/books/edit/:id" element={
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
