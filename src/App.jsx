import "./App.css";
import Navbar from "./components/Navbar";
import Routing from "./routes/Routing";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <Routing />
      </div>
    </AuthProvider>
  );
}

export default App;