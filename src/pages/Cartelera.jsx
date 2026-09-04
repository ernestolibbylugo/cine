import { useEffect, useState } from "react";

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
    <main>
      <h1>Cartelera</h1>

      {movies.length === 0 ? (
        <p>No hay películas disponibles.</p>
      ) : (
        <div>
          {movies.map((movie) => (
            <article key={movie.id}>
              <h2>{movie.title}</h2>
              <p>Género: {movie.genre}</p>
              <p>Duración: {movie.duration} minutos</p>
              <p>Clasificación: {movie.rating}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Cartelera;