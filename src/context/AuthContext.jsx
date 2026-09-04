import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al cargar la app, recuperamos la sesión si existe en localStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario_cine');
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('usuario_cine', JSON.stringify(userData)); // Guardar
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('usuario_cine'); // Limpiar
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);