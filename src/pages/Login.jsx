import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { API_URL } from "../config";

// Credenciales asignadas al equipo (también están en db.json y README).
const CREDENCIALES_PRUEBA = [
  { rol: "Admin", email: "admin@cine.com", password: "admin123" },
  { rol: "Usuario", email: "user@cine.com", password: "user123" },
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [servidorDisponible, setServidorDisponible] = useState(true);

  const { login } = useAuth();
  const navigate = useNavigate();

  const playTone = (frequency, duration = 0.12) => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.04, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  };

  // Comprueba si JSON Server está activo para avisar al usuario.
  useEffect(() => {
    let activo = true;

    fetch(`${API_URL}/users`)
      .then((response) => {
        if (activo) setServidorDisponible(response.ok);
      })
      .catch(() => {
        if (activo) setServidorDisponible(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setEnviando(true);
      const resultado = await loginUser(email, password);

      if (!resultado.user) {
        playTone(150, 0.18);
        setError("Correo o contraseña incorrectos");
        return;
      }

      login(resultado.user);
      playTone(520);
      navigate("/dashboard", { state: { welcome: `Bienvenido a la función, ${resultado.user.name}.` } });
    } catch (error) {
      setError(error.message || "Ocurrió un error inesperado");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {!servidorDisponible && !error && (
          <div className="info-message" role="status">
            ⚠️ JSON Server no está activo. El login funcionará con las
            credenciales de respaldo, pero la cartelera y dulcería necesitan
            que ejecutes <code>npm run server</code>.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={enviando}>
            {enviando ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

        <div className="credenciales-ayuda">
          <p className="credenciales-titulo">🔑 Credenciales de prueba</p>
          <ul>
            {CREDENCIALES_PRUEBA.map((cred) => (
              <li key={cred.rol}>
                <strong>{cred.rol}:</strong> {cred.email} /{" "}
                <code>{cred.password}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;