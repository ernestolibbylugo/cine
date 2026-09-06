import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies, getShows } from "../services/api";

function ComprarBoletos() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getMovies(), getShows()])
      .then(([movieData, showData]) => {
        setMovies(movieData);
        setShows(showData);
        setSelectedMovie(String(movieData[0]?.id ?? ""));
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const movieShows = useMemo(
    () => shows.filter((show) => String(show.movieId) === selectedMovie),
    [selectedMovie, shows]
  );

  const movie = movies.find((item) => String(item.id) === selectedMovie);

  if (loading) return <p className="loading-session">Preparando funciones...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section className="page cinema-page booking-page">
      <span className="eyebrow">Taquilla digital · Paso 1 de 2</span>
      <h1>Elige tu función.</h1>
      <p className="section-subtitle">La sala está lista. Solo falta decidir cuándo entrar.</p>

      <div className="booking-form">
        <label htmlFor="movie">Película</label>
        <select id="movie" value={selectedMovie} onChange={(event) => {
          setSelectedMovie(event.target.value);
          setSelectedShow("");
        }}>
          {movies.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>

        <label htmlFor="show">Horario {movie ? `· ${movie.genre}` : ""}</label>
        <div className="showtime-options">
          {movieShows.map((show) => (
            <button
              type="button"
              key={show.id}
              className={`time-pill ${selectedShow === String(show.id) ? "time-pill-selected" : ""}`}
              onClick={() => setSelectedShow(String(show.id))}
            >
              {show.time} · Sala {show.room}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="btn-primary booking-submit"
          disabled={!selectedShow}
          onClick={() => navigate("/asientos", { state: { movie, show: movieShows.find((item) => String(item.id) === selectedShow) } })}
        >
          Elegir asientos
        </button>
      </div>
    </section>
  );
}

export default ComprarBoletos;
