import { Navigate, useRoutes } from 'react-router-dom';
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

function Routing() {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/cartelera', element: <Cartelera /> },
    { path: '/acceso-denegado', element: <AccesoDenegado /> },
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
    { element: <RutaProtegida rolesPermitidos={['admin']} />, children: [{ path: '/admin', element: <AdminPanel /> }] },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}

export default Routing;