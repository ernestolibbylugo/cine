<<<<<<< HEAD
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page dashboard-page">
      <h1>Dashboard</h1>
      <p>Bienvenido al panel principal.</p>
      <div className="info-card">
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Rol:</strong> {user?.role}
        </p>
      </div>
    </div>
  );
};
=======
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
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c

export default Dashboard;