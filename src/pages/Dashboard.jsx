import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePurchases } from "../context/PurchaseContext";
import { motion } from "framer-motion";

function Dashboard() {
  const { user } = useAuth();
  const { state } = useLocation();
  const { ticketSales } = usePurchases();

  return (
    <main className="page dashboard-page glass-panel">
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
            <h3>Historial de entradas vendidas</h3>
            {ticketSales.length === 0 ? <p>Aún no hay entradas vendidas.</p> : ticketSales.map((purchase) => <motion.div className="ticket-history-row" key={purchase.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><strong>{purchase.movieTitle || `Película #${purchase.movieId}`}</strong><span>{new Date(purchase.createdAt).toLocaleString("es-CR", { dateStyle: "medium", timeStyle: "short" })}</span><small>{purchase.seats?.length || 0} boleto(s) · Sala {purchase.showId}</small></motion.div>)}
          </div>
        </>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </main>
  );
}

export default Dashboard;