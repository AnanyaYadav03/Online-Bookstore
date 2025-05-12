import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (book, quantity) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === book.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...book, quantity }];
      }
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    setCart(prevCart =>
      prevCart.map(item => item.id === bookId ? { ...item, quantity } : item)
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
