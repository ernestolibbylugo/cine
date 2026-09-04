import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RutaProtegida from './components/RutaProtegida';
import Navbar from './components/Navbar';

// Importación de Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Cartelera from './pages/Cartelera';
import ComprarBoletos from './pages/ComprarBoletos';
import Asientos from './pages/Asientos';
import Dulceria from './pages/Dulceria';
import ResumenCompra from './pages/ResumenCompra';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import AccesoDenegado from './pages/AccesoDenegado';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ padding: '1rem' }}>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/cartelera" element={<Cartelera />} />
            <Route path="/login" element={<Login />} />
            <Route path="/acceso-denegado" element={<AccesoDenegado />} />

            {/* Rutas Protegidas para cualquier usuario autenticado ('admin' o 'user') */}
            <Route element={<RutaProtegida rolesPermitidos={['admin', 'user']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/comprar" element={<ComprarBoletos />} />
              <Route path="/asientos" element={<Asientos />} />
              <Route path="/dulceria" element={<Dulceria />} />
              <Route path="/resumen" element={<ResumenCompra />} />
            </Route>

            {/* Rutas Protegidas EXCLUSIVAS para Administradores */}
            <Route element={<RutaProtegida rolesPermitidos={['admin']} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/cartelera" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
