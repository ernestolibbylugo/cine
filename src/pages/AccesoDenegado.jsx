import { Link } from 'react-router-dom';

const AccesoDenegado = () => (
  <div className="page denied-page">
    <h1>⛔ Acceso Denegado</h1>
    <p>No tienes permisos para acceder aquí.</p>
    <Link to="/dashboard" className="btn-link">
      Volver al Dashboard
    </Link>
  </div>
);

export default AccesoDenegado;
