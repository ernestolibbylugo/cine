import { Link } from 'react-router-dom';

function PeliculaCard({ movie }) {
  return (
    <article className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={`Póster de ${movie.title}`} />
        <span className="movie-rating">{movie.rating}</span>
      </div>
      <div className="movie-card-body">
        <div className="movie-card-heading">
          <h3>{movie.title}</h3>
          <span>{movie.duration}</span>
        </div>
        <p className="movie-genre">{movie.genre}</p>
        <div className="showtimes" aria-label={`Horarios de ${movie.title}`}>
          {movie.showtimes.map((time) => (
            <button key={time} type="button" className="time-pill">{time}</button>
          ))}
        </div>
        <Link to="/comprar" className="btn-primary movie-action">Comprar boletos</Link>
      </div>
    </article>
  );
}

export default PeliculaCard;
