import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { motion } from "framer-motion";
import galaxiaImage from "../Img/imgGalaxiaPerdida.jpeg";
import ultimaNocheImage from "../Img/imgLaUltimaNoche.jpeg";

const movieImages = {
  "Galaxia Perdida": galaxiaImage,
  "La Última Noche": ultimaNocheImage,
  "La Ultima la noche": ultimaNocheImage,
};

function Cartelera() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/movies`)
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
    return <p className="loading-session">Cargando cartelera...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="cinema-page">
      <section className="page-hero">
        <div>
          <span className="eyebrow">Cartelera · Hoy</span>
          <h1>Historias que merecen una pantalla grande.</h1>
          <p>Elige tu función, encuentra tu lugar y disfruta la experiencia completa.</p>
        </div>
        <div className="hero-ticket" aria-hidden="true"><span>PELÍCULAS</span><strong>{movies.length.toString().padStart(2, '0')}</strong><small>en cartelera hoy</small></div>
      </section>
      <div className="section-heading">
        <div><span className="eyebrow">Selección del día</span><h2>En cartelera</h2></div>
        <span className="movie-count">{movies.length} películas</span>
      </div>
      <section className="movie-grid">
        {movies.length === 0 ? (
          <p>No hay películas disponibles.</p>
        ) : (
          movies.map((movie) => (
            <motion.article className="movie-card" key={movie.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: movie.id * 0.08 }} whileHover={{ y: -7 }}>
              <div className="movie-poster">
                <img src={movieImages[movie.title]} alt={`Póster de ${movie.title}`} />
                <span className="movie-rating">{movie.rating}</span>
              </div>
              <div className="movie-card-body">
                <div className="movie-card-heading">
                  <h3>{movie.title}</h3>
                  <span>{movie.duration} min</span>
                </div>
                <p className="movie-genre">{movie.genre}</p>
              </div>
            </motion.article>
          ))
        )}
      </section>
    </div>
  );
}

export default Cartelera;