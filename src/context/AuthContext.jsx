/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('cine_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem('cine_user');
      return null;
    }
  });

  const cargando = false;

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('cine_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cine_user');
  };

  return <AuthContext.Provider value={{ user, cargando, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  return context;
};