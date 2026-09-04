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
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(user.role)) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  return <Outlet />;
};

export default RutaProtegida;
