import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaProtegida = ({ rolesPermitidos }) => {
  const { user, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <p>Verificando permisos de acceso...</p>
      </div>
    );
  }

  // 1. Sin sesión: guarda la ruta que intentaba visitar para redirigir tras login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Sin rol adecuado: redirige a acceso denegado especificando el motivo
  if (rolesPermitidos && !rolesPermitidos.includes(user.role)) {
    return (
      <Navigate 
        to="/acceso-denegado" 
        state={{ mensaje: `El rol '${user.role}' no tiene autorización para acceder a esta sección.` }} 
        replace 
      />
    );
  }

  return <Outlet />;
};

export default RutaProtegida;