import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { PurchaseProvider } from "./context/PurchaseContext";
import Navbar from "./components/Navbar";
import Routing from "./routes/Routing";
import BackgroundAtmosphere from "./components/BackgroundAtmosphere";
import PremieresModal from "./components/PremieresModal";
import { useState } from "react";

function App() {
  const [premieresOpen, setPremieresOpen] = useState(true);

  return (
    <AuthProvider>
      <PurchaseProvider>
        <div className="app">
          <BackgroundAtmosphere />
          <Navbar />
          <main className="main-content">
            <Routing />
          </main>
          <PremieresModal isOpen={premieresOpen} onClose={() => setPremieresOpen(false)} />
        </div>
      </PurchaseProvider>
    </AuthProvider>
  );
}

export default App;