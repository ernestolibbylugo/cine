import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente Wrapper para proteger rutas según estado de autenticación y rol.
 * @param {Object} props
 * @param {Array<string>} props.rolesPermitidos - Lista de roles que tienen acceso (ej. ['admin', 'user'])
 */
const RutaProtegida = ({ rolesPermitidos }) => {
  const { user, cargando } = useAuth();

  // 1. Evita parpadeos o redirecciones en falso mientras se verifica la sesión
  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <p>Cargando sesión...</p>
      </div>
    );
  }

  // 2. Si no hay usuario en sesión, redirige a /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Si se especifican roles permitidos y el rol del usuario no coincide
  if (rolesPermitidos && !rolesPermitidos.includes(user.role)) {
    return <Navigate to="/acceso-denegado" replace />;
  }

  // 4. Si pasa todas las comprobaciones, renderiza las rutas hijas dentro del Outlet
  return <Outlet />;
};

export default RutaProtegida;