import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Routing from './routes/Routing';

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