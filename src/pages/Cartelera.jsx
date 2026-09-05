<<<<<<< HEAD
=======
import { useEffect, useState } from "react";

>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c
function Cartelera() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar la cartelera");
        }

        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando cartelera...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="cartelera">
      <h1 className="cartelera__titulo">Cartelera</h1>

      {movies.length === 0 ? (
        <p>No hay películas disponibles.</p>
      ) : (
        <div className="cartelera__grid">
          {movies.map((movie) => (
            <article className="pelicula-card" key={movie.id}>
              <h2 className="pelicula-card__titulo">{movie.title}</h2>

              <p>
                <strong>Género:</strong> {movie.genre}
              </p>

              <p>
                <strong>Duración:</strong> {movie.duration} minutos
              </p>

              <p>
                <strong>Clasificación:</strong> {movie.rating}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Cartelera;