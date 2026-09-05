<<<<<<< HEAD
import PeliculaCard from '../components/PeliculaCard';

const movies = [
  { title: 'Dune: Parte Dos', genre: 'Ciencia ficción · Aventura', duration: '2h 46m', rating: 'B15', poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80', showtimes: ['13:20', '16:10', '19:40'] },
  { title: 'La ciudad perdida', genre: 'Acción · Comedia', duration: '1h 52m', rating: 'A', poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80', showtimes: ['14:00', '17:30', '21:00'] },
  { title: 'Noche de estreno', genre: 'Drama · Suspenso', duration: '2h 08m', rating: 'B', poster: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80', showtimes: ['15:15', '18:25', '20:50'] },
];

function Cartelera() {
  return (
    <div className="cinema-page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Cartelera · Hoy en Cinépolis 4</span>
          <h1>Historias que merecen una pantalla grande.</h1>
          <p>Elige tu función, encuentra tu lugar y disfruta la experiencia completa.</p>
        </div>
        <div className="hero-ticket" aria-hidden="true"><span>FUNCIONES</span><strong>03</strong><small>disponibles hoy</small></div>
      </section>
      <div className="section-heading">
        <div><span className="eyebrow">Selección del día</span><h2>En cartelera</h2></div>
        <span className="movie-count">{movies.length} películas</span>
      </div>
      <section className="movie-grid">
        {movies.map((movie) => <PeliculaCard key={movie.title} movie={movie} />)}
      </section>
    </div>
=======
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
>>>>>>> f9b822cad42e2b596bce367b4d0328697f77ccfc
  );
}

export default Cartelera;