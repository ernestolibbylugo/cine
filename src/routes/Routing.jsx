import { useRoutes } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Cartelera from "../pages/Cartelera";
import ComprarBoletos from "../pages/ComprarBoletos";
import Asientos from "../pages/Asientos";
import Dulceria from "../pages/Dulceria";
import ResumenCompra from "../pages/ResumenCompra";
import AdminPanel from "../pages/AdminPanel";
import AccesoDenegado from "../pages/AccesoDenegado";

function Routing() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/cartelera", element: <Cartelera /> },
    { path: "/comprar", element: <ComprarBoletos /> },
    { path: "/asientos", element: <Asientos /> },
    { path: "/dulceria", element: <Dulceria /> },
    { path: "/resumen", element: <ResumenCompra /> },
    { path: "/admin", element: <AdminPanel /> },
    { path: "/acceso-denegado", element: <AccesoDenegado /> },
  ]);
}

export default Routing;