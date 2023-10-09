import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Products, Navbar, Login, Detail, Chat, Cart} from './components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
const theme = createTheme();


const App = () => {
  const [cart, setCart] = useState({})

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };
  
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId] > 1) {
        updatedCart[productId] -= 1;
      } else {
        delete updatedCart[productId];
      }
      return updatedCart;
    });
  };

  const getTotalQuantityInCart = () => {
    const quantities = Object.values(cart);
    return quantities.reduce((total, quantity) => total + quantity, 0);
  };

  const getProductsInCart = () => {
    const productsArray = Object.keys(cart).map((productId) => ({
      productId,
      quantity: cart[productId],
    }));
    return productsArray;
  };

  return (
    <div>
        <ThemeProvider theme={theme}>
          <Navbar prodQuantity={getTotalQuantityInCart()}/>
            <Routes>
            <Route path="/" element={<Products addToCart={addToCart} />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} addToCart={addToCart}/>} />
        </Routes>
        </ThemeProvider>
    </div>
  )
}

export default App