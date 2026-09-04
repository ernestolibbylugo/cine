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

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cartelera" element={<Cartelera />} />
      <Route path="/acceso-denegado" element={<AccesoDenegado />} />

      <Route element={<RutaProtegida rolesPermitidos={["admin", "user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/comprar" element={<ComprarBoletos />} />
        <Route path="/asientos" element={<Asientos />} />
        <Route path="/dulceria" element={<Dulceria />} />
        <Route path="/resumen" element={<ResumenCompra />} />
      </Route>

      <Route element={<RutaProtegida rolesPermitidos={["admin"]} />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/cartelera" replace />}
      />
    </Routes>
  );
}

export default Routing;