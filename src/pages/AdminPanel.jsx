import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { motion } from "framer-motion";

function AdminPanel() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const cargarPeliculas = () => {
    fetch(`${API_URL}/movies`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudieron cargar las películas");
        }

        return response.json();
      })
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const eliminarPelicula = (id) => {
    fetch(`${API_URL}/movies/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo eliminar la película");
        }

        setMovies((peliculasActuales) =>
          peliculasActuales.filter((movie) => movie.id !== id)
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <main className="page admin-page glass-panel">
      <h1>Panel de Administración</h1>

      {error && <p>{error}</p>}

      {movies.length === 0 ? (
        <p>No hay películas registradas.</p>
      ) : (
        <div className="admin-actions">
          {movies.map((movie) => (
            <motion.article className="info-card" key={movie.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: movie.id * 0.08 }}>
              <h2>{movie.title}</h2>

              <p>Género: {movie.genre}</p>

              <button className="btn-danger" onClick={() => eliminarPelicula(movie.id)}>
                Eliminar película
              </button>
            </motion.article>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminPanel;