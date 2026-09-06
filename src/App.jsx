import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Routing from "./routes/Routing";
import BackgroundAtmosphere from "./components/BackgroundAtmosphere";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <BackgroundAtmosphere />
        <Navbar />
        <main className="main-content">
          <Routing />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;