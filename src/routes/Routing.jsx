import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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

/**
 * Definición única de rutas de la aplicación.
 * Las rutas protegidas usan <RutaProtegida> con rolesPermitidos.
 */
function Routing() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="route-frame"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
    <Routes location={location}>
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
      </motion.div>
    </AnimatePresence>
  );
}

export default Routing;