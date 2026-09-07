import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ rolesPermitidos = ['admin', 'user'] }) => {
  const { user, cargando } = useAuth();
  const location = useLocation();

  if (cargando) return <div className="loading-session"><p>Verificando sesión...</p></div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!rolesPermitidos.includes(user.role)) {
    return <Navigate to="/acceso-denegado" state={{ mensaje: `El rol '${user.role}' no tiene autorización para acceder a esta sección.` }} replace />;
  }
  return <Outlet />;
};

export default RutaProtegida;