<<<<<<< HEAD
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente que protege rutas según sesión y rol.
 * @param {Array<string>} [rolesPermitidos=['admin','user']] - Roles que tienen acceso.
 */
const RutaProtegida = ({ rolesPermitidos = ['admin', 'user'] }) => {
  const { user, cargando } = useAuth();

  // 1. Evita parpadeos o redirecciones en falso mientras se verifica la sesión
  if (cargando) {
    return (
      <div className="loading-session">
        <p>Cargando sesión...</p>
=======
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function RutaProtegida({ rolesPermitidos }) {
  const { user, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return (
      <div style={{ padding: "3rem" }}>
        <p>Verificando permisos de acceso...</p>
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c
      </div>
    );
  }

  if (!user) {
<<<<<<< HEAD
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(user.role)) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return <Outlet />;
};
=======
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (
    rolesPermitidos &&
    !rolesPermitidos.includes(user.role)
  ) {
    return (
      <Navigate
        to="/acceso-denegado"
        state={{
          mensaje: `El rol '${user.role}' no tiene autorización para acceder a esta sección.`,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c

export default RutaProtegida;