import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

function Dashboard() {
  const { user } = useAuth();
  const { state } = useLocation();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/purchases?userId=${user.id}`)
      .then((response) => response.ok ? response.json() : [])
      .then(setPurchases)
      .catch(() => setPurchases([]));
  }, [user.id]);

  return (
    <main className="page dashboard-page">
      <h1>Dashboard</h1>

      {user ? (
        <>
          <h2>{state?.welcome || `Bienvenido, ${user.name}`}</h2>
          {state?.confirmation && <p className="success-message" role="status">{state.confirmation}</p>}
          <div className="info-card">
            <p>Correo: {user.email}</p>
            <p>Rol: {user.role}</p>
          </div>

          {user.role === "admin" && (
            <p>Tienes permisos de administrador.</p>
          )}

          {user.role === "user" && (
            <p>Has iniciado sesión como usuario.</p>
          )}
          <div className="info-card purchase-history">
            <h3>Últimas reservas</h3>
            {purchases.length === 0 ? <p>Aún no tienes funciones reservadas.</p> : purchases.slice(-3).reverse().map((purchase) => <p key={purchase.id}>Sala {purchase.showId} · {purchase.seats?.join(", ")} · ₡{purchase.total.toLocaleString("es-CR")}</p>)}
          </div>
        </>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </main>
  );
}

export default Dashboard;