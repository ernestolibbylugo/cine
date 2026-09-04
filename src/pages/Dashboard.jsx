import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      {user ? (
        <>
          <h2>Bienvenido, {user.name}</h2>
          <p>Correo: {user.email}</p>
          <p>Rol: {user.role}</p>

          {user.role === "admin" && (
            <p>Tienes permisos de administrador.</p>
          )}

          {user.role === "user" && (
            <p>Has iniciado sesión como usuario.</p>
          )}
        </>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </main>
  );
}

export default Dashboard;