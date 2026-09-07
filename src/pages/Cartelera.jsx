import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePurchases } from "../context/PurchaseContext";
import galaxiaImage from "../Img/imgGalaxiaPerdida.jpeg";
import ultimaNocheImage from "../Img/imgLaUltimaNoche.jpeg";

const movieImages = {
  "Galaxia Perdida": galaxiaImage,
  "La Última Noche": ultimaNocheImage,
  "La Ultima la noche": ultimaNocheImage,
};

const movieDescriptions = {
  "Galaxia Perdida": "Cuando una señal antigua despierta en el último rincón del universo, una piloto solitaria deberá decidir si sigue las coordenadas o protege el secreto que la galaxia lleva siglos escondiendo.",
  "La Última Noche": "En un hotel frente al mar, cuatro huéspedes reciben la misma invitación y una sola noche para descubrir quién los reunió antes de que amanezca.",
};

const TICKET_PRICE = 4500;

function Cartelera() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [shows, setShows] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addItem } = usePurchases();

  useEffect(() => {
    Promise.all([fetch(`${API_URL}/movies`), fetch(`${API_URL}/shows`)]).then(async ([movieResponse, showResponse]) => {
        if (!movieResponse.ok || !showResponse.ok) throw new Error("No se pudo cargar la cartelera");
        const [movieData, showData] = await Promise.all([movieResponse.json(), showResponse.json()]);
        setMovies(movieData);
        setShows(showData);
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

  const openMovie = (movie) => {
    const movieShows = shows.filter((show) => String(show.movieId) === String(movie.id));
    setSelectedMovie(movie);
    setSelectedShow(movieShows[0] || null);
    setQuantity(1);
  };

  const addTicketToCart = () => {
    if (!selectedMovie || !selectedShow) return;
    addItem({
      id: `ticket-${selectedMovie.id}-${selectedShow.id}`,
      type: "ticket",
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      showId: selectedShow.id,
      showTime: selectedShow.time,
      room: selectedShow.room,
      price: TICKET_PRICE,
      image: movieImages[selectedMovie.title],
    }, quantity);
    setSelectedMovie(null);
    navigate("/carrito");
  };

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
            <motion.article className="movie-card" key={movie.id} role="button" tabIndex="0" onClick={() => openMovie(movie)} onKeyDown={(event) => event.key === "Enter" && openMovie(movie)} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: movie.id * 0.08 }} whileHover={{ y: -7 }}>
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
                <button type="button" className="btn-primary movie-action" onClick={(event) => { event.stopPropagation(); openMovie(movie); }}>Ver película y comprar</button>
              </div>
            </motion.article>
          ))
        )}
      </section>
      {selectedMovie && (
        <div className="modal-backdrop" onClick={() => setSelectedMovie(null)}>
          <motion.section className="movie-detail-modal glass-panel" role="dialog" aria-modal="true" aria-labelledby="movie-detail-title" initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Cerrar" onClick={() => setSelectedMovie(null)}>×</button>
            <img src={movieImages[selectedMovie.title]} alt={`Póster de ${selectedMovie.title}`} />
            <div className="movie-detail-content">
              <span className="eyebrow">{selectedMovie.genre} · {selectedMovie.duration} min</span>
              <h2 id="movie-detail-title">{selectedMovie.title}</h2>
              <p>{movieDescriptions[selectedMovie.title] || "Una historia pensada para disfrutarse con las luces apagadas y la pantalla encendida."}</p>
              <label htmlFor="movie-show">Elige tu función</label>
              <select id="movie-show" value={selectedShow?.id || ""} onChange={(event) => setSelectedShow(shows.find((show) => String(show.id) === event.target.value))}>
                {shows.filter((show) => String(show.movieId) === String(selectedMovie.id)).map((show) => <option key={show.id} value={show.id}>{show.time} · Sala {show.room}</option>)}
              </select>
              <div className="movie-detail-footer"><div className="quantity-control"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity} boleto{quantity > 1 ? "s" : ""}</span><button type="button" onClick={() => setQuantity(quantity + 1)}>+</button></div><strong>₡{(TICKET_PRICE * quantity).toLocaleString("es-CR")}</strong></div>
              <button type="button" className="btn-primary movie-buy-button" onClick={addTicketToCart}>Comprar boleto y pagar</button>
            </div>
          </motion.section>
        </div>
      )}
    </div>
  );
}

export default Cartelera;