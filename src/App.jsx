<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Routing from './routes/Routing';

/* =========================================================
   APP PRINCIPAL
   - AuthProvider: gestiona sesión y roles en toda la app.
   - Navbar: barra de navegación compartida del equipo.
   - Routing: definición única de rutas (src/routes/Routing.jsx).
   ========================================================= */
=======
import "./App.css";
import Navbar from "./components/Navbar";
import Routing from "./routes/Routing";
import { AuthProvider } from "./context/AuthContext";
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
<<<<<<< HEAD
        <main className="main-content">
          <Routing />
        </main>
=======
        <Routing />
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c
      </div>
    </AuthProvider>
  );
}

export default App;