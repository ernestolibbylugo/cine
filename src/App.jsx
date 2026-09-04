import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Routing from './routes/Routing';

/* =========================================================
   APP PRINCIPAL
   - AuthProvider: gestiona sesión y roles en toda la app.
   - Navbar: barra de navegación compartida del equipo.
   - Routing: definición única de rutas (src/routes/Routing.jsx).
   ========================================================= */

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routing />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;