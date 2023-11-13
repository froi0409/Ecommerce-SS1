// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userData, setUserData] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded || null;
    }
    return null;
  });

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const login = (token) => {
    // Lógica de inicio de sesión

    const decoded = jwtDecode(token);
    // if (decoded) {
    //   const { user, name, type } = decoded;
    //   console.log('Usuario:', user);
    //   console.log('Nombre:', name);
    //   console.log('Tipo:', type);

    //   // Puedes almacenar esta información en el estado o utilizarla según tus necesidades
    // } else {
    //   console.log('Error al decodificar el token');
    // }    
    localStorage.setItem('token', token); // Aquí deberías obtener el token de tu lógica de inicio de sesión
    setIsAuthenticated(true);
    setUserData(decoded);
  };

  const logout = () => {
    // Lógica de cierre de sesión
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserData(null);
  };

  const addToCart = (productId, price) => {
    setCart((prevCart) => {
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

  const clearCart = () => {
    setCart({});
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout, cart, setCart, addToCart, removeFromCart, getTotalQuantityInCart, getQuantityInCart,clearCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
