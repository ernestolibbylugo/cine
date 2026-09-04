import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RutaProtegida from './components/RutaProtegida';
import Navbar from './components/Navbar';

// Importación de Páginas
import Login from './pages/Login';
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
            <Route path="/login" element={<Login />} />
            <Route path="/acceso-denegado" element={<AccesoDenegado />} />

            {/* Rutas Protegidas para cualquier usuario autenticado ('admin' o 'user') */}
            <Route element={<RutaProtegida rolesPermitidos={['admin', 'user']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Rutas Protegidas EXCLUSIVAS para Administradores */}
            <Route element={<RutaProtegida rolesPermitidos={['admin']} />}>
              <Route path="/admin" element={<AdminPanel />} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
