<<<<<<< HEAD
import { useRoutes, Navigate } from 'react-router-dom';
=======
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Cartelera from "../pages/Cartelera";
import ComprarBoletos from "../pages/ComprarBoletos";
import Asientos from "../pages/Asientos";
import Dulceria from "../pages/Dulceria";
import ResumenCompra from "../pages/ResumenCompra";
import Dashboard from "../pages/Dashboard";
import AdminPanel from "../pages/AdminPanel";
import AccesoDenegado from "../pages/AccesoDenegado";

import RutaProtegida from "../components/RutaProtegida";
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c

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
<<<<<<< HEAD
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
=======
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cartelera" element={<Cartelera />} />
      <Route path="/acceso-denegado" element={<AccesoDenegado />} />

      <Route
        element={
          <RutaProtegida rolesPermitidos={["admin", "user"]} />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/comprar" element={<ComprarBoletos />} />
        <Route path="/asientos" element={<Asientos />} />
        <Route path="/dulceria" element={<Dulceria />} />
        <Route path="/resumen" element={<ResumenCompra />} />
      </Route>

      <Route
        element={
          <RutaProtegida rolesPermitidos={["admin"]} />
        }
      >
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/cartelera" replace />}
      />
    </Routes>
  );
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c
}

export default Routing;