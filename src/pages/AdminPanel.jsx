import { useEffect, useState } from 'react';

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudieron cargar las películas');
        return response.json();
      })
      .then(setMovies)
      .catch((requestError) => setError(requestError.message));
  }, []);

  const eliminarPelicula = (id) => {
    fetch(`http://localhost:3001/movies/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo eliminar la película');
        setMovies((current) => current.filter((movie) => movie.id !== id));
      })
      .catch((requestError) => setError(requestError.message));
  };

  return (
    <div className="page admin-page">
      <span className="eyebrow">Zona exclusiva</span>
      <h1>Panel de Administración</h1>
      <p>Gestiona el contenido publicado en la cartelera.</p>
      {error && <p className="error-message" role="alert">{error}</p>}
      {movies.length === 0 ? <p className="info-card">No hay películas registradas.</p> : movies.map((movie) => (
        <div className="info-card" key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.genre}</p>
          <button className="btn-danger" type="button" onClick={() => eliminarPelicula(movie.id)}>Eliminar película</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;