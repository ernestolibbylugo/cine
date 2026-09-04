/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('cine_user');
    return stored ? JSON.parse(stored) : null;
  });

  // Flag de carga expuesto para que RutaProtegData muestre un estado estable
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cine_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cine_user');
    }
  }, [user]);

  const login = async (userData) => {
    setCargando(true);
    try {
      setUser(userData);
    } finally {
      setCargando(false);
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
