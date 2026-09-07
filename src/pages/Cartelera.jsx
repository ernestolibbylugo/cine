import { useEffect, useState } from 'react';
import PeliculaCard from '../components/PeliculaCard';

const posterOptions = [
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=80',
];

const Cartelera = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo cargar la cartelera');
        return response.json();
      })
      .then((data) => setMovies(data.map((movie, index) => ({
        ...movie,
        genre: movie.genre || 'Película',
        duration: typeof movie.duration === 'number' ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m` : movie.duration || 'Duración pendiente',
        rating: movie.rating || 'A',
        poster: movie.poster || posterOptions[index % posterOptions.length],
        showtimes: movie.showtimes || ['18:00', '21:00'],
      }))))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="cinema-page">
      <section className="page-hero">
        <div><span className="eyebrow">Cartelera · Hoy en CineApp</span><h1>Historias que merecen una pantalla grande.</h1><p>Elige tu función, encuentra tu lugar y disfruta la experiencia completa.</p></div>
        <div className="hero-ticket" aria-hidden="true"><span>FUNCIONES</span><strong>{movies.length.toString().padStart(2, '0')}</strong><small>disponibles hoy</small></div>
      </section>
      <div className="section-heading"><div><span className="eyebrow">Selección del día</span><h2>En cartelera</h2></div><span className="movie-count">{movies.length} películas</span></div>
      {loading && <p className="loading-session">Cargando cartelera...</p>}
      {error && <p className="error-message" role="alert">{error}. Verifica que JSON Server esté activo.</p>}
      {!loading && !error && movies.length === 0 && <p className="info-card">No hay películas disponibles.</p>}
      {!loading && !error && movies.length > 0 && <section className="movie-grid">{movies.map((movie) => <PeliculaCard key={movie.id} movie={movie} />)}</section>}
    </div>
  );
};

export default Cartelera;