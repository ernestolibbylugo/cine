import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePurchases } from "../context/PurchaseContext";
import { motion } from "framer-motion";

// Películas inventadas del cine (las mismas registradas en db.json).
// El historial de entradas se agrupa por estas películas.
const INVENTED_MOVIES = [
  { id: "1", title: "Galaxia Perdida", genre: "Ciencia ficción" },
  { id: "2", title: "La Última Noche", genre: "Suspenso" },
];

const ticketsOfPurchase = (purchase) => {
  if (Array.isArray(purchase.tickets)) {
    return purchase.tickets.reduce((sum, ticket) => sum + (Number(ticket.quantity) || 1), 0);
  }
  return purchase.seats?.length || 0;
};

function Dashboard() {
  const { user } = useAuth();
  const { state } = useLocation();
  const { ticketSales } = usePurchases();

  // Historial de entradas vendidas por película.
  const salesByMovie = useMemo(() => {
    const moviesById = new Map(
      INVENTED_MOVIES.map((movie) => [movie.id, { ...movie, boletos: 0, total: 0, lastSale: null }]),
    );

    ticketSales.forEach((purchase) => {
      const movieId = String(purchase.movieId ?? "");
      let movie = moviesById.get(movieId);
      if (!movie) {
        movie = {
          id: movieId,
          title: purchase.movieTitle || (movieId ? `Película #${movieId}` : "Película sin identificar"),
          genre: "",
          boletos: 0,
          total: 0,
          lastSale: null,
        };
        moviesById.set(movieId, movie);
      }

      movie.boletos += ticketsOfPurchase(purchase);
      movie.total += Number(purchase.total) || 0;

      const createdAt = purchase.createdAt ? new Date(purchase.createdAt) : null;
      if (createdAt && (!movie.lastSale || createdAt > movie.lastSale)) {
        movie.lastSale = createdAt;
      }
    });

    return [...moviesById.values()].sort(
      (a, b) => b.boletos - a.boletos || a.title.localeCompare(b.title),
    );
  }, [ticketSales]);

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
            <h3>Historial de entradas vendidas por película</h3>
            {ticketSales.length === 0 ? (
              <p>Aún no hay entradas vendidas.</p>
            ) : (
              salesByMovie.map((movie) => (
                <motion.div
                  className="ticket-history-row"
                  key={movie.id || movie.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <strong>
                    {movie.title}
                    {movie.genre && <span className="ticket-history-genre"> · {movie.genre}</span>}
                  </strong>
                  <span>{movie.boletos} boleto{movie.boletos === 1 ? "" : "s"} · ₡{movie.total.toLocaleString("es-CR")}</span>
                  <small>
                    {movie.lastSale
                      ? `Última venta: ${movie.lastSale.toLocaleString("es-CR", { dateStyle: "medium", timeStyle: "short" })}`
                      : "Sin ventas"}
                  </small>
                </motion.div>
              ))
            )}
          </div>
        </>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </main>
  );
}

export default Dashboard;