import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Products, Navbar, Login, Detail, Chat, Cart, Crud, Accountroute,Checkout, CreateAccount} from './components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { useState } from 'react';
import { useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    background: {
      main: '#D9D9D9',
      default: '#F8F9F9',
      dark: '#CFE2FF',
      card: "#D9D9D9",
    },
  },
});


const App = () => {
  
  const {cart,addToCart,removeFromCart,getTotalQuantityInCart,getQuantityInCart} = useAuth();

  //const [cart, setCart] = useState({})
  /*
  const addToCart = (productId, price) => {
    setCart((prevCart) => {
      console.log("Sumando uno")
      const updatedCart = { ...prevCart };
      
      if (updatedCart[productId]) {        
        updatedCart[productId].quantity += 1;
        
      } else {        
        updatedCart[productId] = {
          quantity: 1,
          totalPrice: price,
        };
      }
      return updatedCart;
    });
  };
  
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[productId]) {        
        if (updatedCart[productId].quantity > 1) {
          updatedCart[productId].quantity -= 1;          
        } else {          
          delete updatedCart[productId];
        }
      }
      return updatedCart;
    });
  };

  const getTotalQuantityInCart = () => {
    const productValues = Object.values(cart);
    const totalQuantity = productValues.reduce(
      (total, product) => total + product.quantity,
      0
    );
    return totalQuantity;
  };

  const getQuantityInCart = (productId) => {
    return cart[productId] ? cart[productId].quantity : 0;
  };
  */
  return (
    
        <ThemeProvider theme={theme}>
          <Navbar prodQuantity={getTotalQuantityInCart()}/>
            <Routes>
            <Route path="/" element={<Products addToCart={addToCart} getQuantityInCart={getQuantityInCart}/>} />
            <Route path="/products" element={<Products addToCart={addToCart} getQuantityInCart={getQuantityInCart}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<CreateAccount />} />
            <Route path="/detail" element={<Detail removeFromCart={removeFromCart} addToCart={addToCart} getQuantityInCart={getQuantityInCart}/>} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} getTotalQuantityInCart={getTotalQuantityInCart} /> } />
            <Route path="/*" element={<Crud />} />
            <Route path="/account/*" element={<Accountroute />} />
            <Route path="/checkout" element={<Checkout cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} getTotalQuantityInCart={getTotalQuantityInCart} />} />
        </Routes>
        </ThemeProvider>
    
  )
}

export default App