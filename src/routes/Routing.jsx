import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Cartelera from '../pages/Cartelera.jsx';
import ComprarBoletos from '../pages/ComprarBoletos.jsx';
import Asientos from '../pages/Asientos.jsx';
import Dulceria from '../pages/Dulceria.jsx';
import ResumenCompra from '../pages/ResumenCompra.jsx';
import AdminPanel from '../pages/AdminPanel.jsx';
import AccesoDenegado from '../pages/AccesoDenegado.jsx';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cartelera" element={<Cartelera />} />
      <Route path="/comprar" element={<ComprarBoletos />} />
      <Route path="/asientos" element={<Asientos />} />
      <Route path="/dulceria" element={<Dulceria />} />
      <Route path="/resumen" element={<ResumenCompra />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/acceso-denegado" element={<AccesoDenegado />} />
    </Routes>
  );
}

export default Routing;
