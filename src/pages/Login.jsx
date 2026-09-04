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
    }
  };

  return (
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

export default Login;