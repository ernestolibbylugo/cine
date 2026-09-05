<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Manejo de cambios en inputs (formulario controlado)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    try {
      const user = await loginUser(formData.email, formData.password);

      if (user) {
        login(user);
        navigate('/dashboard');
      } else {
        setError('Correo o contraseña incorrectos. Inténtalo de nuevo.');
      }
    } catch {
      setError('No se pudo conectar con el servidor. Intenta más tarde.');
    } finally {
      setLoading(false);
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/users");

      if (!response.ok) {
        throw new Error("No se pudo conectar con JSON Server");
      }

      const users = await response.json();

      const userFound = users.find(
        (user) =>
          user.email === email.trim() &&
          user.password === password
      );

      if (!userFound) {
        setError("Correo o contraseña incorrectos");
        return;
      }

      login(userFound);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c
    }
  };

  return (
<<<<<<< HEAD
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};
=======
    <main style={{ padding: "2rem" }}>
      <h1>Iniciar sesión</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label>
          Correo electrónico
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.7rem",
              marginTop: "0.4rem",
            }}
          />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              display: "block",
              width: "100%",
              padding: "0.7rem",
              marginTop: "0.4rem",
            }}
          />
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">
          Iniciar sesión
        </button>
      </form>
    </main>
  );
}
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c

export default Login;