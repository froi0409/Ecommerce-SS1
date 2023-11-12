// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const login = (token) => {
    // Lógica de inicio de sesión
    localStorage.setItem('token', token); // Aquí deberías obtener el token de tu lógica de inicio de sesión
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Lógica de cierre de sesión
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
