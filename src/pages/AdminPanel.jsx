<<<<<<< HEAD
const AdminPanel = () => (
  <div className="page admin-page">
    <h1>Panel de Administración</h1>
    <p>Solo administradores pueden ver esta sección.</p>
    <div className="admin-actions">
      <button className="btn-primary">Crear elemento</button>
      <button className="btn-danger">Eliminar elemento</button>
    </div>
  </div>
);
=======
import { useEffect, useState } from "react";

function AdminPanel() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const cargarPeliculas = () => {
    fetch("http://localhost:3001/movies")
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
    fetch(`http://localhost:3001/movies/${id}`, {
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
    <main>
      <h1>Panel de Administración</h1>

      {error && <p>{error}</p>}

      {movies.length === 0 ? (
        <p>No hay películas registradas.</p>
      ) : (
        <div>
          {movies.map((movie) => (
            <article key={movie.id}>
              <h2>{movie.title}</h2>

              <p>Género: {movie.genre}</p>

              <button onClick={() => eliminarPelicula(movie.id)}>
                Eliminar película
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c

export default AdminPanel;