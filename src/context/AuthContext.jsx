import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("cine_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setCargando(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(
      "cine_user",
      JSON.stringify(userData)
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cine_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        cargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return context;
}

export default AuthContext;