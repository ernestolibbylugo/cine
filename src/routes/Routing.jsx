import { useRoutes, Navigate } from 'react-router-dom';

import RutaProtegida from '../components/RutaProtegida';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AdminPanel from '../pages/AdminPanel';
import AccesoDenegado from '../pages/AccesoDenegado';
import Cartelera from '../pages/Cartelera';
import ComprarBoletos from '../pages/ComprarBoletos';
import Asientos from '../pages/Asientos';
import Dulceria from '../pages/Dulceria';
import ResumenCompra from '../pages/ResumenCompra';

/**
 * Definición única de rutas de la aplicación.
 * Las rutas protegidas usan <RutaProtegida> con rolesPermitidos.
 */
function Routing() {
  return useRoutes([
    // Rutas públicas
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/cartelera', element: <Cartelera /> },
    { path: '/acceso-denegado', element: <AccesoDenegado /> },

    // Rutas protegidas: cualquier usuario autenticado ('admin' o 'user')
    {
      element: <RutaProtegida rolesPermitidos={['admin', 'user']} />,
      children: [
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/comprar', element: <ComprarBoletos /> },
        { path: '/asientos', element: <Asientos /> },
        { path: '/dulceria', element: <Dulceria /> },
        { path: '/resumen', element: <ResumenCompra /> },
      ],
    },

    // Rutas protegidas EXCLUSIVAS de administradores
    {
      element: <RutaProtegida rolesPermitidos={['admin']} />,
      children: [{ path: '/admin', element: <AdminPanel /> }],
    },

    // Redirección por defecto
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}

export default Routing;
