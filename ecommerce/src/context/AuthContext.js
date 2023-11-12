// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
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

  return (
    <AuthContext.Provider value={{ isAuthenticated,userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
